import { getstate } from "../../../../game_content/SaveManager/savemange.js";

export function renderTile(tileData) {
  const state = getstate();
  const {position} = state;
  const { x: px , y: py} = position;

  const div = document.createElement("div");
  div.className = "tile";

  // Outside map
  if (!tileData.tile) {
    div.classList.add("void"); // instead of null
    return div;
  }

  const { x, y, tile, clarity } = tileData;

  if (x === px && y === py) {
    div.classList.add("player");
    return div;
  }

  // Clarity states
  if (clarity === "hidden") {
    div.classList.add("hidden");
  } else if (clarity === "shadow") {
    div.classList.add("shadow");
  }

  div.classList.add(tile.base);

  // Entity layer
  if (tile.entity && !tile.entity.cleared) {
    div.dataset.entityType = tile.entity.type;

    // Add a child div representing the entity
    const entityDiv = document.createElement("div");
    entityDiv.className = "entity-circle";

    // Optional: different colors per entity type
    if (tile.entity.type === "monster") {
      entityDiv.style.backgroundColor = "red";
    } else if (tile.entity.type === "chest") {
      entityDiv.style.backgroundColor = "gold";
    }

    // Size and shape
    entityDiv.style.width = "80%";
    entityDiv.style.height = "80%";
    entityDiv.style.borderRadius = "50%"; // circle
    entityDiv.style.position = "absolute";
    entityDiv.style.top = "50%";
    entityDiv.style.left = "50%";
    entityDiv.style.transform = "translate(-50%, -50%)"; // center inside tile
    entityDiv.style.pointerEvents = "none"; // don't block clicks

    div.appendChild(entityDiv);

    // Also optional: add class for future CSS animations
    div.classList.add(tile.entity.type);
  }

  return div;
}