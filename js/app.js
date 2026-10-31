import { CHARACTERS, TONES, statusFor } from './data.js';
import { portraitSVG } from './portraits.js';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const LOVE_START = 40;
const GOOD_GAIN = 14;
const BAD_LOSS = 15;

const screens = $$('.screen');
const girlGrid = $('#girl-grid');
const dateScreen = $('#date-screen');
const bellyScreen = $('#belly-screen');
const loveMeter = $('#love-meter');
const loveFill = $('#love-fill');
const loveShine = $('#love-shine');
const loveNumber = $('#love-number');
const loveStatus = $('#love-status');
const loveNote = $('#love-note');
const loveDelta = $('#love-delta');
const meterHeart = $('#meter-heart');
const responses = $('#responses');
const reaction = $('#reaction');
const reactionGlyph = $('#reaction-glyph');
const reactionText = $('#reaction-text');
const reactionEffect = $('#reaction-effect');
const dialogueText = $('#dialogue-text');
const speakerName = $('#speaker-name');
const turnChip = $('#turn-chip');
const dateTurns = $('#date-turns');
const dateProgressFill = $('#date-progress-fill');
const dateHint = $('#date-hint');
const datePortrait = $('#date-portrait');
const bellyChamber = $('#belly-chamber');
const bellyGirl = $('#belly-girl');
const giggleBubble = $('#giggle-bubble');
const bubbleLayer = $('#bubble-layer');
const player = $('#player');
const chamberHearts = $('#chamber-hearts');
const struggleBtn = $('#struggle-btn');
const struggleCountEl = $('#struggle-count');
const acidValueEl = $('#acid-value');
const heartbeat = $('#meter-heart');
const toast = $('#toast');

const state = {
  char: null,
  love: LOVE_START,
  queue: [],
  lastPrompt: -1,
  turn: 0,
  locked: false,
  reactionShown: false,
  ending: false,
  bellyMode: null,
  struggleCount: 0,
  giggleIndex: 0,
  lastStruggle: 0,
  advanceTimer: null,
  acid: 16,
  acidTimer: null,
  timeTimer: null,
  deathStarted: false,
  enteredAt: 0,
  session: 0
};

let timers = new Set();
let toastTimer = null;

function later(fn, ms) {
  const id = window.setTimeout(() => {
    timers.delete(id);
    fn();
  }, ms);
  timers.add(id);
  return id;
}

function clearTimers() {
  for (const id of timers) window.clearTimeout(id);
  timers.clear();
}

function stopAcid() {
  if (state.acidTimer) {
    window.clearInterval(state.acidTimer);
    state.acidTimer = null;
  }
}

function stopInsideTimer() {
  if (state.timeTimer) {
    window.clearInterval(state.timeTimer);
    state.timeTimer = null;
  }
}

function formatElapsed(ms) {
  const seconds = Math.max(0, Math.round(ms / 1000));
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}

function startInsideTimer() {
  stopInsideTimer();
  const timeEl = $('#inside-time');
  timeEl.textContent = '00:00';
  state.timeTimer = window.setInterval(() => {
    if (!state.enteredAt) return;
    timeEl.textContent = formatElapsed(Date.now() - state.enteredAt);
  }, 1000);
}

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2600);
}

function showScreen(id) {
  for (const screen of screens) screen.classList.toggle('is-active', screen.id === id);
  window.scrollTo({ top: 0, behavior: 'auto' });
}

function firstName(char) {
  return char.name.split(' ')[0];
}

/* ------------------------------------------------------------------
   SELECTION
------------------------------------------------------------------- */

function renderSelection() {
  girlGrid.innerHTML = CHARACTERS.map((char, index) => `
    <button
      class="girl-card"
      type="button"
      style="--accent:${char.accent};--accent2:${char.accent2};--i:${index}"
      data-char-id="${char.id}"
      aria-label="Start a date with ${char.name}, ${char.tag}. Danger: ${char.danger}."
    >
      <div class="card-art">${portraitSVG(char, '-card')}</div>
      <div class="card-shade"></div>
      <div class="card-top">
        <span class="card-number">${char.number} / ${char.tag.replace('The ', '')}</span>
        <span class="card-heart" aria-hidden="true">♥</span>
      </div>
      <span class="card-cta" aria-hidden="true">Start date <span>→</span></span>
      <div class="card-info">
        <p class="card-kicker">${char.handle} · danger: ${char.danger}</p>
        <span class="card-name">${char.name}</span>
        <p class="card-tag">${char.tag}</p>
      </div>
    </button>
  `).join('');

  for (const card of $$('.girl-card', girlGrid)) {
    card.addEventListener('click', () => {
      const char = CHARACTERS.find((candidate) => candidate.id === card.dataset.charId);
      if (char) startDate(char);
    });
  }
}

