import React, { useState } from "react";
import Home from "./screens/Home";
import Setting from "./screens/Setting";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import colors from "./colors";
import Note from "./screens/Note";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddJournal from "./components/AddJournal";
import { DBContext } from "./context";
import EditJournal from "./components/EditJournal";
import DetailJournal from "./components/DetailJournal";
import Game from "./screens/Game";

const Tabs = createBottomTabNavigator();
const Stacks = createNativeStackNavigator();

export default function Navigator() {
  const [contextDB, setContextDB] = useState({});

  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        presentation: "modal",
        tabBarActiveTintColor: "black",
        tabBarActiveBackgroundColor: colors.grayColor,
        tabBarShowLabel: false,
        tabBarItemStyle: {
          borderRadius: 20,
          width: 10,
          marginHorizontal: 20,
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={"home-outline"} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="RootNote"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={"reader-outline"} color={color} size={size} />
          ),
        }}
      >
        {() => (
          <DBContext.Provider value={{ contextDB, setContextDB }}>
            <Stacks.Navigator screenOptions={{ headerShown: false }}>
              <Stacks.Screen name="Note" component={Note} />
              <Stacks.Screen name="Journal" component={AddJournal} />
              <Stacks.Screen name="EditJournal" component={EditJournal} />
              <Stacks.Screen name="DetailJournal" component={DetailJournal} />
            </Stacks.Navigator>
          </DBContext.Provider>
        )}
      </Tabs.Screen>

      <Tabs.Screen
        name="Game"
        component={Game}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name={"game-controller-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={"settings-outline"} color={color} size={size} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
