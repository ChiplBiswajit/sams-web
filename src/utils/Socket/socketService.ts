import { io } from "socket.io-client";
import { getObjByKey } from "./storage";
// const SOCKET_URL = 'https:apiman.in'
// const SOCKET_URL = "https://0r4mtgsn-3004.inc1.devtunnels.ms/";
const SOCKET_URL = 'https://smartambulance.in/'
// const SOCKET_URL = "https://0r4mtgsn-3004.inc1.devtunnels.ms/"; //last local
// const SOCKET_URL = 'http://24x7healthcare.live/'//last lo cal/'
// const SOCKET_URL = "http://46.28.44.138:3004/"; //last lo cal/'
let stringToSend = "";

class WSService {
  disconnect() {
    throw new Error("Method not implemented.");
  }
  initializeSocket = async () => {
    try {
      this.socket = io(SOCKET_URL, {
        transports: ["websocket"],
      });
      this.socket.on("connect", (data: any) => {
        // console.log("=== socket connected ====");
        this.emitStringOnceConnected();
      });
      // console.log("initializing socket", this.socket)
      this.socket.on("disconnect", (data: any) => {
        // console.log("=== socket disconnected ====");
      });
      this.socket.on("error", (data: any) => {
        // console.log("socekt error", data);
      });
    } catch (error) {
      // console.log("scoket is not inialized", error);
    }
  };

  retrieveData = async () => {
    try {
      const storedData = await getObjByKey("obj");
      // console.log("Retriev+++++++++++++:+", storedData);
      stringToSend =
        storedData?.ambulanceId == null ? storedData : storedData?.ambulanceId;
      // console.log("--------------------", stringToSend);
    } catch (error) {
      // console.error("Error retrieving data:", error);
    }
  };

  emitStringOnceConnected = async () => {
    // Made this function async
    await this.retrieveData(); // Wait for data retrieval
    this.socket.emit("emit data", stringToSend);
  };
  socket: any;
  //--end--
  emit(event: any, data = {}) {
    this.socket.emit(event, data);
  }
  on(event: any, cb: any) {
    this.socket.on(event, cb);
  }
  removeListener(listenerName: any) {
    this.socket.removeListener(listenerName);
  }
}
const socketServcies = new WSService();

export default socketServcies;