/* ------------------------------------------------------------------
   DATE
------------------------------------------------------------------- */

function startDate(char) {
  clearTimers();
  stopAcid();
  state.session += 1;
  state.char = char;
  state.love = LOVE_START;
  state.queue = shuffle(char.lines.map((_, index) => index));
  state.lastPrompt = -1;
  state.turn = 0;
  state.locked = false;
  state.reactionShown = false;
  state.ending = false;
  state.advanceTimer = null;
  state.bellyMode = null;
  state.deathStarted = false;
  state.struggleCount = 0;
  state.giggleIndex = 0;

  dateScreen.className = 'screen date-screen';
  bellyScreen.className = 'screen belly-screen';
  dateScreen.style.setProperty('--accent', char.accent);
  dateScreen.style.setProperty('--accent2', char.accent2);
  bellyScreen.style.setProperty('--accent', char.accent);
  bellyScreen.style.setProperty('--accent2', char.accent2);

  $('#date-word').textContent = firstName(char).toUpperCase();
  $('#date-number').textContent = `DATE ${char.number}`;
  $('#date-char-no').textContent = char.number;
  $('#date-handle').textContent = char.handle;
  $('#date-name').textContent = char.name;
  $('#date-tag').textContent = char.tag;
  $('#date-danger').textContent = char.danger;
  $('#date-blurb').textContent = char.blurb;
  speakerName.textContent = firstName(char);

  datePortrait.innerHTML = `
    ${portraitSVG(char, '-date')}
    <span class="portrait-label">TONIGHT’S DATE</span>
    <span class="portrait-corner" aria-hidden="true">♥</span>
  `;
  bellyGirl.innerHTML = portraitSVG(char, '-belly');

  const kicker = $('#belly-kicker');
  kicker.innerHTML = `<span class="eyebrow-mark"></span>Inside ${firstName(char)}`;
  $('#belly-girl-label').textContent = `${firstName(char).toUpperCase()} · OUTSIDE`;
  $('#belly-title').textContent = `You’re inside ${firstName(char)}.`;

  updateLove(0, { silent: true });
  showScreen('date-screen');
  renderPrompt();
}

function drawPrompt() {
  const char = state.char;
  if (!state.queue.length) {
    state.queue = shuffle(char.lines.map((_, index) => index));
    if (state.queue.length > 1 && state.queue[0] === state.lastPrompt) {
      state.queue.push(state.queue.shift());
    }
  }
  const index = state.queue.shift();
  state.lastPrompt = index;
  return char.lines[index];
}

function renderPrompt() {
  const char = state.char;
  const prompt = drawPrompt();
  state.turn += 1;
  state.locked = false;
  state.reactionShown = false;

  reaction.hidden = true;
  reaction.className = 'reaction';
  responses.classList.remove('is-locked');
  dialogueText.textContent = prompt.text;
  turnChip.textContent = `TURN ${String(state.turn).padStart(2, '0')}`;
  dateTurns.textContent = `TURN ${String(state.turn).padStart(2, '0')}`;
  dateHint.textContent = 'Choose what to say. There are no takebacks.';

  const options = shuffle(prompt.options);
  responses.innerHTML = '';
  options.forEach((option, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'response-btn';
    button.innerHTML = `
      <span class="key" aria-hidden="true">${index + 1}</span>
      <span class="option-text">${option.text}</span>
      <span class="option-arrow" aria-hidden="true">→</span>
    `;
    button.addEventListener('click', () => chooseOption(button, option));
    responses.appendChild(button);
  });
}

function setLoveStatus() {
  const band = statusFor(state.love);
  loveStatus.textContent = band.label;
  loveNote.textContent = band.note;
  dateScreen.classList.toggle('is-close', state.love >= 86 || state.love <= 14);
  dateScreen.classList.toggle('is-warm', state.love >= 62);
}

