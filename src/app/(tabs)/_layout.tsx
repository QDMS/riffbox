import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, Text, View, Image } from 'react-native';
import { useColorScheme } from '@/src/components/useColorScheme.web';
import { useClientOnlyValue } from '@/src/components/useClientOnlyValue';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { BottomTabBar } from '@react-navigation/bottom-tabs'
import Player from '@/src/components/Player';


// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={22} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: useClientOnlyValue(false, true),
        tabBarStyle: {
          elevation: 0,
          borderTopWidth: 0,
          backgroundColor: '#000',
        },
      }}
      tabBar={(props) => (
        <View style={{ backgroundColor: 'rgba(225,225,225, 0)' }}>
          <Player />
          <BottomTabBar {...props} />
        </View>)}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitleAlign: "center",
          title: '',
          tabBarLabel: ({ color, focused }) => (<Text style={{ color: focused ? "#e31b23" : color, fontSize: 13 }}>Home</Text>),
          tabBarIcon: ({ color, focused }) => <TabBarIcon name="home" color={focused ? "#e31b23" : color} />,
          headerLeft: () => (
            <Text style={{ color: "#e31b23", padding: 10, fontSize: 38, fontFamily: "MusicForYourEars", top: -10 }}>Riff</Text>
          ),
          headerRight: () => (
            <Text style={{ color: "#e31b23", padding: 10, fontSize: 38, fontFamily: "MusicForYourEars", top: -10 }}>Box</Text>
          ),
          headerStyle: { backgroundColor: "black" }, // Change the background color to black
          headerTitleStyle: { color: "white" }, // Change title color to white
          headerShadowVisible: false, // Remove elevation line
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={require('./../../../assets/images/RiffBox_header.png')}
                style={{ width: 45, height: 45, marginRight: -20, top: -5 }}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          headerShown: false,
          tabBarLabel: ({ color, focused }) => (<Text style={{ color: focused ? "#e31b23" : color, fontSize: 13 }}>Search</Text>),
          tabBarIcon: ({ color, focused }) => <TabBarIcon name="search" color={focused ? "#e31b23" : color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          headerTitleAlign: "center",
          tabBarLabel: ({ color, focused }) => (<Text style={{ color: focused ? "#e31b23" : color, fontSize: 13 }}>Favorites</Text>),
          tabBarIcon: ({ color, focused }) => <TabBarIcon name="heart" color={focused ? "#e31b23" : color} />,
        }}
      />
    </Tabs>
  );
}
