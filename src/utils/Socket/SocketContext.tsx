import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import socketServcies from '@/src/utils/Socket/socketService';

type SocketContextType = typeof socketServcies | null;

const SocketContext = createContext<SocketContextType>(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<SocketContextType>(null);

  useEffect(() => {
    const initializeSocket = async () => {
      await socketServcies.initializeSocket();
      setSocket(socketServcies);
    };

    initializeSocket();

    return () => {
      socketServcies.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
