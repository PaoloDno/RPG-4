export function Character(
  name,
  element = "aqua",
  level = 60,
  type = "Adventurer",
  baseStats = {},
  growthStats = {},
  equipemntStats= {
    str: 0,
    mgk: 0,
    sta: 0,
    mna: 0,
    def: 0,
    res: 0,
    hlt: 0,
    spd: 0,
    agi: 0,
    dex: 0,
  },
  rarity = 3,
  block = 1,
) {
  const stats = {
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
    ...baseStats,
  };

  Object.keys(stats).forEach(stat => {
    const growth = growthStats[stat] || 1;
    stats[stat] += Math.floor(growth * (level - 1));
  });

  Object.keys(stats).forEach(stat => {
    stats[stat] += equipemntStats[stat] || 0;
  });

  let hp = 0,
    mp = 0,
    sp = 0,
    actionSpeed = 0;
  let critR = 10,
    critD = 1.2;
  let mgkRes = 10,
    armor = 10;

  const calcHp = () => {
    hp = stats.hlt * 5 + Math.floor((stats.def + stats.res) / 5) * 2;
  };
  const calcMp = () => {
    mp =
      stats.mna * 2 +
      Math.floor((stats.mgk + stats.dex) / 5) +
      Math.floor(stats.sta / 2);
  };
  const calcSp = () => {
    sp =
      stats.sta * 2 +
      Math.floor((stats.str + stats.agi) / 2) +
      Math.floor(stats.spd / 2);
  };
  const calcActionSpeed = () => {
    actionSpeed = Math.floor(
      (stats.spd * 5 + stats.agi + stats.dex + stats.sta) / 10,
    );
  };

  const calcCrit = () => {
    const rawCR = 10 + Math.floor(stats.agi / 5) + Math.floor(stats.dex / 4);
    const overflow = Math.max(0, rawCR - 90);
    const dmgStat = Math.max(stats.str, stats.mgk);
    critR = Math.min(90, rawCR);
    critD =
      120 +
      Math.floor(overflow / 10) +
      Math.floor(stats.dex / 10) +
      Math.floor(dmgStat / 10);

  };

  const calcDefense = () => {
    mgkRes = 5 + Math.floor(stats.res / 2 + stats.mgk / 5 + stats.mna / 5);
    armor = 5 + Math.floor(stats.def / 2 + stats.agi / 5 + stats.dex / 5);
  };

  this.getHp = () => {
    calcHp();
    return hp;
  };
  this.getMp = () => {
    calcMp();
    return mp;
  };
  this.getSp = () => {
    calcSp();
    return sp;
  };
  this.getActionSpeed = () => {
    calcActionSpeed();
    return actionSpeed;
  };
  this.getCrit = () => {
    calcCrit();
    return { critR, critD };
  };
  this.getDefense = () => {
    calcDefense();
    return { armor, mgkRes };
  };

  this.info = () => {
    console.log(
      `Name: ${name} | Type: ${type} | Element: ${element} | Level: ${level}`,
    );
    console.log(
      `HP: ${this.getHp()} | MP: ${this.getMp()} | SP: ${this.getSp()} | SPD: ${this.getActionSpeed()}`,
    );
    const crit = this.getCrit();
    console.log(`Crit: ${crit.critR}% x${crit.critD}`);
    const def = this.getDefense();
    console.log(`Armor: ${def.armor} | MGK RES: ${def.mgkRes}`);

    return {
      hp,
      mp,
      sp,
      actionSpeed,
      critR,
      critD,
      armor,
      mgkRes,
      stats: { ...stats },
    };
  };

  this.toRuntime = () => {
    const maxHp = this.getHp();
    const maxMp = this.getMp();
    const maxSp = this.getSp();
    const { armor, mgkRes } = this.getDefense();
    const { critR, critD } = this.getCrit();

    return {
      name,
      element,
      level,
      type,
      rarity,
      block,
      stats,
      attributes: {
        hp: maxHp,
        maxHp,
        mp: maxMp,
        maxMp,
        sp: maxSp,
        maxSp,
        armor,
        mgkRes,
        critR,
        critD,
      },
    };
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
