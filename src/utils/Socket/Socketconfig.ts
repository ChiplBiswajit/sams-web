import { io } from "socket.io-client";
import { getObjByKey } from "./storage";
// const SOCKET_URL = 'https:apiman.in'
const SOCKET_URL = "https://wrenapi.larkaihealthcare.com/spread";

let stringToSend = "";

class WSService {
  disconnect() {
    throw new Error("Method not implemented.");
  }
  initializeSocket = async () => {
    try {
      this.socket = io(SOCKET_URL, {
        transports: ["websocket"],
        auth: {
            mobile: 7568993142,
            password: '123456789'
          },
          query: {
            patientId: '1234'
          }
      });
      this.socket.on("connect", (data: any) => {
        console.log("********* socket connected ********");
      });
      this.socket.on("disconnect", (data: any) => {
        console.log("********socket disconnected ********");
      });
      this.socket.on("error", (data: any) => {
        console.log("socket error", data);
      });
    } catch (error) {
      console.log("socket is not inialized", error);
    }
  };

  //   retrieveData = async () => {
  //     try {
  //       const storedData = await getObjByKey("obj");
  //       // console.log("Retriev+++++++++++++:+", storedData);
  //       stringToSend =
  //         storedData?.ambulanceId == null ? storedData : storedData?.ambulanceId;
  //       // console.log("--------------------", stringToSend);
  //     } catch (error) {
  //       // console.error("Error retrieving data:", error);
  //     }
  //   };

  //   emitStringOnceConnected = async () => {
  //     // Made this function async
  //     await this.retrieveData(); // Wait for data retrieval
  //     this.socket.emit("emit data", stringToSend);
  //   };

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
const Socketconfig = new WSService();

export default Socketconfig;
