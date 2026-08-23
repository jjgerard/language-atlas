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

module.exports = {
  configured,
  notifyNewSubmission,
  sendSubmissionConfirmation,
  notifyEditRequest,
  sendEditRequestConfirmation,
};
