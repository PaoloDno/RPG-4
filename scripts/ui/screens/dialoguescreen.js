import { getStateParty } from "../../game_content/SaveManager/savemange.js";
import { PORTRAIT_DIALOUGE } from "../../game_content/Stories/portraitdialouge.js";
import { getHeroResponse } from "../../game_content/Stories/responseList.js";

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
      console.log(this.currentIndex);
      this.currentIndex++;
      this.showCurrent();
    },

    renderDialogue(entry) {
      const app = document.getElementById("app");

      const leftImg = PORTRAIT_DIALOUGE[entry.leftChar] || "";
      const rightImg = PORTRAIT_DIALOUGE[entry.rightChar] || "";

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

      // Run the callback immediately if it exists

      app.innerHTML = `
        <div class="dialogue-container system-message" style="background-image: url('${background || ""}')">
          <div class="dialogue-box">
            <p class="text">${text}</p>
            <button id="next-btn">Next</button>
          </div>
        </div>
      `;

      
      // Only clicking the Next button advances dialogue
      document.getElementById("next-btn").onclick = () => this.next();

      
      if (callback) callback();

    },

    renderPartyResponse(entry) {
      const app = document.getElementById("app");

      let party = getStateParty();
      console.log("PARTY:", party);
    

      if (!party || !party.length) {
        console.warn("Party is empty!");
        return;
      }

      const Order = Array.from(
        { length: 8 },
        (_, i) => party[i % party.length].name,
      );
      console.log("ORder", Order);
      // Pull hero portrait from same PORTRAIT_DIALOUGE or a separate HERO_PORTRAIT list
      let heroName = `${Order[entry.speakerName]}`;
      let heroImg = PORTRAIT_DIALOUGE[`${heroName}${entry.rightChar}`] || "";

      // Pull response from HERO_RESPONSE_LIST
      console.log("HERO", heroImg);
      console.log(entry.text_response, heroName);
      const text = String(getHeroResponse(entry.text_response, heroName) || "");
      console.log(text);


      setTimeout(() => {
        app.innerHTML = `
          <div class="dialogue-container" style="background-image: url('${entry.background || ""}')">
            <div class="character left">
              ${entry.leftChar ? `<img src="${PORTRAIT_DIALOUGE[entry.leftChar] || ""}" alt="${entry.leftChar}">` : ""}
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
  }, 10);
},
  };
}
