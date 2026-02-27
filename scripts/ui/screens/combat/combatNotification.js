export function showCombatNotification(config) {
  let resolvePromise;

  const promise = new Promise(resolve => {
    resolvePromise = resolve;
  });

  const modal = document.createElement("div");
  modal.className = `notification-modal battle-variant`;

  modal.innerHTML = `
    <div class="notification-combat-box">
      <div class="notification-combat-header"></div>
      <p class="notification-combat-text"></p>
      <button id="notify-combat-btn">${config.buttonText || "Ok"}</button>
    </div>
  `;

  app.appendChild(modal);

  const textEl = modal.querySelector(".notification-combat-text");
  const headerEl = modal.querySelector(".notification-combat-header");
  const button = modal.querySelector(".notify-button");

  function setContent({
    text,
    speaker,
    portrait,
  }) {
    textEl.textContent = text || "";

    headerEl.innerHTML = speaker
      ? `
        ${portrait ? `<img src="${portrait}">` : ""}
        <span>${speaker}</span>
      `
      : "";
  }

  function close() {
    modal.remove();
    resolvePromise();
  }

  button.onClick = close;

  setContent(config);

  return {
    promise,
    setContent,
    close,
    modal,
  };
}