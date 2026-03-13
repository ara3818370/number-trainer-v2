// categories.js — All 12 category generators implementing CategoryValue interface
// Phase 2b: language-dependent ttsText and display (en + de)
// Each generator returns { value, display, ttsText, lastDigit, category }

import {
  cardinalToWords as enCardinal, ordinalToWords as enOrdinal, ordinalSuffix as enOrdinalSuffix,
  yearToWords as enYear, decadeToWords as enDecade, fractionToWords as enFraction,
  decimalToWords as enDecimal, currencyToWords as enCurrency,
  percentageToWords as enPercentage, roomBusToWords as enRoomBus,
  scoreToWords as enScore, temperatureToWords as enTemperature,
  largeNumberToWords as enLarge
} from './numbers-en.js';

import {
  cardinalToWords as deCardinal, ordinalToWords as deOrdinal, ordinalSuffix as deOrdinalSuffix,
  yearToWords as deYear, decadeToWords as deDecade, fractionToWords as deFraction,
  decimalToWords as deDecimal, currencyToWords as deCurrency,
  percentageToWords as dePercentage, roomBusToWords as deRoomBus,
  scoreToWords as deScore, temperatureToWords as deTemperature,
  largeNumberToWords as deLarge
} from './numbers-de.js';

import { getLearnLang } from './i18n.js';

// ── Language-aware helpers ─────────────────────────────────────────────────

/**
 * Get the current learning language.
 * @returns {'en'|'de'}
 */
function lang() {
  return getLearnLang();
}

/**
 * Cardinal to words in current learn language.
 * @param {number} n
 * @returns {string}
 */
function cardinalToWords(n) {
  return lang() === 'de' ? deCardinal(n) : enCardinal(n);
}

/**
 * Ordinal to words in current learn language.
 * @param {number} n
 * @returns {string}
 */
function ordinalToWords(n) {
  return lang() === 'de' ? deOrdinal(n) : enOrdinal(n);
}

/**
 * Ordinal suffix in current learn language.
 * @param {number} n
 * @returns {string}
 */
function ordinalSuffix(n) {
  return lang() === 'de' ? deOrdinalSuffix(n) : enOrdinalSuffix(n);
}

/**
 * Year to words in current learn language.
 * @param {number} year
 * @returns {string}
 */
function yearToWords(year) {
  return lang() === 'de' ? deYear(year) : enYear(year);
}

/**
 * Decade to words in current learn language.
 * @param {number} decade
 * @param {string} qualifier
 * @returns {string}
 */
function decadeToWords(decade, qualifier) {
  return lang() === 'de' ? deDecade(decade, qualifier) : enDecade(decade, qualifier);
}

/**
 * Fraction to words in current learn language.
 * @param {number} whole
 * @param {number} num
 * @param {number} den
 * @returns {string}
 */
function fractionToWords(whole, num, den) {
  return lang() === 'de' ? deFraction(whole, num, den) : enFraction(whole, num, den);
}

/**
 * Decimal to words in current learn language.
 * @param {number} n
 * @returns {string}
 */
function decimalToWords(n) {
  return lang() === 'de' ? deDecimal(n) : enDecimal(n);
}

/**
 * Currency to words in current learn language.
 * @param {number} amount
 * @returns {string}
 */
function currencyToWords(amount) {
  return lang() === 'de' ? deCurrency(amount) : enCurrency(amount);
}

/**
 * Percentage to words in current learn language.
 * @param {number} n
 * @returns {string}
 */
function percentageToWords(n) {
  return lang() === 'de' ? dePercentage(n) : enPercentage(n);
}

/**
 * Room/bus to words in current learn language.
 * @param {string} type
 * @param {number} number
 * @returns {string}
 */
function roomBusToWords(type, number) {
  return lang() === 'de' ? deRoomBus(type, number) : enRoomBus(type, number);
}

