import { showNotification } from "../../ui/notifications/notificationModal.js";

let notificationQueue = [];
let isShowingNotification = false;

export function queueNotification(config) {
  notificationQueue.push(config);
  processNotificationQueue();
}

function processNotificationQueue() {
  if (isShowingNotification) return;
  if (notificationQueue.length === 0) return;
  console.log("SHOW Q", notificationQueue);
  isShowingNotification = true;

  const next = notificationQueue.shift();

  showNotification({
    ...next,
    onConfirm: () => {
      isShowingNotification = false;
      processNotificationQueue();
    },
  });
}
