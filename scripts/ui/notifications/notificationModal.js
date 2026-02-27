export function showNotification(config) {
  let resolvePromise;

  const promise = new Promise((resolve) => {
    resolvePromise = resolve;
  });

  const modal = document.createElement("div");
  modal.className = `notification-modal ${config.variant}`;

  modal.innerHTML = `
    <div class="notification-box">
      <div class="notification-header"></div>
      <p class="notification-text"></p>
      <button id="notify-btn">${config.buttonText || "OK"}</button>
    </div>
  `;

  app.appendChild(modal);

  const textEl = modal.querySelector(".notification-text");
  const headerEl = modal.querySelector(".notification-header");
  const button = modal.querySelector("#notify-btn");

  function setContent({ text, speaker, portrait }) {
    textEl.textContent = text || "";

    headerEl.innerHTML = speaker
      ? `
        ${portrait ? `<img src="${portrait}" />` : ""}
        <span>${speaker}</span>
      `
      : "";
  }

  function close() {
    modal.remove();

    config.onConfirm?.();

    resolvePromise();
  }

  button.onclick = close;

  // set initial content
  setContent(config);

  return {
    promise,
    setContent,
    close,
    modal,
  };
}
