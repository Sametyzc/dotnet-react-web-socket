import './App.css';
import React from 'react';
import { WebSocketProvider } from './context/WebSocket';
import { FactoryList } from './components/FactoryList';
import { WebSocketMonitoring } from './components/WebSocketMonitoring';
import { BaseConfig } from './config/AppConfig';

const factoryArray = [
  { id: 1, name: 'Fabrika 1', state: true, message: '' },
  { id: 2, name: 'Fabrika 2', state: false, message: 'Burada sorunlar var!' },
  { id: 3, name: 'Fabrika 3', state: true, message: '' },
  { id: 4, name: 'Fabrika 4', state: true, message: '' },
  { id: 5, name: 'Fabrika 5', state: false, message: 'Hayat zor!' },
  { id: 6, name: 'Fabrika 6', state: true, message: '' },
];

function App() {
  return (
    <WebSocketProvider>
      <WebSocketMonitoring state={BaseConfig.webSocketState.CLOSED} />
      <FactoryList factoryArray={factoryArray} />
    </WebSocketProvider>
  );
}

export default App;