/**
 * Score to words in current learn language.
 * @param {number} home
 * @param {number} away
 * @returns {string}
 */
function scoreToWords(home, away) {
  return lang() === 'de' ? deScore(home, away) : enScore(home, away);
}

/**
 * Temperature to words in current learn language.
 * @param {number} temp
 * @returns {string}
 */
function temperatureToWords(temp) {
  return lang() === 'de' ? deTemperature(temp) : enTemperature(temp);
}

/**
 * Large number to words in current learn language.
 * @param {number} n
 * @returns {string}
 */
function largeNumberToWords(n) {
  return lang() === 'de' ? deLarge(n) : enLarge(n);
}

// ── Random helpers ─────────────────────────────────────────────────────────

/**
 * Random integer in [min, max] inclusive.
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Pick a random element from an array.
 * @param {Array} arr
 * @returns {*}
 */
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Greatest common divisor.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

// ── Sentence templates per category (language-dependent) ───────────────────

const SENTENCES = {
  en: {
    cardinals: [
      "The answer is {V}.",
      "Please go to room {V}.",
      "There are {V} students in the class.",
      "I need {V} copies of this document.",
      "The bus number is {V}.",
      "She scored {V} points on the test.",
      "We have {V} tickets left.",
      "Turn to page {V} in your textbook.",
      "He ran {V} miles this morning.",
      "Your order number is {V}.",
    ],
    ordinals: [
      "He finished in {V} place.",
      "This is the {V} time I've asked.",
      "She lives on the {V} floor.",
      "It's his {V} birthday today.",
      "We're celebrating our {V} anniversary.",
      "Take the {V} turning on the left.",
      "She came {V} in the race.",
      "This is the {V} edition of the book.",
    ],
    years: [
      "She was born in {V}.",
      "The event took place in {V}.",
      "This building was constructed in {V}.",
      "He graduated in {V}.",
      "The company was founded in {V}.",
      "The album was released in {V}.",
      "That law was passed in {V}.",
      "The discovery was made in {V}.",
      "My parents got married in {V}.",
      "The film came out in {V}.",
    ],
    decades: [
      "That happened in {V}.",
      "The style was popular in {V}.",
      "Music was different in {V}.",
      "They grew up in {V}.",
      "Fashion changed a lot in {V}.",
      "It was a common trend in {V}.",
    ],
    fractions: [
      "Add {V} of a cup of flour.",
      "About {V} of the students passed.",
      "The tank is {V} full.",
      "Mix {V} of the ingredients.",
      "Roughly {V} of the population agreed.",
      "Cut it into pieces and take {V}.",
    ],
    decimals: [
      "The measurement was {V} centimeters.",
      "It weighs {V} kilograms.",
      "The result is {V}.",
      "The reading shows {V}.",
      "The average is {V}.",
      "The pH level is {V}.",
    ],
    currencies: [
      "The total comes to {V}.",
      "That will be {V} please.",
      "Your change is {V}.",
      "The price is {V}.",
      "I paid {V} for it.",
      "It costs {V} per unit.",
    ],
    percentages: [
      "The interest rate is {V}.",
      "About {V} of people agreed.",
      "Sales increased by {V}.",
      "The humidity is {V}.",
      "There's a {V} chance of rain.",
      "The score improved by {V}.",
    ],
    roomBus: [
      "Please go to {V}.",
      "You'll find it in {V}.",
      "Take {V} to the center.",
      "The meeting is in {V}.",
      "You need {V}.",
      "Wait for {V} at the stop.",
    ],
    sports: [
      "The final score was {V}.",
      "At half time it was {V}.",
      "They won {V}.",
      "The score is currently {V}.",
      "They drew {V}.",
      "It finished {V}.",
    ],
    temperatures: [
      "The forecast says {V} tomorrow.",
      "It's {V} outside.",
      "The temperature dropped to {V}.",
      "Expect {V} this afternoon.",
      "The high today is {V}.",
      "Last night it was {V}.",
    ],
    large: [
      "The population is {V}.",
      "The total cost is {V} dollars.",
      "We received {V} applications.",
      "The stadium holds {V} people.",
      "They sold {V} copies in the first week.",
      "There are {V} registered users.",
      "The budget is {V} dollars.",
      "About {V} people attended.",
    ],
  },
  de: {
    cardinals: [
      "Die Antwort ist {V}.",
      "Bitte gehen Sie zu Zimmer {V}.",
      "Es gibt {V} Schüler in der Klasse.",
      "Ich brauche {V} Kopien dieses Dokuments.",
      "Die Busnummer ist {V}.",
      "Sie hat {V} Punkte im Test erreicht.",
      "Wir haben noch {V} Tickets übrig.",
      "Schlagen Sie Seite {V} in Ihrem Buch auf.",
      "Er ist heute Morgen {V} Kilometer gelaufen.",
      "Ihre Bestellnummer ist {V}.",
    ],
    ordinals: [
      "Er wurde {V}.",
      "Das ist das {V} Mal, dass ich frage.",
      "Sie wohnt im {V} Stock.",
      "Heute ist sein {V} Geburtstag.",
      "Wir feiern unseren {V} Jahrestag.",
      "Nehmen Sie die {V} Abzweigung links.",
      "Sie wurde {V} im Rennen.",
      "Das ist die {V} Ausgabe des Buches.",
    ],
    years: [
      "Sie wurde {V} geboren.",
      "Das Ereignis fand {V} statt.",
      "Dieses Gebäude wurde {V} erbaut.",
      "Er hat {V} seinen Abschluss gemacht.",
      "Die Firma wurde {V} gegründet.",
      "Das Album erschien {V}.",
      "Dieses Gesetz wurde {V} verabschiedet.",
      "Die Entdeckung wurde {V} gemacht.",
      "Meine Eltern haben {V} geheiratet.",
      "Der Film kam {V} heraus.",
    ],
    decades: [
      "Das geschah in {V}.",
      "Der Stil war in {V} beliebt.",
      "Musik war in {V} anders.",
      "Sie sind in {V} aufgewachsen.",
      "Die Mode hat sich in {V} stark verändert.",
      "Das war ein verbreiteter Trend in {V}.",
    ],
    fractions: [
      "Geben Sie {V} Tasse Mehl hinzu.",
      "Ungefähr {V} der Schüler haben bestanden.",
      "Der Tank ist {V} voll.",
      "Mischen Sie {V} der Zutaten.",
      "Ungefähr {V} der Bevölkerung stimmte zu.",
      "Schneiden Sie es in Stücke und nehmen Sie {V}.",
    ],
    decimals: [
      "Die Messung ergab {V} Zentimeter.",
      "Es wiegt {V} Kilogramm.",
      "Das Ergebnis ist {V}.",
      "Die Anzeige zeigt {V}.",
      "Der Durchschnitt beträgt {V}.",
      "Der pH-Wert ist {V}.",
    ],
    currencies: [
      "Die Summe beträgt {V}.",
      "Das macht {V} bitte.",
      "Ihr Wechselgeld beträgt {V}.",
      "Der Preis ist {V}.",
      "Ich habe {V} dafür bezahlt.",
      "Es kostet {V} pro Stück.",
    ],
    percentages: [
      "Der Zinssatz beträgt {V}.",
      "Ungefähr {V} der Menschen stimmten zu.",
      "Der Umsatz stieg um {V}.",
      "Die Luftfeuchtigkeit beträgt {V}.",
      "Es gibt eine {V} Regenwahrscheinlichkeit.",
      "Das Ergebnis verbesserte sich um {V}.",
    ],
    roomBus: [
      "Bitte gehen Sie zu {V}.",
      "Sie finden es in {V}.",
      "Nehmen Sie {V} ins Zentrum.",
      "Das Treffen ist in {V}.",
      "Sie brauchen {V}.",
      "Warten Sie auf {V} an der Haltestelle.",
    ],
    sports: [
      "Das Endergebnis war {V}.",
      "Zur Halbzeit stand es {V}.",
      "Sie haben {V} gewonnen.",
      "Der Spielstand ist aktuell {V}.",
      "Sie haben {V} unentschieden gespielt.",
      "Es endete {V}.",
    ],
    temperatures: [
      "Die Vorhersage sagt {V} für morgen.",
      "Draußen sind es {V}.",
      "Die Temperatur fiel auf {V}.",
      "Erwarten Sie {V} heute Nachmittag.",
      "Der Höchstwert heute ist {V}.",
      "Letzte Nacht waren es {V}.",
    ],
    large: [
      "Die Bevölkerung beträgt {V}.",
      "Die Gesamtkosten betragen {V} Euro.",
      "Wir haben {V} Bewerbungen erhalten.",
      "Das Stadion fasst {V} Zuschauer.",
      "Sie verkauften {V} Exemplare in der ersten Woche.",
      "Es gibt {V} registrierte Nutzer.",
      "Das Budget beträgt {V} Euro.",
      "Ungefähr {V} Leute nahmen teil.",
    ],
  },
};

