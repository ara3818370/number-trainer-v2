// confuser.js — Confuser generation v2
// New algorithm: category-specific confusers with last-digit constraint
// At least 2 of 4 options (target + 3 confusers) must share the same last digit

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

// ── Display equality check ─────────────────────────────────────────────────

/**
 * Check if two CategoryValues have the same display string.
 * @param {object} a
 * @param {object} b
 * @returns {boolean}
 */
function sameDisplay(a, b) {
  return a.display === b.display;
}

/**
 * Check if candidate display is unique among existing values.
 * @param {object} candidate
 * @param {object[]} existing
 * @returns {boolean}
 */
function isUnique(candidate, existing) {
  return !existing.some(e => e.display === candidate.display);
}

// ── Cardinal confusers ─────────────────────────────────────────────────────

/**
 * Generate confuser candidates for cardinal numbers.
 * @param {object} target
 * @returns {object[]}
 */
function cardinalConfusers(target) {
  const n = target.value;
  const candidates = [];

  /**
   * Build a cardinal CategoryValue from a number.
   * @param {number} v
   * @returns {object}
   */
  const build = (v) => ({
    value: v,
    display: String(v),
    ttsText: cardinalToWords(v),
    lastDigit: v % 10,
    category: 'cardinals',
  });

  // Teen/ty swap
  const lastTwo = n % 100;
  if (lastTwo >= 13 && lastTwo <= 19) {
    candidates.push(build((lastTwo % 10) * 10));
  }
  if (lastTwo >= 20 && lastTwo <= 90 && lastTwo % 10 === 0) {
    candidates.push(build((lastTwo / 10) + 10));
  }

  // 8/9 swap
  const digits = String(n).split('');
  for (let i = 0; i < digits.length; i++) {
    if (digits[i] === '8') { const c = [...digits]; c[i] = '9'; candidates.push(build(Number(c.join('')))); }
    if (digits[i] === '9') { const c = [...digits]; c[i] = '8'; candidates.push(build(Number(c.join('')))); }
  }

  // Small deltas: ±1, ±2, ±10
  for (const d of [-1, 1, -2, 2, -10, 10]) {
    const v = n + d;
    if (v >= 1 && v <= 200) candidates.push(build(v));
  }

  return candidates.filter(c => c.value !== n && c.value > 0);
}

// ── Ordinal confusers ──────────────────────────────────────────────────────

/**
 * Generate confuser candidates for ordinal numbers.
 * @param {object} target
 * @returns {object[]}
 */
function ordinalConfusers(target) {
  const n = target.value;
  const candidates = [];

  const build = (v) => ({
    value: v,
    display: v + ordinalSuffix(v),
    ttsText: ordinalToWords(v),
    lastDigit: v % 10,
    category: 'ordinals',
  });

  // Teen/ty swap: 13th <-> 30th
  if (n >= 13 && n <= 19) candidates.push(build((n % 10) * 10));
  if (n >= 20 && n <= 90 && n % 10 === 0) candidates.push(build((n / 10) + 10));

  // Adjacent: ±1, ±2
  for (const d of [-1, 1, -2, 2, -10, 10]) {
    const v = n + d;
    if (v >= 1 && v <= 100) candidates.push(build(v));
  }

  // Phonetic pairs: 5th/6th, 8th/18th
  if (n === 5) candidates.push(build(6));
  if (n === 6) candidates.push(build(5));
  if (n === 8) candidates.push(build(18));
  if (n === 18) candidates.push(build(8));

  return candidates.filter(c => c.value !== n && c.value >= 1);
}

// ── Year confusers ─────────────────────────────────────────────────────────

/**
 * Generate confuser candidates for years/decades.
 * @param {object} target
 * @returns {object[]}
 */
