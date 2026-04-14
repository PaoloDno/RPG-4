export const HERO_RESPONSE_LIST = {

  0: {
    default: "JOINED THE PARTY",

    Arin: "Nice to meet everyone. Im Arin, a gradute of Northen Magic Academy",
    Ares: "Hello Nice to meet everyone! Im Ares, a proud warrior of southern tribe .",
    Asa: "Domo, Im Asa. Im a Ass- Ninja.",
    Arceus: "Grace the lord, Im Arceus of Holy Temple",
    Aria: "The wind feels nice today. Opps! Are we Introducing ourselves! Hi Im Aria, Huntress",
  },


  1: {
    default: "Ready whenever wherever the danger.",

    Arin: "Oh thank you sir. perhaps youve mistaken for a civilian",
    Ares: "As long i keep healthy body. warrior has nothing to fear! even the Tower!",
    Asa: "... ",
    Arceus: "For that very reason that the church dispatch a priest like me to aid people in climbing the tower",
    Aria: "I know what im signed up for! Its gonna be an adventure!",
  },

  
  2: {
    default: "Ready whenever wherever the danger.",

    Arin: "Well, I'm excited for the danger, thats what Ive preoared for years",
    Ares: "Sir. Im a warrior its my profession to face danger and let the citizen live comfortably",
    Asa: "... Are you talking to me?",
    Arceus: "I humbly thank a veteran for his generous warning. I shall pray more for our safe travels",
    Aria: "Stop worrying about youngin! OldMan we will be fine! thats not good for your health, you know.",
  },

  3: {
    default: "Ohh Geez",

    Arin: "Ah! Oh hello you surprise me. ehh.. d-dont cry kid",
    Ares: "Ahh! I feel a strong knight just give me powerful lariat. Kid your very strong but your too reckless * smile",
    Asa: "Ahh! *tumbles down. face in the ground.. Hey! Kid!",
    Arceus: "Ah! hello young soul, Im a priest I like kids",
    Aria: "Wops! *giggles Sneak Attack! Sneak Attack!",
  },
  
  4: {
    default: "Ohh Geez",

    Arin: "Eh. I guess I have to help you kid find your parents",
    Ares: "hey kid. dont worry we will look for your parents",
    Asa: "Well. I guess we need to look for your parents to ask them for compensation",
    Arceus: "Oh! dont worry kid ill help you find your parents! I like children",
    Aria: "Your lost arent you.. lets look for your Ma and Pa. Im lost myself too",
  },
  
  5: {
    default: "Ohh Geez",

    Arin: "Oh take care kid dont get lost again.",
    Ares: "I guess this is goodbye brave warrior.",
    Asa: " ... Hooray.., No thanks needed.. I mean I dont need it because I ask for compesation for my time!",
    Arceus: "By the grace of Holy Emp- .. what you say? you ask me begone immmediately",
    Aria: "Them are you sure? *shouts: Helloo! Are you this missing kids' parents?!! Ooh Youre right kid its your parents",
  },
  
  6: {
    default: "Ohh Geez",

    Arin: "Its fine. Im just relieved we found you before its get too dark",
    Ares: "its my duty to help. Im happy to help",
    Asa: " pay up please ... . ....",
    Arceus: "noooOOO.. Goodness  grace of holy Empire..! I just want to help! such prejudice Is A blaspemy!! ,, *argues more",
    Aria: "Them are you sure? *shouts: Helloo! Are you this missing kids' parents?!! Ooh Youre right kid its your parents",
  },

  
  7: {
    default: "Ohh Geez",

    Arin: "Its fine. Im just relieved we found you before its get too dark",
    Ares: "its my duty to help. Im happy to help",
    Asa: " pay up please ... . ....",
    Arceus: "noooOOO.. Goodness  grace of holy Empire..! I just want to help! such prejudice Is A blaspemy!! ,, *argues more",
    Aria: "Them are you sure? *shouts: Helloo! Are you this missing kids' parents?!! Ooh Youre right kid its your parents",
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
