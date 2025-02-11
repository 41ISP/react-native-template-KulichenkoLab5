import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { ITodo } from '@/entities/todo.model';
import { Alert, Button, FlatList, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { customAlphabet } from 'nanoid/non-secure';
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const nanoid = customAlphabet("adcdefghijklmnopqrstuvwxyz0123456789", 10)
  const contact = [
    {
      task: "123",
      id: nanoid(),
      state: false
    },
  ]

  const colorScheme = useColorScheme();
  const [mainSwitch, setMainSwitch] = useState(false);
  const [newTaskName, setNewTaskName] = useState("")
  const [tasks, setTasks] = useState([...contact])
  const [filtertodo, setFilterTodo] = useState([...tasks])
  
  const handleclick = () => {
    if (newTaskName.trim().length > 0 && newTaskName.trim().length < 20) {
      setNewTaskName('')
      setTasks([...tasks, { id: nanoid(), task: newTaskName.trim(), state: false }])
    }
    else {
      Alert.alert("неверное значение")
    }
  }



  useEffect(() => {
    if (mainSwitch) {
      setFilterTodo(tasks.filter((task) => task.state !== mainSwitch))
    }
    else {
      setFilterTodo([...tasks])
    }
  }, [mainSwitch, tasks])
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const toggleSwitch = (id: string) => {
    const newTasks = []
    for (let i of tasks) {
      if (i.id === id) {
        newTasks.push({ ...i, state: !i.state })
      } else {
        newTasks.push(i)
      }
    }
    setTasks(newTasks)
  }

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  const handleDelete = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={styles.containerTask}>
        <View style={styles.container}>
          <TextInput value={newTaskName} onChangeText={setNewTaskName} placeholder='' style={styles.styleinput} returnKeyType="done" maxLength={19}/>
          <TouchableOpacity onPress={handleclick} style={styles.button}><Text>добавить</Text></TouchableOpacity>
        </View>
        <FlatList
          data={filtertodo}
          keyExtractor={(item) => item.id}
          renderItem={({ item },) => (
            <View style={styles.container}>
              <Text>{item.task}</Text>
              <TouchableOpacity style={styles.button} onPress={() => handleDelete(item.id)}><Text>удалить</Text></TouchableOpacity>
              <Switch value={item.state} onValueChange={() => { toggleSwitch(item.id) }}></Switch>
            </View>
          )}></FlatList>
      </View>
    </ThemeProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: 'center',
  },
  containerTask: {
    alignItems: 'center',
    flexDirection: "column",
    justifyContent: 'center',
  },
  text: {
    color: "#ff0000",
    fontSize: 24,
  },
  button: {
    marginLeft: 10,
    width: 70,
    height: 30,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10
  },

  styleinput: {
    width: 140,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor:'#000000',
    marginTop: 10,
  }
});