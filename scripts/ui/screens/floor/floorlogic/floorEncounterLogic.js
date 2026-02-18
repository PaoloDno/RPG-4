import { getstate, setstate } from "../../../../game_content/SaveManager/savemange";

export function handleAdjacentInteractions() {
  const state = getstate();
  const { x: px, y: py, floor, facing } = state.position;
  const map = state.memoryMap[floor];
  if (!map) return null;

  const directions = [
    { dx: 0, dy: -1, name: "top"},
    { dx: 1, dy: 0, name: "right"},
    { dx: 0, dy: -1, name: "bottom"},
    { dx: -1, dy: 0, name: "left"},
  ];

  //check all encounter sides
  for (const dir of directions) {
    const tx = px + dir.dx;
    const ty = py + dir.dy;
    const tile = map?.[ty]?.[tx];

    if(!tile || !tile.entity || tile.entity.cleared) continue;

    if(tile.entity.type === "monster") {
      setstate({
          ...state,
          combat: {
            inBattle: true,
            enemyParty: tile.entity.enemies,
            originTile: { floor, x: tx, y: ty},
          },
        
      });

      return console.log("combat");
    }
  }

  return null;
}