function updateLove(delta = 0, options = {}) {
  const rounded = Math.max(0, Math.min(100, state.love));
  const band = statusFor(rounded);
  loveFill.style.width = `${rounded}%`;
  loveShine.style.left = `calc(${Math.max(0, rounded - 12)}% - 24px)`;
  loveMeter.setAttribute('aria-valuenow', String(rounded));
  loveNumber.textContent = `${rounded}%`;
  loveStatus.textContent = band.label;
  loveNote.textContent = band.note;
  dateProgressFill.style.width = `${Math.max(3, rounded)}%`;
  meterHeart.style.transform = `scale(${1 + Math.min(rounded, 100) / 240})`;
  dateScreen.classList.toggle('is-close', rounded >= 86 || rounded <= 14);
  dateScreen.classList.toggle('is-warm', rounded >= 62);

  if (!options.silent) {
    loveDelta.textContent = delta > 0 ? `+${delta}` : `${delta}`;
    loveDelta.classList.remove('show', 'negative');
    if (delta < 0) loveDelta.classList.add('negative');
    if (delta !== 0) {
      void loveDelta.offsetWidth;
      loveDelta.classList.add('show');
    }
    if (delta > 0) {
      meterHeart.style.background = 'var(--acid)';
      later(() => { meterHeart.style.background = ''; }, 480);
    }
    if (delta < 0) {
      meterHeart.style.background = 'var(--danger)';
      later(() => { meterHeart.style.background = ''; }, 480);
    }
  }
}

function floatHearts(x, y, count = 5) {
  for (let i = 0; i < count; i += 1) {
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = Math.random() > 0.35 ? '♥' : '✦';
    heart.style.left = `${x + (Math.random() * 50 - 25)}px`;
    heart.style.top = `${y + (Math.random() * 22 - 11)}px`;
    heart.style.setProperty('--dx', `${Math.random() * 130 - 65}px`);
    heart.style.setProperty('--dy', `${-60 - Math.random() * 120}px`);
    heart.style.setProperty('--rot', `${Math.random() * 80 - 40}deg`);
    heart.style.color = Math.random() > 0.5 ? 'var(--rose)' : 'var(--acid)';
    document.body.appendChild(heart);
    heart.addEventListener('animationend', () => heart.remove(), { once: true });
  }
}

function chooseOption(button, option) {
  if (state.locked || state.ending) return;
  state.locked = true;
  state.reactionShown = true;
  responses.classList.add('is-locked');

  const tone = option.tone;
  const amount = TONES[tone].amount;
  const applied = Math.max(0, Math.min(100, state.love + amount)) - state.love;
  state.love = Math.max(0, Math.min(100, state.love + amount));

  const allButtons = $$('.response-btn', responses);
  for (const item of allButtons) {
    item.disabled = true;
    item.classList.remove('is-good', 'is-bad', 'is-neutral');
  }
  button.classList.add('is-chosen', `is-${tone}`);

  const reactionLine = pick(state.char.reactions[tone]);
  reactionText.textContent = reactionLine;
  reactionGlyph.textContent = tone === 'good' ? '↗' : tone === 'bad' ? '↘' : '—';
  reactionEffect.textContent = tone === 'good'
    ? `+${GOOD_GAIN} love`
    : tone === 'bad'
      ? `−${BAD_LOSS} love`
      : 'no change';
  reaction.className = `reaction ${tone}`;
  reaction.hidden = false;

  if (tone === 'good') {
    const rect = button.getBoundingClientRect();
    floatHearts(rect.left + rect.width * 0.72, rect.top + rect.height * 0.3, 6);
    dateScreen.classList.remove('is-good');
    void dateScreen.offsetWidth;
    dateScreen.classList.add('is-good');
    dateHint.textContent = 'She leans a little closer.';
  } else if (tone === 'bad') {
    dateScreen.classList.remove('is-bad');
    void dateScreen.offsetWidth;
    dateScreen.classList.add('is-bad');
    dateHint.textContent = 'The temperature drops.';
  } else {
    dateHint.textContent = 'She waits for something with more teeth.';
  }

  updateLove(amount);

  const ends = state.love >= 100 || state.love <= 0;
  if (ends) {
    state.ending = true;
    dateHint.textContent = 'She’s not listening anymore.';
    later(() => beginEnding(state.love >= 100 ? 'win' : 'loss'), 1450);
  } else {
    state.advanceTimer = later(() => advancePrompt(), 3000);
  }
}

