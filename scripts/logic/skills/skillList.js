/**
 * 
 *
 * {
    category: "damage" | "heal",
    type: "physical" | "magical",
    elem: "base",

    target: "enemy" | "ally" | "self" | "allEnemies" | "allAllies",

    hits: 1, // number | function(user)

    scaling: "physAtk" | "mgkAtk",

    power: 1.2, // multiplier

    flat: 10,   // base value

    spCost: (user, totalValue) => number,
    mpCost: (user, totalValue) => number,

    effect: ({ user, target, value, isLastHit }) => {}
   }
  */


export const skillList = {

  Slash: {
    category: "damage",
    type: "physical",
    elem: "base",
    target: "enemy",
    hits: 1,
    scaling: "physAtk",
    power: 1,
    flat: 10,
    spCost: () => 0,
    mpCost: () => 0,
  },

  BluntForce: {
    category: "damage",
    type: "physical",
    elem: "base",
    target: "enemy",
    hits: 1,
    scaling: "physAtk",
    power: 1.3,
    flat: 12,
    spCost: () => 0,
    mpCost: () => 0,
  },

  HeavySwing: {
    category: "damage",
    type: "physical",
    elem: "base",
    target: "enemy",
    hits: 1,
    scaling: "physAtk",
    power: 1.3,
    flat: 12,
    spCost: () => 0,
    mpCost: () => 0,
  },

  BackStab: {
    category: "damage",
    type: "physical",
    elem: "base",
    target: "enemy",
    hits: 1,
    scaling: "physAtk",
    power: 1.3,
    flat: 12,
    spCost: () => 0,
    mpCost: () => 0,
  },

  ManaBullet: {
    category: "damage",
    type: "magical",
    elem: "base",
    target: "enemy",
    hits: 1,
    scaling: "mgkAtk",
    power: 1,
    flat: 10,
    spCost: () => 0,
    mpCost: (user, dmg) => Math.floor(dmg / 2),
  },

  DarkCurse: {
    category: "damage",
    type: "magical",
    elem: "base",
    target: "enemy",
    hits: 1,
    scaling: "mgkAtk",
    power: 1,
    flat: 10,
    spCost: () => 0,
    mpCost: (user, dmg) => Math.floor(dmg / 2),
  },

  KiStrike: {
    category: "damage",
    type: "physical",
    elem: "base",
    target: "enemy",
    hits: 1,
    scaling: "physAtk",
    power: 1.4,
    flat: 8,
    spCost: (user, dmg) => Math.floor(dmg / 2),
    mpCost: () => 0,
  },

  ManaBlast: {
    category: "damage",
    type: "magical",
    elem: "base",
    target: "allEnemies",
    hits: 1,
    scaling: "mgkAtk",
    power: 1.5,
    flat: 14,
    spCost: () => 0,
    mpCost: (user, dmg) => Math.floor(dmg / 2),
  },

  FlameSlash: {
    category: "damage",
    type: "physical",
    elem: "pyro",
    target: "enemy",
    hits: 2,
    scaling: "physAtk",
    power: 0.9,
    flat: 8,
    spCost: (user, dmg) => Math.floor(dmg / 2),
    mpCost: user => Math.floor(user.mgkAtk * 0.25),
  },

  Heal: {
    category: "heal",
    type: "magical",
    elem: "holy",
    target: "ally",
    hits: 1,
    scaling: "mgkAtk",
    power: 1.2,
    flat: 15,
    spCost: () => 0,
    mpCost: user => 10,
  },

  HealingRain: {
    category: "heal",
    type: "magical",
    elem: "holy",
    target: "allAllies",
    hits: 2,
    scaling: "mgkAtk",
    power: 0.8,
    flat: 10,
    mpCost: user => 25,
  }
};

function getSkillValue(user, skill) {
  const atk = user[skill.scaling];

  return skill.flat + atk * skill.power;
}


function resolveTargets(user, skill, selectedTarget) {
  switch (skill.target) {
    case "enemy": return [selectedTarget];
    case "ally": return [selectedTarget];
    case "self": return [user];
    case "allEnemies": return getEnemyParty(user);
    case "allAllies": return getAllyParty(user);
  }
}

function executeSkill(user, skill, selectedTarget) {

  const targets = resolveTargets(user, skill, selectedTarget);

  const hits = typeof skill.hits === "function"
    ? skill.hits(user)
    : skill.hits;

  let totalValue = 0;

  for (const target of targets) {
    for (let i = 0; i < hits; i++) {

      const value = getSkillValue(user, skill);

      if (skill.category === "damage") {
        const dmg = calculateDamage(user, target, value, skill);
        applyDamage(target, dmg);
        totalValue += dmg;
      }

      if (skill.category === "heal") {
        applyHeal(target, value);
        totalValue += value;
      }

      skill.effect?.({
        user,
        target,
        value,
        isLastHit: i === hits - 1
      });
    }
  }

  spendCost(user, skill, totalValue);
}