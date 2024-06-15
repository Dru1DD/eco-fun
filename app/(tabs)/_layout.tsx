import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import { CurvedBottomBarExpo } from "react-native-curved-bottom-bar";
import { TouchableOpacity, StyleSheet } from 'react-native';

import ExplorePage from "./explore";
import HomePage from "./home";

const TabNavigator = () => {

  // const _renderIcon = (routeName: string, selectedTab: any) => {
  //   switch (routeName) {
  //     case "Home":
  //       return (
  //         <Image
  //           style={[
  //             {
  //               width: 50,
  //               height: 50,
  //             },
  //             selectedTab === routeName && {
  //               ...styles.shadow,
  //               shadowColor: "#581E88",
  //               shadowRadius: 4,
  //               shadowOpacity: 1,
  //               overflow: "hidden",
  //             },
  //           ]}
  //           source={require("../assets/images/home.png")}
  //         />
  //       );
  //     case "WalletStack":
  //       return (
  //         <Image
  //           style={[
  //             {
  //               width: 80,
  //               height: 80,
  //             },
  //             selectedTab === routeName && {
  //               ...styles.shadow,
  //               shadowColor: "#581E88",
  //               shadowRadius: 10,
  //               overflow: "hidden",
  //             },
  //           ]}
  //           source={require("../assets/images/wallet.png")}
  //         />
  //       );
  //   }
  // };

  const renderTabBar = ({
    routeName,
    selectedTab,
    navigate,
  }: {
    routeName: string;
    selectedTab: string;
    navigate: any;
  }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigate(routeName);
        }}
        style={styles.tabbarItem}
      >
        {/* {_renderIcon(routeName, selectedTab)} */}
        {selectedTab}
      </TouchableOpacity>
    );
  };


  return(
    <CurvedBottomBarExpo.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarItemStyle: {
          backgroundColor: "transparent",
        },
      }}
      type="DOWN"
      style={styles.shadow}
      shadowStyle={styles.shawdow}
      height={55}
      circleWidth={50}
      bgColor="#9ABE56"
      tabBar={renderTabBar}
      circlePosition={"CENTER"}
      renderCircle={({ selectedTab, navigate, routeName }) => (
        <TouchableOpacity
          style={[styles.btnCircle]}
        >
         Home Page
        </TouchableOpacity>
      )}
    >
      <CurvedBottomBarExpo.Screen
        name="Home"
        position="LEFT"
        component={HomePage}
      />
      <CurvedBottomBarExpo.Screen
        name="WalletStack"
        position="RIGHT"
        component={ExplorePage}
      />
    </CurvedBottomBarExpo.Navigator>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
   <TabNavigator/>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  btnCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#9ABE56",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
    bottom: 28,
  },
  shawdow: {
    shadowColor: "#DDDDDD",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button: {
    flex: 1,
    justifyContent: "center",
  },
  bottomBar: {},
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8E8E8",
    bottom: 18,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: "gray",
  },
  tabbarItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: 30,
    height: 30,
  },
  screen1: {
    flex: 1,
    backgroundColor: "#BFEFFF",
  },
  screen2: {
    flex: 1,
    backgroundColor: "#FFEBCD",
  },
  shadow: {
    shadowColor: "#DDDDDD",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
});
