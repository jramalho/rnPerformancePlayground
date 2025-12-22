import React from "react";
import { Text } from "react-native";

export function RenderCounter({ label }: { label: string }) {
  const renders = React.useRef(0);
  renders.current += 1;
  return <Text>{label} renders: {renders.current}</Text>;
}