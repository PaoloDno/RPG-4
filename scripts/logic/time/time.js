import {
  getstate,
  setstate,
} from "../../game_content/SaveManager/savemange.js";

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

  let { time = 0, day = 1 } = state.world;

  time++;

  if (time >= 24) {
    time = 0;
    day++;
  }

  let week = Math.ceil(day / 7);
  const dayPhase = getDayPhase(time);

  console.log(`Day ${day} - ${time}:00 (${dayPhase})`);
  
  setstate({
    world: {
      ...state.world,
      time,
      day,
      week,
      dayPhase,
    },
  });

  return { time, day, week, dayPhase };
}
