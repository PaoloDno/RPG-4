import AudioManager from "../../../core/AudioManager/AudioManager.js";
import { getstate, setstate } from "../../../core/SaveManager/savemange.js";

export const AudioHeader = {
  render() {
    const audio = AudioManager.getInstance();
    const state = getstate();
    const volume = state.world.volume;

    const wrapper = document.createElement("div");
    wrapper.style.position = "relative";
    wrapper.className = "header-wrapper-widget"

    const button = document.createElement("div");
    button.className = "widget-button";
    button.textContent =
      volume === 0 ? "🔇" : volume < 0.4 ? "🔈" : volume < 0.7 ? "🔉" : "🔊";


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

    modal.className = "audio-modal";

    const volume = state.world.volume;

    const label = document.createElement("span");
    label.textContent =
      volume === 0 ? "🔇" : volume < 0.4 ? "🔈" : volume < 0.7 ? "🔉" : "🔊";

    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = "0";
    slider.max = "1";
    slider.step = "0.05";
    slider.value = volume;
    slider.style.width = "120px";

    slider.addEventListener("input", () => {
      const state = getstate();
      const newVolume = parseFloat(slider.value);

      state.world.volume = newVolume;
      setstate(state);

      if (audio.music) audio.music.volume = newVolume;
      audio.sounds.forEach(sound => sound.volume = newVolume);

      label.textContent =
        newVolume === 0 ? "🔇"
        : newVolume < 0.4 ? "🔈"
        : newVolume < 0.7 ? "🔉"
        : "🔊";
    });

    modal.append(label, slider);

    return modal;
  }
};