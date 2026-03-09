
import { getStateWorld } from "../../core/SaveManager/savemange.js";

let instance = null;

export default class HeaderManager {
  constructor(headerRoot) {
    this.headerRoot = headerRoot;
    this.components = new Map();
    instance = this;
  }

  static getInstance() {
    return instance;
  }

  register(name, component) {
    this.components.set(name, component);
  }

  render() {
    const world = getStateWorld();

    this.headerRoot.innerHTML = "";

    this.components.forEach((component) => {
      const el = component.render(world);
      if (el) this.headerRoot.appendChild(el);
    });
  }
}
