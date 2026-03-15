export function showNotification(config) {
  let resolvePromise;

  const promise = new Promise((resolve) => {
    resolvePromise = resolve;
  });

  const modal = document.createElement("div");
  modal.className = `notification-modal ${config.variant}`;

  modal.innerHTML = `
    <div class="notification-backdrop">
      <div class="notification-box">
        <div class="notification-container">
        <div class="notification-header"></div>
        <p class="notification-text"></p>
        <button class="notification-btn">${config.buttonText || "OK"}</button>
        </div>
      </div>
    </div>
  `;

  app.appendChild(modal);

  const textEl = modal.querySelector(".notification-text");
  const headerEl = modal.querySelector(".notification-header");
  const button = modal.querySelector(".notification-btn");
  const box = modal.querySelector(".notification-box");
  const backdrop = modal.querySelector(".notification-backdrop");

  function setContent({ text, speaker, portrait }) {
    textEl.textContent = text || "";

    headerEl.innerHTML = speaker
      ? `
        ${portrait ? `<img src="${portrait}" class="notification-img" />` : ""}
        <span class="notification-speaker">${speaker}</span>
      `
      : "";
  }

  function close() {
    // fade out
    box.style.opacity = 0;
    backdrop.style.opacity = 0;

    setTimeout(() => {
      modal.remove();
      config.onConfirm?.();
      resolvePromise();
    }, 350); // match fade-out duration
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
