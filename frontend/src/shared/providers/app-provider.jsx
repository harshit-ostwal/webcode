"use client";
import QueryProvider from "./react-query-provider";

export default function AppProvider({ children }) {
  return <QueryProvider>{children}</QueryProvider>;
}
