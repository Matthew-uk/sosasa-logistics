"use client";
import { useState } from "react";
import LoadingScreen from "./LoadingScreen";

export default function LoadingGate() {
  const [loading, setLoading] = useState(true);
  if (!loading) return null;
  return <LoadingScreen onComplete={() => setLoading(false)} />;
}
