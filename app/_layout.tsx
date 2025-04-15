import { Alert, SafeAreaView } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from "react";
import { router, Stack, usePathname } from "expo-router";
import * as Font from 'expo-font';
import Header from "../component/Header";

// Prevent splash screen from hiding automatically
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const pathname = usePathname();
  const [showHeader, setShowHeader] = useState(false);

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

        // Delay splash screen slightly
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

  // Hide header instantly when pathname updates
  useEffect(() => {
    setShowHeader(pathname !== '/screens/signin' && pathname !== '/screens/signup');
  }, [pathname]);

  if (!appIsReady) {
    return null;
  }

  return (
      <SafeAreaView style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <Header  onProfilePress={() => router.navigate('/screens/signin')} showHeader={showHeader} />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
              name={'screens/signin'}
              options={{
                title: 'Sign In',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                  fontSize: 15,
                  fontWeight: 'bold',
                  fontFamily: 'Poppins-Regular',
                },
              }}
          />
        </Stack>

      </SafeAreaView>
  );
}
