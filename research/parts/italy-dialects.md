# IT | Italy — Indigenous and regional languages

STATUS: documented

All five questions answered. Every quote below comes from a document retrieved and read in
this session; the file each came from is named. Retrieved sources are saved under `italy/`.

SOURCES (all verified in-session; http codes as observed):
 - label: "Legge 15 dicembre 1999, n. 482, Norme in materia di tutela delle minoranze linguistiche storiche"
   url: https://www.parlamento.it/parlam/leggi/99482l.htm
   http: 200 · tier: official-document
 - label: "D.P.R. 2 maggio 2001, n. 345, Regolamento di attuazione della legge n. 482/1999 (G.U. 13 settembre 2001, n. 213)"
   url: http://www.edizionieuropee.it/LAW/HTML/19/zn41_07_236.html
   http: 200 · tier: secondary-source
 - label: "Corte costituzionale, sentenza n. 159 del 2009 (Friuli Venezia Giulia, lingua friulana)"
   url: https://giurcost.org/decisioni/2009/0159s-09.html
   http: 200 · tier: official-document
 - label: "Corte costituzionale, sentenza n. 170 del 2010 (Piemonte, lingua piemontese)"
   url: https://giurcost.org/decisioni/2010/0170s-10.html
   http: 200 · tier: official-document
 - label: "Corte costituzionale, sentenza n. 88 del 2011 (FVG, dialetti di origine veneta)"
   url: https://giurcost.org/decisioni/2011/0088s-11.html
   http: 200 · tier: official-document
 - label: "Corte costituzionale, sentenza n. 81 del 2018 (Veneto, popolo veneto e minoranza nazionale)"
   url: https://giurcost.org/decisioni/2018/0081s-18.html
   http: 200 · tier: official-document
 - label: "Legge regionale Veneto 13 aprile 2007, n. 8, BUR n. 37 del 17 aprile 2007"
   url: https://bur.regione.veneto.it/BurvServices/pubblica/DettaglioLegge.aspx?id=196722
   http: 200 · tier: official-document
 - label: "Legge regionale Friuli Venezia Giulia 18 dicembre 2007, n. 29 (consolidated, Lexview)"
   url: https://lexview-int.regione.fvg.it/fontinormative/xml/xmlLex.aspx?anno=2007&legge=29
   http: 200 · tier: official-document
 - label: "Regione Siciliana / USR Sicilia, Linee guida per le modalita di attuazione della L.R. 9/2011 (with the law in annex)"
   url: https://www.csfls.it/res/wp-content/uploads/2022/05/Linee-guida-LR-9-2011.pdf
   http: 200 · tier: official-document
 - label: "Legge regionale Sardegna 3 luglio 2018, n. 22, Disciplina della politica linguistica regionale (B.U. 5 luglio 2018, n. 32)"
   url: https://www.edizionieuropee.it/LAW/HTML/211/sa3_04_059.html
   http: 200 · tier: secondary-source
 - label: "Council of Europe Treaty Office, Chart of signatures and ratifications of Treaty 148 (status 27/08/2026)"
   url: https://www.coe.int/en/web/conventions/full-list?module=signatures-by-treaty&treatynum=148
   http: 200 (JS shell to curl; read via rendered page) · tier: official-document
 - label: "ARLeF, Agjenzie Regjonal pe Lenghe Furlane, Friulano a scuola / Scuola"
   url: https://arlef.it/it/progetti/friulano-a-scuola/
   http: 200 · tier: official-document

DEAD ENDS (reported per the brief): camera.it/parlam/leggi/99482l.htm 404;
cortecostituzionale.it redirects every request to a Radware captcha page; senato.it returns
HTTP 202 with an empty body for both its dossier viewer and its PDF store;
gazzettaufficiale.it act pages return a shell with no article text;
gurs.regione.sicilia.it would not complete a TLS connection; archivio.pubblica.istruzione.it
copy of DPR 345/2001 404s; web.archive.org would not connect; coe.int serves the treaty
chart only as JavaScript.

## Q1 — Law 482/1999 art. 2 verbatim: ANSWERED

Retrieved from the Italian Parliament's own text server (parlamento.it), HTTP 200,
18,233 bytes, full text of all 20 articles. Saved: `italy/legge482_1999_parlamento.html`
and extracted plain text `italy/legge482_1999.txt`.

url: https://www.parlamento.it/parlam/leggi/99482l.htm
http: 200
tier: official-document

Header as the site words it:

> "Legge 15 Dicembre 1999, n. 482 — 'Norme in materia di tutela delle minoranze
> linguistiche storiche' — pubblicata nella Gazzetta Ufficiale n. 297 del 20 dicembre 1999"

**Art. 1**

> "1. La lingua ufficiale della Repubblica è l'italiano.
> 2. La Repubblica, che valorizza il patrimonio linguistico e culturale della lingua
> italiana, promuove altresì la valorizzazione delle lingue e delle culture tutelate dalla
> presente legge."

