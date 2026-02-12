
const CombatScreen = {
  enter(payload) {
    console.log("COMBAT!");
  },

  render(app) {
    app.innerHTML = `
      <div class="full in-center col>
      <h1> Combat </h1>
        <div class="combat-panel>
          <div class="party-panel">
        
          </div>

          <div class="opponent-panel">

          </div>
          <div class="turn-panel">
          
          </div>
        </div>
      </div>
    `;
  }
}