import { getstate, setstate } from "../../../core/SaveManager/savemange.js";

export const PartyHeader = {

  render() {
    const container = document.createElement("div");
    container.className = "header-wrapper-widget";

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

    container.append(button, modal);

    return container;
  },

  renderModal(state) {

    const modal = document.createElement("div");
    modal.className = "header-modal";

    const backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop";

    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";

    const closeBtn = document.createElement("div");
    closeBtn.className = "modal-close";
    closeBtn.textContent = "X";

    const content = document.createElement("span");
    content.className = "party-modal-content";

    const closeModal = () => {
      state.world.partyModal = false;
      state.world.dynamicHeaderState = {};
      setstate(state);
      modal.style.display = "none";
    };

    closeBtn.onclick = closeModal;
    backdrop.onclick = closeModal;

    modalContent.append(closeBtn, content);
    modal.append(backdrop, modalContent);

    if (state.party.length > 0) {
      content.append(this.renderPartyList(state.party));
    } else {
      content.innerHTML = `<p>No Party Yet</p>`;
    }

    return modal;
  },

  renderPartyList(party) {

    const grid = document.createElement("div");
    grid.className = "party-grid";

    const title = document.createElement("span");
    title.className = "absolute-title";
    title.innerText = "PARTY";

    grid.append(title);

    party.forEach((character, index) => {

      const card = document.createElement("div");
      card.className = "party-card";

      const sprite = document.createElement("img");
      sprite.src = character.chibisprite;
      sprite.className = "party-card-sprite";

      const name = document.createElement("div");
      name.textContent = character.name;

      card.append(sprite, name);

      card.onclick = () => {

        const state = getstate();

        state.world.dynamicHeaderState = {
          characterIndex: index,
          characterPanel: "status"
        };

        setstate(state);

        const modalContent = document.querySelector(".party-modal-content");
        modalContent.innerHTML = "";
        modalContent.append(this.renderCharacterView(state.party, index));
      };

      grid.append(card);

    });

    return grid;
  },

  renderCharacterView(party, index) {

    const wrapper = document.createElement("div");
    wrapper.className = "party-character-view";

    const topSection = document.createElement("div");
    topSection.className = "top-div-header-party";

    const bottomSection = document.createElement("div");
    bottomSection.className = "bot-div-header-party";

    const character = party[index];

    const name = document.createElement("h3");
    name.textContent = character.name;
    name.className = "textContent-char-name-header-modal";

    const sprite = document.createElement("img");
    sprite.src = character.chibisprite;
    sprite.className = "sprite-hero-icon-header-modal";

    const basicInfo = document.createElement("div");
    basicInfo.className = "party-stats-party-header-modal";

    basicInfo.innerHTML = `
      <p>Class: ${character.class}</p>
      <p>Element: ${character.element}</p>
      <p>Level: ${character.level}</p>
    `;

    const nav = this.renderCharacterNavigation(wrapper, party, index);

    topSection.append(name, sprite, basicInfo, nav);

    const { tabNav, tabContent } = this.renderBottomTabs(character);

    bottomSection.append(tabNav, tabContent);

    wrapper.append(topSection, bottomSection);

    return wrapper;
  },

  renderCharacterNavigation(wrapper, party, index) {

    const nav = document.createElement("div");
    nav.className = "party-nav-party-header-modal";

    const prevBtn = document.createElement("button");
    prevBtn.textContent = "<";

    const nextBtn = document.createElement("button");
    nextBtn.textContent = ">";

    const backBtn = document.createElement("button");
    backBtn.textContent = "<<";

    backBtn.className = "button-nav-party-header-modal";
    prevBtn.className = "button-nav-party-header-modal";
    nextBtn.className = "button-nav-party-header-modal";

    prevBtn.onclick = () => {

      index--;
      if (index < 0) index = party.length - 1;

      const container = wrapper.parentElement;
      container.innerHTML = "";
      container.append(this.renderCharacterView(party, index));
    };

    nextBtn.onclick = () => {

      index++;
      if (index >= party.length) index = 0;

      const container = wrapper.parentElement;
      container.innerHTML = "";
      container.append(this.renderCharacterView(party, index));
    };

    backBtn.onclick = () => {

      const state = getstate();
      const container = wrapper.parentElement;

      container.innerHTML = "";
      container.append(this.renderPartyList(state.party));
    };

    nav.append(prevBtn, backBtn, nextBtn);

    return nav;
  },

  renderBottomTabs(character) {

    const nav = document.createElement("div");
    nav.className = "bottom-nav-party-header-modal";

    const content = document.createElement("div");

    const statusBtn = document.createElement("button");
    statusBtn.textContent = "Status";
    statusBtn.className = "bottom-nav-button-party-header-modal";

    const attributesBtn = document.createElement("button");
    attributesBtn.textContent = "Attributes";
    attributesBtn.className = "bottom-nav-button-party-header-modal";

    const equipmentBtn = document.createElement("button");
    equipmentBtn.textContent = "Equipment";
    equipmentBtn.className = "bottom-nav-button-party-header-modal";

    const skillsBtn = document.createElement("button");
    skillsBtn.textContent = "Skills";
    skillsBtn.className = "bottom-nav-button-party-header-modal";

    let currentTab = "status";

    const render = () => {
      content.innerHTML = "";
      content.append(this.renderCharacterTab(character, currentTab));
    };

    
    statusBtn.onclick = () => {
      currentTab = "status";
      render();
    };

    attributesBtn.onclick = () => {
      currentTab = "attributes";
      render();
    };

    equipmentBtn.onclick = () => {
      currentTab = "equipment";
      render();
    };

    skillsBtn.onclick = () => {
      currentTab = "skills";
      render();
    };

    nav.append(statusBtn, attributesBtn, equipmentBtn, skillsBtn);

    render();

    return { tabNav: nav, tabContent: content };
  },

  renderCharacterTab(character, tab) {

    const wrapper = document.createElement("div");
    wrapper.className = "char-details-party-header-modal";

    const statsLeft = ["str", "mgk", "sta", "mna", "hlt"];
    const statsRight = ["res", "def", "spd", "dex"];

    if (tab === "status") {
      wrapper.innerHTML = `
      <p>Character Status</p>
      
      <div class="status-party-header-modal">
      <div class="flex col">
        <p>hp: <span class="text-red">${character.status.hp}</span> / ${character.status.maxHp}</p>
        <p>mp: <span class="text-blue">${character.status.mp}</span> / ${character.status.maxMp}</p>
        <p>sp: <span class="text-green">${character.status.sp}</span> / ${character.status.maxSp}</p>
      </div>
      <div class="flex col">
        <p>exp: ${character.status.exp} / ${character.status.toLvlUp}</p>
        <p>totalExp: ${character.status.totalExp}</p>
      </div>
      </div>
      `
    }

    if (tab === "attributes") {

      wrapper.innerHTML = `
        <p>Attributes</p>
        <div class="attributes-party-header-modal">
          <div>
          ${statsLeft.map(stat => `
            <p class="tl">${stat}: <span class="text-green">${character.baseStats?.[stat] || 0}</span>
            + <span class="text-blue">${character.equipementStats?.[stat] || 0}</span></p>
          `).join("")}
          </div>

          <div>
          ${statsRight.map(stat => `
            <p class="tl">${stat}: <span class="text-green">${character.baseStats?.[stat] || 0}</span>
            + <span class="text-blue">${character.equipementStats?.[stat] || 0}</span></p>
          `).join("")}
          </div>
        </div>
      `;
    }

    if (tab === "equipment") {

      wrapper.innerHTML = `
        <p>Equipment</p>
        <div class="equipment-party-header-modal">
        ${Object.entries(character.equipment || {})
          .map(([slot, item]) => `<p>${slot}: ${item?.name || "None"}</p>`)
          .join("")}
        </div>`;
    }

    if (tab === "skills") {

      wrapper.innerHTML = `
        <p>Skills</p>
        ${(character.skills || [])
          .map(skill => `<p>${skill.name}</p>`)
          .join("")}
      `;
    }

    return wrapper;
  }
};