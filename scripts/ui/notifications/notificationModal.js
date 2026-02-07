export function showNotification({
  text,
  speaker = null,
  portrait = null,
  variant = "system",
  buttonText = "OK",
  background = "",
  onConfirm = null,
}) {
  const modal = document.createElement("div");
  modal.className = `notification-modal ${variant}`;

  modal.innerHTML = `
    <div class="notification-backdrop"></div>

    <div class="notification-box"
         style="background-image:url('${background}')">

      ${
        variant === "hero"
          ? `
          <div class="notification-header">
            ${
              portrait
                ? `<img class="notification-portrait" src="${portrait}" />`
                : ""
            }
            <span class="notification-speaker">${speaker}</span>
          </div>
          `
          : ""
      }

      <p class="notification-text">${text}</p>
      <button id="notify-btn">${buttonText}</button>
    </div>
  `;

  app.appendChild(modal);

  modal.querySelector("#notify-btn").onclick = () => {
    if (typeof onConfirm === "function") onConfirm();
    modal.remove();
  };
}
