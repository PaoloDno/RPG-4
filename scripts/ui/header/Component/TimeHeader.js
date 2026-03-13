import { getstate, setstate } from "../../../core/SaveManager/savemange.js";

export const TimeHeader = {
  render(world) {
    const wrapper = document.createElement("div");
    wrapper.className = "header-wrapper-widget";

    const button = document.createElement("div");
    button.className = "widget-button";

    const state = getstate();

    const modal = this.renderModal(state);


    const orbit = document.createElement("div");
    orbit.className = "time-orbit";

    const sun = document.createElement("div");
    const moon = document.createElement("div");

    sun.textContent = "☀️";
    moon.textContent = "🌙";

    const hour = world.time;

    const sunAngle = (hour / 24) * 360;
    const moonAngle = sunAngle + 180;

    sun.style.transform = `rotate(${sunAngle}deg) translate(22px) rotate(-${sunAngle}deg)`;

    moon.style.transform = `rotate(${moonAngle}deg) translate(22px) rotate(-${moonAngle}deg)`;

    orbit.dataset.phase = world.dayPhase;

    sun.style.opacity = hour >= 6 && hour < 18 ? 1 : 0.3;
    moon.style.opacity = hour >= 18 || hour < 6 ? 1 : 0.3;

    orbit.appendChild(sun);
    orbit.appendChild(moon);

    button.addEventListener("click", () => {
      const state = getstate();
      state.world.timeModal = !state.world.timeModal;
      setstate(state);

      modal.style.display = state.world.timeModal ? "flex" : "none";
    });

    modal.style.display = state.world.timeModal ? "flex" : "none";

    button.append(orbit);

    wrapper.append(button, modal);

    return wrapper;
  },

  renderModal(state) {
    const modal = document.createElement("div");
    modal.className = "header-modal";

    const backDropModal = document.createElement("div");
    backDropModal.className = "modal-backdrop";

    const closeBtn = document.createElement("div");
    closeBtn.className = "modal-close";
    closeBtn.textContent = "X";

    const closeModal = () => {
      state.world.timeModal = false;
      setstate(state);
      modal.style.display = "none";
    };

    closeBtn.addEventListener("click", closeModal);
    backDropModal.addEventListener("click", closeModal);

    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";

    const content = document.createElement("span");
    content.className = "time-modal-content";

    const defaultLoc =
      state.position.floor === 1 &&
      state.position.x === 1 &&
      state.position.y === 1;

    const floor = defaultLoc ? "--" : state.position.floor;
    const x = defaultLoc ? "--" : state.position.x;
    const y = defaultLoc ? "--" : state.position.y;

    content.innerHTML = `
    <div class="time-modal-content">
      <h3>floor - ${floor}</h3>
      <h3>coor - ${x} : ${y}</h3>
      <h3>time - ${state.world.time} : ${state.world.dayPhase}</h3>
      <h3>week - ${state.world.week} - day - ${state.world.day}</h3>
      <h3>story progress : ${state.world.progress}</h3>
    </div>
    `;

    modalContent.append(content, closeBtn);
    modal.append(modalContent, backDropModal);
    return modal;
  },
};