function yearConfusers(target) {
  const candidates = [];

  // Decade confusers
  if (target.value && target.value.isDecade) {
    const { decade, qualifier } = target.value;
    const qualifiers = ['early', 'mid', 'late'];
    const decades = [50, 60, 70, 80, 90];

    // Same decade, different qualifier
    for (const q of qualifiers) {
      if (q !== qualifier) {
        candidates.push({
          value: { decade, qualifier: q, isDecade: true },
          display: 'the ' + q + ' ' + decade + 's',
          ttsText: decadeToWords(decade, q),
          lastDigit: Math.floor(decade / 10),
          category: 'years',
        });
      }
    }

    // Adjacent decades, same qualifier
    for (const d of decades) {
      if (d !== decade) {
        candidates.push({
          value: { decade: d, qualifier, isDecade: true },
          display: 'the ' + qualifier + ' ' + d + 's',
          ttsText: decadeToWords(d, qualifier),
          lastDigit: Math.floor(d / 10),
          category: 'years',
        });
      }
    }

    return candidates;
  }

  // Standard year confusers
  const year = target.value;
  const build = (y) => ({
    value: y,
    display: String(y),
    ttsText: yearToWords(y),
    lastDigit: y % 10,
    category: 'years',
  });

  // ±1, ±10, ±100
  for (const d of [1, -1, 10, -10, 100, -100]) {
    const y = year + d;
    if (y >= 1100 && y <= 2100) candidates.push(build(y));
  }

  // Teen/ty swap in last two digits
  const lo = year % 100;
  const base = year - lo;
  if (lo >= 13 && lo <= 19) {
    const swapped = base + (lo % 10) * 10;
    if (swapped >= 1100 && swapped <= 2100) candidates.push(build(swapped));
  }
  if (lo >= 20 && lo <= 90 && lo % 10 === 0) {
    const swapped = base + (lo / 10) + 10;
    if (swapped >= 1100 && swapped <= 2100) candidates.push(build(swapped));
  }

  return candidates.filter(c => c.display !== target.display);
}

// ── Fraction confusers ─────────────────────────────────────────────────────

/**
 * Generate confuser candidates for fractions.
 * @param {object} target
 * @returns {object[]}
 */
function fractionConfusers(target) {
  const { whole, num, den } = target.value;
  const candidates = [];

  const build = (w, n, d) => {
    const displayFrac = n + '/' + d;
    const display = w > 0 ? w + ' ' + displayFrac : displayFrac;
    return {
      value: { whole: w, num: n, den: d },
      display,
      ttsText: fractionToWords(w, n, d),
      lastDigit: d % 10,
      category: 'fractions',
    };
  };

  // Same denominator, different numerator
  for (let nn = 1; nn < den; nn++) {
    if (nn !== num) candidates.push(build(whole, nn, den));
  }

  // Same numerator, different denominator
  for (const dd of [2, 3, 4, 5, 6, 8, 10]) {
    if (dd !== den && num < dd) candidates.push(build(whole, num, dd));
  }

  // Mixed <-> simple
  if (whole > 0) {
    candidates.push(build(0, num, den));
    candidates.push(build(whole + 1, num, den));
    candidates.push(build(whole - 1 > 0 ? whole - 1 : 0, num, den));
  } else {
    candidates.push(build(1, num, den));
  }

  // Half/quarter confusion
  if (den === 2) candidates.push(build(whole, 1, 4));
  if (den === 4 && num === 1) candidates.push(build(whole, 1, 2));

  return candidates.filter(c => c.display !== target.display && c.value.num >= 1 && c.value.num < c.value.den);
}

// ── Decimal confusers ──────────────────────────────────────────────────────

/**
 * Generate confuser candidates for decimals.
 * @param {object} target
 * @returns {object[]}
 */
