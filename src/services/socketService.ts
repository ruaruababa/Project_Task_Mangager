import Echo from "laravel-echo";
import Pusher from "pusher-js";

declare global {
  interface Window {
    Echo: Echo;
    Pusher: Pusher;
  }
}

window.Pusher = Pusher as any;

export function createSocketConnection() {
  if (!window.Echo) {
    window.Echo = new Echo({
      broadcaster: "pusher",
      key: "a50b081069e6de5b052d",
      cluster: "ap1",
      encrypted: true,
      forceTLS: true,
    });
  }
}
