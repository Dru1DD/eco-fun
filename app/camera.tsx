import { CameraView, useCameraPermissions } from "expo-camera";
import {
  SafeAreaView,
  ScrollView,
  Image,
  StatusBar,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from "react-native";
import { useRef, useState } from "react";
import { useRouter } from "expo-router";
import ArrowIcon from "@/components/icons/arrow";
import InfoIcon from "@/components/icons/info";
import TrashInfo from "@/components/trash-info";
import { Buffer } from "buffer";

import { DefaultApi } from "@/api";

const api = new DefaultApi();

const trashesInfo = [
  {
    bg: "#F3EA004D",
    color: "METAL_PLASTIC",
    title: "Plastics & Metal",
    description: [
      "Plastic bottles",
      "Metal beverage and food cans",
      "Plastic food containers",
    ],
    imageSource: require("../assets/images/trash/orange.png"),
  },
  {
    color: "GLASS",
    title: "Glass",
    description: [
      "Glass bottles and jars",
      "Broken glass items",
      "Glass cosmetic bottles",
    ],
    bg: "#3E8F024D",
    imageSource: require("../assets/images/trash/green.png"),
  },
  {
    color: "PAPER",
    title: "Paper and Cardboard",
    description: [
      "Vegetable and fruit scraps",
      "Coffee grounds and tea bags",
      "Bread and cereal leftovers",
    ],
    bg: "#385DDE4D",
    imageSource: require("../assets/images/trash/blue.png"),
  },
  {
    color: "BIO",
    title: "Organic Waste",
    description: [
      "Vegetable and fruit scraps",
      "Coffee grounds and tea bags",
      "Bread and cereal leftovers",
    ],
    bg: "#8146004D",
    imageSource: require("../assets/images/trash/red.png"),
  },
  {
    color: "MIXED",
    title: "Other waste",
    description: [],
    bg: "#5C5C5C4D",
    imageSource: require("../assets/images/trash/grey.png"),
  },
];

function CameraPage() {
  const router = useRouter();
  const [showInfo, setShowInfo] = useState(true);
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [imageUrl, setImageUrl] = useState("");
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [choosenTrash, setChoosenTrash] = useState<any>(null);
  const [status, setStatus] = useState<any>(null);
  const [message, setMessage] = useState("");

  const cameraRef = useRef();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.permissionText}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </SafeAreaView>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const shootPhoto = async () => {
    if (!cameraRef.current) return null;
    try {
      const result = await cameraRef.current.takePictureAsync({
        base64: true,
        quality: 0,
        scale: 0.5,
      });
      if (!result) throw new Error("Something went wrong");

      setImageUrl(result.base64);
      setIsGameStarted(true);
    } catch (e) {
      console.log(e);
    }
  };

  const sendDataToBackend = async (index: number) => {
    try {
      setIsLoading(true);
      setChoosenTrash(index);

      const result = await api
        .verifyPhotoVerifyPost({
          user_id: "asdsadas",
          binTypeGuess: trashesInfo[index].color as any,
          file: imageUrl,
        })
        .catch((e) => console.log("Error", e.message));

      if (!result) throw new Error("Something went wrong");

      console.log("Result", result.data.payload);

      setStatus(
        result.data.payload.isBinTypeGuessCorrect ? "success" : "failed"
      );
      setMessage(result.data.payload.notesFromAI as string);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  if (showInfo) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar />
        <ScrollView style={styles.scrollView}>
          <Text style={styles.instructionsTitle}>Instructions</Text>
          {trashesInfo.map((item, index) => (
            <TrashInfo
              key={`trashInfo-${index}`}
              color={item.bg}
              iconUrl={item.imageSource}
              title={item.title}
              description={item.description}
            />
          ))}
          <TouchableOpacity
            onPress={() => setShowInfo(false)}
            style={styles.startButton}
          >
            <Text style={styles.startButtonText}>Start</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const resetFunc = () => {
    setChoosenTrash(null);
    setIsGameStarted(false);
    setStatus(null);
    setImageUrl("");
    setIsLoading(false);
    setFacing("back");
    setShowInfo(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        ref={cameraRef}
        pictureSize="640x480"
      >
        <View style={styles.overlayContainer}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.circle}
              onPress={() => router.push("/game")}
            >
              <ArrowIcon />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowInfo(true)}>
              <InfoIcon />
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.transparentContainer,
              status && styles.gameStarted,
            ]}
          >
            { isGameStarted && !status && imageUrl && <Image 
              source={{ uri: `data:image/png;base64,${imageUrl}` }}
              style={{
                borderRadius: 20,
                position: "absolute",
                width: "100%",
                height: "100%"
              }}
            />}
            {isGameStarted ? (
              isLoading ? (
                <ActivityIndicator size="large" />
              ) : status ? (
                status === "success" ? (
                  <View style={styles.resultContainer}>
                    <Image
                      source={require("../assets/images/success.png")}
                      alt="success"
                      style={styles.resultImage}
                    />
                    <View
                      style={{
                        flexDirection: "column",
                        alignSelf: "center",
                        justifyContent: "flex-start",
                        flex: 1,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 32,
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        10+ points 🥳
                      </Text>
                      <Text
                        style={{
                          fontSize: 32,
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        {message}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View style={styles.failedContainer}>
                    <Image
                      source={require("../assets/images/failed.png")}
                      alt="failed"
                      style={styles.failedImage}
                    />
                    <Text
                      style={{
                        fontSize: 32,
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      {message}
                    </Text>
                  </View>
                )
              ) : null
            ) : null}
          </View>
          <View
            style={
              isGameStarted ? styles.gameContainer : styles.buttonContainer
            }
          >
            {isGameStarted ? (
              choosenTrash !== null ? (
                status !== null ? (
                  <TouchableOpacity
                    style={[styles.trashImageContainer, styles.button]}
                    onPress={resetFunc}
                  >
                    <Text style={{ color: "#fff", fontSize: 20 }}>
                      Take the next photo
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.trashImageContainer}
                    onPress={() => setIsLoading(true)}
                  >
                    <Image
                      source={trashesInfo[choosenTrash].imageSource}
                      alt={trashesInfo[choosenTrash].title}
                      style={styles.trashImage}
                    />
                  </TouchableOpacity>
                )
              ) : (
                <ScrollView horizontal style={styles.trashScrollView}>
                  {trashesInfo.map((item, index) => (
                    <TouchableOpacity
                      key={`trash-${index}`}
                      style={styles.trashButton}
                      onPress={() => sendDataToBackend(index)}
                    >
                      <Image
                        source={item.imageSource}
                        alt={item.title}
                        style={styles.trashImage}
                      />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )
            ) : (
              <View style={styles.actionButtonsContainer}>
                <TouchableOpacity style={styles.button} onPress={shootPhoto}>
                  <Text style={styles.text}>Take a photo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, { marginLeft: 5 }]}
                  onPress={toggleCameraFacing}
                >
                  <Text style={styles.text}>Flip Camera</Text>
                </TouchableOpacity>
              </View>
            )}
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
  permissionText: {
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 100,
  },
  instructionsTitle: {
    textAlign: "center",
    fontSize: 24,
  },
  startButton: {
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
  },
  startButtonText: {
    color: "#fff",
    fontSize: 24,
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
    justifyContent: "space-between",
    alignItems: "center",
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
  transparentContainer: {
    width: "90%",
    height: "60%",
    justifyContent: "center",
    alignItems: "center", 
    opacity: 1,
    borderRadius: 30,
    borderColor: "green",
    borderWidth: 10,
  },
  gameStarted: {
    backgroundColor: "#fff",
  },
  resultContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 20,
    width: "100%",
    height: "100%",
    padding: 10,
  },
  resultImage: {
    width: 200,
    height: 200,
  },
  failedContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    borderRadius: 20,
    padding: 10,
  },
  failedImage: {
    width: 300,
    height: 300,
  },
  buttonContainer: {
    flexDirection: "row",
    height: 100,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  gameContainer: {
    width: "100%",
    height: 100,
    flexDirection: "row",
    alignItems: "center",
  },
  actionButtonsContainer: {
    paddingHorizontal: 5,
    flexDirection: "row",
    maxWidth: "100%",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
    backgroundColor: "green",
    justifyContent: "center",
    color: "white",
    maxWidth: "100%",
    borderRadius: 20,
    height: 50,
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
  trashImageContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 10,
  },
  trashScrollView: {
    maxWidth: "100%",
  },
  trashButton: {
    marginHorizontal: 5,
  },
  trashImage: {
    width: 70,
    height: 70,
  },
});

export default CameraPage;
