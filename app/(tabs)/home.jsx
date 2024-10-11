import React from 'react'
import { View, Text } from 'react-native'
import { SignedIn, useUser } from '@clerk/clerk-expo'



function Home() {
  const { user } = useUser()

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <SignedIn>
        <Text className="text-2xl text-center p-3 font-bold">Hello {user?.emailAddresses[0].emailAddress}</Text>
      </SignedIn>
    </View>
  )
}
export default Home