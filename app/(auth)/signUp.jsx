import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomInputField from '../../components/CustomInputField'
import CustomButton from '../../components/CustomButton'
import { useState } from 'react'
import { useSignUp } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'

const signUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()
  const [form, setForm] = useState({ username: "", email: "", password: "" })
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return
    }

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      setPendingVerification(true)
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  const onPressVerify = async () => {
    if (!isLoaded) {
      return
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      })

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId })
        router.push('/(tabs)/home')
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2))
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <SafeAreaView className="flex justify-center px-4 h-full">
      {!pendingVerification && (
        <>
          <CustomInputField title="Username" value={form.username} handleTextChange={(e) => setForm({ ...form, username: e })} />
          <CustomInputField title="Email" value={form.email} handleTextChange={(e) => setForm({ ...form, email: e })} />
          <CustomInputField title="Password" value={form.password} handleTextChange={(e) => setForm({ ...form, password: e })} />
          <View className="flex flex-row">
            <CustomButton title="Sign Up" containerStyle="bg-yellow-600 p-3 mt-2 rounded-md w-18" titleStyle="text-white font-semibold text-center" handlePress={onSignUpPress} />
          </View>
        </>
      )}
      {pendingVerification && (
        <>
          <CustomInputField title="Verify" value={code} handleTextChange={(e) => setCode(e)} />
          <View className="flex flex-row">
            <CustomButton title="Verify" containerStyle="bg-yellow-600 p-3 mt-2 rounded-md w-18" titleStyle="text-white font-semibold text-center" handlePress={onPressVerify} />
          </View>
        </>
      )}
    </SafeAreaView>
  )
}

export default signUp