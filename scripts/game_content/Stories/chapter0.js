import { showNotification } from "../../ui/notifications/notificationModal.js";
import { getStateParty } from "../SaveManager/savemange.js";
import { PORTRAIT_DIALOUGE } from "./portraitdialouge.js";
import { HERO_RESPONSE_LIST } from "./responseList.js";

import ScreenManager from "../../ui/screenmanager.js";
import { TownScreen } from "../../ui/screens/town/townscreen.js";
import { queueNotification } from "../../logic/utils/notificationQ.js";
const app = document.getElementById("app");
const screens = new ScreenManager(app);

screens.register("town", TownScreen);

export const Chapter0 = [
  {
    system: true,
    text: "YOU HAVE CREATED A PARTY",
  },

  {
    system: true,
    text: "you created a party",
    callback: async () => {
      const party = getStateParty();
      const response = HERO_RESPONSE_LIST[0];
      console.log(party);
      party.forEach((hero) => {
        queueNotification({
          text: response[hero.name],
          speaker: hero.name,
          portrait: PORTRAIT_DIALOUGE.default,
          variant: "hero",
        });
      });
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
