import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./navigator";
import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Font from "expo-font";

export default function App() {
  const [ready, setReady] = useState(false);
  const onFinish = () => setReady(true);
  const startLoading = async () => {
    await Font.loadAsync(MaterialCommunityIcons.font);
  };
  if (!ready) {
    return (
      <AppLoading
        startAsync={startLoading}
        onFinish={onFinish}
        onError={console.error}
      />
    );
  }

  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
}
