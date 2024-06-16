import ArrowIcon from "@/components/icons/arrow";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen = () => {
  const handleLogout = () => {
    AsyncStorage.removeItem("deviceId");
    while (router.canGoBack()) {
      router.back();
    }
    router.replace("/");
  };
  return (
    <SafeAreaView>
      <View style={styles.topBarContainer}>
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "white",
            }}
          >
            Profile
          </Text>
        </View>

        <TouchableOpacity
          style={styles.circle}
          onPress={() => router.push("/game")}
        >
          <ArrowIcon />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <Text style={styles.textNick}>JohnDoe</Text>
        <Text style={styles.textEmail}>example@example.com</Text>
        <TouchableOpacity
          style={styles.buttonLogOut}
          onPress={() => handleLogout()}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Log out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topBarContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#9ABE56",
    padding: 20,
  },
  container: {},
  textNick: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 10,
  },
  textEmail: {
    fontSize: 20,
    marginLeft: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  buttonLogOut: {
    alignSelf: "center",
    alignContent: "center",
    alignItems: "center",
    width: "30%",
    backgroundColor: "red",
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 32 / 2,
    borderWidth: 1,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileScreen;
