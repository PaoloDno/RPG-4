// Enemy.js
export function createEnemy(name, type = "Goblin", floor = 1) {
  // Level scales with floor + some randomness
  const level = floor + Math.floor(Math.random() * 5) + 1;

  // Base stats for generic enemy
  const baseStats = {
    str: 10 + floor * 2,
    mgk: 5 + floor,
    sta: 10 + floor * 2,
    mna: 5 + floor,
    def: 5 + floor,
    res: 5 + floor,
    hlt: 10 + floor,
    spd: 5 + floor,
    agi: 5 + floor,
    dex: 5 + floor
  };

  // Simple growth per level
  const growthStats = {
    str: 1 + floor * 0.1,
    mgk: 0.5 + floor * 0.05,
    sta: 1 + floor * 0.1,
    mna: 0.5 + floor * 0.05,
    def: 0.5 + floor * 0.05,
    res: 0.5 + floor * 0.05,
    hlt: 1 + floor * 0.1,
    spd: 0.5 + floor * 0.05,
    agi: 0.5 + floor * 0.05,
    dex: 0.5 + floor * 0.05
  };

  // Rarity for enemies, default 1
  const rarity = 1;

  // Element random choice
  const elements = ["aqua", "pyro", "wind", "light", "dark", "base"];
  const element = elements[Math.floor(Math.random() * elements.length)];

  // Use your Character constructor for enemy
  const enemy = new Character(name, element, level, type, baseStats, growthStats, rarity);

  return enemy;
}

// Example usage
const goblin = createEnemy("Goblin", "Goblin", 3);
goblin.info();



// BossEnemy.js
export function createBossEnemy(name = "GoblinChampion", floor = 10) {
  // Boss level scales higher than normal enemies
  const level = floor + 5; 

  // Base stats much higher than normal
  const baseStats = {
    str: 80,
    mgk: 20,
    sta: 60,
    mna: 20,
    def: 50,
    res: 40,
    hlt: 70,
    spd: 30,
    agi: 25,
    dex: 30
  };

  // Growth stats for boss (stronger growth)
  const growthStats = {
    str: 2.5,
    mgk: 1,
    sta: 2,
    mna: 1,
    def: 2,
    res: 1.5,
    hlt: 2,
    spd: 1.2,
    agi: 1,
    dex: 1
  };

  // Boss rarity higher
  const rarity = 5;

  // Element choice (can be random or fixed)
  const elements = ["aqua", "pyro", "wind", "light", "dark", "base"];
  const element = elements[Math.floor(Math.random() * elements.length)];

  // Use Character constructor
  const boss = new Character(name, element, level, "Boss", baseStats, growthStats, rarity, block = 4);

  // Optional: Add boss-specific skills
  boss.skills = ["Lunge", "Cleave", "Frenzy", "Roar"]; 

  return boss;
}

// Example usage
const goblinChampion = createBossEnemy("GoblinChampion", 10);
goblinChampion.info();
console.log("Skills:", goblinChampion.skills);
