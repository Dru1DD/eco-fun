import {
  Image,
  StyleSheet,
  Button,
  Dimensions,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";
import Dots from "react-native-dots-pagination";
import { router } from "expo-router";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { DefaultApi } from "@/api";
import { useEffect, useState } from "react";
import Carousel from "react-native-reanimated-carousel";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const api = new DefaultApi();

export default function HomeScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  // example usage of API
  useEffect(() => {
    console.log("HomeScreen mounted");
    api
      .mainScreenMainScreenGet("0")
      .then((response) => {
        console.log("API RESPONSE:");
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const onContinueWithDevicePressed = () => {
    router.replace("home");
  };

  const data = [
    {
      image: require("../assets/images/intro_1.png"),
      description: "Ready to start your recycling adventure?",
    },
    {
      image: require("../assets/images/intro_2.png"),
      description: "Snap, sort, and earn eco-points!",
    },
    {
      image: require("../assets/images/intro_3.png"),
      description: "Let's make the world cleaner, one game at a time!",
    },
  ];

  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image
          source={require("../assets/images/intro_logo.png")}
          style={styles.image}
        />
        <View style={styles.carouselContainer}>
          <Carousel
            loop
            width={width}
            height={(height / 100) * 50}
            autoPlay={true}
            data={data}
            scrollAnimationDuration={500}
            onSnapToItem={(index) => {
              setCurrentStep(index);
            }}
            // onProgressChange={(offsetProgress, absoluteProgress) => {
            //   console.log(absoluteProgress);
            //   const step = Math.round(absoluteProgress) + 1;
            //   // if (step)
            //   setCurrentStep(step);
            // }} // todo VERY SHIT SOLUTION
            renderItem={({ index }) => (
              <View
                style={{
                  flex: 1,
                  borderWidth: 0,
                  justifyContent: "center",
                  backgroundColor: "white",
                }}
              >
                <Image
                  source={data[index].image}
                  style={{
                    width: width * 0.8,
                    height: width * 0.8,
                    alignSelf: "center",
                    resizeMode: "contain",
                  }}
                />
                <Text
                  style={{ textAlign: "center", fontSize: 24, marginTop: 6 }}
                >
                  {data[index].description}
                </Text>
              </View>
            )}
          />
        </View>

        <Dots
          length={data.length}
          active={currentStep}
          activeColor="#347503"
          marginHorizontal={10}
        />
        <View style={{ flex: 1 }} />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} activeOpacity={0.9}>
            <Image
              source={require("../assets/images/google_icon.png")}
              style={{ marginRight: 10 }}
            />
            <Text style={styles.buttonText}>Google Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: "transparent" }]}
            activeOpacity={0.9}
            onPress={() => onContinueWithDevicePressed()}
          >
            <Text style={[styles.buttonText, { color: "#414141" }]}>
              Continue with device
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    paddingTop: 50,
  },
  carouselContainer: {
    width: "100%",
    height: "50%",
    marginBottom: 30,
  },
  image: {
    width: 70,
    height: 70,
    alignSelf: "center",
    resizeMode: "contain",
    marginBottom: 40,
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    width: "80%",
    maxWidth: 400,
    backgroundColor: "green",
    borderRadius: 50,
    padding: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