function decimalConfusers(target) {
  const n = target.value;
  const candidates = [];

  const build = (v) => {
    const display = v.toFixed(2);
    const fracStr = display.split('.')[1];
    return {
      value: v,
      display,
      ttsText: decimalToWords(v),
      lastDigit: parseInt(fracStr[fracStr.length - 1], 10),
      category: 'decimals',
    };
  };

  // Swap digits after decimal: 1.36 <-> 1.63
  const str = n.toFixed(2);
  const parts = str.split('.');
  const intPart = parseInt(parts[0], 10);
  const d1 = parts[1][0];
  const d2 = parts[1][1];
  if (d1 !== d2) {
    candidates.push(build(parseFloat(intPart + '.' + d2 + d1)));
  }

  // Change whole part ±1
  for (const delta of [1, -1]) {
    const v = n + delta;
    if (v >= 0.01 && v <= 99.99) candidates.push(build(Math.round(v * 100) / 100));
  }

  // Zero confusion: 0.02 <-> 0.20
  if (d1 === '0' && d2 !== '0') {
    candidates.push(build(parseFloat(intPart + '.' + d2 + '0')));
  }
  if (d2 === '0' && d1 !== '0') {
    candidates.push(build(parseFloat(intPart + '.0' + d1)));
  }

  // Magnitude shift: 1.36 <-> 13.6
  const shifted = n * 10;
  if (shifted <= 99.99) candidates.push(build(Math.round(shifted * 100) / 100));
  const shiftedDown = n / 10;
  if (shiftedDown >= 0.01) candidates.push(build(Math.round(shiftedDown * 100) / 100));

  return candidates.filter(c => c.display !== target.display && c.value > 0);
}

// ── Currency confusers ─────────────────────────────────────────────────────

/**
 * Generate confuser candidates for currencies.
 * @param {object} target
 * @returns {object[]}
 */
function currencyConfusers(target) {
  const amount = target.value;
  const totalCents = Math.round(amount * 100);
  const dollars = Math.floor(totalCents / 100);
  const cents = totalCents % 100;
  const candidates = [];

  const build = (v) => {
    const tc = Math.round(v * 100);
    return {
      value: v,
      display: '$' + v.toFixed(2),
      ttsText: currencyToWords(v),
      lastDigit: tc % 10,
      category: 'currencies',
    };
  };

  // Swap dollar/cent: $5.35 <-> $35.05
  if (cents > 0 && cents <= 999) {
    const swapped = cents + dollars / 100;
    if (swapped >= 0.01 && swapped <= 999.99) candidates.push(build(Math.round(swapped * 100) / 100));
  }

  // Adjacent dollar amounts
  for (const d of [1, -1, 0.10, -0.10]) {
    const v = amount + d;
    if (v >= 0.01 && v <= 999.99) candidates.push(build(Math.round(v * 100) / 100));
  }

  // Magnitude: $5.35 <-> $53.50
  const mag = amount * 10;
  if (mag <= 999.99) candidates.push(build(Math.round(mag * 100) / 100));
  const magDown = amount / 10;
  if (magDown >= 0.01) candidates.push(build(Math.round(magDown * 100) / 100));

  // Zero confusion: $5.00 <-> $50.00
  if (cents === 0 && dollars > 0) {
    candidates.push(build(dollars * 10));
    if (dollars >= 10) candidates.push(build(dollars / 10));
  }

  return candidates.filter(c => c.display !== target.display && c.value > 0);
}

// ── Percentage confusers ───────────────────────────────────────────────────

/**
 * Generate confuser candidates for percentages.
 * @param {object} target
 * @returns {object[]}
 */
