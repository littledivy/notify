import { StatusBar } from "expo-status-bar";
import {
  Button,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { manufacturer, modelName } from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

const { expoConfig } = Constants;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const api = expoConfig.hostUri.split(`:`).shift().concat(`:3000`) ||
  `api.example.com`;

const Status = {
  READY: "Ready",
  CONNECTING: "Running...",
  DONE: "Done",
  ERROR: "Not connected",
};

export default function App() {
  const [reconnect, setReconnect] = useState(false);
  const [status, setStatus] = useState(Status.READY);

  useEffect(() => {
    console.log(`Connecting to the WebSocket server at ws://${api}/`);
    const ws = new WebSocket(`ws://${api}/`);

    ws.onopen = () => {
      console.log("Connected to the WebSocket server");
      setStatus(Status.CONNECTING);
    };

    ws.onerror = (e) => {
      // console.error('An error occurred:', e.message);
      setStatus(Status.ERROR);
    };

    ws.onmessage = (e) => {
      Notifications.scheduleNotificationAsync({
        content: JSON.parse(e.data),
        trigger: null,
      });
      setStatus(Status.DONE);
    };
  }, [reconnect]);

  return (
    <View style={styles.container}>
      <Text
        style={{ fontSize: 20, marginBottom: 20 }}
      >
        Deno + React Native! 🦕
      </Text>
      <Text>Manufacturer: {manufacturer}</Text>
      <Text>Model: {modelName}</Text>

      {status && (
        <Text style={{ marginTop: 20 }}>
          {status}
        </Text>
      )}
      {status !== Status.CONNECTING && (
        <Button
          title="Reconnect"
          onPress={() => setReconnect(!reconnect)}
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