// ── Category: Cardinals ────────────────────────────────────────────────────

/**
 * Generate a cardinal number value (1-100).
 * @returns {import('./types').CategoryValue}
 */
function generateCardinal() {
  const n = randInt(1, 100);
  return {
    value: n,
    display: String(n),
    ttsText: cardinalToWords(n),
    lastDigit: n % 10,
    category: 'cardinals',
  };
}

// ── Category: Ordinals ─────────────────────────────────────────────────────

/**
 * Generate an ordinal value (1st-100th).
 * Display format depends on learning language: "1st" (en) vs "1." (de)
 * @returns {import('./types').CategoryValue}
 */
function generateOrdinal() {
  const n = randInt(1, 100);
  return {
    value: n,
    display: n + ordinalSuffix(n),
    ttsText: ordinalToWords(n),
    lastDigit: n % 10,
    category: 'ordinals',
  };
}

// ── Category: Years ────────────────────────────────────────────────────────

/**
 * Generate a standard year value (1200-2026).
 * @param {number} min
 * @param {number} max
 * @returns {import('./types').CategoryValue}
 */
function generateStandardYear(min, max) {
  const year = randInt(min, max);
  return {
    value: year,
    display: String(year),
    ttsText: yearToWords(year),
    lastDigit: year % 10,
    category: 'years',
  };
}