function percentageConfusers(target) {
  const n = target.value;
  const candidates = [];

  const build = (v) => {
    const isWhole = Number.isInteger(v);
    const display = isWhole ? v + '%' : v.toFixed(2).replace(/0+$/, '').replace(/\.$/, '') + '%';
    let lastDig;
    if (isWhole) {
      lastDig = v % 10;
    } else {
      const str = v.toFixed(2).replace(/0+$/, '');
      lastDig = parseInt(str[str.length - 1], 10);
    }
    return {
      value: v,
      display,
      ttsText: percentageToWords(v),
      lastDigit: lastDig,
      category: 'percentages',
    };
  };

  // Digit swap for decimals
  if (!Number.isInteger(n)) {
    const str = n.toFixed(2);
    const parts = str.split('.');
    const d1 = parts[1][0];
    const d2 = parts[1][1];
    if (d1 !== d2) {
      candidates.push(build(parseFloat(parts[0] + '.' + d2 + d1)));
    }
  }

  // Whole vs decimal: 8% <-> 0.8% <-> 80%
  if (Number.isInteger(n)) {
    if (n <= 99) candidates.push(build(n / 10));
    if (n <= 10) candidates.push(build(n * 10));
  } else {
    candidates.push(build(Math.round(n)));
    candidates.push(build(n * 10 <= 100 ? n * 10 : n / 10));
  }

  // Adjacent
  for (const d of [1, -1, 5, -5]) {
    const v = n + d;
    if (v > 0 && v <= 100) candidates.push(build(Math.round(v * 100) / 100));
  }

  return candidates.filter(c => c.display !== target.display && c.value > 0);
}

// ── Room/Bus confusers ─────────────────────────────────────────────────────

/**
 * Generate confuser candidates for room/bus numbers.
 * @param {object} target
 * @returns {object[]}
 */
function roomBusConfusers(target) {
  const { type, number } = target.value;
  const candidates = [];
  const label = type === 'room' ? 'Room' : 'Bus';

  const build = (num) => ({
    value: { type, number: num },
    display: label + ' ' + num,
    ttsText: roomBusToWords(type, num),
    lastDigit: num % 10,
    category: 'roomBus',
  });

  const h = Math.floor(number / 100);
  const remainder = number % 100;
  const t = Math.floor(remainder / 10);
  const u = remainder % 10;

  // Zero position swap: Room 101 <-> Room 110
  if (t === 0 && u > 0) candidates.push(build(h * 100 + u * 10));
  if (u === 0 && t > 0) candidates.push(build(h * 100 + t));

  // Adjacent
  for (const d of [1, -1]) {
    const v = number + d;
    if (v >= 100 && v <= 999) candidates.push(build(v));
  }

  // Digit swap: Room 305 <-> Room 503
  if (h !== u) candidates.push(build(u * 100 + t * 10 + h));
  // Room 305 <-> Room 350
  if (t !== u) candidates.push(build(h * 100 + u * 10 + t));

  // Different hundreds
  for (const d of [100, -100]) {
    const v = number + d;
    if (v >= 100 && v <= 999) candidates.push(build(v));
  }

  return candidates.filter(c => c.display !== target.display && c.value.number >= 100);
}

// ── Sports confusers ───────────────────────────────────────────────────────

/**
 * Generate confuser candidates for sports scores.
 * @param {object} target
 * @returns {object[]}
 */
function sportsConfusers(target) {
  const { home, away } = target.value;
  const candidates = [];

  const build = (h, a) => ({
    value: { home: h, away: a },
    display: h + ':' + a,
    ttsText: scoreToWords(h, a),
    lastDigit: a,
    category: 'sports',
  });

  // Swap sides: 5:0 <-> 0:5
  if (home !== away) candidates.push(build(away, home));

  // Adjacent scores
  for (const d of [1, -1]) {
    const h = home + d;
    const a = away + d;
    if (h >= 0 && h <= 7) candidates.push(build(h, away));
    if (a >= 0 && a <= 5) candidates.push(build(home, a));
  }

  // Same total but different distribution
  candidates.push(build(home + 1, away > 0 ? away - 1 : away));
  candidates.push(build(home > 0 ? home - 1 : home, away + 1));

  // Common scores to ensure enough candidates for edge cases (e.g. 0:0)
  const commonScores = [[1,0],[0,1],[1,1],[2,0],[0,2],[2,1],[1,2],[3,0],[0,3],[2,2],[3,1]];
  for (const [h, a] of commonScores) {
    candidates.push(build(h, a));
  }

  return candidates.filter(c =>
    c.display !== target.display &&
    c.value.home >= 0 && c.value.home <= 7 &&
    c.value.away >= 0 && c.value.away <= 5
  );
}

