import { useColorScheme } from '@/hooks/useColorScheme';

import { CurvedBottomBarExpo } from "react-native-curved-bottom-bar";
import { TouchableOpacity, StyleSheet, Image } from 'react-native';

import GamePage from "./game";
import MartkeplacePage from "./marketplace";
import { GameIcon } from '@/components/icons/game';
import { AchievementIcon } from '@/components/icons/achivement';
import { CameraIcon } from '@/components/icons/camera';
import { useRouter } from 'expo-router';

const TabNavigator = () => {
  const router = useRouter();

  const _renderIcon = (routeName: string, selectedTab: any) => {
    switch (routeName) {
      case "Game":
        return (
          <GameIcon isActive={selectedTab === routeName} />
        );
      case "Marketplace":
        return (
          <AchievementIcon isActive={selectedTab===routeName
          }/>
        );
    }
  };

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
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };


  return(
    <CurvedBottomBarExpo.Navigator
      initialRouteName="Marketplace"
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
          onPress={() => router.replace("camera")}
        >
          <CameraIcon />
        </TouchableOpacity>
      )}
    >
      <CurvedBottomBarExpo.Screen
        name="Marketplace"
        position="LEFT"
        component={MartkeplacePage}
      />
      <CurvedBottomBarExpo.Screen
        name="Game"
        position="RIGHT"
        component={GamePage}
      />
    </CurvedBottomBarExpo.Navigator>
  );
}

export default function TabLayout() {
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
