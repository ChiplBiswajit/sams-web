import { io } from "socket.io-client";
import { getObjByKey } from "./storage";
// const SOCKET_URL = 'https:apiman.in'
const SOCKET_URL = "http://46.28.44.138:3004/";
// const SOCKET_URL = 'https://0r4mtgsn-3004.inc1.devtunnels.ms/'
// const SOCKET_URL = "https://0r4mtgsn-3004.inc1.devtunnels.ms/"; //last local
// const SOCKET_URL = 'http://24x7healthcare.live/'//last lo cal/'
// const SOCKET_URL = "http://46.28.44.138:3004/"; //last lo cal/'
let stringToSend = "";

class WSService {
  initializeSocket = async () => {
    try {
      this.socket = io(SOCKET_URL, {
        transports: ["websocket"],
      });
      this.socket.on("connect", (data: any) => {
        console.log("=== socket connected ====");
        this.emitStringOnceConnected();
      });
      // console.log("initializing socket", this.socket)
      this.socket.on("disconnect", (data: any) => {
        console.log("=== socket disconnected ====");
      });
      this.socket.on("error", (data: any) => {
        console.log("socekt error", data);
      });
    } catch (error) {
      console.log("scoket is not inialized", error);
    }
  };

  //  added
  // retrieveData = async () => {
  //   // console.log("hiiooooooooooooooiiiiiiiiiiiii")
  //   try {
  //     const storedData = await getObjByKey("obj");
  //     console.log("etrieved Data:",storedData)
  //     // console.log("Retrieved Data: in skt.js page = ", storedData);
  //     stringToSend =
  //       storedData?.ambulanceId == null ? storedData : storedData?.ambulanceId; // Assign the retrieved data to stringToSend
  //   } catch (error) {
  //     console.error("Error retrieving data:", error);
  //   }
  // };

  emitAllLocation = async () => {
    // Made this function async
    await this.retrieveData(); // Wait for data retrieval
    this.socket.emit("joinLocation", location);
  };

  retrieveAllLocation = async () => {
    try {
      const storedData = await getObjByKey("obj");
      console.log("Retriev+++++++++++++:+", storedData);
      // Assign the retrieved data to stringToSend
      location =
        storedData?.ambulanceId == null ? storedData : storedData?.ambulanceId;
      console.log("--------------------", location);
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };

  retrieveData = async () => {
    try {
      // Use setTimeout to add a delay of 2 minutes (120,000 milliseconds)
      // await new Promise(resolve => setTimeout(resolve, 2000));

      const storedData = await getObjByKey("obj");
      console.log("Retriev+++++++++++++:+", storedData);

      // Assign the retrieved data to stringToSend
      stringToSend =
        storedData?.ambulanceId == null ? storedData : storedData?.ambulanceId;
      console.log("--------------------", stringToSend);
    } catch (error) {
      console.error("Error retrieving data:", error);
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
