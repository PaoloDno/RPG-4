import EventBus from "../../core/eventbus.js";
import { HeroList } from "../../game_content/Entity/heroesList.js";

const heroKeys = Object.keys(HeroList);
let heroCards = heroKeys
  .map((key) => {
    const hero = HeroList[key];
    return `
      <div class="hero-card">
        <input type="checkbox" id="hero-${key}" value="${key}" class="select">
        <label for="hero-${key}">
          <strong>${hero.name}</strong> - ${hero.type} - ${"⭐".repeat(hero.rarity)}
        </label>
      </div>
    `;
  })
  .join("");

const StartScreen = {
  enter(payload) {
    console.log("Entering START GAME");
  },

  render(app) {
    app.innerHTML = `
      <div class="full in-center col">
        <h1>🌟 My RPG Platform 🌟</h1>
        <p>PICK 4 heroes</p>
        <p>Not amounting to above 16 stars</p>
        <div id="hero-selection">${heroCards}</div>
        <button id="create-party-btn">Create Party</button>
      </div>
    `;

    const btn = document.getElementById("create-party-btn");
    btn.addEventListener("click", () => {
      const selected = Array.from(
        document.querySelectorAll("#hero-selection input:checked"),
      ).map((input) => input.value);

      if (selected.length > 4) {
        return alert("You can only pick up to 4 heroes!");
      }

      EventBus.emit("CREATE_PARTY", { heroes: selected });
      console.log("Selected heroes:", selected);
    });
  },
};

export default StartScreen;

// cards
// of heroes with radio button but now radio button but no radio button light it
