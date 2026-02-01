export default class ScreenManager {
  constructor(app) {
    this.app = app;
    this.screens = new Map();
    this.currentScreen = null;
  }

  register(name, screen) {
    this.screens.set(name, screen);
  }

  show(name, payload) {
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