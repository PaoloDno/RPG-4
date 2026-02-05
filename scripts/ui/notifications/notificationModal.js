export function showNotification({
  text,
  buttonText = "OK",
  background = "",
  onConfirm = null
}) {

  const modal = document.createElement("div");
  modal.className = "notification-modal";
  modal.innerHTML = `
    <div class="notification-backdrop"></div>
    <div class="notification-box"
         style="background-image:url('${background}')">
      <p class="notification-text">${text}</p>
      <button id="notify-btn">${buttonText}</button>
    </div>
  `;

  app.appendChild(modal);

  document.getElementById("notify-btn").onclick = () => {
    if (typeof onConfirm === "function") {
      onConfirm();
    }
    modal.remove();
  };
}
