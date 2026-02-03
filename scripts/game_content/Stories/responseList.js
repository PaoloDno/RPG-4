export const HERO_RESPONSE_LIST = {
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
    // future dialogue stage
  }
};


export function getHeroResponse(stage, heroName) {
  const stageData = HERO_RESPONSE_LIST[stage];

  return (
    stageData?.[heroName] ||
    stageData?.default ||
    "..."
  );
}