// ── Temperature confusers ──────────────────────────────────────────────────

/**
 * Generate confuser candidates for temperatures.
 * @param {object} target
 * @returns {object[]}
 */
function temperatureConfusers(target) {
  const temp = target.value;
  const candidates = [];

  const build = (t) => ({
    value: t,
    display: t + '°C',
    ttsText: temperatureToWords(t),
    lastDigit: Math.abs(t) % 10,
    category: 'temperatures',
  });

  // Sign flip: -10 <-> +10
  candidates.push(build(-temp));

  // Adjacent
  for (const d of [1, -1, 5, -5, 10, -10]) {
    const v = temp + d;
    if (v >= -30 && v <= 45) candidates.push(build(v));
  }

  // Teen/ty swap
  const absTemp = Math.abs(temp);
  const sign = temp < 0 ? -1 : 1;
  if (absTemp >= 13 && absTemp <= 19) {
    const swapped = (absTemp % 10) * 10 * sign;
    if (swapped >= -30 && swapped <= 45) candidates.push(build(swapped));
  }
  if (absTemp >= 20 && absTemp <= 50 && absTemp % 10 === 0) {
    const swapped = ((absTemp / 10) + 10) * sign;
    if (swapped >= -30 && swapped <= 45) candidates.push(build(swapped));
  }

  return candidates.filter(c => c.display !== target.display && c.value >= -30 && c.value <= 45);
}

// ── Large number confusers ─────────────────────────────────────────────────

/**
 * Generate confuser candidates for large numbers.
 * @param {object} target
 * @returns {object[]}
 */
function largeConfusers(target) {
  const n = target.value;
  const candidates = [];

  const build = (v) => ({
    value: v,
    display: v.toLocaleString('en-US').replace(/,/g, '\u2009'),
    ttsText: largeNumberToWords(v),
    lastDigit: v % 10,
    category: 'large',
  });

  // Magnitude shift
  candidates.push(build(n * 10));
  if (n >= 10) candidates.push(build(Math.floor(n / 10)));

  // ±100, ±1000, ±10000
  for (const d of [100, -100, 1000, -1000, 10000, -10000]) {
    const v = n + d;
    if (v >= 100 && v <= 9999999) candidates.push(build(v));
  }

  // Teen/ty in last two digits
  const lo = n % 100;
  const base = n - lo;
  if (lo >= 13 && lo <= 19) {
    candidates.push(build(base + (lo % 10) * 10));
  }
  if (lo >= 20 && lo <= 90 && lo % 10 === 0) {
    candidates.push(build(base + (lo / 10) + 10));
  }

  return candidates.filter(c => c.display !== target.display && c.value >= 100 && c.value <= 9999999);
}

// ── Confuser strategy router ───────────────────────────────────────────────

/**
 * Map of category to confuser function.
 * @type {Object<string, function>}
 */
const CONFUSER_FN = {
  cardinals: cardinalConfusers,
  ordinals: ordinalConfusers,
  years: yearConfusers,
  fractions: fractionConfusers,
  decimals: decimalConfusers,
  currencies: currencyConfusers,
  percentages: percentageConfusers,
  roomBus: roomBusConfusers,
  sports: sportsConfusers,
  temperatures: temperatureConfusers,
  large: largeConfusers,
};

// ── Last-digit constraint enforcement ──────────────────────────────────────

/**
 * Enforce at least 2 of 4 options share the target's last digit.
 * If not met naturally, modify the last confuser.
 * @param {object} target
 * @param {object[]} confusers
 * @param {function} confuserFn - The category confuser generator
 * @returns {object[]}
 */
