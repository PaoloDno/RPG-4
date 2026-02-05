import { getStateParty  } from "../../game_content/SaveManager/savemange.js";
import { PORTRAIT_DIALOUGE } from "../../game_content/Stories/portraitdialouge.js";

export default function DialougeScreen(script) {
  return {
    currentIndex: 0,
    script,

    enter() {
      this.currentIndex = 0;
      this.showCurrent();
    },

    showCurrent() {
      if (this.currentIndex >= this.script.length) {
        console.log("Dialouge finished");
        return;
      }
      const entry = this.script[this.currentIndex];

      if (entry.system) {
        this.renderSystem(entry.text, entry.bakcground, entry.callback);
        return;
      }

      if (entry.partyResponseStage) {
        this.renderPartyResponse(entry);
      }

      this.renderDialogue(entry);
    },

    next() {
      this.currentIndex++;
      this.showCurrent();
    },

    renderDialogue(entry) {
      const app = document.getElementById("app");

      const leftImg = entry.leftChar
        ? PORTRAIT_DIALOUGE[entry.leftChar]?.default
        : "";
      const rightImg = entry.rightChar
        ? PORTRAIT_DIALOUGE[entry.rightChar]?.default
        : "";

      app.innerHTML = `
        <div class="dialogue-container" style="background-image: url('${entry.background || ""}')">
          <div class="character left">
            ${leftImg ? `<img src="${leftImg}" alt="${entry.speakerName || ""}">` : ""}
          </div>
          <div class="dialogue-box">
            <p class="speaker">${entry.speakerName || "System"}</p>
            <p class="text">${entry.text}</p>
            <button id="next-btn">Next</button>
          </div>
          <div class="character right">
            ${rightImg ? `<img src="${rightImg}" alt="${entry.rightChar || ""}">` : ""}
          </div>
        </div>
      `;

      document.getElementById("next-btn").onclick = () => this.next();
    },

    renderSystem(text, background, callback) {
      const app = document.getElementById("app");

      app.innerHTML = `
        <div class="dialogue-container system-message" style="background-image: url('${background || ""}')">
          <div class="dialogue-box">
            <p class="text">${text}</p>
            <button id="next-btn">Next</button>
          </div>
        </div>
      `;

      if (callback) {
      callback(() => this.next());
        } else {
          this.next();
        }
    },

   renderPartyResponse(entry) {
      const app = document.getElementById("app");

      let party = getStateParty();
      console.log(party);

      // Pull hero portrait from same PORTRAIT_DIALOUGE or a separate HERO_PORTRAIT list
      const heroName = entry.rightChar;
      const heroImg = PORTRAIT_DIALOUGE[heroName]?.default || "";

      // Pull response from HERO_RESPONSE_LIST
      const stage = entry.partyResponseStage;
      const text = getHeroResponse(stage, heroName);

      app.innerHTML = `
        <div class="dialogue-container" style="background-image: url('${entry.background || ""}')">
          <div class="character left">
            ${entry.leftChar ? `<img src="${PORTRAIT_DIALOUGE[entry.leftChar]?.default || ""}" alt="${entry.leftChar}">` : ""}
          </div>
          <div class="dialogue-box">
            <p class="speaker">${heroName}</p>
            <p class="text">${text}</p>
            <button id="next-btn">Next</button>
          </div>
          <div class="character right">
            ${heroImg ? `<img src="${heroImg}" alt="${heroName}">` : ""}
          </div>
        </div>
      `;

      document.getElementById("next-btn").onclick = () => this.next();
    },


    getPartyOrderResponse(party){
      console.log()
    }
  };
}
