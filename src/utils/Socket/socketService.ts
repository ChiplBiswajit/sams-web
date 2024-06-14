import { io, Socket } from "socket.io-client";
import { getObjByKey } from "./storage";

const SOCKET_URL = "https://0r4mtgsn-8004.inc1.devtunnels.ms/";
let stringToSend = "";

class WSService {
  off(arg0: string, handleAllLocation: (msg: any) => void) {
    throw new Error('Method not implemented.');
  }
  private socket: Socket | undefined;

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      console.log("Socket disconnected");
    } else {
      console.error("Socket is not initialized.");
    }
  }

  initializeSocket = async (): Promise<void> => {
    try {
      this.socket = io(SOCKET_URL, {
        transports: ["websocket"],
      });

      this.socket.on("connect", () => {
        console.log("=== socket connected ====");
        this.emitStringOnceConnected();
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



  emitStringOnceConnected = async (): Promise<void> => {
    // await this.retrieveData();
    if (this.socket) {
      this.socket.emit("emit data", stringToSend);
    } else {
      console.error("Socket is not initialized.");
    }
  };

  emit(event: string, data = {}): void {
    if (this.socket) {
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

console.log("callll");


const socketServices = new WSService();

export default socketServices;
