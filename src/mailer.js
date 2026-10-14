// Notifications for the moderation queue.
//
// Ported from the trackers, but written against domains.js rather than one
// project's fixed field list, so a new domain notifies without touching this
// file. Unconfigured it no-ops: a missing app password must never lose a
// submission, which is why everything here runs after the row is already
// stored and the response already sent.

const nodemailer = require('nodemailer');

const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL;

const configured = !!(GMAIL_USER && GMAIL_APP_PASSWORD && NOTIFY_EMAIL);

const transporter = configured
  ? nodemailer.createTransport({ service: 'gmail', auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD } })
  : null;

if (!configured) {
  console.warn('[mail] notifications disabled — set GMAIL_USER, GMAIL_APP_PASSWORD and NOTIFY_EMAIL to enable them.');
}

function send(opts) {
  if (!transporter) return;
  transporter
    .sendMail({ from: `Language Atlas <${GMAIL_USER}>`, ...opts })
    .catch(err => console.error('[mail]', opts.subject, err.message));
}

const oneLine = (v, n = 300) => String(v == null ? '' : v).replace(/\s+/g, ' ').trim().slice(0, n);

function summarise(domain, entry) {
  return domain.fields
    .map(([k, label, type]) => {
      const v = entry[k];
      if (Array.isArray(v)) return v.length ? `${label}: ${v.length} ${v.length === 1 ? 'row' : 'rows'}` : null;
      return v ? `${label}: ${oneLine(v)}` : null;
    })
    .filter(Boolean);
}

function notifyNewSubmission(domain, entry, adminUrl) {
  const lines = [
    `Map: ${domain.label} (${domain.id})`,
    `Location: ${entry.unitName} (${entry.countryCode})${entry.isNational ? '' : ' — subnational'}`,
    `Contributor: ${entry.by}${entry.inst ? ` (${entry.inst})` : ''}`,
    `Content status: ${entry.status}`,
    `Confidence: ${entry.confidence}`,
    '',
    ...summarise(domain, entry),
    '',
    `Review: ${adminUrl}`,
    '',
    '— or —',
    '',
    'Paste this block into the dashboard’s "Publish from a pasted entry" box to',
    'publish it directly, even if the queued row is gone:',
    '',
    JSON.stringify({ domain: domain.id, ...entry }),
  ];
  send({
    to: NOTIFY_EMAIL,
    subject: `[Language Atlas] ${domain.label}: ${entry.unitName}`,
    text: lines.join('\n'),
  });
}

function sendSubmissionConfirmation(to, domain, entry) {
  send({
    to,
    subject: `Your ${domain.label} entry for ${entry.unitName}`,
    text: [
      `Thank you — your entry for ${entry.unitName} has been received and is waiting for review.`,
      '',
      'It will appear on the map once it has been checked. If anything needs',
      'clarifying, we will reply to this address first.',
      '',
      'https://language-atlas.fly.dev/' + domain.id,
    ].join('\n'),
  });
}

function notifyEditRequest({ domain, entryTitle, email, description }, adminUrl) {
  send({
    to: NOTIFY_EMAIL,
    replyTo: email,
    subject: `[Language Atlas] Edit request: ${entryTitle}`,
    text: [
      `Map: ${domain}`,
      `Entry: ${entryTitle}`,
      `From: ${email}`,
      '',
      description,
      '',
      `Open requests: ${adminUrl}`,
    ].join('\n'),
  });
}

function sendEditRequestConfirmation({ entryTitle, email, description }) {
  send({
    to: email,
    subject: `Your correction to ${entryTitle}`,
    text: [
      `Thank you — your note on ${entryTitle} has been received.`,
      '',
      'What you sent:',
      '',
      description,
      '',
      'We will reply to this address if we need more detail.',
    ].join('\n'),
  });
}

// ---- collaboration projects ----

const PLACEHOLDER_DOMAIN = '@invalid.example';

function notifyNewProject(project, privateInfo, adminUrl) {
  const org = project.org || {};
  const orgLine = org.kind === 'listed' ? `${org.name} (listed in the deep dive, ${org.orgId})`
    : org.kind === 'new' ? `${org.name} — NOT in the deep dive${org.regNo ? `, charity no. ${org.regNo}` : ''}${org.registerName ? ` (register says: ${org.registerName})` : ''}`
    : 'not tied to an organisation';
  send({
    to: NOTIFY_EMAIL,
    replyTo: privateInfo.email,
    subject: `[Language Atlas] Project idea: ${project.title}`,
    text: [
      `Organisation: ${orgLine}`,
      `Contact: ${project.contactName}${project.contactRole ? `, ${project.contactRole}` : ''} <${privateInfo.email}>${privateInfo.publishEmail ? ' (email will be shown publicly)' : ' (email kept private)'}`,
      '',
      oneLine(project.summary, 600),
      '',
      `Review: ${adminUrl}`,
    ].join('\n'),
  });
}

function sendProjectConfirmation(to, project) {
  send({
    to,
    subject: `Your project idea: ${project.title}`,
    text: [
      `Thank you — "${project.title}" has been received and is waiting for review.`,
      '',
      'It will appear on the collaboration page once it has been checked. When a',
      'researcher is interested, their message is sent to this address.',
      '',
      'https://language-atlas.fly.dev/collaborate',
    ].join('\n'),
  });
}

/**
 * Someone asking to talk about a project. Goes to the poster when their address
 * is known, copied to the site team; otherwise to the site team alone to pass
 * on. The sender is the reply-to, so the poster can answer directly without
 * their own address ever being shown to the sender.
 */
function sendInterest(project, privateInfo, from) {
  const posterOk = privateInfo.email && !privateInfo.email.endsWith(PLACEHOLDER_DOMAIN);
  send({
    to: posterOk ? privateInfo.email : NOTIFY_EMAIL,
    bcc: posterOk ? NOTIFY_EMAIL : undefined,
    replyTo: from.email,
    subject: `[Language Atlas] Interest in "${project.title}"`,
    text: [
      posterOk ? `Someone has asked to talk about your project "${project.title}".`
        : `Interest in "${project.title}" (${project.contactName}) — no address on file for the poster, please pass this on.`,
      '',
      `From: ${from.name}${from.institution ? `, ${from.institution}` : ''} <${from.email}>`,
      from.researcher ? `About: ${from.researcher}` : null,
      '',
      from.message,
      '',
      'Reply to this email to answer them directly. It was sent through the Language Atlas',
      'collaboration page; the sender has not been verified beyond the address they gave.',
    ].filter(l => l !== null).join('\n'),
  });
}

module.exports = {
  configured,
  notifyNewProject,
  sendProjectConfirmation,
  sendInterest,
  notifyNewSubmission,
  sendSubmissionConfirmation,
  notifyEditRequest,
  sendEditRequestConfirmation,
};
