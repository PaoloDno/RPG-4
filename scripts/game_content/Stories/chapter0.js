import { showNotification } from "../../ui/notifications/notificationModal.js";
import { getStateParty } from "../../core/SaveManager/savemange.js";
import { HERO_RESPONSE_LIST } from "./responseList.js";

import ScreenManager from "../../ui/screenmanager.js";
import { TownScreen } from "../../ui/screens/town/townscreen.js";
import { queueNotification } from "../../logic/utils/notificationQ.js";
import { PORTRAIT_DIALOUGE } from "./portraitDialouge.js";
import { bgIMAGES, storyPortraitImages } from "../../ui/images/Images.js";

const app = document.getElementById("game-view");
const screens = new ScreenManager(app);

screens.register("town", TownScreen);

export const Chapter0 = [
  {
    system: true,
    text: "YOU HAVE CREATED A PARTY",
  },
  {
    system: true,
    text: "one by one everyone introduced themselves",
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
          portrait: storyPortraitImages[hero.name],
          variant: "hero",
        });
      });
    },
  },

  {
    system: true,
    text: "The Party Excited for a new Adventure",
  },

  {
    system: true,
    text: "As you enter the town a parade is happening",
    background: bgIMAGES.Parade,
  },
  {
    system: false,
    speakerName: "random NPCs",
    text: "'the gates of the dungeon has open once again''praise the gods''Tis deserve a festival!'",
    background: bgIMAGES.Parade,
  },
  { 
    speakerName: "random NPCs",
    text: "'peak of the tower here I come'",
    background: bgIMAGES.Parade,
  },
  
  {
    speakerName: "random NPCs",
    text: "'the town will  be busy with costumer again'",
    background: bgIMAGES.Parade,
  },
  { 
    speakerName: "some old man",
    leftImg: storyPortraitImages.OldMan,
    text: "'This young people.. they dont know what they talking about..'",
    background: bgIMAGES.Parade,
  },
  { 
    speakerName: "some old man",
    leftImg: storyPortraitImages.OldMan,
    text: "'I just hope people will be able to comeback'",
    background: bgIMAGES.Parade,
  },
  { 
    speakerName: "some old man",
    leftImg: storyPortraitImages.OldMan,
    text: "'Dont GO challenging the tower without proper preparations'",
    background: bgIMAGES.Parade,
  },
  { 
    partyResponseStage: true,
    speakerName: 0,
    text_response: 1,
    background: bgIMAGES.Parade
  },
  { 
    partyResponseStage: false,
    speaker: "some old man",
    leftImg: storyPortraitImages.OldMan,
    text: "'thats what they all said. and the local only care about the tower business'",
    background: bgIMAGES.Parade,
  },
  { 
    partyResponseStage: true,
    speakerName: 1,
    text_response: 2,
    background: bgIMAGES.Parade,
  },
  { 
    partyResponseStage: false,
    speaker: "some old man",
    leftImg: storyPortraitImages.OldMan,
    text: "'if that what you say.. but i warned you'",
    background: bgIMAGES.town,
  },
  { 
    system: true,
    text: "The old man left, and you continue on the first day of your journey",
    background: bgIMAGES.town,
  },
  
  {
    system: true,
    text: "go to title", // will not show
    callback: () => {
      screens.
      show("town");
    },
  },
];
