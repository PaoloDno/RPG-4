let instance = null;

export default class ModalManager {
  constructor(root) {
    this.root = root;
    instance = this;
  }

  static getInstance() {
    return instance;
  }

  open(modalElement) {
    this.root.innerHTML = "";
    this.root.appendChild(modalElement);
    this.root.style.display = "flex";
  }

  close() {
    this.root.innerHTML = "";
    this.root.style.display = "none";
  }
}