import { getstate, setstate } from "../../../core/SaveManager/savemange.js";

export const PartyHeader = {
  render() {
    const wrapper = document.createElement("div");
    wrapper.className = "header-wrapper-widget";

    const button = document.createElement("div");
    button.className = "widget-button";
    button.textContent = "Party";

    const state = getstate();

    const modal = this.renderModal(state);

    button.addEventListener("click", () => {
      const state = getstate();
      state.world.partyModal = !state.world.partyModal;
      setstate(state);

      modal.style.display = state.world.partyModal ? "flex" : "none";
    });

    modal.style.display = state.world.partyModal ? "flex" : "none";

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
      state.world.partyModal = false;

      setstate(state);
      modal.style.display = "none";
    };

    state.world.dynamicHeaderState = {
      flex: true,
    };

    closeBtn.addEventListener("click", closeModal);
    backDropModal.addEventListener("click", closeModal);

    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";

    const content = document.createElement("span");
    content.className = "party-modal-content";

    modalContent.append(closeBtn, content);
    modal.append(backDropModal, modalContent);

    if (state.party.length > 0) {
      content.append(this.renderCharList(state.party));
    } else {
      content.innerHTML = `
      <div>
        <p>No Party Yet</p>
      </div>
      `
    }

    return modal;
  },

  renderCharList(party) {
    const grid = document.createElement("div");
    grid.className = "party-grid";

    party.forEach((char, index) => {
      const card = document.createElement("div");
      card.className = "party-card";

      const img = document.createElement("img");
      img.src = char.chibisprite;
      img.className = "party-card-sprite";

      const name = document.createElement("div");
      name.textContent = char.name;

      card.append(img, name);

      card.addEventListener("click", () => {
        const state = getstate();
        state.world.dynamicHeaderState = {
          characterIndex: index,
        };
        setstate(state);

        const modalContent = document.querySelector(".party-modal-content");
        modalContent.innerHTML = "";
        modalContent.append(this.renderCharacter(state.party, index));
      });

      grid.append(card);
    });

    return grid;
  },

  renderCharacter(party, index) {
    const wrapper = document.createElement("div");
    wrapper.className = "party-character-view";

    const topDiv = document.createElement("div");
    const botDiv = document.createElement("div");
    topDiv.className = "top-div-header-party"
    botDiv.className = "bot-div-header-party"
    
    const char = party[index];

    const name = document.createElement("h3");
    name.textContent = char.name;

    const sprite = document.createElement("img");
    sprite.src = char.chibisprite;
    sprite.className = "sprite-hero-icon";

    const stats = document.createElement("div");
    stats.className = "party-stats";

    stats.innerHTML = `
    <p>Class: ${char.class}</p>
    <p>Element: ${char.element}</p>
    <p>Level: ${char.level}</p>
  `;

    const nav = document.createElement("div");
    nav.className = "party-nav";

    const left = document.createElement("button");
    left.textContent = "<";

    const right = document.createElement("button");
    right.textContent = ">";

    const back = document.createElement("button");
    back.textContent = "Back";

    left.addEventListener("click", () => {
      index--;
      if (index < 0) index = party.length - 1;

      const container = wrapper.parentElement;
      container.innerHTML = "";
      container.append(this.renderCharacter(party, index));
    });

    right.addEventListener("click", () => {
      index++;
      if (index >= party.length) index = 0;

      const container = wrapper.parentElement;
      container.innerHTML = "";
      container.append(this.renderCharacter(party, index));
    });

    back.addEventListener("click", () => {
      const state = getstate();
      const container = wrapper.parentElement;

      container.innerHTML = "";
      container.append(this.renderCharList(state.party));
    });

    nav.append(left, back, right);
    topDiv.append(name, sprite, stats, nav)
    wrapper.append(topDiv, botDiv);

    return wrapper;
  },
};