(EN: "1. The official language of the Republic is Italian. 2. The Republic, which values the
linguistic and cultural heritage of the Italian language, also promotes the valorisation of
the languages and cultures protected by this law.")

**Art. 2 — the closed list of twelve, verbatim**

> "1. In attuazione dell'articolo 6 della Costituzione e in armonia con i princípi generali
> stabiliti dagli organismi europei e internazionali, la Repubblica tutela la lingua e la
> cultura delle popolazioni albanesi, catalane, germaniche, greche, slovene e croate e di
> quelle parlanti il francese, il franco-provenzale, il friulano, il ladino, l'occitano e
> il sardo."

(EN: "In implementation of article 6 of the Constitution and in harmony with the general
principles established by European and international bodies, the Republic protects the
language and culture of the Albanian, Catalan, Germanic, Greek, Slovene and Croatian
populations and of those speaking French, Franco-Provençal, Friulian, Ladin, Occitan and
Sardinian.")

Note on the article's own grammar, which matters for the atlas: the twelve are not worded
as a uniform list of "languages". Six are named as **populations** ("popolazioni albanesi,
catalane, germaniche, greche, slovene e croate") and six as **speech varieties spoken by
populations** ("quelle parlanti il francese, il franco-provenzale, il friulano, il ladino,
l'occitano e il sardo"). Only the second six are named as languages in the article itself.

**Art. 3 — the list is treated by the law as an exhaustive "elenco"**

> "2. Nel caso in cui non sussista alcuna delle due condizioni di cui al comma 1 e qualora
> sul territorio comunale insista comunque una minoranza linguistica ricompresa
> nell'elenco di cui all'articolo 2, il procedimento inizia qualora si pronunci
> favorevolmente la popolazione residente [...]"

(EN: "...a linguistic minority included in the list under article 2...")

Art. 3(1) makes protection territorial as well as list-based: the province council
delimits the territory where protection applies, on request of at least 15% of registered
voters resident in the municipalities, or one third of their municipal councillors.

> "1. La delimitazione dell'ambito territoriale e subcomunale in cui si applicano le
> disposizioni di tutela delle minoranze linguistiche storiche previste dalla presente
> legge è adottata dal consiglio provinciale, sentiti i comuni interessati, su richiesta di
> almeno il quindici per cento dei cittadini iscritti nelle liste elettorali e residenti
> nei comuni stessi, ovvero di un terzo dei consiglieri comunali dei medesimi comuni."

**Art. 4 — schools (verbatim; this is the medium-of-instruction / subject provision)**

> "1. Nelle scuole materne dei comuni di cui all'articolo 3, l'educazione linguistica
> prevede, accanto all'uso della lingua italiana, anche l'uso della lingua della minoranza
> per lo svolgimento delle attività educative. Nelle scuole elementari e nelle scuole
> secondarie di primo grado è previsto l'uso anche della lingua della minoranza come
> strumento di insegnamento."

(EN: "In the nursery schools of the municipalities under article 3, language education
provides, alongside the use of Italian, also the use of the minority language for carrying
out educational activities. In primary schools and lower-secondary schools the use of the
minority language **as an instrument of teaching** is also provided for.")

> "2. Le istituzioni scolastiche elementari e secondarie di primo grado [...] nei limiti
> dell'orario curriculare complessivo definito a livello nazionale [...] al fine di
> assicurare l'apprendimento della lingua della minoranza, deliberano, anche sulla base
> delle richieste dei genitori degli alunni, le modalità di svolgimento delle attività di
> insegnamento della lingua e delle tradizioni culturali delle comunità locali,
> stabilendone i tempi e le metodologie, nonché stabilendo i criteri di valutazione degli
> alunni e le modalità di impiego di docenti qualificati."

(EN: individual schools decide, in their curricular autonomy and within the nationally
defined timetable, how the minority language is taught, also on the basis of parents'
requests; they set the hours, methods, assessment criteria and use of qualified teachers.)

> "5. Al momento della preiscrizione i genitori comunicano alla istituzione scolastica
> interessata se intendono avvalersi per i propri figli dell'insegnamento della lingua
> della minoranza."

(EN: "At pre-enrolment, parents notify the school whether they wish their children to make
use of minority-language teaching." — i.e. opt-in, no obligation.)

Art. 4(4): the activities are financed "avvalendosi delle risorse umane a disposizione" —
existing staff and the school's own autonomy budget, not a dedicated post allocation.

**Art. 5 — implementing decrees and the money**

> "1. Il Ministro della pubblica istruzione, con propri decreti, indica i criteri generali
> per l'attuazione delle misure contenute nell'articolo 4 [...] Per la realizzazione dei
> progetti è autorizzata la spesa di lire 2 miliardi annue a decorrere dall'anno 1999."

**Art. 9(2)** creates the national minority-language fund at the Presidency of the Council:
"un Fondo nazionale per la tutela delle minoranze linguistiche con una dotazione
finanziaria annua di lire 9.800.000.000 a decorrere dal 1999".

Other operative articles read in full: art. 6 (universities may set up courses in the art. 2
languages), art. 7 (use in municipal/provincial/regional council business; Italian text
alone has legal effect), art. 8 (publication of official acts), art. 9 (use in public
offices, excluding armed forces and police; use before the giudice di pace), art. 10
(toponyms alongside official ones), art. 11 (restoration of Italianised names/surnames),
art. 12 (public-broadcasting convention).

---

## Q2 — What the law does NOT cover: ANSWERED, from the Constitutional Court and from the State's own pleadings

Law 482/1999 contains **no exclusion clause**. I read all 20 articles: nowhere does it name
a variety it does not protect. The exclusion is structural — art. 2 is an enumeration and
every later article refers back to it ("la lingua ammessa a tutela", "l'elenco di cui
all'articolo 2"). What makes it citable rather than inferred is that the Constitutional
Court has repeatedly been asked to rule on exactly this and has said so in terms.

### Corte costituzionale, sentenza n. 170 del 2010 — Piedmontese

url: https://giurcost.org/decisioni/2010/0170s-10.html
http: 200 · tier: official-document (full text of the judgment, hosted by Consulta OnLine)
Decided 10 May 2010, deposited 13 May 2010. Saved: `italy/cc_0170s-10.html` / `.txt`

The Government challenged Piedmont regional law 7 aprile 2009, n. 11 ("Tutela,
valorizzazione e promozione del patrimonio linguistico del Piemonte") for putting the
"lingua piemontese" on the same footing as the recognised minority languages.

The Court's own words on the list:

> "la Regione Piemonte, in violazione dell'art. 6 Cost., [...] abbia ecceduto dalla propria
> competenza, attribuendo alla 'lingua piemontese', non ricompresa nel tassativo novero
> delle lingue minoritarie di cui all'art. 2 di detta legge, un valore analogo a quello
> riconosciuto per queste ultime."

("...the 'Piedmontese language', not included in the **exhaustive list** [tassativo novero]
of minority languages under art. 2 of that law...")

> "E tra queste, secondo la norma di cui all'art. 2 della legge statale, non è ricompreso,
> come già evidenziato, 'il piemontese'."

("And among these, under art. 2 of the state law, 'Piedmontese' is not included, as already
noted.")

And the limit on regions:

> "esso certamente non vale ad attribuire a quest'ultimo il potere autonomo e indiscriminato
> di identificare e tutelare – ad ogni effetto – una propria 'lingua' regionale o altre
> proprie 'lingue' minoritarie, anche al di là di quanto riconosciuto e stabilito dal
> legislatore statale."

**The Italian State's own word, recorded in the judgment.** The Avvocatura generale dello
Stato argued that the regional provisions were unconstitutional because they extended to

> "il 'piemontese', «che è solo un dialetto» («una variante cioè della lingua italiana
> rappresentativa di una cultura e di una tradizione sviluppatesi in una delimitata area
> geografica, senza però integrare un "gruppo etnico"») «la qualità» o «la natura di lingua
> minoritaria»"

(EN: Piedmontese "is only a dialect" — "a variant of the Italian language representative of
a culture and a tradition developed in a delimited geographical area, without however
constituting an 'ethnic group'".)
**This is the state's litigation position, not the atlas's view and not the Court's holding.**

**Outcome (dispositivo, verbatim).** The Court struck out only the words:
- art. 1 c. 1, "limitatamente alle parole «la lingua piemontese,»"
- art. 2 c. 2 lett. c) "nella parte in cui si riferisce alla 'lingua piemontese'"
- art. 2 c. 2 lett. g) "limitatamente alle parole «in piemontese e»"
- consequentially art. 2 c. 2 lett. d) and lett. i)

and **upheld** art. 1 c. 3, art. 3 c. 5 and art. 4 ("dichiara non fondate"). The surviving
provisions cover historic municipality names and local-idiom road signage, which the Court
placed

> "nello specifico contesto della tutela dell'«originale patrimonio culturale e linguistico»
> regionale"

So: the regional law survived as **cultural-heritage** legislation; it lost only where it
claimed the *minority-language* status the state list confers.

Incidental but useful: the judgment records that Piedmont's defence invoked "la «del tutto
simile» legge della Regione Veneto n. 8 del 2007, tuttavia non impugnata davanti a questa
Corte" — the Veneto 2007 law was never challenged.

### Corte costituzionale, sentenza n. 88 del 2011 — Venetian-origin dialects in Friuli

url: https://giurcost.org/decisioni/2011/0088s-11.html
http: 200 · tier: official-document. Saved: `italy/cc_0088s-11.html` / `.txt`

Challenge to art. 8 c. 2 of FVG regional law 17 febbraio 2010, n. 5 ("Valorizzazione dei
dialetti di origine veneta parlati nella Regione Friuli-Venezia Giulia"). This is the
clearest statement of the two-tier structure:

> "l'evocata legge si riferisce esclusivamente alla «tutela delle minoranze linguistiche
> storiche», caratterizzate non solo dalla loro particolare origine storica, ma anche dal
> loro significativo insediamento in precise aree territoriali."

> "Peraltro, la speciale legislazione di «tutela delle minoranze linguistiche storiche» non
> esaurisce la disciplina sollecitata dalla notoria presenza di un assai più ricco e
> variegato pluralismo culturale e linguistico, che va sotto i termini di «lingue regionali
> ed idiomi locali», per utilizzare il linguaggio usato dal legislatore statale nell'art. 1
> del decreto legge 27 giugno 2003, n. 151 [...], o di «dialetti», «idiomi» o anche
> «vernacoli», come si esprime l'Avvocatura generale dello Stato."

(EN: the special legislation on "historic linguistic minorities" **does not exhaust** the
field; there is a far richer and more varied cultural and linguistic pluralism which goes
under the terms "regional languages and local idioms" — the state legislator's own wording
in decree-law 151/2003 — or "dialects", "idioms" or even "vernaculars", as the State
Attorney's office puts it.)

Note that the state's challenge here asserted, of the Venetian-origin dialects, that they
are outside Law 482: "le sole lingue minoritarie con la legge n. 482 del 1999 tra le quali
essi dialetti, comunque, non rientrano".

**Outcome:** the Court "dichiara non fondate le questioni" on arts. 6 and 117(2)(h). The
regional dialect law stood.

### Corte costituzionale, sentenza n. 81 del 2018 — the Venetian people as a national minority

url: https://giurcost.org/decisioni/2018/0081s-18.html
http: 200 · tier: official-document. Decided 20 March 2018, deposited 20 April 2018.
Saved: `italy/cc81_2018.html` / `cc81_2018.txt`

Veneto regional law 13 dicembre 2016, n. 28 ("Applicazione della convenzione quadro per la
protezione delle minoranze nazionali") declared that the "popolo veneto" held the rights of
the Framework Convention. The Court struck the **entire law**:

> "il compito di determinare gli elementi identificativi di una minoranza da tutelare non
> può che essere affidato alle cure del legislatore statale, in ragione della loro
> necessaria uniformità per l'intero territorio nazionale."

(EN: the task of determining the identifying elements of a minority to be protected can
only be entrusted to the **state** legislator, given the need for uniformity across the
national territory.)

> "2) dichiara l'illegittimità costituzionale della legge della Regione Veneto 13 dicembre
> 2016, n. 28 (Applicazione della convenzione quadro per la protezione delle minoranze
> nazionali)."

Note the Court is deciding **who may decide**, not what Venetian is. It says nothing about
the linguistic status of Venetian.

---

## Q3 — Regional laws that legislate where the state list does not

### Veneto — legge regionale 13 aprile 2007, n. 8

"Tutela, valorizzazione e promozione del patrimonio linguistico e culturale veneto"
url: https://bur.regione.veneto.it/BurvServices/pubblica/DettaglioLegge.aspx?id=196722
http: 200 · tier: official-document (Bollettino Ufficiale della Regione del Veneto,
BUR n. 37 del 17 aprile 2007). Full text of all 13 articles retrieved.
Saved: `italy/veneto_lr8_2007.html` / `.txt`

**Art. 2 — the region's own definition, which is the regional counter-claim to the state list:**

> "Art. 2 - Lingua veneta
> 1. Le specifiche parlate storicamente utilizzate nel territorio veneto e nei luoghi in cui
> esse sono state mantenute da comunità che hanno conservato in modo rilevante la medesima
> matrice costituiscono il veneto o lingua veneta.
> 2. La Regione del Veneto considera la tutela, la valorizzazione e la promozione del
> patrimonio linguistico e culturale veneto una questione centrale per lo sviluppo
> dell'autonomia regionale."

(EN: "The specific speech varieties historically used in Venetan territory, and in the
places where they have been maintained by communities that have substantially preserved the
same matrix, constitute **Venetan, or the Venetan language**.")

**Art. 4 — the region adopts the European Charter's principles unilaterally**, expressly
saving the state's treaty power:

> "1. Ferma restando la potestà dello Stato in ordine agli accordi internazionali, la
> Regione, nell'esercizio della propria competenza in materia culturale, ispira la propria
> azione ai seguenti principi affermati nella Carta europea delle lingue regionali o
> minoritarie: [...] vanno messi a disposizione, per quanto di competenza regionale, forme e
> mezzi adeguati di insegnamento e di studio delle lingue regionali in tutti i livelli
> appropriati"

**Art. 8 — what it actually provides in schools (this is the school hook, and it is optional):**

> "1. La Regione del Veneto:
> a) promuove, d'intesa con i centri servizi amministrativi (CSA), nell'ambito
> dell'istruzione scolastica, corsi facoltativi di formazione ed aggiornamento diretti agli
> insegnanti di ogni ordine e grado, al fine di provvedere ad una conoscenza del patrimonio
> linguistico e culturale veneto; tali corsi sono finanziati dalla Regione stessa;
> b) promuove, d'intesa con i centri servizi amministrativi (CSA), corsi facoltativi di
> storia, cultura e lingua veneta; tali corsi sono finanziati dalla Regione stessa distinti
> per livelli scolastici"

> "3. La Regione bandisce inoltre, d'intesa e in collaborazione con gli organi competenti
> dello Stato, un concorso nelle scuole di ogni ordine e grado sull'originale patrimonio
> linguistico veneto."

So: **optional courses funded by the Region and agreed with the school administration** —
not curriculum, not medium of instruction, no entitlement. Art. 13 budgeted euro 250,000 per
year for 2007, 2008 and 2009.

Art. 10 sets up an expert commission for a unified Venetan orthography ("Grafia veneta unitaria").

Corte cost. 170/2010 records that this 2007 law was never challenged by the Government
("la «del tutto simile» legge della Regione Veneto n. 8 del 2007, tuttavia non impugnata
davanti a questa Corte").

### Friuli Venezia Giulia — legge regionale 18 dicembre 2007, n. 29 (Friulian: a language ON the state list)

"Norme per la tutela, valorizzazione e promozione della lingua friulana"
url: https://lexview-int.regione.fvg.it/fontinormative/xml/xmlLex.aspx?anno=2007&legge=29
http: 200 · tier: official-document (FVG Regional Council consolidated text, with
in-line notes of amendments and of the provisions struck down). Saved: `italy/fvg_lr29_2007.html` / `.txt`

Capo III "Interventi nel settore dell'istruzione". Art. 12:

> "1. L'apprendimento e l'insegnamento della lingua friulana sono inseriti all'interno di un
> percorso educativo plurilingue che prevede, accanto alla lingua italiana, la compresenza
> di lingue minoritarie storiche e lingue straniere.
> 2. Ai sensi dell'articolo 4, commi 1, 2, 3 e 4, della legge 482/1999, nelle scuole
> dell'infanzia, nelle scuole primarie e secondarie di primo grado situate nei Comuni
> delimitati ai sensi dell'articolo 3, la lingua friulana è inserita nel percorso educativo,
> secondo le modalità specifiche corrispondenti all'ordine e grado scolastico"

Art. 14 "(Ambito di applicazione nelle scuole)" c. 2 originally guaranteed a minimum:

> "L'insegnamento della lingua friulana è garantito per almeno un'ora alla settimana per la
> durata dell'anno scolastico, nell'ambito della quota di flessibilità dell'autonomia
> scolastica."

Art. 15 c. 1 funds it: the Region transfers money to schools "sulla base del numero delle
ore d'insegnamento e di uso curricolare della lingua friulana programmate e comunicate
dall'Ufficio scolastico regionale". Art. 15 c. 4 requires ARLeF, with the regional school
office, to "verifica e valuta annualmente [...] lo stato di applicazione dell'insegnamento e
dell'uso della lingua friulana nelle istituzioni scolastiche".

**But two of the strongest school provisions were struck down.** See Q4 below.

### Friuli Venezia Giulia — legge regionale 17 febbraio 2010, n. 5 (varieties NOT on the state list)

Title as recorded verbatim in Corte cost. 88/2011: "Valorizzazione dei dialetti di origine
veneta parlati nella Regione Friuli-Venezia Giulia", adopted "in attuazione dell'art. 9
della Costituzione" (art. 1). The Court upheld its art. 8 c. 2 (support for signage in
those dialects). Source: https://giurcost.org/decisioni/2011/0088s-11.html

Note the region's own word for these varieties, in the title of its own law: **dialetti**.

### Piedmont — legge regionale 7 aprile 2009, n. 11

"Tutela, valorizzazione e promozione del patrimonio linguistico del Piemonte".
Read via Corte cost. 170/2010 (full text of the challenged provisions is quoted there).
As enacted, art. 1 c. 1 listed "la lingua piemontese" alongside occitano, franco-provenzale,
francese and walser; those words were struck out in 2010. The law survives as
cultural-heritage legislation; its provisions on historic municipality names (art. 3 c. 5)
and local-idiom road signage (art. 4) were upheld.

### Sicily — legge regionale 31 maggio 2011, n. 9

"Norme sulla promozione, valorizzazione ed insegnamento della storia, della letteratura e
del patrimonio linguistico siciliano nelle scuole"

Full text retrieved as reproduced in the Region's own implementing guidelines (below),
which print it in an annex with its publication reference: "Pubblicata sulla Gazz. Uff. Reg.
sic. 3 giugno 2011, n. 24" and "Vedi, anche, il Dec. Ass. 9 novembre 2011".

url: https://www.csfls.it/res/wp-content/uploads/2022/05/Linee-guida-LR-9-2011.pdf
http: 200 (PDF, 32 pp, text extracted) · tier: official-document — the PDF is issued by
**Regione Siciliana, Assessorato dei Beni Culturali e dell'Identità Siciliana** together with
the **Ufficio Scolastico Regionale per la Sicilia**. Saved: `italy/sicilia_lineeguida.pdf` / `.txt`
(NB: gurs.regione.sicilia.it, the official gazette host, would not connect — curl timed out.)

> "Art. 1 — Promozione, valorizzazione ed insegnamento della storia, della letteratura e del
> patrimonio linguistico siciliano nelle scuole.
> 1. La Regione promuove la valorizzazione e l'insegnamento della storia, della letteratura e
> del patrimonio linguistico siciliano nelle scuole di ogni ordine e grado.
> 2. Al raggiungimento dell'obiettivo di cui al comma 1 sono destinati appositi moduli
> didattici, all'interno dei piani obbligatori di studio definiti dalla normativa nazionale,
> nell'ambito della quota regionale riservata dalla legge e nel rispetto dell'autonomia
> didattica delle istituzioni scolastiche."

> "Art. 3 — Disposizioni finanziarie.
> 1. Dalle disposizioni di cui alla presente legge non possono derivare maggiori oneri a
> carico del bilancio della Regione."

**Terminology point, and it is deliberate.** The Sicilian law never names a language. Its
object is "il patrimonio linguistico siciliano" — the Sicilian *linguistic heritage* —
delivered as "moduli didattici" inside the existing compulsory study plans, in the regional
quota, subject to school autonomy, and with no new money.

The Region's own guidelines say so in as many words, in the Assessor's preface:

> "È ben lungi, tanto dalla volontà del legislatore, quanto quella degli attuatori, la
> riduttiva intenzione di promuovere, sic et simpliciter, l'insegnamento dialettale, come
> talvolta si è frettolosamente affermato. Fermo restando lo straordinario valore
> glottologico della 'parlata siciliana', questa resta, nel progetto, solo una delle plurime
> forme di espressività della cultura regionale"

(EN: it is far from the intention of either the legislator or the implementers to promote,
plainly and simply, **dialect teaching**, as has sometimes been hastily claimed. The
extraordinary glottological value of the "Sicilian speech" notwithstanding, in this project
it remains only one of the several expressive forms of regional culture.)

And on the delay and the scale of uptake, from the same preface:

> "la concreta attuazione della norma ha conosciuto una lunga fase di stallo"

> "sono state identificate due scuole-polo, una nella Sicilia occidentale e l'altra nella
> parte orientale dell'Isola, che, nel rispetto delle cennate linee-guida, sono chiamate a
> coordinare le attività formative degli istituti, oltre 200, che hanno formalmente aderito
> all'attuazione di specifici percorsi di studio."

(EN: two hub schools were identified, one in western and one in eastern Sicily, to
coordinate the training activities of the institutes — **over 200** — that have formally
signed up to implement specific study pathways.)

> "Questi ultimi, in coerenza con lo spirito della legge, non costituiranno oggetto di
> insegnamenti aggiuntivi ma, in relazione ai profili culturali prescelti, integreranno le
> ordinarie attività didattiche nell'ambito delle discipline più affini ai contenuti
> selezionati."

(EN: these will **not** be additional teaching, but will be integrated into ordinary
teaching within the disciplines closest to the content selected.)

### Sardinia — legge regionale 3 luglio 2018, n. 22

"Disciplina della politica linguistica regionale" (B.U. 5 luglio 2018, n. 32)
url: https://www.edizionieuropee.it/LAW/HTML/211/sa3_04_059.html
http: 200 · tier: secondary-source (Edizioni Europee regional code; full text reproduced,
with BUR citation). I did not reach an official regione.sardegna.it copy of the text.
Saved: `italy/sardegna_lr22.html` / `.txt`

This law is the clearest example on the map of a region building a **three-tier**
classification of its own, cutting across the state list.

> "Art. 2. 1. La lingua sarda, il catalano di Alghero e il gallurese, sassarese e
> tabarchino, costituiscono parte del patrimonio immateriale della Regione, che adotta ogni
> misura utile alla loro tutela, valorizzazione, promozione e diffusione.
> 2. [...] essa contiene:
> a) le misure di **tutela**, promozione e valorizzazione della lingua sarda e del catalano
> di Alghero;
> b) le misure di **promozione e valorizzazione** del sassarese, gallurese e tabarchino;
> c) le modalità dell'insegnamento, anche in italiano, della storia, della letteratura e di
> altre discipline riferite alla Sardegna."

So Sardinian and Alghero Catalan (both on the state list) get *tutela*; Sassarese,
Gallurese and Tabarchino (none on the state list) get *promozione e valorizzazione* only.

> "Art. 2. 5. L'ambito di applicazione delle misure previste dalla presente legge a favore
> delle lingue delle minoranze storiche è individuato attraverso la delimitazione
> territoriale operata secondo le modalità previste dall'articolo 3 della legge n. 482 del
> 1999."

Schools (Capo III):

> "Art. 17. 1. Ai sensi dell'articolo 4 della legge n. 482 del 1999 nelle scuole
> dell'infanzia, nelle scuole primarie e nelle scuole secondarie di primo grado situate nei
> comuni delimitati [...] le istituzioni scolastiche inseriscono nel percorso educativo
> linguistico, **in orario curriculare**, l'insegnamento delle lingue delle minoranze
> storiche e quello **nelle** lingue delle minoranze storiche di tutte le materie del
> curricolo, secondo modalità specifiche corrispondenti a ciascun ordine e grado scolastico."

(Both teaching **of** the minority languages and teaching **in** them, of every curricular
subject — i.e. medium of instruction, within school autonomy.)

> "Art. 17. 4. La scelta se avvalersi dell'insegnamento della lingua sarda o del catalano di
> Alghero è esercitata al momento dell'iscrizione scolastica. L'opzione espressa mantiene la
> sua validità per la durata dell'intero ciclo scolastico e può essere modificata all'inizio
> di ciascun anno scolastico."

> "Art. 20. 1. L'attività di insegnamento è svolta da docenti che abbiano la conoscenza
> della lingua di livello almeno C1, certificata secondo le modalità previste dall'articolo 9."

> "Art. 19. 1. La Regione sostiene, nelle scuole di ogni ordine e grado, la realizzazione di
> laboratori didattici in orario extra-curriculare nei quali le attività siano svolte in
> lingua sarda, in catalano di Alghero e in sassarese, gallurese e tabarchino."

Note the split again: **curricular** teaching (art. 17) is only for the state-listed
languages; the three not on the state list appear only in **extracurricular** labs (art. 19).

The law also cites a devolution instrument worth a policyHistory row:

> "b) in attuazione del decreto legislativo 13 gennaio 2016, n. 16 (Norme di attuazione
> dello Statuto speciale della Regione Sardegna per il trasferimento delle funzioni in
> materia di tutela della lingua e della cultura delle minoranze linguistiche storiche nella
> Regione)"

---

## Q5 — European Charter for Regional or Minority Languages: ANSWERED, signed not ratified

Council of Europe **Treaty Office, Chart of signatures and ratifications of Treaty 148**,
read in a browser (the page is a JavaScript shell to curl; rendered content below).

url: https://www.coe.int/en/web/conventions/full-list?module=signatures-by-treaty&treatynum=148
http: 200 (curl returns the shell; content read via the rendered page) · tier: official-document

Header: "Chart of signatures and ratifications of Treaty 148 — European Charter for Regional
or Minority Languages (ETS No. 148) — Status as of 27/08/2026". Treaty opened Strasbourg
05/11/1992; entry into force 01/03/1998.

The Italy row, verbatim as the table shows it:

> "Italy    27/06/2000"

— signature date only. **Ratification column empty, Entry into Force column empty**, no
reservations or declarations recorded. Italy is counted among the table's
"Total number of signatures not followed by ratifications: 9".

For comparison the same table shows "Spain 05/11/1992 09/04/2001 01/08/2001" and
"United Kingdom 02/03/2000 27/03/2001 01/07/2001".

**Consequence for the map:** the Charter's education undertakings do not bind Italy, and
there is no ECRML Committee of Experts monitoring cycle for Italy. Veneto LR 8/2007 art. 4
nonetheless declares that the Region takes its inspiration from the Charter's principles
"Ferma restando la potestà dello Stato in ordine agli accordi internazionali", and Sardinia
LR 22/2018 art. 2(4)(c) says it is enacted "in armonia con i principi generali [...] con
particolare riguardo alla Carta delle lingue minoritarie e regionali" — two regions invoking
a treaty the state has not ratified.

---

## Q4 — What schools actually do: ANSWERED (implementing rule found; uptake found for Friulian and Sicily)

### The implementing regulation: D.P.R. 2 maggio 2001, n. 345

"Regolamento di attuazione della legge 15 dicembre 1999, n. 482, recante norme di tutela
delle minoranze linguistiche storiche" — (G.U. 13 settembre 2001, n. 213)
url: http://www.edizionieuropee.it/LAW/HTML/19/zn41_07_236.html
http: 200 · tier: secondary-source (full text reproduced with the G.U. citation; I could not
get a served copy from gazzettaufficiale.it — its act pages return a shell, and the
archivio.pubblica.istruzione.it copy 404s). Saved: `italy/dpr345_ee.html` / `dpr345.txt`

> "Art. 1. 3. L'ambito territoriale e sub-comunale in cui si applicano le disposizioni di
> tutela di ciascuna minoranza linguistica storica previste dalla legge coincide con il
> territorio in cui la minoranza è storicamente radicata e in cui la lingua ammessa a tutela
> è il modo di esprimersi dei componenti della minoranza linguistica."

> "Art. 2. 1. Al fine di assicurare l'apprendimento della lingua ammessa a tutela nelle
> istituzioni scolastiche di cui all'articolo 4 della legge, il Ministro della pubblica
> istruzione, prima dell'inizio di ogni anno scolastico, indica i criteri generali per
> l'attuazione delle misure contenute nell'articolo 4 della legge."

> "Art. 2. 2. Le istituzioni scolastiche di cui all'articolo 4 della legge, nell'ambito della
> propria autonomia [...] possono avviare una fase di sperimentazione con l'attivazione di
> corsi di insegnamento di cui all'articolo 4 della legge, per una durata massima di tre anni"

> "Art. 3. 1. [...] Essi, in sede di coordinamento ministeriale, definiscono annualmente un
> quadro formativo di riferimento nel rispetto dell'autonomia didattica delle istituzioni
> universitarie e scolastiche delle regioni interessate; nell'ambito di tale quadro di
> riferimento le istituzioni universitarie e scolastiche prevedono percorsi formativi
> specifici per insegnanti, interpreti e traduttori"

So the national machinery is: annual ministerial criteria + school autonomy + parental
opt-in. There is no national curriculum, no timetable allocation, and no dedicated teaching
post created by the law.

### The constitutional ceiling on what a region may require of schools

Corte costituzionale, sentenza n. 159 del 2009 (decided 18 May 2009, deposited 22 May 2009).
url: https://giurcost.org/decisioni/2009/0159s-09.html · http: 200 · tier: official-document
Saved: `italy/cc_0159s-09.html` / `.txt`

Friuli Venezia Giulia had legislated a **minimum entitlement** and a **default enrolment**
for Friulian — a state-listed language. Both were struck down.

On the guaranteed hour:

> "L'ultimo periodo del comma 2 dell'art. 14 contrasta con l'art. 4, comma 2, della legge
> n. 482 del 1999, che attribuisce all'autonomia didattica delle scuole la deliberazione dei
> tempi di insegnamento della lingua friulana."

On opt-out versus opt-in — the Court reading Law 482 art. 4(5):

> "presidiano la piena libertà educativa della famiglia, che non deve [...] doversi
> distinguere in negativo per esprimere la propria mancanza di volontà di far seguire ai
> propri figli le lezioni di lingua friulana. Non può quindi parlarsi della disposizione
> censurata come di una mera variante procedurale per permettere l'espressione del consenso,
> dal momento che la legge n. 482 del 1999 ha inteso garantire la piena libertà di coloro che
> sono chiamati a compiere una scelta di rilevante valore civile e culturale."

> "L'art. 12, comma 3, della legge regionale n. 29 del 2007 è, pertanto, illegittimo per
> violazione dell'art. 4 della legge n. 482 del 1999."

Dispositivo, verbatim:

> "dichiara l'illegittimità costituzionale degli articoli 6, comma 2, 8, commi 1 e 3, 9,
> comma 3, 11, comma 5, 12, comma 3, e 14, commi 2, ultimo periodo, e 3, della legge della
> Regione Friuli-Venezia Giulia 18 dicembre 2007, n. 29 (Norme per la tutela, valorizzazione
> e promozione della lingua friulana)"

Art. 14 c. 3 — the CLIL / "apprendimento veicolare integrato delle lingue" requirement — also
fell. Note the consolidated FVG text on lexview still prints these provisions with a note
recording the ruling; they are not in force.

### Uptake — Friulian (state-listed language, Friuli Venezia Giulia)

url: https://arlef.it/it/progetti/friulano-a-scuola/
http: 200 · tier: official-document — ARLeF (Agjenzie Regjonâl pe Lenghe Furlane) is the
Friuli Venezia Giulia regional language agency, email domain regione.fvg.it.
Saved: `italy/arlef_*.html`

> "Per l'anno scolastico 2025/2026, per le scuole dell'infanzia e primarie, l'insegnamento
> del friulano è stato scelto da oltre il 78% delle famiglie."

> "La lingua friulana è insegnata a oltre 33.000 alunni delle scuole dell'infanzia, primarie
> e secondarie di primo grado di tutto il territorio."

> "Gli insegnanti sono oltre 1.500, accreditati dalla Regione F-VG in un apposito elenco
> regionale. In molte scuole la lingua friulana è insegnata secondo quella che a livello
> europeo è riconosciuta come una delle più efficaci metodologie didattiche, il CLIL [...]
> Il friulano, insegnato per almeno 30 ore all'anno, non sottrae in alcun modo ore ad altre
> materie. L'insegnamento è previsto dalla Legge statale n. 482/99 e dalla Legge regionale
> n. 29/2007, e si inserisce nel 20% del curriculum individuato dalle scuole in autonomia."

Elsewhere on the same site: "oltre il 76% dei genitori che sceglie l'insegnamento del
friulano a scuola (nelle scuole dell'infanzia e primarie). Se consideriamo anche gli alunni
delle scuole primarie di secondo grado, si arriva a circa 38.000 studenti." (the phrase
"primarie di secondo grado" appears to be a slip in the source for *secondarie di primo
grado*; the 33,000 figure above is the one I would use.)

**Caveat the atlas must carry:** ARLeF states the teaching runs "per almeno 30 ore all'anno".
That minimum is **not** in the regional statute — the statutory minimum hour a week was
struck down in 2009. ARLeF's page attributes the delivery to "Legge statale n. 482/99 e
[...] Legge regionale n. 29/2007" within "il 20% del curriculum individuato dalle scuole in
autonomia". ARLeF's own Scuola page attributes the current arrangement to a 2011 regional
regulation and a "Piano applicativo di sistema per l'insegnamento della lingua friulana":

> "Nel 2007, la Regione – anche in conseguenza del Decreto attuativo dello Statuto di
> autonomia n. 223/2002 – si è dotata di una propria legge regionale in merito
> all'insegnamento del friulano e successivamente (nel 2011) di un regolamento. Le norme
> prevedono, fra l'altro, l'adozione di uno specifico 'Piano applicativo di sistema per
> l'insegnamento della lingua friulana' e l'istituzione di un Elenco regionale degli
> insegnanti di friulano."
url: https://arlef.it/it/lingua-e-cultura/scuola/ · http: 200

That page also lists downloadable "Adesioni insegnamento lingua friulana" datasets from
USR FVG for every school year from 2018/19 to 2025/26 — an annual official uptake series.

### Uptake — Sicilian (NOT a state-listed variety)

From the Region + USR Sicilia Linee Guida (cited in full above): "gli istituti, oltre 200,
che hanno formalmente aderito all'attuazione di specifici percorsi di studio", coordinated
by two "scuole-polo", after "una lunga fase di stallo". The same document states the content
"non costituiranno oggetto di insegnamenti aggiuntivi".

### What I did NOT find

- No national figure for uptake across all twelve minority languages. The Ministry's own
  annual criteria under Law 482 art. 5 / D.P.R. 345 art. 2(1) exist by law, but I could not
  retrieve a served copy of any individual annual decree, nor a national monitoring dataset.
  senato.it and gazzettaufficiale.it act pages both returned empty or shell responses to
  every request I made.
- No Lombardy regional language/dialect law was retrieved; I did not verify one exists.

---

## DRAFT BULLETS

Bullet lengths were counted programmatically; all are 96 characters or fewer, none ends in
"." or ";", each stands alone.

- field: localTerm
  bullets:
    - Terms differ by authority; each label below is the source's own, not the atlas's
    - Law 482/1999 term for the twelve it lists: "minoranze linguistiche storiche"
    - Corte cost. 170/2010 calls the art. 2 list a "tassativo novero" of minority languages
    - State counsel argued in that case that Piedmontese is "solo un dialetto"
    - Veneto LR 8/2007 art. 2 names its own varieties "il veneto o lingua veneta"

- field: standing
  bullets:
    - Law 482/1999 art. 2 protects twelve named populations and languages, a closed list
    - Sicilian, Venetian and Piedmontese are absent from that art. 2 list
    - Corte cost. 170/2010 struck "la lingua piemontese" from Piedmont LR 11/2009
    - Veneto LR 8/2007 and Sicily LR 9/2011 legislate for varieties the state list omits

- field: mediumOfInstruction
  bullets:
    - Applies only to the twelve listed languages, in municipalities delimited under art. 3
    - Law 482 art. 4: minority language used as "strumento di insegnamento" in primary years
    - Nursery schools use the minority language alongside Italian for educational activities
    - Sardinia LR 22/2018 art. 17 adds curricular teaching in the language of all subjects
    - Corte cost. 159/2009 struck FVG's guaranteed weekly hour as breaching school autonomy

- field: taughtAsSubject
  bullets:
    - Opt-in: parents say at pre-enrolment whether they want minority-language teaching
    - Schools set hours, methods and assessment themselves under Law 482 art. 4(2)
    - Friulian chosen by over 78% of infant and primary families in 2025/26, per ARLeF
    - Sicily LR 9/2011 gives "moduli didattici" in the regional quota, with no new money
    - Veneto LR 8/2007 art. 8 funds optional school courses in Venetan history and language

- field: policyHistory
  rows:
    - year: 1999
      description: Law 482/1999 protects twelve "minoranze linguistiche storiche" in a closed list
    - year: 2000
      description: Italy signs the European Charter for Regional or Minority Languages, 27 June
    - year: 2001
      description: DPR 345/2001 implements Law 482; minister sets criteria before each school year
    - year: 2007
      description: Veneto LR 8/2007 declares "il veneto o lingua veneta" and funds optional courses
    - year: 2007
      description: FVG LR 29/2007 puts Friulian in infant, primary and lower-secondary schooling
    - year: 2009
      description: Piedmont LR 11/2009 names "lingua piemontese" in its linguistic-heritage law
    - year: 2009
      description: Corte cost. 159/2009 strikes FVG's minimum hour and its opt-out enrolment
    - year: 2010
      description: Corte cost. 170/2010 strikes "lingua piemontese" from the Piedmont law
    - year: 2010
      description: FVG LR 5/2010 supports "dialetti di origine veneta" spoken in the region
    - year: 2011
      description: Sicily LR 9/2011 puts "patrimonio linguistico siciliano" in school modules
    - year: 2011
      description: Corte cost. 88/2011 upholds FVG's dialect law as cultural, not minority, policy
    - year: 2016
      description: D.lgs. 16/2016 transfers minority-language functions to Sardinia
    - year: 2018
      description: Sardinia LR 22/2018 sets three tiers and curricular teaching in the languages
    - year: 2018
      description: Corte cost. 81/2018 voids Veneto LR 28/2016 calling the "popolo veneto" a minority
    - year: 2026
      description: Charter still signed but unratified by Italy, per CoE chart of 27 August 2026

## NOTE ON THE ATLAS'S EXISTING GLOTTOLOG AND WALS FIGURES

Nothing in any source I read this session bears on whether these varieties are languages.
Law 482 does not define "lingua"; Corte cost. 88/2011 expressly says the statute does not
exhaust the field and lists the alternative labels other actors use ("lingue regionali ed
idiomi locali", "dialetti", "idiomi", "vernacoli") without endorsing any of them. Any bullet
comparing the state list with Glottolog's 56 or WALS's Italian-variety records should
attribute each count to its own authority and stop there.
