

export const EquipmentModal = {
  render(gameState) {
    const modal = document.createElement("div");
    modal.className = "modal";

    modal.innerHTML = `
      <div class="modal-content">
        <div class="header-modal-content">
        <h2>Equipment</h2>
        <button class="close"> x </button>
        </div>
      </div>
    `;

    modal.querySelector(".close").onclick = () => {
      ModalManager.getInstance().close();
    };

    return modal;
  }
};