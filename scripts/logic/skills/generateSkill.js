import { skillList } from "./skillList.js";

export function generateSkill(skillId, userStats) {

  const template = skillList[skillId];
  if (!template) return null;

  function computeValue(target = null) {
    if (template.compute) {
      return template.compute({ user: userStats });
    }

    if (template.formula) {
      return template.formula({
        user: userStats,
        target: target || {}
      });
    }

    return 0;
  }

  return {

    id: skillId,
    ...template,

    // preview damage for UI
    preview() {
      return computeValue();
    },

    // description text
    description() {
      if (typeof template.description === "function") {

        const value = computeValue();

        return template.description({
          user: userStats,
          value
        });
      }

      return template.description;
    },

    // spend resource
    payCost(value) {
      template.Cost?.({
        user: userStats,
        value
      });
    },

    // apply status effects
    applyEffect(target, value) {
      template.effect?.({
        user: userStats,
        target,
        value
      });
    },

    // main combat execution
    use(target) {

      const value = template.formula({
        user: userStats,
        target
      });

      this.payCost(value);

      const hits = template.hits || [1];

      const damages = hits.map(mult => Math.floor(value * mult));

      damages.forEach(dmg => {

        if (template.category === "damage") {
          target.hp -= dmg;
        }

        if (template.category === "heal") {
          target.hp += dmg;
        }

      });

      this.applyEffect(target, value);

      return damages;
    }

  };
}