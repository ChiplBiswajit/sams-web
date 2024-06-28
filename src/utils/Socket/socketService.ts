import { io, Socket } from "socket.io-client";
import { getObjByKey } from "./storage";

// const SOCKET_URL = "https://0r4mtgsn-3004.inc1.devtunnels.ms/";
const SOCKET_URL = "https://24x7healthcare.live";
// const SOCKET_URL = "https://smartambulance.in/";

let stringToSend = "";

class WSService {
  private static instance: WSService;
  private socket: Socket | undefined;

  private constructor() {}

  public static getInstance(): WSService {
    if (!WSService.instance) {
      WSService.instance = new WSService();
    }
    return WSService.instance;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      console.log("Socket disconnected");
    } else {
      console.error("Socket is not initialized.");
    }
  }

  initializeSocket = async (): Promise<void> => {
    if (this.socket) {
      console.log("Socket is already initialized.");
      return;
    }

    try {
      this.socket = io(SOCKET_URL, {
        transports: ["websocket"],
      });

      this.socket.on("connect", () => {
        console.log("=== socket connected ====", this.socket?.id);
        // this.emitStringOnceConnected();
      });

      this.socket.on("disconnect", () => {
        console.log("=== socket disconnected ====");
      });

      this.socket.on("error", (data: any) => {
        console.error("socket error", data);
      });
    } catch (error) {
      console.error("Socket is not initialized", error);
    }
  };

  retrieveData = async (): Promise<void> => {
    try {
      const storedData = await getObjByKey("obj");
      console.log("Retrieved data:", storedData);
      stringToSend = storedData?.ambulanceId ?? storedData;
      // console.log("String to send:", stringToSend);
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };

  emit(event: string, data = {}): void {
    if (this.socket) {
      console.log(`Emitting event "${event}" with data:`, data, "on socket ID:", this.socket.id);
      this.socket.emit(event, data);
    } else {
      console.error("Socket is not initialized.");
    }
  }

  on(event: string, cb: (data: any) => void): void {
    if (this.socket) {
      this.socket.on(event, cb);
    } else {
      console.error("Socket is not initialized.");
    }
  }

  removeListener(listenerName: string): void {
    if (this.socket) {
      this.socket.removeListener(listenerName);
    } else {
      console.error("Socket is not initialized.");
    }
  }
}

const socketServices = WSService.getInstance();

export default socketServices;
