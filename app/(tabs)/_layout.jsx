import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const TabsLayout = () => {
  const TabBarIcon = ({ name }) => {
    return (
      <Ionicons name={name} size={25} color="white"/>
    )
  }
  return (
    <Tabs screenOptions={{ tabBarShowLabel: false, tabBarStyle: { backgroundColor: "black" } }}>
      <Tabs.Screen name="home" options={{ headerShown: false, tabBarIcon: ({ focused,size }) => (<TabBarIcon name={focused ? `home` : "home-outline"} />) }} />
      <Tabs.Screen name="bookmark" options={{ headerShown: false, tabBarIcon: ({ focused }) => (<TabBarIcon name={focused ? "bookmark" : "bookmark-outline"}/>) }} />
      <Tabs.Screen name="create" options={{ headerShown: false, tabBarIcon: ({ focused }) => (<TabBarIcon name={focused ? "add-circle" : "add-circle-outline"} />) }} />
      <Tabs.Screen name="profile" options={{ headerShown: false, tabBarIcon: ({ focused }) => (<TabBarIcon name={focused ? "person" : "person-outline"} />) }} />
      <Tabs.Screen name="settings" options={{ headerShown: false, tabBarIcon: ({ focused }) => (<TabBarIcon name={focused ? "settings" : "settings-outline"}/>) }} />
    </Tabs>
  )
}
export default TabsLayout