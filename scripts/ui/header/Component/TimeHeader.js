export const TimeHeader = {

  render(world){

    const wrapper = document.createElement("div");
    wrapper.className = "time-widget";

    const orbit = document.createElement("div");
    orbit.className = "time-orbit";

    const sun = document.createElement("div");
    const moon = document.createElement("div");

    sun.textContent = "☀️";
    moon.textContent = "🌙";

    const hour = world.time;

    const sunAngle = (hour / 24) * 360;
    const moonAngle = sunAngle + 180;

    sun.style.transform =
      `rotate(${sunAngle}deg) translate(22px) rotate(-${sunAngle}deg)`;

    moon.style.transform =
      `rotate(${moonAngle}deg) translate(22px) rotate(-${moonAngle}deg)`;

    orbit.dataset.phase = world.dayPhase;

      sun.style.opacity = (hour >= 6 && hour < 18) ? 1 : 0.3;
      moon.style.opacity = (hour >= 18 || hour < 6) ? 1 : 0.3;

    orbit.appendChild(sun);
    orbit.appendChild(moon);

    wrapper.appendChild(orbit);

    return wrapper;
  }
};