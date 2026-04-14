import EventBus from "../../core/eventbus.js";
import { listSlots } from "../../core/SaveManager/savemange.js";

const LoadScreen = {
  enter() {
    console.log("Entering Loading Screen");
  },

  render(app) {
    app.innerHTML = "";

    const screenWrapper = document.createElement("div");
    screenWrapper.className = "load-screen-wrapper";

    const slots = listSlots();

    //* log */

    console.log("SLOTS", slots);

    slots.forEach(({ slot, data }) => {
      const row = document.createElement("div");
      row.className = "load-slot";

      const label = document.createElement("span");
      label.textContent = data
        ? `Slot ${slot} - Saved`
        : `Slot ${slot} - Empty`;

      const loadBtn = document.createElement("button");
      loadBtn.textContent = "Load";

      loadBtn.onclick = () => {
        if (!data) {
          alert("Empty slot!");
          return;
        }
        EventBus.emit("LOAD_GAME", { slot });
      };

      row.appendChild(label);
      row.appendChild(loadBtn);
      screenWrapper.appendChild(row);
    });

    app.appendChild(screenWrapper);
  }
};

export default LoadScreen;