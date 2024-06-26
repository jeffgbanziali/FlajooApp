// socket.js
import { io } from "socket.io-client";
import { MESSAGE_ADRESS_IP } from "@env";;

const socket = io(`ws://${MESSAGE_ADRESS_IP}:8900`, {
    autoConnect: false,
});

export default socket;
