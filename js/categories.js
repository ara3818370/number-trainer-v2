// categories.js — All 12 category generators implementing CategoryValue interface
// Each generator returns { value, display, ttsText, lastDigit }
// Phase 2a: English-only (ttsText is a string, not {en,de,uk} object)

import {
  cardinalToWords, ordinalToWords, ordinalSuffix, yearToWords,
  decadeToWords, fractionToWords, decimalToWords, currencyToWords,
  percentageToWords, roomBusToWords, scoreToWords, temperatureToWords,
  largeNumberToWords
} from './numbers-en.js';

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

// ── Sentence templates per category ────────────────────────────────────────

const SENTENCES = {
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
 * @returns {import('./types').CategoryValue}
 */
function generateDecadeValue() {
  const decade = pick([50, 60, 70, 80, 90]);
  const qualifier = pick(['early', 'mid', 'late']);
  return {
    value: { decade, qualifier, isDecade: true },
    display: 'the ' + qualifier + ' ' + decade + 's',
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
    // Simple irreducible fraction
    do {
      den = randInt(2, 10);
      num = randInt(1, den - 1);
    } while (gcd(num, den) !== 1);
    whole = 0;
  } else if (r < 0.70) {
    // Any simple fraction
    den = randInt(2, 10);
    num = randInt(1, den - 1);
    whole = 0;
  } else {
    // Mixed fraction
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
 * @returns {import('./types').CategoryValue}
 */
function generateDecimal() {
  const raw = randInt(1, 9999);
  const n = raw / 100;
  const display = n.toFixed(2);
  const fracStr = display.split('.')[1];
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
 * Generate a currency value ($0.01-$999.99).
 * @returns {import('./types').CategoryValue}
 */
function generateCurrency() {
  const totalCents = randInt(1, 99999);
  const dollars = Math.floor(totalCents / 100);
  const cents = totalCents % 100;
  const amount = dollars + cents / 100;

  return {
    value: amount,
    display: '$' + amount.toFixed(2),
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
    // Whole percentage
    n = randInt(1, 100);
  } else {
    // Decimal percentage
    n = randInt(1, 9999) / 100;
  }

  const isWhole = Number.isInteger(n);
  const display = isWhole ? n + '%' : n.toFixed(2).replace(/0+$/, '').replace(/\.$/, '') + '%';

  // Last digit
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
 * Generate a room/bus number value (3-digit with internal zeros).
 * @returns {import('./types').CategoryValue}
 */
function generateRoomBus() {
  const type = pick(['room', 'bus']);
  const hundreds = randInt(1, 9);
  let number;

  if (Math.random() < 0.7) {
    // X0Y pattern
    number = hundreds * 100 + randInt(1, 9);
  } else {
    // XY0 pattern
    number = hundreds * 100 + randInt(1, 9) * 10;
  }

  const label = type === 'room' ? 'Room' : 'Bus';

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
 * @returns {import('./types').CategoryValue}
 */
function generateLarge() {
  const n = randInt(100, 999999);
  // Format with thin spaces
  const display = n.toLocaleString('en-US').replace(/,/g, '\u2009');

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
 * @param {import('./types').CategoryValue} cv
 * @returns {string}
 */
export function getSentence(cv) {
  const cat = cv.mixedCategory || cv.category;
  let templateCat = cat;

  // Decades use their own templates
  if (cat === 'years' && cv.value && cv.value.isDecade) {
    templateCat = 'decades';
  }

  const templates = SENTENCES[templateCat] || SENTENCES.cardinals;
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
 * @type {Array<{label: string, categories: string[]}>}
 */
export const CATEGORY_GROUPS = [
  { id: 'basic', label: 'Базові', categories: ['cardinals', 'ordinals'] },
  { id: 'context', label: 'Числа в контексті', categories: ['years', 'fractions', 'decimals', 'percentages', 'large'] },
  { id: 'realworld', label: 'Реальний світ', categories: ['currencies', 'roomBus', 'sports', 'temperatures'] },
  { id: 'challenge', label: 'Виклик', categories: ['mixed'] },
];

/**
 * Category metadata (icon, label, description).
 * @type {Object<string, {icon: string, label: string, desc: string}>}
 */
export const CATEGORY_META = {
  cardinals:    { icon: '🔢', label: 'Прості числа', desc: '1 – 100' },
  ordinals:     { icon: '🏅', label: 'Порядкові', desc: '1st – 100th' },
  years:        { icon: '📅', label: 'Роки', desc: '1200 – 2026' },
  fractions:    { icon: '🍕', label: 'Дроби', desc: '1/2, 3/4, 2 1/3' },
  decimals:     { icon: '📐', label: 'Десяткові', desc: '0.01 – 99.99' },
  currencies:   { icon: '💵', label: 'Валюти', desc: '$0.01 – $999.99' },
  percentages:  { icon: '📊', label: 'Відсотки', desc: '0.01% – 100%' },
  roomBus:      { icon: '🚌', label: 'Кімнати / Автобуси', desc: 'Room 101, Bus 305' },
  sports:       { icon: '⚽', label: 'Рахунки', desc: '5:0, 2:1' },
  temperatures: { icon: '🌡️', label: 'Температури', desc: '-30°C – 45°C' },
  large:        { icon: '💰', label: 'Великі числа', desc: '100 – 999 999' },
  mixed:        { icon: '🎲', label: 'Змішаний', desc: 'все разом' },
};