/**
 * Generate a decade value (the early 90s, etc.).
 * Display depends on learning language.
 * @returns {import('./types').CategoryValue}
 */
function generateDecadeValue() {
  const decade = pick([50, 60, 70, 80, 90]);
  const qualifier = pick(['early', 'mid', 'late']);

  let display;
  if (lang() === 'de') {
    const qualMap = { early: 'frühen', mid: 'mittleren', late: 'späten' };
    const decNames = { 50: 'Fünfziger', 60: 'Sechziger', 70: 'Siebziger', 80: 'Achtziger', 90: 'Neunziger' };
    display = 'die ' + qualMap[qualifier] + ' ' + decNames[decade];
  } else {
    display = 'the ' + qualifier + ' ' + decade + 's';
  }

  return {
    value: { decade, qualifier, isDecade: true },
    display,
    ttsText: decadeToWords(decade, qualifier),
    lastDigit: Math.floor(decade / 10),
    category: 'years',
  };
}

/**
 * Generate a year or decade value with weighted distribution.
 * @returns {import('./types').CategoryValue}
 */
function generateYear() {
  const r = Math.random();
  if (r < 0.10) return generateDecadeValue();
  if (r < 0.73) return generateStandardYear(1900, 2026);
  if (r < 0.91) return generateStandardYear(1800, 1899);
  return generateStandardYear(1200, 1799);
}

