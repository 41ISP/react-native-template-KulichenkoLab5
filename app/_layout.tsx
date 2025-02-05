import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { StyleSheet,  Text,  TouchableOpacity } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { View } from 'react-native';
import styled from 'styled-components';
import { blue } from 'react-native-reanimated/lib/typescript/Colors';
import { TextInput } from 'react-native-gesture-handler';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [counter, setCounter] = useState(0)
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const handlePress = () => {
    setCounter((val) => val + 1)
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.button}>click</Text>
        </TouchableOpacity>
        <Text style={styles.text}>
          {counter}
        </Text>
        <TextInput style={styles.input}
        placeholder='введите задачу'

        returnKeyType='done'/>
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:100,
    flexDirection: "row"
  },
  button: {
    color: "#000000",
    backgroundColor: "ffffff",
    padding: 50
  },
  text: {
    color: "#ff0000",
    fontSize: 64
  },
  input: {
    width: 250,
    fontSize: 20,
    fontWeight: 100,
  }
});


