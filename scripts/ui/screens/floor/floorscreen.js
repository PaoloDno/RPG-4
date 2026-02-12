import EventBus from "../../../core/eventbus.js";
import {
  getstate,
  setstate,
} from "../../../game_content/SaveManager/savemange.js";
import ScreenManager from "../../screenmanager.js";
import { TownScreen } from "../town/townscreen.js";
import { canMove, renderTile, renderMapTiles } from "./floorrender.js";

const FloorScreen = {
  enter(payload) {
    console.log("Floor");

    EventBus.on("stateChanged", () => {
      ScreenManager.getInstance().render();
    });

    
    ScreenManager.getInstance().register("Town", TownScreen);

    EventBus.on("Go_to_Town", () => {
      ScreenManager.getInstance().show("Town");
    });
  },

  render(app) {
    const grid = renderMapTiles();

    const state = getstate();
    const { position } = state;
    const { x: px, y: py, floor } = position;

    const container = document.createElement("div");
    container.className = "floor-grid";

    for (const row of grid) {
      const rowDiv = document.createElement("div");
      rowDiv.className = "row";

      for (const tileData of row) {
        const tileEl = renderTile(tileData);

        tileEl.onclick = () => {
          const { x: tx, y: ty, tile } = tileData;
          if (!tile?.passable) return;
          if (!canMove(px, py, tx, ty, tile.passable, tile.kind)) return;

          const state = getstate();

          if (tile.kind === "stairsUp") {
            setstate({
              ...state,
              position: { ...state.position, x: 0, y: 0, floor: floor + 1 },
            });
          } else if (tile.kind === "stairsDown") {
            if (floor === 0) {
              EventBus.emit("Go_to_Town");
              return; // stop further state changes
            }
            setstate({
              ...state,
              position: { ...state.position, x: 0, y: 0, floor: floor - 1 },
            });
          } else if (tile.kind === "floor") {
            setstate({
              ...state,
              position: { ...state.position, x: tx, y: ty },
            });
          } else if (tile.kind === "monster") {
            
          }

          EventBus.emit("stateChanged");
        };

        rowDiv.appendChild(tileEl);
      }

      container.appendChild(rowDiv);
    }

    app.innerHTML = "";
    app.appendChild(container);
  },

  exit() {
    EventBus.off("stateChanged", this._onStateChanged);
    EventBus.off("Go_to_Town", this._onGoToTown);
  },
};

export default FloorScreen;
