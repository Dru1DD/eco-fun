import {
  Image,
  StyleSheet,
  Platform,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
  ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { DefaultApi } from "@/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = new DefaultApi();

export default function HomeScreen() {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [pointsAmount, setPointsAmount] = useState(0);
  // const data = [
  //   {
  //     title: "Copernikus",
  //     description: "The museum you need to visit",
  //     image:
  //       "https://go2warsaw.pl/wp-content/uploads/centrum-nauki-kopernik-fot-iwona-gmyrek.jpg",
  //     price: 0,
  //   },
  //   {
  //     title: "Warsaw Zoo",
  //     description:
  //       "The zoo you need to visit in near future d to visit in near future in Warsaw town",
  //     image:
  //       "https://upload.wikimedia.org/wikipedia/commons/b/b9/Miejski_Ogrod_Zoologiczny_w_Warszawie_-_Ptaszarnia.JPG",
  //     price: 50,
  //   },
  //   {
  //     title: "Copernikus",
  //     description: "The museum you need to visit",
  //     image:
  //       "https://go2warsaw.pl/wp-content/uploads/centrum-nauki-kopernik-fot-iwona-gmyrek.jpg",
  //     price: 200,
  //   },
  //   {
  //     title: "Warsaw Zoo",
  //     description: "The zoo you need to visit",
  //     image:
  //       "https://upload.wikimedia.org/wikipedia/commons/b/b9/Miejski_Ogrod_Zoologiczny_w_Warszawie_-_Ptaszarnia.JPG",
  //     price: 50,
  //   },
  // ];

  useEffect(() => {
    console.log("HomeScreen mounted");
    AsyncStorage.getItem("deviceId").then((deviceId) => {
      api
        .mainScreenMainScreenGet(deviceId as string)
        .then((response) => {
          console.log("API RESPONSE:");
          console.log(response.data);
          setIsLoading(false);
          response.data?.marketplaces && setData(response.data.marketplaces);
          response.data?.pointsAmount &&
            setPointsAmount(response.data.pointsAmount);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }, [isLoading]);

  const onClickProfile = () => {
    router.push("profile");
  };

  const onClickRedeem = (item) => {
    console.log("Redeem item", item);
    setIsLoading(true);
    AsyncStorage.getItem("deviceId").then((deviceId) => {
      api.claimTicketClaimPost(deviceId as string, item.id).then((response) => {
        setIsLoading(false);
        setSelectedItem(item);
      });
    });
  };
  const renderItem = ({ item, index }) => (
    <View
      style={[styles.itemContainer, index === 0 ? styles.itemContainerAD : []]}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.priceLabel}>
        Cost:{" "}
        <Text style={styles.price}>
          {item.price === 0 ? "Free" : item.price}
          <Image
            style={{ width: 26, height: 26, resizeMode: "contain" }}
            source={require("../../assets/images/diamond_icon.png")}
          />
        </Text>
      </Text>
      <TouchableOpacity
        disabled={pointsAmount < item.price}
        style={[
          styles.button,
          pointsAmount < item.price && styles.buttonDisabled,
        ]}
        onPress={() => {
          onClickRedeem(item);
        }}
      >
        <Text style={styles.buttonText}>Redeem ticket</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView>
      {isLoading ? (
        <Modal visible={isLoading} transparent={true}>
          <View style={styles.modalContainer}>
            <ActivityIndicator size="large" color="green" />
          </View>
        </Modal>
      ) : null}
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
            Awards
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Image
            style={{
              width: 30,
              height: 30,
              resizeMode: "contain",
              marginRight: 6,
            }}
            source={require("../../assets/images/diamond_icon.png")}
          />
          <Text style={styles.pointsAmount}>{pointsAmount}</Text>
        </View>

        <TouchableOpacity onPress={() => onClickProfile()}>
          <Image
            style={{ width: 34, height: 34, resizeMode: "contain" }}
            source={require("../../assets/images/user_avatar_icon.png")}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingBottom: 150,
          paddingTop: 20,
          backgroundColor: "#F5F5F5",
        }}
        keyExtractor={(item, index) => index.toString()}
      />

      <Modal visible={selectedItem !== null} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Congratulations!</Text>
          <Text style={styles.modalDescription}>
            Your ticket has been redeemed successfully, enjoy your visit! 🎉
            {"\n"}
            Save QR code and show it on the entrance.
          </Text>
          <Image
            source={require("../../assets/images/rickrolling_qr_code.png")}
            style={styles.modalImage}
          />
          <Text style={styles.modalPriceLabel}>
            Cost:{" "}
            <Text style={styles.modalPrice}>
              {selectedItem?.price}
              <Image
                style={{ width: 26, height: 26, resizeMode: "contain" }}
                source={require("../../assets/images/diamond_icon.png")}
              />
            </Text>
          </Text>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => setSelectedItem(null)}
          >
            <Text style={styles.modalCloseButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topBarContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#9ABE56",
    padding: 20,
  },
  pointsAmount: {
    color: "white",
    fontSize: 20,
  },
  itemContainer: {
    marginBottom: 20,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
  },
  itemContainerAD: {
    backgroundColor: "#faf3c5",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 16,
    resizeMode: "cover",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 5,
  },
  priceLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: "#347503",
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#347503",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonDisabled: {
    backgroundColor: "#C4C4C4",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 30,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
    color: "white",
  },
  modalImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 10,
  },
  modalPriceLabel: {
    fontSize: 16,
    marginBottom: 10,
    color: "white",
  },
  modalPrice: {
    fontWeight: "bold",
    color: "white",
  },
  modalCloseButton: {
    backgroundColor: "#9ABE56",
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  modalCloseButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
