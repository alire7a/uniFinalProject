import { io } from 'socket.io-client';

export const socket = io("http://192.168.1.143:3000",  {
    withCredentials: true,
    extraHeaders: {
      "my-custom-header": "abcd"
    }
  });
