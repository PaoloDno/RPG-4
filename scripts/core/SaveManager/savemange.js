import EventBus from "../eventbus.js";
import { defaultPlayerGameState } from "../State/gamestate.js";

const storageKey = "rpg_save";

const listeners = [];

export function subscribe(listener) {
  listeners.push(listener);

  return () => {
    const index = listeners.indexOf(listener);
    if (index !== -1) listeners.splice(index, 1);
  };
};

function notify() {
  listeners.forEach((listener) => listener(gamestate.active));
};

let gamestate = JSON.parse(localStorage.getItem(storageKey)) || {
  active: structuredClone(defaultPlayerGameState),
  slots: [null, null, null]
};

export function getstate() { return gamestate.active};

export function getStateParty () {
  return gamestate?.active?.party;
};

export function getStateWorld() {
  return gamestate?.active?.world;
};

export function setstate(partial) {
  gamestate.active = { ...gamestate.active, ...partial };

  notify();
};

export function save(slot = 1) {
  gamestate.slots[slot-1] = structuredClone(gamestate.active);
  gamestate.active.meta.lastSavedAt = Date.now();
  localStorage.setItem(storageKey, JSON.stringify(gamestate));
  console.log(`saved to slot ${slot}`, gamestate.active);
};


export function load(slot = 1) {
  const data = gamestate.slots[slot - 1];
  if (!data) return null;

  gamestate.active = structuredClone(data);

  localStorage.setItem(storageKey, JSON.stringify(gamestate));

  notify();

  console.log(`Loaded slot ${slot}`, gamestate.active);
};

EventBus.on("SAVE_GAME", ({ slot }) => save(slot));
EventBus.on("LOAD_GAME", ({ slot }) => load(slot));

export function listSlots() {
  return gamestate.slots.map((s, i) => ({ slot: i + 1, data: s }));
};