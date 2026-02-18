import { getstate, setstate } from "../SaveManager/savemange.js";
import { generateEquipment } from "../equipment/generateEquipment.js";

/* GENERIC HELPERS */

function ensureArray(arr) {
  return Array.isArray(arr) ? arr : [];
}

function addStackable(list = [], key, qty = 1) {
  const existing = list.find(i => i.key === key);

  if (existing) {
    return list.map(i =>
      i.key === key ? { ...i, qty: i.qty + qty } : i
    );
  }

  return [...list, { key, qty }];
}

/* CORE STATE WRITER */

function writeState(patch) {
  const state = getstate();
  setstate({ ...state, ...patch });
}

/* GOLD */

export function stateAddGold(amount = 0) {
  const state = getstate();

  writeState({
    gold: (state.gold || 0) + amount,
  });

  return amount;
}

/* INGREDIENTS (STACKABLE) */

export function stateAddIngredient(key, qty = 1) {
  const state = getstate();

  writeState({
    ingredients: addStackable(
      ensureArray(state.ingredients),
      key,
      qty
    ),
  });
}

/* CONSUMABLE ITEMS (STACKABLE) */

export function stateAddItem(key, qty = 1) {
  const state = getstate();

  writeState({
    items: addStackable(
      ensureArray(state.items),
      key,
      qty
    ),
  });
}

/* KEY ITEMS (UNIQUE) */

export function stateAddKeyItem(key) {
  const state = getstate();
  const keyItems = ensureArray(state.keyItems);

  if (keyItems.includes(key)) return null;

  writeState({
    keyItems: [...keyItems, key],
  });

  return key;
}

/* EQUIPMENT (INSTANCE BASED) */

export function stateAddEquipment(templateId) {
  const state = getstate();

  const newEquip = generateEquipment(templateId);

  writeState({
    inventory: [
      ...ensureArray(state.inventory),
      newEquip,
    ],
  });

  return newEquip.instanceId;
}

/* UNIFIED LOOT ENTRY */

export function stateAddLoot(loot = {}) {
  const result = {};

  if (loot.gold) {
    result.gold = stateAddGold(loot.gold);
  }

  if (loot.item) {
    stateAddItem(loot.item.key, loot.item.qty ?? 1);
  }

  if (loot.ingredient) {
    stateAddIngredient(
      loot.ingredient.key,
      loot.ingredient.qty ?? 1
    );
  }

  if (loot.keyItem) {
    result.keyItem = stateAddKeyItem(loot.keyItem);
  }

  if (loot.equipment !== undefined) {
    result.equipmentId = stateAddEquipment(loot.equipment);
  }

  return result;
}
