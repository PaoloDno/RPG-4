import { getstate, getStateWorld, setstate } from "../../game_content/SaveManager/savemange.js";

const DAY_PHASES = [
  { name: "Night", start: 0, end: 5 },
  { name: "Morning", start: 6, end: 11 },
  { name: "Noon", start: 12, end: 17 },
  { name: "Evening", start: 18, end: 23 },
];

export function getDayPhase(hour) {
  return (
    DAY_PHASES.find((p) => hour >= p.start && hour <= p.end)?.name || "Night"
  );
}

export function timePlusOne() {
  const state = getstate();
  let { time, day } = state.world;

  time += 1;

  if (time >= 24) { time = 0; day++; }

  const dayPhase = getDayPhase(time);

  setstate({
    world: {
      ...state.world,
      time,
      day,
      dayPhase,
    },
  });

  return { time, day, dayPhase };
}