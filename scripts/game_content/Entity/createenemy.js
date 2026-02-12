export function createEnemy(monsterData, floor = 1) {
  const level = floor + Math.floor(Math.random() * 3) + 1;

  const {
    name,
    type,
    rarity = 1,
    baseStats = {},
    growthStats = {},
    element = ["base"],
    block = 1,
    skills = ["slash"]
  } = monsterData;

  const finalElement =
    element[Math.floor(Math.random() * element.length)];

  const enemy = new Character(
    name,
    finalElement,
    level,
    type,
    baseStats,
    growthStats,
    {},
    rarity,
    block
  );

  enemy.skills = [...skills]; 

  return enemy;
}
