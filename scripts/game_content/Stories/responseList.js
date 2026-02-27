export const HERO_RESPONSE_LIST = {

  0: {
    default: "JOINED THE PARTY",

    Arin: "Nice to meet everyone, Im a gradute of Northen Magic Academy",
    Ares: "Hello Nice to meet everyone! IM a proud wariior of southern tribe .",
    Asa: "*yawn* *stretches* domo.",
    Arceus: "Grace the lord",
    Ark: "Let us proceed with honor.",
    Aria: "The wind feels nice today.",
    Bach: "Another day, another battle.",
    Billy: "Hope there are good targets today.",
    Bea: "May light guide us.",
    Boris: "Stay safe, everyone.",
    Cain: "Let's take things one step at a time.",
    Cheerios: "*happy wolf noises*"
  },


  1: {
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

  2: {
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
