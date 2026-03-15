const combatEvents = {};

export function on(event, handler) {
  if (!combatEvents[event]) {
    combatEvents[event] = [];
  }

  combatEvents[event].push(handler);
}

export function emit(event, payload) {
  const handlers = combatEvents[event];

  if (!handlers) return;

  for (const fn of handlers) {
    fn(payload);
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

//Emit Events

function executeSkill(user, skill, selectedTarget) {

  const targets = resolveTargets(user, skill, selectedTarget);

  emit("skill:start", { user, skill, targets });

  for (const target of targets) {

    for (let i = 0; i < skill.hits.length; i++) {

      const multiplier = skill.hits[i];

      const base = skill.formula({ user, target });
      let value = base * multiplier;

      const context = {
        user,
        target,
        skill,
        value,
        hitIndex: i,
        isLastHit: i === skill.hits.length - 1
      };

      emit("hit:before", context);

      if (skill.category === "damage") {

        value = calculateDamage(user, target, value, skill);

        emit("damage:before", { ...context, value });

        applyDamage(target, value);

        emit("damage:after", { ...context, value });

      }

      if (skill.category === "heal") {

        applyHeal(target, value);

        emit("heal:after", { ...context, value });

      }

      skill.effect?.(context);

      emit("hit:after", context);

    }

  }

  emit("skill:end", { user, skill });
}

on("damage:after", ({ user, value }) => {

  if (!user.lifesteal) return;

  const heal = Math.floor(value * user.lifesteal);

  applyHeal(user, heal);

});
// 
on("damage:after", ({ user, target }) => {

  if (!target.counterChance) return;

  if (Math.random() < target.counterChance) {

    executeSkill(target, skillList.Slash, user);

  }

});

//

on("damage:after", ({ user, target, value }) => {

  if (!target.thorns) return;

  const reflect = Math.floor(value * target.thorns);

  applyDamage(user, reflect);

});
//combo effect
on("damage:after", ({ target, skill }) => {

  if (skill.elem !== "pyro") return;

  const poisoned = target.status?.find(s => s.type === "poison");

  if (!poisoned) return;

  const explosion = Math.floor(target.maxHp * 0.1);

  applyDamage(target, explosion);

});

// turn start
on("turn:start", ({ target }) => {

  const poison = target.status?.find(s => s.type === "poison");

  if (!poison) return;

  const dmg = Math.floor(target.maxHp * poison.power);

  applyDamage(target, dmg);

});

/*
skill:start
skill:end

hit:before
hit:after

damage:before
damage:after

heal:before
heal:after

turn:start
turn:end

status:apply
status:remove
*/

function applyStatus(target, name, overrides = {}) {

  const base = statusList[name];

  const status = {
    name,
    ...base,
    ...overrides
  };

  if (!target.status) target.status = [];

  target.status.push(status);

}


function processStatuses(target) {

  if (!target.status) return;

  for (const status of target.status) {

    switch (status.type) {

      case "dot": {

        const dmg = Math.floor(target.maxHp * status.power);
        applyDamage(target, dmg);

        break;
      }

      case "hot": {

        const heal = Math.floor(target.maxHp * status.power);
        applyHeal(target, heal);

        break;
      }

    }

    status.duration--;

  }

  target.status = target.status.filter(s => s.duration > 0);

}


function canAct(unit) {

  if (!unit.status) return true;

  for (const status of unit.status) {

    if (status.type === "skipTurn") {

      if (Math.random() < status.chance) {
        return false;
      }

    }

  }

  return true;

}


on("damage:before", (ctx) => {

  const { target } = ctx;

  if (!target.status) return;

  for (const status of target.status) {

    if (status.type === "damageReduction") {
      ctx.value *= (1 - status.power);
    }

  }

});



