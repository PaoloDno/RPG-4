function Character(
  name,
  element = "aqua",
  level = 1,
  type = "Adventurer",
  baseStats = {},
  growthStats = {},
  rarity = 3,
  block = 1,
) {
  // BASE STATS
  let stats = {
    str: 20,
    mgk: 20,
    sta: 20,
    mna: 20,
    def: 20,
    res: 20,
    hlt: 20,
    spd: 20,
    agi: 20,
    dex: 20,
    ...baseStats
  };

  // GROWTH
  const applyGrowth = () => {
    Object.keys(stats).forEach(stat => {
      const growth = growthStats[stat] || 2;
      stats[stat] += Math.floor(growth * (level - 1));
    });
  };
  applyGrowth();

  // DERIVED STATS
  let hp = 0, mp = 0, stm = 0, actionSPEED = 0;
  let critR = 10, critD = 1.2;
  let mgkRes = 10, armor = 10;

  const calcHp = () => {
    hp = stats.hlt * 10 + Math.floor((stats.def + stats.res) / 5) * 5;
  };
  const calcMp = () => {
    mp = stats.mna * 5 + Math.floor((stats.mgk + stats.dex) / 2) * 5;
  };
  const calcStm = () => {
    stm = stats.sta * 5 + Math.floor((stats.str + stats.agi) / 2) * 5;
  };
  const calcActionSpeed = () => {
    actionSPEED = Math.floor(((stats.spd * 2) + stats.agi + stats.dex) / 10);
  };

  // CRIT CALC
  const calcCrit = () => {
    const rawCR =
      10 +
      Math.floor(stats.agi / 5) +
      Math.floor(stats.dex / 4);

    const overflowCritRate = Math.max(0, rawCR - 90);
    const dmgStat = Math.max(stats.str, stats.mgk);

    critR = Math.min(90, rawCR);
    critD =
      1.2 +
      Math.floor(overflowCritRate / 10) * 0.1 +
      Math.floor(stats.dex / 10) * 0.1 +
      Math.floor(dmgStat / 10) * 0.1;
  };

  // DEFENSE
  const calcMGKRES = () => {
    mgkRes = 5 + Math.floor(
      stats.res / 2 +
      stats.mgk / 5 +
      stats.agi / 5
    );
  };

  const calcARMOR = () => {
    armor = 5 + Math.floor(
      stats.def / 2 +
      stats.agi / 5 +
      stats.dex / 5
    );
  };

  // GETTERS
  this.getHp = () => { calcHp(); return hp; };
  this.getMp = () => { calcMp(); return mp; };
  this.getStm = () => { calcStm(); return stm; };
  this.getActionSpeed = () => { calcActionSpeed(); return actionSPEED; };

  this.getCrit = () => {
    calcCrit();
    return { critR, critD };
  };

  this.getDefense = () => {
    calcMGKRES();
    calcARMOR();
    return { armor, mgkRes };
  };

  this.getStats = () => ({ ...stats });

  this.info = () => {
    const crit = this.getCrit();
    const def = this.getDefense();

    console.log(
      `Name: ${name} | Type: ${type} | Element: ${element} | Level: ${level}`
    );
    console.log(
      `HP: ${this.getHp()} | MP: ${this.getMp()} | STM: ${this.getStm()} | SPD: ${this.getActionSpeed()}`
    );
    console.log(
      `Crit: ${crit.critR}% x${crit.critD}`
    );
    console.log(
      `Armor: ${def.armor} | MGK RES: ${def.mgkRes}`
    );
    console.log("Stats:", this.getStats());
  };
}


//**
// const ELEMENT_ADVANTAGE = {
//  aqua: {pyro: 1.3, light: 1.1, dark: 0.9, wind:0.7, base: 1},
//  pyro: {wind: 1.3, light: 1, dark: 1, aqua:0.7, base: 1},
//  wind: {aqua: 1.3, light: 1, dark: 0.9, pyro:0.7, base: 1.1},

//  light: {dark: 1.3, aqua: 1.1, wind: 1.1, pyro: 1.1, base: 0.8},
//  dark:  {light: 1.3,aqua: 1, wind: 1, pyro: 1, base: 1},

//  base: {dark: 1.2 , light: 1, pyro: 1, wind: 1, aqua: 1} }; **/