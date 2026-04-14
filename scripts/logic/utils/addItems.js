import { getstate, setstate } from "../../core/SaveManager/savemange.js";
import { showNotification } from "../../ui/notifications/notificationModal.js";
import { generateEquipment } from "../equipment/generateEquipment.js";
import { itemList } from "../item/consumableItems.js";
import { ingredientList } from "../item/ingredientsItemsList.js";
import keyItemList from "../item/keyItemList.js";

/* GENERIC HELPERS */

function findByKey(list, key) {
  return list.find((i) => i.key === key);
}

function ensureArray(arr) {
  return Array.isArray(arr) ? arr : [];
}

function addStackable(list = [], key, qty = 1) {
  const existing = list.find((i) => i.key === key);

  if (existing) {
    return list.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i));
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
    ingredients: addStackable(ensureArray(state.ingredients), key, qty),
  });

  return findByKey(ingredientList, key);
}

/* CONSUMABLE ITEMS (STACKABLE) */

export function stateAddItem(key, qty = 1) {
  const state = getstate();

  writeState({
    items: addStackable(ensureArray(state.items), key, qty),
  });

  const item = findByKey(itemList, key);
  return item ? { ...item, qty } : null;
}

/* KEY ITEMS (UNIQUE) */

export function stateAddKeyItem(key) {
  const state = getstate();
  const keyItems = ensureArray(state.keyItems);

  if (keyItems.includes(key)) return null;

  writeState({
    keyItems: [...keyItems, key],
  });

  return findByKey(keyItemList, key);
}

/* EQUIPMENT (INSTANCE BASED) */

export async function stateAddEquipment(templateId, level = 1) {
  const state = getstate();

  const newEquip = generateEquipment(templateId, level);

  writeState({
    inventory: [...ensureArray(state.inventory), newEquip],
  });
  console.log("GOLD", newEquip);
      await showNotification({
        objectImage: newEquip.sprite,
        speaker: "system",
        text: `Earned ${newEquip.name} - level ${newEquip.level}`,
        header: "Added to Inventory"
      }).promise;

  return newEquip;
}

/* UNIFIED LOOT ENTRY */

export async function stateAddLoot(loot = {}) {
  const result = {};
  const qty = loot.qty ?? 1;

  if (loot.gold) {
    result.gold = stateAddGold(loot.gold);
    console.log("GOLD", result.gold);
    await showNotification({ text: `Earned` }).promise;
  }

  switch (loot.type) {
    case "consumable":
      result.item = stateAddItem(loot.key, qty);
      console.log(result.item);
      await showNotification({ text: `Earned` }).promise;
      break;

    case "ingredient":
      result.ingredient = stateAddIngredient(loot.key, qty);
      console.log(result.ingredient);
      await showNotification({ text: `Earned` }).promise;
      break;

    case "keyItem":
      result.keyItem = stateAddKeyItem(loot.key);
      console.log(result.keyItem);
      await showNotification({ text: `Earned` }).promise;
      break;

    case "equipment":
      result.equipment = stateAddEquipment(loot.templateId, loot.level);
      console.log("GOLD", result.equipment);
      await showNotification({ text: `Earned` }).promise;
      break;
  }

  return result;
}
