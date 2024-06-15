import { Image, StyleSheet, Button } from 'react-native';
import { Link } from 'expo-router';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { DefaultApi } from '@/api';
import { useEffect } from 'react';

const api = new DefaultApi();

export default function HomeScreen() {
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

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
        <Link href={"/home"} style={{
            color: "#FFF"
        }}>Go To Tabs</Link>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
