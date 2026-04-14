
import EventBus from "../../core/eventbus.js";
import { HeroList } from "../../game_content/Entity/heroesList.js";
import { getstate, getStateParty, setstate } from "../../core/SaveManager/savemange.js";
import InstantializeCharacter from "../../logic/characters/InstantializeCharacter.js";
import ScreenManager from "../screenmanager.js";
import { Chapter0 } from "../../game_content/Stories/chapter0.js";
import DialougeScreen from "./dialoguescreen.js";
import { showNotification } from "../notifications/notificationModal.js";
import { CharacterList } from "../../logic/characters/characterList.js";
import { InitializeheroPartyBaseAttributes, InitializeHeroPartyEquipsAttributes } from "../../logic/characters/InitializeHeroParty.js";

const app = document.getElementById("game-view");
const screens = new ScreenManager(app);
/* =========================
   HELPERS
========================= */

screens.register("scene_0", DialougeScreen(Chapter0));

// Calculate total stars of selected heroes
function calculateStars(heroKeys) {
  return heroKeys.reduce((sum, key) => sum + CharacterList[key].rarity, 0);
}

// Render hero cards HTML from an array of keys
function renderHeroCards(keys) {
  return keys
    .map((key) => {
      const hero = CharacterList[key];
      return `
        <label class="hero-card">
          <input type="checkbox" id="hero-${key}" value="${key}" />

          <div class="hero-display-box">
            <img src="${hero.chibisprite}" alt="${hero.name}" class="flex full in-center"/>
          </div>

          <div class="flex col w-full in-center">
            <p><strong>${hero.name} - ${hero.type}</strong></p>
            <span>${"⭐".repeat(hero.rarity)}</span>
          </div>
        </label>
      `;
    })
    .join("");
}

// Render selected heroes panel
function renderSelectedHeroes(keys) {
  return keys
    .map((key) => {
      const hero = CharacterList[key];
      return `
        <div class="hero-card-small">
          <div class="hero-display-box-small">
            <img src="${hero.chibisprite}" alt="${hero.name}" class="flex full in-center"/>
          </div>
          <p><strong>${hero.name}</strong></p>
          <span>${"⭐".repeat(hero.rarity)}</span>
        </div>
      `;
    })
    .join("");
}

// Reorder DOM cards: enabled cards first, then disabled, then by rarity
function reorderCards(container) {
  const cards = Array.from(container.children);

  cards.sort((a, b) => {
    const aDisabled = a.querySelector("input").disabled;
    const bDisabled = b.querySelector("input").disabled;

    if (aDisabled !== bDisabled) return aDisabled - bDisabled;

    const aKey = a.querySelector("input").value;
    const bKey = b.querySelector("input").value;

    return CharacterList[aKey].rarity - CharacterList[bKey].rarity;
  });

  cards.forEach((card) => container.appendChild(card));
}

/* =========================
   START SCREEN
========================= */

const StartScreen = {
  selectedHeroes: [],

  enter() {
    this.selectedHeroes = [];
    console.log("Entering START GAME");
  },

  render(app) {
    app.innerHTML = "";
    
    const allHeroKeys = Object.keys(CharacterList);

    // initial render
    app.innerHTML = `
      <div class="start-screen-wrapper">
        <h3 class="text-center">By playful fate this heroes meet and form a party to climb the tower together</h3>
        <p>PICK 4 heroes Total stars must not exceed</p>
        <p id="star-counter">16 Stars: 0 / 16</p>
        <div class="start-screen-main-panel">
          <div class="start-screen-main-panel-1">
            <div id="selected-hero-display" class="flex gap"></div>

            <div class="start-screen-buttons-panel">
              <button id="create-party-btn">Create Party</button>
              <button id="deselect-party-btn">Deselect All</button>
            </div>
          </div>
          <div class="start-screen-main-panel-2">  
            <div id="hero-selection">
              ${renderHeroCards(allHeroKeys)}
            </div>
          </div>
        </div>
      </div>
    `;

    const container = document.getElementById("hero-selection");
    const selectedDisplay = document.getElementById("selected-hero-display");
    const starCounter = document.getElementById("star-counter");
    const checkboxes = Array.from(container.querySelectorAll("input"));

    // Update UI based on selections and star rules
    const updateUI = () => {
      const stars = calculateStars(this.selectedHeroes);
      starCounter.textContent = `Stars: ${stars} / 16`;
      selectedDisplay.innerHTML = renderSelectedHeroes(this.selectedHeroes);

      checkboxes.forEach((box) => {
        const hero = CharacterList[box.value];
        const isChecked = box.checked;

        if (!isChecked) {
          // Disable if selection exceeds slots or stars
          box.disabled =
            this.selectedHeroes.length >= 4 || stars + hero.rarity > 16;
        } else {
          box.disabled = false;
        }
      });

      reorderCards(container);
    };

    // Listen to checkbox changes
    checkboxes.forEach((box) => {
      box.addEventListener("change", () => {
        const key = box.value;
        if (box.checked) this.selectedHeroes.push(key);
        else this.selectedHeroes = this.selectedHeroes.filter((k) => k !== key);

        updateUI();
      });
    });

    // Create party button
    document
      .getElementById("create-party-btn")
      .addEventListener("click", async () => {
        if (this.selectedHeroes.length === 0) {
          alert("Pick at least one hero!");
          return;
        }
        const initalizedCharacters = await InitializeheroPartyBaseAttributes([...this.selectedHeroes]);
        setstate({ party: initalizedCharacters });
        console.log("init", initalizedCharacters);
        const initalizedCharactersEquipments = await InitializeHeroPartyEquipsAttributes(initalizedCharacters);
        console.log("initalizedCharactersEquipments", initalizedCharactersEquipments);
        const logg = getstate();
        console.log("gamestat:", logg);

        //EventBus.emit("CREATE_PARTY", { heroes: this.selectedHeroes });
        console.log("Selected heroes:", this.selectedHeroes);
        screens.show("scene_0");
      });

    // Deselect all button
    document
      .getElementById("deselect-party-btn")
      .addEventListener("click", () => {
        this.selectedHeroes = [];
        checkboxes.forEach((box) => (box.checked = false));
        updateUI();
      });
  },
};

export default StartScreen;
