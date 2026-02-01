import EventBus from "../../core/eventbus.js";

const TitleScreen = {
  enter(payload) {
    console.log("Entering Title Screen");
  },

  render(app) {
    app.innerHTML = `
      <h1">🌟 My RPG Platform 🌟</h1>
      <button id="start-btn">Start Game</button>
    `;

    document.getElementById("start-btn").addEventListener("click", () => {
      // Emit an event when the player clicks "Start"
      EventBus.emit("GAME_START");
    });
  }
};

export default TitleScreen;