function advancePrompt() {
  if (state.ending || !state.char || !dateScreen.classList.contains('is-active')) return;
  if (!state.locked) return;
  if (state.advanceTimer) {
    window.clearTimeout(state.advanceTimer);
    timers.delete(state.advanceTimer);
    state.advanceTimer = null;
  }
  renderPrompt();
  const first = $('.response-btn', responses);
  if (first && window.matchMedia('(pointer: fine)').matches) {
    first.focus({ preventScroll: true });
  }
}

function beginEnding(result) {
  if (!state.char) return;
  clearTimers();
  stopAcid();
  const char = state.char;
  const wipe = $('#eat-wipe');
  wipe.dataset.tone = result === 'win' ? 'good' : 'bad';
  $('#wipe-kicker').textContent = result === 'win' ? 'LOVE AT 100%' : 'LOVE AT 0%';
  $('#wipe-text').textContent = result === 'win' ? 'GULP.' : 'TOO LATE.';
  $('#wipe-sub').textContent = result === 'win'
    ? `${firstName(char)} swallows you whole.`
    : `${firstName(char)} doesn’t wait for dessert.`;
  wipe.classList.add('is-active');

  later(() => {
    showBelly(result);
    later(() => wipe.classList.remove('is-active'), 350);
  }, 1100);
}

/* ------------------------------------------------------------------
   BELLY
------------------------------------------------------------------- */

function showBelly(result) {
  const char = state.char;
  state.bellyMode = result;
  state.struggleCount = 0;
  state.giggleIndex = 0;
  state.acid = 16;
  state.deathStarted = false;
  state.enteredAt = Date.now();

  bellyScreen.className = `screen belly-screen is-${result === 'win' ? 'win' : 'loss'}`;
  bellyScreen.style.setProperty('--accent', char.accent);
  bellyScreen.style.setProperty('--accent2', char.accent2);

  $('#belly-kicker').innerHTML = `<span class="eyebrow-mark"></span>Inside ${firstName(char)}`;
  $('#belly-title').textContent = result === 'win'
    ? `You’re inside ${firstName(char)}.`
    : 'The walls are closing in.';
  $('#belly-percent').textContent = result === 'win' ? '100' : '00';
  $('#belly-quote').textContent = result === 'win' ? char.winQuote : char.deathQuote;
  $('#belly-status').textContent = result === 'win' ? 'SAFE HARBOR' : 'DINNER';
  $('#belly-digestion').textContent = result === 'win' ? 'PAUSED' : 'ACTIVE';
  $('#chamber-mode').textContent = result === 'win' ? 'SAFE HARBOR' : 'DIGESTING';
  $('#chamber-temp').textContent = result === 'win' ? 'BODY TEMP · 37.2°C' : 'BODY TEMP · 39.8°C';
  $('#leave-btn').hidden = result !== 'win';
  $('#belly-hint').textContent = result === 'win'
    ? 'You can stay as long as you want. She’s not in a hurry.'
    : 'It’s getting warmer. You can still struggle. It won’t help.';
  $('#belly-density')?.remove();

  struggleCountEl.textContent = '00';
  acidValueEl.textContent = '16%';
  acidValueEl.style.color = '';
  bellyChamber.style.setProperty('--acid-level', '16%');
  player.style.setProperty('--px', '0px');
  player.style.setProperty('--py', '0px');
  player.style.setProperty('--pr', '0deg');
  giggleBubble.hidden = true;
  bubbleLayer.innerHTML = '';
  chamberHearts.innerHTML = '';

  makeAmbientHearts(result === 'win' ? 15 : 7);
  showScreen('belly-screen');
  startInsideTimer();
  struggleBtn.disabled = false;

  if (result === 'loss') {
    later(() => startAcidRise(), 700);
  }
}

