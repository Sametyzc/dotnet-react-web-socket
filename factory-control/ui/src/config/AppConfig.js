export const BaseConfig = {
  apiUrl: 'https://localhost:44373',
  wsUrl: 'wss://localhost:44373',
  // socket has four state
  webSocketState: {
    CONNECTING: 0,
    OPEN: 1,
    CLOSING: 2,
    CLOSED: 3,
    NOTCONNECTED: 4, // I've added this so we can use it to understand that the connection hasn't started yet.
  },
};
