import EventBus from "../core/eventbus.js";
import { getStateWorld } from "../game_content/SaveManager/savemange.js";


let instance = null;

export default class ScreenManager {
  constructor(app) {
    this.app = app;
    this.screens = new Map();
    this.currentScreen = null;
    instance = this;
  }

  static getInstance() {
    return instance;
  }

  render() {
    if (this.current?.render) {
      this.current.render(this.app);
    }
  }

  register(name, screen) {
    this.screens.set(name, screen);
  }

  show(name, payload) {
    EventBus.clear();
    console.log(getStateWorld());
    const screen = this.screens.get(name);
    if (!screen) return console.warn(`Screen ${name} not found`);

    this.currentScreen = screen;
    screen.enter?.(payload);
    this.render(payload);
  }

  render(payload) {
    if (!this.currentScreen) return;
    this.currentScreen.render?.(this.app, payload);
  }
}