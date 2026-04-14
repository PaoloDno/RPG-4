import EquipmentList from "../equipment/equipmentList.js";
import { getstate, setstate } from "./../../core/SaveManager/savemange.js"

export function equipItem(charIndex, itemId) {
  const state = getstate();
  console.log("Uid", itemId);
  const item = state.inventory.find(i => i.uId === itemId);
  if (!item) return;
  console.log("item-equip", item);

  const slot = item.slot;
  if (!slot) return;
  console.log("slot-equip", slot);

  const oldChar = state.party[charIndex];
  if (!oldChar) return;
  console.log("oldChar-equip", item);

  // clone character
  const char = {
    ...oldChar,
    equipment: { ...(oldChar.equipment || {}) }
  };
  console.log("oldChar-equip", item);

  // clone inventory
  const newInventory = state.inventory.map(i => ({ ...i }));
  console.log("new-inventory-equip", newInventory);

  // unequip current
  const current = char.equipment[slot];
  if (current) {
    const invItem = newInventory.find(i => i.uId === current.uId);
    if (invItem) invItem.equipped = false;
  }
  console.log("current-equip", current);

  // equip new
  const newItem = newInventory.find(i => i.uId === itemId);
  if (!newItem) return;
  console.log("newItem-equip", newItem);

  char.equipment[slot] = { uId: newItem.uId };
  newItem.equipped = true;
  
  console.log("change-equip-char", char);
  console.log("change-equip", newItem);

  // clone party
  const newParty = [...state.party];
  newParty[charIndex] = char;
  console.log("new Party", newParty);

  setstate({
    ...state,
    party: newParty,
    inventory: newInventory,
  });

  let stateChanged = getstate();
  console.log("changed-state",stateChanged);
}

export function unequipItem(charIndex, slot) {
  const state = getstate();
  const char = state.party[charIndex];

  if (!char || !char.equipment?.[slot]) return;

  const equippedItem = char.equipment[slot];

  // update inventory
  const invItem = state.inventory.find(i => i.uId === equippedItem.uId);
  if (invItem) invItem.equipped = false;

  // remove from character
  char.equipment[slot] = null;

  setstate({
    ...state,
    party: [...state.party],
    inventory: [...state.inventory],
  });
}

export function toggleEquip(charIndex, itemId) {
  const state = getstate();
  const item = state.inventory.find(i => i.uId === itemId);
  if (!item) return;

  const slot = item.slot;
  const char = state.party[charIndex];

  if (!slot || !char) return;

  const isEquipped = char.equipment?.[slot]?.uId === itemId;

  if (isEquipped) {
    unequipItem(charIndex, slot);
  } else {
    equipItem(charIndex, itemId);
  }
}

export function getItem(state, itemId) {
  return state.inventory.find(i => i.uId === itemId) || null;
}

export function getEquippedItem(state, char, slot) {
  const itemRef = char.equipment?.[slot];
  if (!itemRef) return null;

  return getItem(state, itemRef.uId);
}

export function getAllEquipped(state, char) {
  const result = {};

  for (const slot in char.equipment) {
    result[slot] = getEquippedItem(state, char, slot);
  }

  return result;
}