function enforceLastDigitConstraint(target, confusers, confuserFn) {
  const all = [target, ...confusers];
  const targetLD = target.lastDigit;
  const sameLD = all.filter(o => o.lastDigit === targetLD).length;

  if (sameLD >= 2) return confusers;

  // Need at least one more with matching last digit
  // Try all candidates from confuser function
  const allCandidates = confuserFn(target);
  const matchingLD = allCandidates.filter(c =>
    c.lastDigit === targetLD && isUnique(c, all)
  );

  if (matchingLD.length > 0) {
    // Replace the last confuser
    confusers[confusers.length - 1] = matchingLD[0];
  }

  return confusers;
}

// ── Main public API ────────────────────────────────────────────────────────

/**
 * Generate exactly 3 confusers for a given target CategoryValue.
 * Applies category-specific generation + last-digit constraint.
 * @param {object} target - The target CategoryValue
 * @returns {object[]} Array of exactly 3 CategoryValue confusers
 */
export function generateConfusers(target) {
  const cat = target.mixedCategory || target.category;
  const confuserFn = CONFUSER_FN[cat] || cardinalConfusers;
  const allCandidates = confuserFn(target);

  // Deduplicate by display string and exclude target
  const seen = new Set([target.display]);
  const unique = [];
  for (const c of allCandidates) {
    if (!seen.has(c.display)) {
      seen.add(c.display);
      unique.push(c);
    }
  }

  // Take top 3
  const result = unique.slice(0, 3);

  // Fallback: if we have fewer than 3, generate generic nearby values
  while (result.length < 3) {
    const fallback = generateFallback(target, [...result, target]);
    if (fallback && !seen.has(fallback.display)) {
      seen.add(fallback.display);
      result.push(fallback);
    } else {
      // Emergency fallback: just create a dummy value
      const emergency = createEmergencyFallback(target, seen);
      if (emergency) {
        seen.add(emergency.display);
        result.push(emergency);
      } else {
        break;
      }
    }
  }

  // Enforce last-digit constraint
  if (result.length === 3) {
    return enforceLastDigitConstraint(target, result, confuserFn);
  }

  return result;
}

/**
 * Generate a generic fallback confuser for any category.
 * @param {object} target
 * @param {object[]} existing
 * @returns {object|null}
 */
function generateFallback(target, existing) {
  const cat = target.mixedCategory || target.category;

  // For numeric categories, try simple deltas
  if (typeof target.value === 'number') {
    for (const d of [1, -1, 2, -2, 5, -5, 10, -10]) {
      const v = target.value + d;
      if (cat !== 'temperatures' && v <= 0) continue;
      let candidate;

      switch (cat) {
        case 'cardinals':
          candidate = { value: v, display: String(v), ttsText: cardinalToWords(v), lastDigit: v % 10, category: cat };
          break;
        case 'temperatures':
          if (v < -30 || v > 45) continue;
          candidate = { value: v, display: v + '°C', ttsText: temperatureToWords(v), lastDigit: Math.abs(v) % 10, category: cat };
          break;
        case 'large':
          candidate = { value: v, display: v.toLocaleString('en-US').replace(/,/g, '\u2009'), ttsText: largeNumberToWords(v), lastDigit: v % 10, category: cat };
          break;
        case 'decimals': {
          if (v <= 0 || v > 99.99) continue;
          const display = v.toFixed(2);
          const fracStr = display.split('.')[1];
          candidate = { value: v, display, ttsText: decimalToWords(v), lastDigit: parseInt(fracStr[fracStr.length - 1], 10), category: cat };
          break;
        }
        default:
          continue;
      }

      if (candidate && isUnique(candidate, existing)) return candidate;
    }
  }

  return null;
}

/**
 * Create an emergency fallback (last resort).
 * Category-aware: generates values matching the target's category type.
 * @param {object} target
 * @param {Set<string>} seenDisplays
 * @returns {object|null}
 */
