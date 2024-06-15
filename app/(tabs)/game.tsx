import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { StyleSheet, Image, Text, SafeAreaView, StatusBar, View, TouchableOpacity } from 'react-native';


export default function TabTwoScreen() {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  
  useEffect(() => {
    setIsClicked(false)
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Text style={{ color: "green", fontSize: 32, fontWeight: "bold"}}>Games</Text>
      {
        isClicked ? (<View style={{marginTop: 25}}>
          <Text style={{fontSize: 32}}>Coming soon....</Text>
        </View>) : (
        <TouchableOpacity style={{
          width: "100%",
          height: 225,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: "black",
          overflow: "hidden"
        }} onPress={() => setIsClicked(true)}>
          <Text style={{ margin: 5, fontSize: 24, color: "green"}}>Guesser</Text>
          <Image 
            source={require("../../assets/images/games/bg.png")}
            alt="bacgkround"
            style={{
              width: "100%",
              height: "100%"
            }}
          />     
           </TouchableOpacity>)
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
    paddingTop: 100,
    paddingHorizontal: 10
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