function makeAmbientHearts(count) {
  for (let i = 0; i < count; i += 1) {
    const heart = document.createElement('span');
    heart.className = 'ambient-heart';
    heart.textContent = i % 4 === 0 ? '♥' : '·';
    heart.style.left = `${6 + Math.random() * 88}%`;
    heart.style.bottom = `${-4 + Math.random() * 16}%`;
    heart.style.fontSize = `${8 + Math.random() * 11}px`;
    heart.style.animationDelay = `${Math.random() * -7}s`;
    heart.style.animationDuration = `${6 + Math.random() * 6}s`;
    heart.style.opacity = String(0.2 + Math.random() * 0.5);
    chamberHearts.appendChild(heart);
  }
}

function startAcidRise() {
  if (state.bellyMode !== 'loss' || state.deathStarted) return;
  state.acid = 16;
  state.acidTimer = window.setInterval(() => {
    if (state.bellyMode !== 'loss' || state.deathStarted) return;
    state.acid = Math.min(86, state.acid + 0.92);
    const level = Math.round(state.acid);
    bellyChamber.style.setProperty('--acid-level', `${state.acid}%`);
    acidValueEl.textContent = `${String(level).padStart(2, '0')}%`;
    acidValueEl.style.color = level > 62 ? 'var(--danger)' : '';

    if (level >= 82) {
      stopAcid();
      if (!state.deathStarted) {
        state.deathStarted = true;
        $('#belly-title').textContent = 'It’s too warm. Too quiet.';
        $('#belly-hint').textContent = 'The last thing you hear is her humming.';
        later(() => showDeath(), 850);
      }
    } else if (level >= 65) {
      $('#belly-title').textContent = 'The acid reaches your shoulders.';
      $('#chamber-mode').textContent = 'ALMOST GONE';
    } else if (level >= 45) {
      $('#belly-title').textContent = 'Acid climbs your ribs.';
      $('#chamber-mode').textContent = 'DIGESTING';
    } else if (level >= 28) {
      $('#belly-title').textContent = 'The walls are slick and warm.';
    }
  }, 100);
}