// ── Category: Fractions ────────────────────────────────────────────────────

/**
 * Generate a fraction value.
 * @returns {import('./types').CategoryValue}
 */
function generateFraction() {
  const r = Math.random();
  let whole, num, den;

  if (r < 0.35) {
    do {
      den = randInt(2, 10);
      num = randInt(1, den - 1);
    } while (gcd(num, den) !== 1);
    whole = 0;
  } else if (r < 0.70) {
    den = randInt(2, 10);
    num = randInt(1, den - 1);
    whole = 0;
  } else {
    whole = randInt(1, 9);
    den = pick([2, 3, 4, 5, 6, 8, 10]);
    num = randInt(1, den - 1);
  }

  const displayFrac = num + '/' + den;
  const display = whole > 0 ? whole + ' ' + displayFrac : displayFrac;

  return {
    value: { whole, num, den },
    display,
    ttsText: fractionToWords(whole, num, den),
    lastDigit: den % 10,
    category: 'fractions',
  };
}

// ── Category: Decimals ─────────────────────────────────────────────────────

/**
 * Generate a decimal value (0.01-99.99).
 * Display uses comma for German, period for English.
 * @returns {import('./types').CategoryValue}
 */
function generateDecimal() {
  const raw = randInt(1, 9999);
  const n = raw / 100;
  const enDisplay = n.toFixed(2);

  // German uses comma as decimal separator
  const display = lang() === 'de' ? enDisplay.replace('.', ',') : enDisplay;

  const fracStr = enDisplay.split('.')[1];
  const lastDecDigit = parseInt(fracStr[fracStr.length - 1], 10);

  return {
    value: n,
    display,
    ttsText: decimalToWords(n),
    lastDigit: lastDecDigit,
    category: 'decimals',
  };
}

// ── Category: Currencies ───────────────────────────────────────────────────

/**
 * Generate a currency value.
 * English: $0.01-$999.99, German: €0,01-€999,99
 * @returns {import('./types').CategoryValue}
 */
function generateCurrency() {
  const totalCents = randInt(1, 99999);
  const dollars = Math.floor(totalCents / 100);
  const cents = totalCents % 100;
  const amount = dollars + cents / 100;

  let display;
  if (lang() === 'de') {
    display = '€' + amount.toFixed(2).replace('.', ',');
  } else {
    display = '$' + amount.toFixed(2);
  }

  return {
    value: amount,
    display,
    ttsText: currencyToWords(amount),
    lastDigit: cents % 10,
    category: 'currencies',
  };
}

// ── Category: Percentages ──────────────────────────────────────────────────

/**
 * Generate a percentage value (0.01%-100%).
 * @returns {import('./types').CategoryValue}
 */
function generatePercentage() {
  let n;
  if (Math.random() < 0.5) {
    n = randInt(1, 100);
  } else {
    n = randInt(1, 9999) / 100;
  }

  const isWhole = Number.isInteger(n);
  let display;
  if (isWhole) {
    display = n + '%';
  } else {
    const formatted = n.toFixed(2).replace(/0+$/, '').replace(/\.$/, '');
    display = lang() === 'de' ? formatted.replace('.', ',') + '%' : formatted + '%';
  }

  let lastDig;
  if (isWhole) {
    lastDig = n % 10;
  } else {
    const str = n.toFixed(2).replace(/0+$/, '');
    lastDig = parseInt(str[str.length - 1], 10);
  }

  return {
    value: n,
    display,
    ttsText: percentageToWords(n),
    lastDigit: lastDig,
    category: 'percentages',
  };
}

// ── Category: Room/Bus ─────────────────────────────────────────────────────

/**
 * Generate a room/bus number value.
 * Display: "Room"/"Bus" (en) vs "Raum"/"Bus" (de)
 * @returns {import('./types').CategoryValue}
 */
