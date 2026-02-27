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

    async showCurrent() {
      if (this.currentIndex >= this.script.length) {
        console.log("Dialouge finished");
        return;
      }

      const entry = this.script[this.currentIndex];

      if (entry.system) {
        await this.renderSystem(entry.text, entry.background, entry.callback);
        return;
      }

      if (entry.partyResponseStage) {
        await this.renderPartyResponse(entry);
        return;
      }

      await this.renderDialogue(entry);
    },

    async next() {
      this.currentIndex++;
      await this.showCurrent();
    },

    //   NORMAL DIALOGUE
    renderDialogue(entry) {
      const app = document.getElementById("app");

      const leftImg = PORTRAIT_DIALOUGE[entry.leftChar] || "";
      const rightImg = PORTRAIT_DIALOUGE[entry.rightChar] || "";

      app.innerHTML = `
        <div class="dialogue-container" style="background-image: url('${entry.background || ""}')">
          <div class="character left">
            ${leftImg ? `<img src="${leftImg}" alt="">` : ""}
          </div>

          <div class="dialogue-box">
            <p class="speaker">${entry.speakerName || "System"}</p>
            <p class="text">${entry.text}</p>
            <button id="next-btn">Next</button>
          </div>

          <div class="character right">
            ${rightImg ? `<img src="${rightImg}" alt="">` : ""}
          </div>
        </div>
      `;

      const nextBtn = document.getElementById("next-btn");

      return new Promise(resolve => {
        nextBtn.onclick = async () => {
          await this.next();
          resolve();
        };
      });
    },

    //   SYSTEM MESSAGE
    async renderSystem(text, background, callback) {
      const app = document.getElementById("app");

      app.innerHTML = `
        <div class="dialogue-container system-message"
             style="background-image: url('${background || ""}')">
          <div class="dialogue-box">
            <p class="text">${text}</p>
            <button id="next-btn">Next</button>
          </div>
        </div>
      `;

      const nextBtn = document.getElementById("next-btn");

      return new Promise(async resolve => {
        nextBtn.onclick = async () => {
          await this.next();
          resolve();
        };

        if (callback) {
          await callback();
        }
      });
    },

    /* =========================
       PARTY RESPONSE
    ========================= */
    renderPartyResponse(entry) {
      const app = document.getElementById("app");

      const party = getStateParty();

      if (!party || !party.length) {
        console.warn("Party is empty!");
        return;
      }

      const Order = Array.from(
        { length: 8 },
        (_, i) => party[i % party.length].name
      );

      const heroName = `${Order[entry.speakerName]}`;

      const heroImg =
        PORTRAIT_DIALOUGE[`${heroName}${entry.rightChar}`] || "";

      const text = String(
        getHeroResponse(entry.text_response, heroName) || ""
      );

      app.innerHTML = `
        <div class="dialogue-container"
             style="background-image: url('${entry.background || ""}')">

          <div class="character left">
            ${
              entry.leftChar
                ? `<img src="${PORTRAIT_DIALOUGE[entry.leftChar] || ""}">`
                : ""
            }
          </div>

          <div class="dialogue-box">
            <p class="speaker">${heroName}</p>
            <p class="text">${text}</p>
            <button id="next-btn">Next</button>
          </div>

          <div class="character right">
            ${heroImg ? `<img src="${heroImg}">` : ""}
          </div>

        </div>
      `;

      const nextBtn = document.getElementById("next-btn");

      return new Promise(resolve => {
        nextBtn.onclick = async () => {
          await this.next();
          resolve();
        };
      });
    },
  };
}