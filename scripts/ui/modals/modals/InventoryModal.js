

export const InventoryModal = {
  render(gameState) {
    const modal = document.createElement("div");
    modal.className = "modal";

    const modalContent = document.createElement("div");

    modal.innerHTML = `
      <div class="modal-content">
        <div class="header-modal-content">
        <h2>Inventory</h2>
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