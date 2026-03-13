import { getstate, setstate } from "../../../core/SaveManager/savemange.js";

export const GoldHeader = {

  render() {

    const state = getstate();

    const wrapper = document.createElement("div");
    wrapper.className = "header-wrapper-widget";
    wrapper.style.position = "relative";

    const button = document.createElement("div");
    button.className = "widget-button";
    button.textContent = `bag`;

    const modal = this.renderModal(state);

    button.addEventListener("click", () => {

      state.world.bagModal = !state.world.bagModal;
      
      state.world.audioModal = false;
      setstate(state);

      modal.style.display = state.world.bagModal ? "flex" : "none";

    });

    modal.style.display = state.world.bagModal ? "flex" : "none";

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
      state.world.bagModal = false;
      setstate(state);
      modal.style.display = "none";
    };
    
    closeBtn.addEventListener("click", closeModal);
    backDropModal.addEventListener("click", closeModal);

    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";

    const content = document.createElement("div");
    content.innerHTML = `
      <div class="bag-header-content">
        <h3>Player Resources</h3>

        <div class="resource-row">
          <span>Gold</span>
          <span>${state.gold}</span>
        </div>

        <div class="resource-row">
          <span>Bag Items</span>
          <span>${state.bag.length}</span>
        </div>

        <div class="resource-row">
          <span>Ingredients</span>
          <span>${state.ingredients.length}</span>
        </div>

        <div class="resource-row">
          <span>Equipment</span>
          <span>${state.inventory.length}</span>
        </div>

        <div class="resource-row">
          <span>Key Items</span>
          <span>${state.keyItems.length}</span>
        </div>

      </div>
    `;

    modalContent.append(content, closeBtn);
    modal.append(modalContent, backDropModal);

    return modal;
  }

};