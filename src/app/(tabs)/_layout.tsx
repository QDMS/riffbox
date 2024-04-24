import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
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
          borderTopWidth:0,
          backgroundColor: '#000',
        },
      }}
      tabBar={(props) => (
      <View style={{ backgroundColor: 'rgba(225,225,225, 0)' }}>
        <Player />
        <BottomTabBar {...props}/>
      </View>)}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitleAlign: "center",
          title: 'Home',
          tabBarLabel: ({ color, focused }) => (<Text style={{ color: focused ? "#e31b23" : color, fontSize: 13 }}>Home</Text>),
          tabBarIcon: ({ color, focused }) => <TabBarIcon name="home" color={focused ? "#e31b23" : color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
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