function generateRoomBus() {
  const type = pick(['room', 'bus']);
  const hundreds = randInt(1, 9);
  let number;

  if (Math.random() < 0.7) {
    number = hundreds * 100 + randInt(1, 9);
  } else {
    number = hundreds * 100 + randInt(1, 9) * 10;
  }

  let label;
  if (lang() === 'de') {
    label = type === 'room' ? 'Raum' : 'Bus';
  } else {
    label = type === 'room' ? 'Room' : 'Bus';
  }

  return {
    value: { type, number },
    display: label + ' ' + number,
    ttsText: roomBusToWords(type, number),
    lastDigit: number % 10,
    category: 'roomBus',
  };
}

// ── Category: Sports Scores ────────────────────────────────────────────────

/**
 * Generate a sports score value.
 * @returns {import('./types').CategoryValue}
 */
function generateSportsScore() {
  const home = randInt(0, 7);
  const away = randInt(0, 5);

  return {
    value: { home, away },
    display: home + ':' + away,
    ttsText: scoreToWords(home, away),
    lastDigit: away,
    category: 'sports',
  };
}

// ── Category: Temperatures ─────────────────────────────────────────────────

/**
 * Generate a temperature value (-30 to +45 °C).
 * @returns {import('./types').CategoryValue}
 */
function generateTemperature() {
  const temp = randInt(-30, 45);

  return {
    value: temp,
    display: temp + '°C',
    ttsText: temperatureToWords(temp),
    lastDigit: Math.abs(temp) % 10,
    category: 'temperatures',
  };
}

// ── Category: Large Numbers ────────────────────────────────────────────────

/**
 * Generate a large number value (100-999,999).
 * German uses period as thousands separator.
 * @returns {import('./types').CategoryValue}
 */
function generateLarge() {
  const n = randInt(100, 999999);

  let display;
  if (lang() === 'de') {
    display = n.toLocaleString('de-DE');
  } else {
    display = n.toLocaleString('en-US').replace(/,/g, '\u2009');
  }

  return {
    value: n,
    display,
    ttsText: largeNumberToWords(n),
    lastDigit: n % 10,
    category: 'large',
  };
}

// ── Mixed Mode ─────────────────────────────────────────────────────────────

/** @type {Object<string, number>} Weights summing to 100 */
const MIXED_WEIGHTS = {
  cardinals: 10, ordinals: 10, years: 10, fractions: 10,
  decimals: 9, currencies: 10, percentages: 9, roomBus: 8,
  sports: 8, temperatures: 8, large: 8,
};

/**
 * Select a category based on weighted random.
 * @returns {string}
 */
function weightedRandomCategory() {
  const r = Math.random() * 100;
  let cumulative = 0;
  for (const [cat, weight] of Object.entries(MIXED_WEIGHTS)) {
    cumulative += weight;
    if (r < cumulative) return cat;
  }
  return 'cardinals';
}

/**
 * Generate a mixed-mode value (randomly from any category).
 * @returns {import('./types').CategoryValue}
 */
function generateMixed() {
  const cat = weightedRandomCategory();
  const gen = GENERATORS[cat];
  const result = gen.generate();
  result.mixedCategory = cat;
  result.category = 'mixed';
  return result;
}

// ── Generator registry ─────────────────────────────────────────────────────

/**
 * @type {Object<string, {generate: function, id: string}>}
 */
const GENERATORS = {
  cardinals: { id: 'cardinals', generate: generateCardinal },
  ordinals: { id: 'ordinals', generate: generateOrdinal },
  years: { id: 'years', generate: generateYear },
  fractions: { id: 'fractions', generate: generateFraction },
  decimals: { id: 'decimals', generate: generateDecimal },
  currencies: { id: 'currencies', generate: generateCurrency },
  percentages: { id: 'percentages', generate: generatePercentage },
  roomBus: { id: 'roomBus', generate: generateRoomBus },
  sports: { id: 'sports', generate: generateSportsScore },
  temperatures: { id: 'temperatures', generate: generateTemperature },
  large: { id: 'large', generate: generateLarge },
  mixed: { id: 'mixed', generate: generateMixed },
};

