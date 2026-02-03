let defaultStats = {
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
  
}


export const skillList = {
  
  Slash: {
    type: "physical",
    elem: "base",
    damage: 10 + str + spd,
    Spconsumption: 0,
    MnConsuption: 0,
  },

  Blunt_Force: {
    type: "physical",
    elem: "base",
    damage: 10 + str + spd,
    Spconsumption: 0,
    MnConsuption: 0,
  },

  Mana_Pellet: {
    type: "magical",
    elem: "base",
    damage: 10 + mgk * 2 + mna + dex,
    Spconsumption: 0,
    MnConsuption: damage / 2,
  },

  Ki_Strike: {
    type: "physical",
    elem: "base",
    damage: 10 + str * 2 + agi + dex,
    Spconsumption: damage / 2,
    MnConsuption: 0,
  },

  Mana_Blast: {
    type: "magical",
    elem: "base",
    damage: 10 + mgk * 3 + mna + dex,
    Spconsumption: 0,
    MnConsuption: damage / 2 + mgk,
  },

  Flame_Slash: {
    type: "physical",
    elem: "fire",
    damage: 10 + str * 3 + agi + dex,
    Spconsumption: damage / 2,
    MnConsuptiom: str,
  },

}