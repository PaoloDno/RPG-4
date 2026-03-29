import AudioManager from "../../../core/AudioManager/AudioManager.js";
import { getstate, setstate } from "../../../core/SaveManager/savemange.js";
import { headerImages } from "../../images/Images.js";

export const AudioHeader = {
  render() {
    const audio = AudioManager.getInstance();
    const state = getstate();
    const volume = state.world.volume;

    const wrapper = document.createElement("div");
    wrapper.style.position = "relative";
    wrapper.className = "header-wrapper-widget";

    const button = document.createElement("div");
    button.className = "widget-button";
    
    const icon = document.createElement("img");

    if (volume === 0) {
      icon.src = headerImages.mute;
    } else {
      icon.src = headerImages.sound;
    }

    icon.className = "widget-icon";

    button.appendChild(icon);

    const modal = this.renderModal(audio, state);

    // Toggle modal through gameState
    button.addEventListener("click", () => {
      const state = getstate();
      state.world.volumeModal = !state.world.volumeModal;
      setstate(state);

      modal.style.display = state.world.volumeModal ? "flex" : "none";
    });

    // initial state
    modal.style.display = state.world.volumeModal ? "flex" : "none";

    wrapper.append(button, modal);

    return wrapper;
  },

  renderModal(audio, state) {
    const modal = document.createElement("div");
    modal.className = "header-modal";

    const backDropModal = document.createElement("div");
    backDropModal.className = "modal-backdrop";

    const closeBtn = document.createElement("div");
    closeBtn.className = "modal-close";
    closeBtn.textContent = "X";

    const closeModal = () => {
      state.world.volumeModal = false;
      setstate(state);
      modal.style.display = "none";
    };

    closeBtn.addEventListener("click", closeModal);
    backDropModal.addEventListener("click", closeModal);

    const volume = state.world.volume;

    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";

    const textModal = document.createElement("span");
    textModal.innerHTML = `
      Volume
    `

    const content = document.createElement("span");
    content.className = "flex in-center";

    const label = document.createElement("span");
    label.style.zIndex = 32;
    label.textContent =
      volume === 0 ? "🔇" : volume < 0.4 ? "🔈" : volume < 0.7 ? "🔉" : "🔊";

    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = "0";
    slider.max = "1";
    slider.step = "0.05";
    slider.value = volume;
    slider.style.width = "120px";
    slider.style.zIndex = 32;

    slider.addEventListener("input", () => {
      const newVolume = parseFloat(slider.value);

      audio.setVolume(newVolume);

      label.textContent =
        newVolume === 0
          ? "🔇"
          : newVolume < 0.4
            ? "🔈"
            : newVolume < 0.7
              ? "🔉"
              : "🔊";
    });

    slider.addEventListener("change", () => {
      const state = getstate();
      state.world.volume = parseFloat(slider.value);
      state.world.volumeModal = false;
      setstate(state);

    });

    content.append(label, slider);
    modalContent.append(textModal, content, closeBtn);
    modal.append(modalContent, backDropModal);

    return modal;
  },
};