// ── Public API ─────────────────────────────────────────────────────────────

/**
 * Get a category generator by mode ID.
 * @param {string} mode
 * @returns {{generate: function, id: string}}
 */
export function getGenerator(mode) {
  return GENERATORS[mode] || GENERATORS.cardinals;
}

/**
 * Get a sentence template for a CategoryValue.
 * Uses learning language for sentence templates.
 * @param {import('./types').CategoryValue} cv
 * @returns {string}
 */
export function getSentence(cv) {
  const cat = cv.mixedCategory || cv.category;
  let templateCat = cat;

  if (cat === 'years' && cv.value && cv.value.isDecade) {
    templateCat = 'decades';
  }

  const langSentences = SENTENCES[lang()] || SENTENCES.en;
  const templates = langSentences[templateCat] || langSentences.cardinals;
  const template = pick(templates);
  return template.replace('{V}', cv.ttsText);
}

/**
 * List of all available category IDs (for UI).
 * @type {string[]}
 */
export const ALL_CATEGORIES = [
  'cardinals', 'ordinals', 'years', 'fractions', 'decimals',
  'currencies', 'percentages', 'roomBus', 'sports', 'temperatures',
  'large', 'mixed'
];

/**
 * Category groups for the menu UI.
 * @type {Array<{id: string, labelKey: string, categories: string[]}>}
 */
export const CATEGORY_GROUPS = [
  { id: 'basic', labelKey: 'group.basic', categories: ['cardinals', 'ordinals'] },
  { id: 'context', labelKey: 'group.context', categories: ['years', 'fractions', 'decimals', 'percentages', 'large'] },
  { id: 'realworld', labelKey: 'group.realworld', categories: ['currencies', 'roomBus', 'sports', 'temperatures'] },
  { id: 'challenge', labelKey: 'group.challenge', categories: ['mixed'] },
];

/**
 * Category metadata (icon + i18n keys).
 * Label and desc are now fetched via i18n.
 * @type {Object<string, {icon: string, labelKey: string, descKey: string}>}
 */
export const CATEGORY_META = {
  cardinals:    { icon: '🔢', labelKey: 'cat.cardinals.label', descKey: 'cat.cardinals.desc' },
  ordinals:     { icon: '🏅', labelKey: 'cat.ordinals.label', descKey: 'cat.ordinals.desc' },
  years:        { icon: '📅', labelKey: 'cat.years.label', descKey: 'cat.years.desc' },
  fractions:    { icon: '🍕', labelKey: 'cat.fractions.label', descKey: 'cat.fractions.desc' },
  decimals:     { icon: '📐', labelKey: 'cat.decimals.label', descKey: 'cat.decimals.desc' },
  currencies:   { icon: '💵', labelKey: 'cat.currencies.label', descKey: 'cat.currencies.desc' },
  percentages:  { icon: '📊', labelKey: 'cat.percentages.label', descKey: 'cat.percentages.desc' },
  roomBus:      { icon: '🚌', labelKey: 'cat.roomBus.label', descKey: 'cat.roomBus.desc' },
  sports:       { icon: '⚽', labelKey: 'cat.sports.label', descKey: 'cat.sports.desc' },
  temperatures: { icon: '🌡️', labelKey: 'cat.temperatures.label', descKey: 'cat.temperatures.desc' },
  large:        { icon: '💰', labelKey: 'cat.large.label', descKey: 'cat.large.desc' },
  mixed:        { icon: '🎲', labelKey: 'cat.mixed.label', descKey: 'cat.mixed.desc' },
};
