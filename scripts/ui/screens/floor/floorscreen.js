import EventBus from "../../../core/eventbus.js";
import {
  getstate,
  setstate,
} from "../../../game_content/SaveManager/savemange.js";
import ScreenManager from "../../screenmanager.js";
import { TownScreen } from "../town/townscreen.js";
import { renderMapTiles } from "./floorlogic/floorInitializer.js";
import { runMonsterTurn } from "./floorlogic/floorMonster.js";
import { renderTile } from "./floorlogic/floorRender.js";
import { canMove } from "./floorlogic/utility.js";


const FloorScreen = {
  enter() {
    console.log("Floor");

    this._onStateChanged = () => {
      ScreenManager.getInstance().render();
    };

    this._onGoToTown = () => {
      ScreenManager.getInstance().show("Town");
    };

    EventBus.on("stateChanged", this._onStateChanged);
    EventBus.on("Go_to_Town", this._onGoToTown);

    ScreenManager.getInstance().register("Town", TownScreen);
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
          this.handleTileClick(tileData, px, py, floor);
        };

        rowDiv.appendChild(tileEl);
      }

      container.appendChild(rowDiv);
    }

    app.innerHTML = "";
    app.appendChild(container);
  },

  handleTileClick(tileData, px, py, floor) {
    const { x: tx, y: ty, tile } = tileData;
    if (!tile) return;


    const state = getstate();

    // 1ENTITY INTERACTION

    if (tile.entity && !tile.entity.cleared) {

      if (tile.entity.type === "monster") {
        console.log("Starting combat");

        setstate({
          ...state,
          combat: {
            inBattle: true,
            enemyParty: tile.entity.enemies,
            originTile: { floor, x: tx, y: ty }
          }
        });

        console.log("state: ", state);

        EventBus.emit("stateChanged");
        return;
      }

      if (tile.entity.type === "chest") {
        console.log("Opening chest");

        tile.entity.cleared = true;
        
        
        setstate({
          ...state,
          gold: state.gold + tile.entity.gold,
        });
        

        EventBus.emit("stateChanged");
        return;
      }
    }

    if (!canMove(px, py, tx, ty, !tile.blocking)) return;

    // =====================
    // BASE TILE LOGIC
    // =====================

    if (tile.base === "stairUp") {
      setstate({
        ...state,
        position: { x: 0, y: 0, floor: floor + 1 },
      });

      EventBus.emit("stateChanged");
      return;
    }

    if (tile.base === "stairDown") {
      if (floor === 0) {
        EventBus.emit("Go_to_Town");
        return;
      }

      setstate({
        ...state,
        position: { x: 0, y: 0, floor: floor - 1 },
      });

      EventBus.emit("stateChanged");
      return;
    }

    // =====================
    // NORMAL MOVEMENT
    // =====================

    if (!tile.blocking) {
      setstate({
        ...state,
        position: { x: tx, y: ty, floor },
      });

      
        runMonsterTurn();

      EventBus.emit("stateChanged");
    }
  },

  exit() {
    EventBus.off("stateChanged", this._onStateChanged);
    EventBus.off("Go_to_Town", this._onGoToTown);
  },
};

export default FloorScreen;
