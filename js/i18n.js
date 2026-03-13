// i18n.js — Lightweight internationalization framework
// Phase 2b: English + German (Ukrainian in Phase 2c)

// ── Translation dictionary ─────────────────────────────────────────────────

/**
 * All UI strings keyed by dotted path, with 'en' and 'de' translations.
 * @type {Object<string, {en: string, de: string}>}
 */
const TRANSLATIONS = {
  // ── Onboarding ──────────────────────────────────────────────────────────
  'onboarding.title':    { en: 'Number Trainer', de: 'Zahlentrainer' },
  'onboarding.subtitle': { en: 'Learn to recognize numbers by ear', de: 'Lerne Zahlen nach Gehör zu erkennen' },
  'onboarding.step1':    { en: 'Listen to a sentence', de: 'Höre einen Satz' },
  'onboarding.step2':    { en: 'Choose the number you heard', de: 'Wähle die Zahl, die du gehört hast' },
  'onboarding.step3':    { en: 'Get feedback and keep training', de: 'Erhalte Feedback und trainiere weiter' },
  'onboarding.start':    { en: 'Start', de: 'Starten' },

  // ── Menu ────────────────────────────────────────────────────────────────
  'menu.title':          { en: 'Choose a category', de: 'Wähle eine Kategorie' },

  // ── Category group labels ───────────────────────────────────────────────
  'group.basic':         { en: 'Basic', de: 'Grundlagen' },
  'group.context':       { en: 'Numbers in context', de: 'Zahlen im Kontext' },
  'group.realworld':     { en: 'Real-world', de: 'Alltag' },
  'group.challenge':     { en: 'Challenge', de: 'Herausforderung' },

  // ── Category names ──────────────────────────────────────────────────────
  'cat.cardinals.label':    { en: 'Cardinals', de: 'Grundzahlen' },
  'cat.cardinals.desc':     { en: '1 – 100', de: '1 – 100' },
  'cat.ordinals.label':     { en: 'Ordinals', de: 'Ordnungszahlen' },
  'cat.ordinals.desc':      { en: '1st – 100th', de: '1. – 100.' },
  'cat.years.label':        { en: 'Years', de: 'Jahre' },
  'cat.years.desc':         { en: '1200 – 2026', de: '1200 – 2026' },
  'cat.fractions.label':    { en: 'Fractions', de: 'Brüche' },
  'cat.fractions.desc':     { en: '1/2, 3/4, 2 1/3', de: '1/2, 3/4, 2 1/3' },
  'cat.decimals.label':     { en: 'Decimals', de: 'Dezimalzahlen' },
  'cat.decimals.desc':      { en: '0.01 – 99.99', de: '0,01 – 99,99' },
  'cat.currencies.label':   { en: 'Currencies', de: 'Währungen' },
  'cat.currencies.desc':    { en: '$0.01 – $999.99', de: '€0,01 – €999,99' },
  'cat.percentages.label':  { en: 'Percentages', de: 'Prozent' },
  'cat.percentages.desc':   { en: '0.01% – 100%', de: '0,01% – 100%' },
  'cat.roomBus.label':      { en: 'Room / Bus', de: 'Raum / Bus' },
  'cat.roomBus.desc':       { en: 'Room 101, Bus 305', de: 'Raum 101, Bus 305' },
  'cat.sports.label':       { en: 'Sports', de: 'Sport' },
  'cat.sports.desc':        { en: '5:0, 2:1', de: '5:0, 2:1' },
  'cat.temperatures.label': { en: 'Temperatures', de: 'Temperaturen' },
  'cat.temperatures.desc':  { en: '-30°C – 45°C', de: '-30°C – 45°C' },
  'cat.large.label':        { en: 'Large Numbers', de: 'Große Zahlen' },
  'cat.large.desc':         { en: '100 – 999,999', de: '100 – 999.999' },
  'cat.mixed.label':        { en: 'Mixed', de: 'Gemischt' },
  'cat.mixed.desc':         { en: 'all together', de: 'alles zusammen' },

  // ── Speed controls ──────────────────────────────────────────────────────
  'speed.label':   { en: 'Speed:', de: 'Tempo:' },
  'speed.slow':    { en: 'Slow', de: 'Langsam' },
  'speed.normal':  { en: 'Normal', de: 'Normal' },
  'speed.fast':    { en: 'Fast', de: 'Schnell' },

  // ── Session length ──────────────────────────────────────────────────────
  'session.length.label': { en: 'Questions:', de: 'Fragen:' },

  // ── Training screen ─────────────────────────────────────────────────────
  'training.replay': { en: '🔊 Replay', de: '🔊 Wiederholen' },
  'training.skip':   { en: 'Skip', de: 'Überspringen' },
  'training.next':   { en: 'Next', de: 'Weiter' },
  'training.end':    { en: 'End', de: 'Beenden' },

  // ── Summary screen ──────────────────────────────────────────────────────
  'summary.title':   { en: 'Result', de: 'Ergebnis' },
  'summary.correct': { en: 'Correct:', de: 'Richtig:' },
  'summary.mode':    { en: 'Mode:', de: 'Modus:' },
  'summary.new':     { en: 'New session', de: 'Neue Sitzung' },
  'summary.home':    { en: 'Home', de: 'Startseite' },
  'summary.again':   { en: '🔄 Again:', de: '🔄 Nochmal:' },

  // ── Error screen ────────────────────────────────────────────────────────
  'error.title':   { en: 'Speech problem', de: 'Sprachproblem' },
  'error.message': { en: 'Your browser does not support speech synthesis. We recommend Safari on iPhone or Chrome on Android.', de: 'Ihr Browser unterstützt keine Sprachsynthese. Wir empfehlen Safari auf dem iPhone oder Chrome auf Android.' },
  'error.retry':   { en: 'Try again', de: 'Erneut versuchen' },

  // ── Theme toast ─────────────────────────────────────────────────────────
  'theme.auto':  { en: 'Theme: auto', de: 'Thema: automatisch' },
  'theme.light': { en: 'Theme: light', de: 'Thema: hell' },
  'theme.dark':  { en: 'Theme: dark', de: 'Thema: dunkel' },

  // ── Toasts / feedback ───────────────────────────────────────────────────
  'toast.offline':     { en: 'Internet connection needed for speech. Check your connection and try again.', de: 'Internetverbindung für Sprache erforderlich. Prüfe die Verbindung und versuche es erneut.' },
  'toast.tts_failed':  { en: 'Speech failed. Try again.', de: 'Sprachausgabe fehlgeschlagen. Versuche es erneut.' },
  'toast.no_voice_en': { en: 'No English voice found on your device. Check language settings or install an English voice pack.', de: 'Keine englische Stimme auf dem Gerät gefunden. Spracheinstellungen prüfen oder englisches Sprachpaket installieren.' },
  'toast.no_voice_de': { en: 'No German voice found on your device. Check language settings or install a German voice pack.', de: 'Keine deutsche Stimme auf dem Gerät gefunden. Spracheinstellungen prüfen oder deutsches Sprachpaket installieren.' },
  'toast.tts_still_unavailable': { en: 'Speech is still unavailable. Reload the page or check your device language settings.', de: 'Sprachausgabe ist weiterhin nicht verfügbar. Seite neu laden oder Spracheinstellungen prüfen.' },

  // ── Language switchers ──────────────────────────────────────────────────
  'lang.ui_label':    { en: 'Interface:', de: 'Oberfläche:' },
  'lang.learn_label': { en: 'Learning:', de: 'Lernsprache:' },
};

