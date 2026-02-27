import EventBus from "../../core/eventbus.js";

const TitleScreen = {
  enter(payload) {
    console.log("Entering Title Screen");
  },

  render(app) {
    app.innerHTML = `
      <div class="full in-center col">
      <h1>!!!Dungeon Crawler!!!</h1>
      <button id="start-btn">Start Game</button>
      <button id="load-btn">Load Game</button>
      </div>
    `;

    document.getElementById("start-btn").addEventListener("click", () => {
      // Emit an event when the player clicks "Start"
      EventBus.emit("GAME_START");
    });
  }
};

export default TitleScreen;

// Listen to EventBus
