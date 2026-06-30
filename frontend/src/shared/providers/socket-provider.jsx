"use client";

import { createContext, useContext, useEffect, useState } from "react";
import socket from "@/lib/socket";

/**
 * @typedef {Object} SocketContextValue
 * @property {import("socket.io-client").Socket} socket - The socket instance
 * @property {boolean} isConnected - Whether the socket is currently connected
 */

/** @type {React.Context<SocketContextValue>} */
const SocketContext = createContext(null);

/**
 * Provides the socket instance and connection state to the component tree.
 *
 * - Connects the socket when the component mounts (user is in the app)
 * - Tracks isConnected state via socket lifecycle events
 * - Disconnects cleanly on unmount (e.g. user signs out / navigates away)
 *
 * @param {{ children: React.ReactNode }} props
 */
export default function SocketProvider({ children }) {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Connect when the provider mounts
    socket.connect();

    const onConnect = () => {
      setIsConnected(true);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    // If already connected when this effect runs (e.g. HMR), sync state
    if (socket.connected) {
      setIsConnected(true);
    }

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}

/**
 * Hook to consume the SocketContext.
 * Must be used inside a component wrapped by SocketProvider.
 *
 * @returns {SocketContextValue}
 */
export function useSocket() {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
}
