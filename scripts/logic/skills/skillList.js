let skillIcon = new URL(
  "./../../../assets/sprites/heroes/chibi/Ares.png",
  import.meta.url,
).href;

function cost(hp=0, mp=0, sp=0){
  hp = Math.floor(hp);
  mp = Math.floor(mp);
  sp = Math.floor(sp);
  return { hp, mp, sp }
}

export const skillList = {
  PoisonSting: {
    name: "Poison Sting",
    category: "damage",
    type: "physical",
    elem: "base",
    target: "single",

    compute: ({ user }) => Math.floor(user.mgk * 2),

    formula: ({ user, target }) => Math.floor(user.mgk * 2),

    hits: [1],

    Cost: ({ user, value }) => cost(0, value * 1.5, 0),

    effect: ({ target }) => {
      if (Math.random() < 0.3) {
        applyStatus(target, "poison", {
          duration: 3,
          power: 0.05,
        });
      }
    },

    description: ({ value }) =>
      `Launch a poisoned needle that deals ${value} damage with a chance to poison.`,

    IconSprite: skillIcon,
  },

  Slash: {
    name: "Slash",
    category: "damage",
    type: "physical",
    elem: "base",
    target: "single",

    compute: ({ user }) => Math.floor(user.str + user.spd + user.dex + 10),

    formula: ({ user, target }) =>
      Math.floor(user.str + user.spd + user.dex + 10),

    hits: [1],

    
    Cost: ({ user, value }) => cost(0, 0, value * 0.5),

    description: ({ value }) =>
      `A basic sword slash that deals ${value} damage.`,

    IconSprite: skillIcon,
  },

  Scratch: {
    name: "Slash",
    category: "damage",
    type: "physical",
    elem: "base",
    target: "single",

    compute: ({ user }) => Math.floor(user.str * 0.5 + user.spd * 0.5 + user.dex + 10),

    formula: ({ user, target }) =>
      Math.floor(user.str * 0.5 + user.spd * 0.5 + user.dex + 10),

    hits: [1],

    
    Cost: ({ user, value }) => cost(0, 0, value * 0.3),

    description: ({ value }) =>
      `A scratch attack that deals ${value} damage.`,

    IconSprite: skillIcon,
  },

  Strike: {
    name: "Strike",
    category: "damage",
    type: "physical",
    elem: "base",
    target: "single",

    compute: ({ user }) => Math.floor(user.str + user.spd + user.dex + 10),

    formula: ({ user, target }) =>
      Math.floor(user.str + user.spd + user.dex + 10),

    hits: [1],

    
    Cost: ({ user, value }) => cost(0, 0, value * 0.5),

    description: ({ value }) =>
      `A basic striking damage that deals ${value} physical damage.`,

    IconSprite: skillIcon,
  },

  BluntForce: {
    name: "Blunt Force",
    category: "damage",
    type: "physical",
    elem: "base",
    target: "single",

    compute: ({ user }) => Math.floor(user.str * 2 + 12),

    formula: ({ user, target }) => Math.floor(user.str * 2 + 12),

    hits: [1],

    
    Cost: ({ user, value }) => cost(0, 0, value * 0.5),

    description: ({ value }) =>
      `Deliver a crushing blow that deals ${value} damage.`,

    IconSprite: skillIcon,
  },

  HeavySwing: {
    name: "Heavy Swing",
    category: "damage",
    type: "physical",
    elem: "base",
    target: "single",

    compute: ({ user }) => Math.floor(user.str * 3 + 10),

    formula: ({ user, target }) => Math.floor(user.str * 3 + 10),

    hits: [1],

    
    Cost: ({ user, value }) => cost(0, 0, value * 0.5),

    description: ({ value }) =>
      `Swing your weapon with great force dealing ${value} damage.`,

    IconSprite: skillIcon,
  },

  BackStab: {
    name: "Back Stab",
    category: "damage",
    type: "physical",
    elem: "base",
    target: "single",

    compute: ({ user }) => Math.floor(user.str * 2 + user.dex * 1.2 + user.spd),

    formula: ({ user, target }) =>
      Math.floor(user.str * 2 + user.dex * 1.2 + user.spd),

    hits: [1],

    
    Cost: ({ user, value }) => cost(0, 0, value * 0.75),

    description: ({ value }) => `Strike a weak point dealing ${value} damage.`,

    IconSprite: skillIcon,
  },

  ManaBullet: {
    name: "Mana Bullet",
    category: "damage",
    type: "magical",
    elem: "base",
    target: "single",

    compute: ({ user }) => Math.floor(user.mgk * 2 + user.mana * 2 + 10),

    formula: ({ user, target }) => Math.floor(user.mgk * 2 + user.mana * 2 + 10),

    hits: [1],

    
    Cost: ({ user, value }) => cost(0, value * 0.7, 0),

    description: ({ value }) =>
      `Fire a condensed mana projectile dealing ${value} magic damage.`,

    IconSprite: skillIcon,
  },

  IceBlast: {
    name: "Ice Blast",
    category: "damage",
    type: "magical",
    elem: "aqua",
    target: "single",

    compute: ({ user }) => Math.floor(user.mgk * 3.5 + 10),

    formula: ({ user, target }) => Math.floor(user.mgk * 3.5 + 10),

    hits: [1],

    Cost: ({ user, value }) => cost(0, value * 0.7, 0),

    description: ({ value }) =>
      `Cold mana condensed and fire as projectile dealing ${value} magic damage.`,

    IconSprite: skillIcon,
  },

  FlameSlash: {
    name: "FlameSlash",
    category: "damage",
    type: "physical",
    elem: "pyro",
    target: "single",

    compute: ({ user }) => Math.floor(user.str * 3 + user.mgk * 1.4 + 8),

    formula: ({ user, target }) =>
      Math.floor(user.str * 3 + user.mgk * 1.4 + 8),

    hits: [0.5, 1],

    Cost: ({ user, value }) => cost(0, value * 0.4, value * 0.4),

    description: ({ value }) =>
      `A flaming slash that strikes twice for about ${value * 0.5} and ${value} damage each.`,

    IconSprite: skillIcon,
  },

  Heal: {
    name: "Heal",
    category: "heal",
    type: "magical",
    elem: "holy",
    target: "single",

    compute: ({ user }) => Math.floor(user.mgk * 4),

    formula: ({ user }) => Math.floor(user.mgk * 4),

    hits: [1],

    Cost: ({ user, value }) => cost(0, value * 0.3 , 0),

    description: ({ value }) => `Restore ${value} HP to an ally.`,

    IconSprite: skillIcon,
  },

  HolySmite: {
    name: "Holy Smite",
    category: "damage",
    type: "magical",
    elem: "light",
    target: "single",

    compute: ({ user }) => Math.floor(user.mgk * 2),

    formula: ({ user, target }) =>
      Math.floor(user.mgk * 3 + Math.floor((target.maxHp - target.hp) * 0.55)),

    hits: [1],

    Cost: ({ user, value }) => cost(0, value * 0.5, value * 0.2),

    description: ({ value }) =>
      `use holy power of light that deals ${value} and the 55% of enemy missing hp as magical damage`,

    IconSprite: skillIcon,
  },

  ShadowBall: {
    name: "Shadow Ball",
    category: "damage",
    type: "magical",
    elem: "dark",
    target: "single",

    compute: ({ user }) => Math.floor(user.mgk * 2.2),

    formula: ({ user, target }) => Math.floor(user.mgk * 2.2),

    hits: [1],

    Cost: ({ user, value }) => cost(0, 0, value * 0.5),

    description: ({ value }) =>
      `Condense dark mana to a sphere that is fire that deald ${value} dark magical damage.`,

    IconSprite: skillIcon,
  },

  FinalSlash: {
    name: "Final Slash",
    category: "damage",
    type: "physical",
    elem: "light",
    target: "single",

    compute: ({ user }) =>
      Math.floor(user.str * 2.2 + (user.maxHp - user.hp) * 0.75),

    formula: ({ user, target }) =>
      Math.floor(user.str * 2.2 + (user.maxHp - user.hp) * 0.75),

    hits: [1],

    Cost: ({ user, value }) => cost(value * 0.4, value * 0.3, value * 0.3),

    description: ({ value }) =>
      `A hero uses his aura as a last resort, converting pain into power and dealing ${value} physical damage.`,

    IconSprite: skillIcon,
  },

  Explosion: {
    name: "Explosion",
    category: "damage",
    type: "magical",
    elem: "pyro",
    target: "all",

    compute: ({ user }) => Math.floor(user.mgk * 1.2 + user.mp * 0.75),

    formula: ({ user, target }) => Math.floor(user.mgk * 1.2 + user.mp * 0.75),

    hits: [1],

    Cost: ({ user, value }) => cost(0, value * 0.75, value * 0.25),

    description: ({ value }) =>
      `Using a horbidden spell that uses caster mana as battery to make a explosive spell that deal magical damage ${value}`,

    IconSprite: skillIcon,
  },
};