// ── State ──────────────────────────────────────────────────────────────────

let currentUILang = 'en';
let currentLearnLang = 'en';

// ── localStorage keys (raw, no prefix — these are their own namespace) ────

const UI_LANG_KEY = 'nlt-ui-lang';
const LEARN_LANG_KEY = 'nlt-learn-lang';

// ── Initialization ─────────────────────────────────────────────────────────

/**
 * Initialize i18n: load saved languages or auto-detect.
 */
export function initI18n() {
  // UI language
  const savedUI = localStorage.getItem(UI_LANG_KEY);
  if (savedUI && (savedUI === 'en' || savedUI === 'de')) {
    currentUILang = savedUI;
  } else {
    currentUILang = detectBrowserLanguage();
  }

  // Learning language
  const savedLearn = localStorage.getItem(LEARN_LANG_KEY);
  if (savedLearn && (savedLearn === 'en' || savedLearn === 'de')) {
    currentLearnLang = savedLearn;
  } else {
    currentLearnLang = 'en';
  }
}

/**
 * Detect browser language and map to supported UI language.
 * @returns {'en'|'de'}
 */
function detectBrowserLanguage() {
  const lang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
  if (lang.startsWith('de')) return 'de';
  return 'en';
}

// ── Translation function ───────────────────────────────────────────────────

/**
 * Get a translated string for the current UI language.
 * @param {string} key - Dotted translation key (e.g. 'menu.title')
 * @param {string} [lang] - Override language (defaults to current UI lang)
 * @returns {string} Translated string, or the key itself if not found
 */
export function t(key, lang) {
  const useLang = lang || currentUILang;
  const entry = TRANSLATIONS[key];
  if (!entry) return key;
  return entry[useLang] || entry['en'] || key;
}

// ── Language getters/setters ───────────────────────────────────────────────

/**
 * Get the current UI language.
 * @returns {'en'|'de'}
 */
export function getUILang() {
  return currentUILang;
}

/**
 * Set the UI language and persist to localStorage.
 * @param {'en'|'de'} lang
 */
export function setUILang(lang) {
  if (lang !== 'en' && lang !== 'de') return;
  currentUILang = lang;
  localStorage.setItem(UI_LANG_KEY, lang);
  applyTranslations();
}

/**
 * Get the current learning language.
 * @returns {'en'|'de'}
 */
export function getLearnLang() {
  return currentLearnLang;
}

/**
 * Set the learning language and persist to localStorage.
 * @param {'en'|'de'} lang
 */
export function setLearnLang(lang) {
  if (lang !== 'en' && lang !== 'de') return;
  currentLearnLang = lang;
  localStorage.setItem(LEARN_LANG_KEY, lang);
}

// ── DOM translation application ────────────────────────────────────────────

/**
 * Apply translations to all elements with data-i18n attributes.
 * Also updates the html lang attribute.
 */
export function applyTranslations() {
  document.documentElement.lang = currentUILang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translated = t(key);
    if (translated !== key) {
      el.textContent = translated;
    }
  });
}

/**
 * Get category label for a given category ID (translated).
 * @param {string} catId
 * @returns {string}
 */
export function getCategoryLabel(catId) {
  return t('cat.' + catId + '.label');
}

/**
 * Get category description for a given category ID (translated).
 * @param {string} catId
 * @returns {string}
 */
export function getCategoryDesc(catId) {
  return t('cat.' + catId + '.desc');
}

/**
 * Get group label for a given group ID (translated).
 * @param {string} groupId
 * @returns {string}
 */
export function getGroupLabel(groupId) {
  return t('group.' + groupId);
}
