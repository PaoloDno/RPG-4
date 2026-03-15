let skillIcon =
  new URL("./../../../assets/sprites/heroes/chibi/Ares.png", import.meta.url)
    .href;

export const skillList = {

  PoisonSting: {
    category: "damage",
    type: "physical",
    elem: "base",
    target: "single",

    compute: ({ user }) =>
      Math.floor(user.mgk * 2),

    formula: ({ user, target }) =>
      Math.floor(user.mgk * 2 - target.res),

    hits: [1],

    Cost: ({ user }) => {
      user.sp -= 5;
    },

    effect: ({ target }) => {
      if (Math.random() < 0.3) {
        applyStatus(target, "poison", {
          duration: 3,
          power: 0.05
        });
      }
    },

    description: ({ value }) =>
      `Launch a poisoned needle that deals ${value} damage with a chance to poison.`,

    IconSprite: skillIcon
  },

  Slash: {
    category: "damage",
    type: "physical",
    elem: "base",
    target: "single",

    compute: ({ user }) =>
      Math.floor(user.str + user.spd + user.dex + 10),

    formula: ({ user, target }) =>
      Math.floor(user.str + user.spd + user.dex + 10),

    hits: [1],

    Cost: ({ user }) => {
      user.sp -= 3;
    },

    description: ({ value }) =>
      `A basic sword slash that deals ${value} damage.`,

    IconSprite: skillIcon
  },

  Strike: {
    category: "damage",
    type: "physical",
    elem: "base",
    target: "single",

    compute: ({ user }) =>
      Math.floor(user.str + user.spd + user.dex + 10),

    formula: ({ user, target }) =>
      Math.floor(user.str + user.spd + user.dex + 10),

    hits: [1],

    Cost: ({ user }) => {
      user.sp -= 3;
    },

    description: ({ value }) =>
      `A basic sword slash that deals ${value} damage.`,

    IconSprite: skillIcon
  },

  BluntForce: {
    category: "damage",
    type: "physical",
    elem: "base",
    target: "single",

    compute: ({ user }) =>
      Math.floor(user.str * 1.3 + 12),

    formula: ({ user, target }) =>
      Math.floor(user.str * 1.3 + 12),

    hits: [1],

    Cost: ({ user }) => {
      user.sp -= 6;
    },

    description: ({ value }) =>
      `Deliver a crushing blow that deals ${value} damage.`,

    IconSprite: skillIcon
  },

  HeavySwing: {
    category: "damage",
    type: "physical",
    elem: "base",
    target: "single",

    compute: ({ user }) =>
      Math.floor(user.str * 1.4 + 10),

    formula: ({ user, target }) =>
      Math.floor(user.str * 1.4 + 10),

    hits: [1],

    Cost: ({ user }) => {
      user.sp -= 7;
    },

    description: ({ value }) =>
      `Swing your weapon with great force dealing ${value} damage.`,

    IconSprite: skillIcon
  },

  BackStab: {
    category: "damage",
    type: "physical",
    elem: "base",
    target: "single",

    compute: ({ user }) =>
      Math.floor(user.dex * 1.4 + user.spd + 10),

    formula: ({ user, target }) =>
      Math.floor(user.dex * 1.4 + user.spd + 10),

    hits: [1],

    Cost: ({ user }) => {
      user.sp -= 5;
    },

    description: ({ value }) =>
      `Strike a weak point dealing ${value} damage.`,

    IconSprite: skillIcon
  },

  ManaBullet: {
    category: "damage",
    type: "magical",
    elem: "base",
    target: "single",

    compute: ({ user }) =>
      Math.floor(user.mgk * 1.5 + 10),

    formula: ({ user, target }) =>
      Math.floor(user.mgk * 1.5 + 10),

    hits: [1],

    Cost: ({ user, value }) => {
      user.mp -= Math.floor(value * 0.4);
    },

    description: ({ value }) =>
      `Fire a condensed mana projectile dealing ${value} magic damage.`,

    IconSprite: skillIcon
  },

  IceBlast: {
    category: "damage",
    type: "magical",
    elem: "base",
    target: "single",

    compute: ({ user }) =>
      Math.floor(user.mgk * 1.5 + 10),

    formula: ({ user, target }) =>
      Math.floor(user.mgk * 1.5 + 10),

    hits: [1],

    Cost: ({ user, value }) => {
      user.mp -= Math.floor(value * 0.4);
    },

    description: ({ value }) =>
      `Fire a condensed mana projectile dealing ${value} magic damage.`,

    IconSprite: skillIcon
  },

  FlameSlash: {
    category: "damage",
    type: "physical",
    elem: "pyro",
    target: "single",

    compute: ({ user }) =>
      Math.floor(user.str * 0.9 + user.mgk * 0.4 + 8),

    formula: ({ user, target }) =>
      Math.floor(user.str * 0.9 + user.mgk * 0.4 + 8),

    hits: [1, 1],

    Cost: ({ user, value }) => {
      user.sp -= 6;
      user.mp -= 4;
    },

    description: ({ value }) =>
      `A flaming slash that strikes twice for about ${value} damage each.`,

    IconSprite: skillIcon
  },

  Heal: {
    category: "heal",
    type: "magical",
    elem: "holy",
    target: "single",

    compute: ({ user }) =>
      Math.floor(user.mgk * 2.2),

    formula: ({ user }) =>
      Math.floor(user.mgk * 2.2),

    hits: [1],

    Cost: ({ user }) => {
      user.mp -= 10;
    },

    description: ({ value }) =>
      `Restore ${value} HP to an ally.`,

    IconSprite: skillIcon
  },
  
  HolySmite: {
    category: "damage",
    type: "magical",
    elem: "light",
    target: "single",

    compute: ({ user }) =>
      Math.floor(user.mgk * 2.2),

    formula: ({ user, target }) =>
      Math.floor(user.mgk * 2.2),

    hits: [1],

    Cost: ({ user, value }) => {
      user.mp -= 10;
    },

    description: ({ value }) =>
      `Restore ${value} HP to an ally.`,

    IconSprite: skillIcon
  }

};