function createEmergencyFallback(target, seenDisplays) {
  const cat = target.mixedCategory || target.category;

  for (let attempts = 0; attempts < 20; attempts++) {
    let candidate = null;

    switch (cat) {
      case 'sports': {
        const h = randInt(0, 7);
        const a = randInt(0, 5);
        const display = h + ':' + a;
        if (!seenDisplays.has(display)) {
          candidate = { value: { home: h, away: a }, display, ttsText: scoreToWords(h, a), lastDigit: a, category: 'sports' };
        }
        break;
      }
      case 'temperatures': {
        const t = randInt(-30, 45);
        const display = t + '°C';
        if (!seenDisplays.has(display)) {
          candidate = { value: t, display, ttsText: temperatureToWords(t), lastDigit: Math.abs(t) % 10, category: 'temperatures' };
        }
        break;
      }
      case 'fractions': {
        const dens = [2, 3, 4, 5, 6, 8, 10];
        const d = pick(dens);
        const n = randInt(1, d - 1);
        const displayFrac = n + '/' + d;
        if (!seenDisplays.has(displayFrac)) {
          candidate = { value: { whole: 0, num: n, den: d }, display: displayFrac, ttsText: fractionToWords(0, n, d), lastDigit: d % 10, category: 'fractions' };
        }
        break;
      }
      case 'currencies': {
        const v = randInt(1, 99900) / 100;
        const display = '$' + v.toFixed(2);
        if (!seenDisplays.has(display)) {
          const tc = Math.round(v * 100);
          candidate = { value: v, display, ttsText: currencyToWords(v), lastDigit: tc % 10, category: 'currencies' };
        }
        break;
      }
      case 'percentages': {
        const v = randInt(1, 100);
        const display = v + '%';
        if (!seenDisplays.has(display)) {
          candidate = { value: v, display, ttsText: percentageToWords(v), lastDigit: v % 10, category: 'percentages' };
        }
        break;
      }
      case 'roomBus': {
        const type = target.value && target.value.type ? target.value.type : 'room';
        const num = randInt(100, 999);
        const label = type === 'room' ? 'Room' : 'Bus';
        const display = label + ' ' + num;
        if (!seenDisplays.has(display)) {
          candidate = { value: { type, number: num }, display, ttsText: roomBusToWords(type, num), lastDigit: num % 10, category: 'roomBus' };
        }
        break;
      }
      case 'ordinals': {
        const v = randInt(1, 100);
        const display = v + ordinalSuffix(v);
        if (!seenDisplays.has(display)) {
          candidate = { value: v, display, ttsText: ordinalToWords(v), lastDigit: v % 10, category: 'ordinals' };
        }
        break;
      }
      case 'years': {
        const y = randInt(1200, 2026);
        const display = String(y);
        if (!seenDisplays.has(display)) {
          candidate = { value: y, display, ttsText: yearToWords(y), lastDigit: y % 10, category: 'years' };
        }
        break;
      }
      case 'decimals': {
        const v = randInt(1, 9999) / 100;
        const display = v.toFixed(2);
        if (!seenDisplays.has(display)) {
          const fracStr = display.split('.')[1];
          candidate = { value: v, display, ttsText: decimalToWords(v), lastDigit: parseInt(fracStr[fracStr.length - 1], 10), category: 'decimals' };
        }
        break;
      }
      default: {
        // Cardinals, large, and any unknown category — generate cardinal numbers
        const v = randInt(1, 100);
        const display = String(v);
        if (!seenDisplays.has(display)) {
          candidate = { value: v, display, ttsText: cardinalToWords(v), lastDigit: v % 10, category: cat };
        }
        break;
      }
    }

    if (candidate && !seenDisplays.has(candidate.display) && candidate.display !== target.display) {
      return candidate;
    }
  }
  return null;
}
