export const floormaps = [
  [
    [["."], ["."], ["u"], ["."], ["."],],
    [["."], ["."], ["."], ["."], ["."],],
    [["."], ["."], ["m"], ["."], ["m"],],
    [["."], ["."], ["."], ["."], ["."],],
    [["."], ["b"], ["b"], ["b"], ["."],],
    [["."], ["b"], ["c"], ["b"], ["."],],
    [["."], ["b"], ["m"], ["b"], ["."],],
    [["d"], ["."], ["."], ["."], ["."],],
  ],

  [
    [["."], ["."], ["d"], ["."], ["."],],
    [["."], ["."], ["."], ["."], ["."],],
    [["."], ["b"], ["m"], ["."], ["m"],],
    [["b"], ["."], ["."], ["."], ["."],],
    [["."], ["."], ["b"], ["b"], ["b"],],
    [["."], ["b"], ["c"], ["b"], ["u"],],
    [["."], ["b"], ["m"], ["b"], ["."],],
    [["."], ["."], ["."], ["."], ["."],],
  ],

  [
    [["."], ["."], ["d"], ["."], ["."],],
    [["."], ["."], ["."], ["."], ["."],],
    [["."], ["."], ["m"], ["."], ["m"],],
    [["."], ["."], ["."], ["."], ["."],],
    [["."], ["b"], ["b"], ["b"], ["b"],],
    [["."], ["b"], ["c"], ["b"], ["u"],],
    [["."], ["b"], ["m"], ["b"], ["."],],
    [["."], ["."], ["."], ["."], ["."],],
  ],
];



export const TILE_DEF = {
  m: { passable: false, kind: "monster",  blocksSight: false },
  c: { passable: true,  kind: "chest",    blocksSight: false },
  d: { passable: true,  kind: "stairsDown", blocksSight: false },
  u: { passable: true,  kind: "stairsUp", blocksSight: false },
  b: { passable: false, kind: "block",    blocksSight: true  },
  ".": { passable: true,  kind: "floor",  blocksSight: false },
  null: { passable: false, kind: "off",    blocksSight: true  },
};


export const distanceHelper = (ax, ay, bx, by) => {
  return Math.abs(ax - bx) + Math.abs(ay - by);
}