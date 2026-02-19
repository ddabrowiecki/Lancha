import { useState } from "react";
import { ThemedView } from "@/components/themed-view";
import LoginScreen from "@/components/LoginScreen";

export default function HomeScreen() {
  const [loggedIn, setLoggedIn] = useState(false);

  return loggedIn ? <div>Hello World</div> : <LoginScreen />;
}
