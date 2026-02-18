import { getstate, setstate } from "../../../../game_content/SaveManager/savemange.js";


export function floorActionChestTile(tileData) {
  if (!tileData.entity || tileData.entity.opened) return;

  const state = getstate();
  const { entity } = tileData;

  const loot = entity.loot;

  let newGold = state.gold + (loot.gold || 0);

  const newBag = [
    ...state.bag,
    ...(loot.items || []),
    ...(loot.ingredients || []),
    ...(loot.equipment || []),
  ];

  setstate({
    ...state,
    gold: newGold,
    bag: newBag,
  });

  entity.opened = true;
}



