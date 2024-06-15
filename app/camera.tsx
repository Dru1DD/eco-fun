import { CameraView, useCameraPermissions } from "expo-camera";
import { SafeAreaView, ScrollView, Image, StatusBar } from "react-native";
import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import ArrowIcon from "@/components/icons/arrow";
import InfoIcon from "@/components/icons/info";
import TrashInfo from "@/components/trash-info";

function CameraPage() {
  const router = useRouter();
  const [showInfo, setShowInfo] = useState<boolean>(true);
  const [facing, setFacing] = useState("true");
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </SafeAreaView>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  if (showInfo) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar />
        <ScrollView
          style={{ flex: 1, backgroundColor: "white", paddingTop: 100 }}
        >
          <Text style={{ textAlign: "center", fontSize: 24 }}>
            Instructions
          </Text>
          <TrashInfo
            color="#F3EA004D"
            iconUrl={require("../assets/images/trash/orange.png")}
            title="Plastics &Metal"
            description={[
              "Plastic bottles",
              "Metal beverage and food cans",
              "Plastic food containers",
            ]}
          />
          <TrashInfo
            color="#3E8F024D"
            iconUrl={require("../assets/images/trash/green.png")}
            title="Glass"
            description={[
              "Glass bottles and jars",
              "Broken glass items",
              "Glass cosmetic bottles",
            ]}
          />
          <TrashInfo
            color="#385DDE4D"
            iconUrl={require("../assets/images/trash/purple.png")}
            title="Paper and Cardboard"
            description={[
              "Newspapers and magazines",
              "Paper bags",
              "Office paper and drafts",
            ]}
          />
          <TrashInfo
            color="#8146004D"
            iconUrl={require("../assets/images/trash/red.png")}
            title="Organic Waste"
            description={[
              "Vegetable and fruit scraps",
              "Coffee grounds and tea bags",
              "Bread and cereal leftovers",
            ]}
          />
          <TrashInfo
            color="#5C5C5C4D"
            iconUrl={require("../assets/images/trash/grey.png")}
            title="Other waste"
            description={[]}
          />
          <TouchableOpacity
            onPress={() => setShowInfo(false)}
            style={{
              width: "80%",
              backgroundColor: "#347503",
              borderRadius: 20,
              borderWidth: 1,
              borderColor: "#fff",
              height: 40,
              marginLeft: "auto",
              marginRight: "auto",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 24 }}>Start</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        <View style={styles.overlayContainer}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.circle}
              onPress={() => router.back()}
            >
              <ArrowIcon />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowInfo(true)}>
              <InfoIcon />
            </TouchableOpacity>
          </View>
          <View
            style={{
              ...styles.transparentContainer,
              backgroundColor: "blue !imporant",
            }}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={toggleCameraFacing}
            >
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#00000050",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    marginTop: 20,
    width: "100%",
    height: 100,
    backgroundColor: "00000020",
    color: "white",
  },
  camera: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlayContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    // backgroundColor: "#00000050",
    justifyContent: "space-between",
    alignItems: "center",
  },

  transparentContainer: {
    width: "90%",
    height: "80%",
    borderRadius: 12,
    opacity: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    height: 50,
    width: "100%",
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
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

export default CameraPage;
