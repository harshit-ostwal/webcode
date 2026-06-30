"use client";
import QueryProvider from "./react-query-provider";
import SocketProvider from "./socket-provider";

export default function AppProvider({ children }) {
  return (
    <QueryProvider>
      <SocketProvider>{children}</SocketProvider>
    </QueryProvider>
  );
}
