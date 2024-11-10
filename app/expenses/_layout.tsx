import { Stack } from "expo-router";
import * as React from "react";

export default function ExpensesLayout() {
  return (
    <Stack>
      <Stack.Screen name="new" />
    </Stack>
  );
}