function spawnBubbles(count = 5) {
  for (let i = 0; i < count; i += 1) {
    const bubble = document.createElement('span');
    bubble.className = 'bubble';
    const size = 5 + Math.random() * 17;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${12 + Math.random() * 76}%`;
    bubble.style.bottom = `${10 + Math.random() * 35}%`;
    bubble.style.animationDelay = `${Math.random() * 0.3}s`;
    bubble.style.animationDuration = `${1.1 + Math.random() * 0.9}s`;
    bubbleLayer.appendChild(bubble);
    bubble.addEventListener('animationend', () => bubble.remove(), { once: true });
  }
}

function struggle() {
  if (!state.bellyMode || state.deathStarted) return;
  const now = Date.now();
  if (now - state.lastStruggle < 260) return;
  state.lastStruggle = now;

  state.struggleCount += 1;
  struggleCountEl.textContent = String(state.struggleCount).padStart(2, '0');
  const px = `${Math.random() * 74 - 37}px`;
  const py = `${Math.random() * 52 - 26}px`;
  const pr = `${Math.random() * 26 - 13}deg`;
  player.style.setProperty('--px', px);
  player.style.setProperty('--py', py);
  player.style.setProperty('--pr', pr);
  player.classList.remove('struggling');
  void player.offsetWidth;
  player.classList.add('struggling');
  later(() => player.classList.remove('struggling'), 650);

  bellyChamber.classList.remove('is-jiggling');
  void bellyChamber.offsetWidth;
  bellyChamber.classList.add('is-jiggling');
  later(() => bellyChamber.classList.remove('is-jiggling'), 450);

  spawnBubbles(state.bellyMode === 'win' ? 6 : 4);
  giggle();

  if (state.bellyMode === 'win') {
    $('#belly-hint').textContent = state.struggleCount >= 7
      ? 'She’s laughing too hard to let you go now.'
      : 'You move. She notices. Of course she notices.';
  }
}

function giggle() {
  const line = state.char.giggles[state.giggleIndex % state.char.giggles.length];
  state.giggleIndex += 1;
  giggleBubble.textContent = line;
  giggleBubble.hidden = false;
  giggleBubble.style.animation = 'none';
  void giggleBubble.offsetWidth;
  giggleBubble.style.animation = '';

  bellyGirl.classList.remove('is-giggling');
  void bellyGirl.offsetWidth;
  bellyGirl.classList.add('is-giggling');
  later(() => bellyGirl.classList.remove('is-giggling'), 700);
  later(() => { giggleBubble.hidden = true; }, 2600);
}

function leaveBelly() {
  if (state.bellyMode !== 'win' || state.deathStarted) return;
  clearTimers();
  stopAcid();
  stopInsideTimer();
  const elapsed = Math.max(1, Date.now() - state.enteredAt);

  $('#outro-quote').textContent = state.char.leaveQuote;
  $('#outro-girl').textContent = firstName(state.char);
  $('#outro-time').textContent = formatElapsed(elapsed);
  showScreen('outro-screen');
}

/* ------------------------------------------------------------------
   DEATH / RESET
------------------------------------------------------------------- */

function showDeath() {
  if (!state.char) return;
  stopAcid();
  stopInsideTimer();
  clearTimers();
  giggleBubble.hidden = true;
  $('#death-quote').textContent = state.char.deathQuote;
  $('#death-girl').textContent = firstName(state.char);
  showScreen('death-screen');
  later(() => $('#restart-btn').focus({ preventScroll: true }), 120);
}

function resetGame(options = {}) {
  state.session += 1;
  clearTimers();
  stopAcid();
  stopInsideTimer();
  state.char = null;
  state.love = LOVE_START;
  state.queue = [];
  state.lastPrompt = -1;
  state.turn = 0;
  state.locked = false;
  state.reactionShown = false;
  state.ending = false;
  state.bellyMode = null;
  state.struggleCount = 0;
  state.giggleIndex = 0;
  state.lastStruggle = 0;
  state.advanceTimer = null;
  state.acid = 16;
  state.deathStarted = false;
  state.enteredAt = 0;

  $('#eat-wipe').classList.remove('is-active');
  $('#leave-btn').hidden = false;
  $('#giggle-bubble').hidden = true;
  $('#bubble-layer').innerHTML = '';
  $('#chamber-hearts').innerHTML = '';
  player.style.setProperty('--px', '0px');
  player.style.setProperty('--py', '0px');
  player.style.setProperty('--pr', '0deg');
  bellyScreen.className = 'screen belly-screen';
  dateScreen.className = 'screen date-screen';
  showScreen('selection-screen');
  if (options.toast) showToast(options.toast);
}

/* ------------------------------------------------------------------
   EVENTS
------------------------------------------------------------------- */

function bindEvents() {
  $('#quit-date').addEventListener('click', () => {
    const charName = state.char ? firstName(state.char) : '';
    resetGame({ toast: charName ? `You left ${charName} at the table. She noticed.` : '' });
  });

  $('#struggle-btn').addEventListener('click', struggle);
  $('#leave-btn').addEventListener('click', leaveBelly);
  $('#restart-btn').addEventListener('click', () => resetGame({ toast: 'She’s waiting. Try again.' }));
  $('#outro-restart').addEventListener('click', () => {
    if (state.char) startDate(state.char);
    else resetGame();
  });
  $('#outro-back').addEventListener('click', () => resetGame());

  document.addEventListener('keydown', (event) => {
    const active = document.querySelector('.screen.is-active');
    if (!active) return;
    const typing = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName);

    if (active.id === 'date-screen' && !typing) {
      if (event.key >= '1' && event.key <= '4' && !state.locked && !state.ending) {
        const buttons = $$('.response-btn', responses);
        const button = buttons[Number(event.key) - 1];
        if (button) {
          event.preventDefault();
          button.click();
        }
      } else if ((event.key === ' ' || event.key === 'Enter') && state.locked && state.reactionShown && !state.ending) {
        event.preventDefault();
        advancePrompt();
      }
    }

    if (active.id === 'belly-screen' && !typing) {
      if (event.key === 's' || event.key === 'S' || event.key === ' ') {
        event.preventDefault();
        struggle();
      }
      if ((event.key === 'Escape' || event.key === 'l' || event.key === 'L') && state.bellyMode === 'win') {
        event.preventDefault();
        leaveBelly();
      }
    }

    if (active.id === 'death-screen' && (event.key === 'r' || event.key === 'R')) {
      resetGame({ toast: 'She’s waiting. Try again.' });
    }
  });
}

/* ------------------------------------------------------------------
   BOOT
------------------------------------------------------------------- */

renderSelection();
bindEvents();
