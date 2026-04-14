export const HERO_RESPONSE_LIST = {

  0: {
    default: "JOINED THE PARTY",

    Arin: "Nice to meet everyone. Im Arin, a gradute of Northen Magic Academy",
    Ares: "Hello Nice to meet everyone! Im Ares, a proud warrior of southern tribe .",
    Asa: "*yawn* *stretches* domo, In Nin- *snores*",
    Arceus: "Grace the lord, Im Arceus of Holy Temple",
    Aria: "The wind feels nice today. Opps! Are we Introducing ourselves! Hi Im Aria, Huntress",
  },


  1: {
    default: "Ready whenever wherever the danger.",

    Arin: "Well, I'm excited for the danger",
    Ares: "As long i keep healthy body. warrior has nothing to fear! even the Tower!",
    Asa: "*yawn* *stretches* dont worry, if something blocks our path, ELIMINATE! *yawn*",
    Arceus: "I am thankful for your warning. I shall pray more for our safe travels",
    Aria: "I know what im signed up for! Its gonna be an adventure!",
  },

  2: {
    default: "Ready whenever you are.",

    Arin: "Thanks! Old Man but trust this girl more willya!",
    Ares: "Despite all of that! A arrior has nothing to fear!",
    Asa: "*snoring*",
    Arceus: "I shall pray for your safe travels too. I give you my thanks",
    Aria: "Geez. I know. I know old geezer. stop telling me.. hmp",
  },


3: {
    default: "Ready whenever you are.",

    Arin: "Well, I'm excited for today.",
    Ares: "A healthy warrior is a good warrior.",
    Asa: "*yawn* *stretches*",
    Arceus: "*praying quietly*",
    Ark: "Let us proceed with honor.",
    Aria: "The wind feels nice today.",
    Bach: "Another day, another battle.",
    Billy: "Hope there are good targets today.",
    Bea: "May light guide us.",
    Boris: "Stay safe, everyone.",
    Cain: "Let's take things one step at a time.",
    Cheerios: "*happy wolf noises*"
  },
};


export function getHeroResponse(stage, heroName) {
  const stageBlock = HERO_RESPONSE_LIST[Number(stage)];

  if (!stageBlock) {
    console.warn("Missing HERO_RESPONSE_LIST stage:", stage);
    return "";
  }
  console.log(stageBlock[heroName]);
  return stageBlock[heroName] ?? stageBlock.default;
}
