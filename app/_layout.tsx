import {Alert, SafeAreaView} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from "react";
import { Stack } from "expo-router";
import * as Font from 'expo-font';
import Header from "../component/Header";

// Prevent splash screen from hiding automatically
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Load fonts
        await Font.loadAsync({
          'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
          'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
          'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
          'Pacifico-Regular': require('../assets/fonts/Pacifico-Regular.ttf'),
        });

        // Reduce splash screen time to 500ms
        await new Promise(resolve => setTimeout(resolve, 500));

      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  useEffect(() => {
    if (appIsReady) {
      onLayoutRootView();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null; // Keep splash screen visible
  }

  return (
      <SafeAreaView style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <Header  onProfilePress={() => Alert.alert('Profile pressed!')} />
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaView>
  );
}
