import { showNotification } from "../../ui/notifications/notificationModal.js";
import { getStateParty } from "../SaveManager/savemange.js";
import { PORTRAIT_DIALOUGE } from "./portraitdialouge.js";
import { HERO_RESPONSE_LIST } from "./responseList.js";

import ScreenManager from "../../ui/screenmanager.js";
import { TownScreen } from "../../ui/screens/town/townscreen.js";
const app = document.getElementById("app");
const screens = new ScreenManager(app);

screens.register("town", TownScreen);

export const Chapter0 = [
  {
    system: true,
    text: "YOU HAVE CREATED A PARTY",
    callback: (next) => {
      showNotification({
        text: "3 AYAYAYAY!!!",
        variant: "system",
        onConfirm: next,
      });
    },
  },

  {
    system: true,
    text: "you created aparty",
    callback: () => {
      const party = getStateParty();
      let i = 0;

      const showNextHero = () => {
        if (i >= party.length) return;

        const hero = party[i++];
        const response = HERO_RESPONSE_LIST[0];
        showNotification({
          text: response[hero.name],
          speaker: hero.name,
          portrait: PORTRAIT_DIALOUGE[`default`],
          variant: "hero",
          onConfirm: showNextHero,
        });
      };

      showNextHero();
    },
  },

   {
    system: true,
    text: "go to title", // will not show
    callback: () => {
      screens.show("town");
    },
  },
];
