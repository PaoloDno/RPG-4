export const statusEffectList = {
  TakeDamage: {
    element: "base",
    apply: ({ target, value }) => {
      const dmg = value || 0;
      target.runtime.currentHp -= dmg;
      if (target.runtime.currentHp < 0) target.runtime.currentHp = 0;
      return `${target.name} takes ${dmg} damage!`;
    }
  },
  Heal: {
    element: "holy",
    apply: ({ target, value }) => {
      const heal = value || 0;
      target.runtime.currentHp += heal;
      if (target.runtime.currentHp > target.attributes.maxHp)
        target.runtime.currentHp = target.attributes.maxHp;
      return `${target.name} heals for ${heal} HP!`;
    }
  },
  BurnDamage: {
    type: "pyro",
    apply: ({ target, valuePercent = 20 }) => {
      const dmg = Math.floor(target.stats.hlt * (valuePercent / 100));
      target.runtime.currentHp -= dmg;
      return `${target.name} suffers ${dmg} burn damage!`;
    }
  },
  Frozen: {
    skipTurn: true,
    apply: ({ target, valuePercent = 20 }) => {
      const dmg = Math.floor(target.stats.hlt * (valuePercent / 100));
      target.runtime.currentHp -= dmg;
      target.runtime.actedThisTurn = true; // skip turn
      return `${target.name} is frozen and takes ${dmg} damage, skipping their turn!`;
    }
  },
  Paralyze: {
    skipTurnChance: 0.2,
    apply: ({ target }) => {
      let log = "";
      if (Math.random() < 0.2) {
        target.runtime.actedThisTurn = true;
        log = `${target.name} is paralyzed and cannot act this turn!`;
      }
      return log;
    }
  },
  Stunned: {
    skipTurn: true,
    removeOnDamage: true,
    dmgPercent: 10,
    apply: ({ target }) => {
      const dmg = Math.floor(target.stats.hlt * 0.1);
      target.runtime.currentHp -= dmg;
      target.runtime.actedThisTurn = true;
      return `${target.name} is stunned, takes ${dmg} damage and skips their turn!`;
    }
  },
  Poison: {
    type: "toxic",
    apply: ({ target, valuePercent = 5 }) => {
      const dmg = Math.floor(target.attributes.maxHp * (valuePercent / 100));
      target.runtime.currentHp -= dmg;
      return `${target.name} suffers ${dmg} poison damage!`;
    }
  }
};

// Process status effects and return battle log messages
export function processStatusEffects(character) {
  const effects = character.runtime.statusEffects || [];
  const logs = [];

  for (let i = effects.length - 1; i >= 0; i--) {
    const effect = effects[i];
    const template = statusEffectList[effect.name];

    if (!template) continue;

    // Apply effect and collect log
    if (template.apply) {
      const log = template.apply({ target: character, ...effect.callbackParams });
      if (log) logs.push(log);
    }

    // Decrement duration if it exists
    if (effect.duration !== undefined) {
      effect.duration -= 1;
      if (effect.duration <= 0) {
        logs.push(`${character.name}'s ${effect.name} effect has worn off!`);
        effects.splice(i, 1); // remove expired effect
        continue;
      }
    }

    // Special removal on damage
    if (template.removeOnDamage && character.runtime.tookDamageThisTurn) {
      logs.push(`${character.name}'s ${effect.name} effect was removed!`);
      effects.splice(i, 1);
      continue;
    }

    // Skip turn if needed
    if (template.skipTurn) character.runtime.actedThisTurn = true;
    if (template.skipTurnChance && Math.random() < template.skipTurnChance)
      character.runtime.actedThisTurn = true;
  }

  return logs;
}
