import { getstate } from "../../../core/SaveManager/savemange.js";

export const GoldHeader = {

  render(){

    const state = getstate();

    const wrapper = document.createElement("div");
    wrapper.className = "header-gold";

    wrapper.textContent = `Gold: ${state.gold}`;

    return wrapper;
  }

};