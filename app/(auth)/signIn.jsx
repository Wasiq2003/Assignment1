import { SafeAreaView, View} from 'react-native'
import React from 'react'
import CustomInputField from '../../components/CustomInputField'
import CustomButton from '../../components/CustomButton'
import { router, useRouter } from 'expo-router'
import { useSignIn } from '@clerk/clerk-expo'
import { useState } from 'react'

const signIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [form,setForm] = useState({email:"",password:""})

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) {
      return
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.push('/(tabs)/home')
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }, [isLoaded, form.email, form.password])
  
  const handlePressSignup = ()=>{
    router.push("(auth)/signUp")
  }
  return (
    <SafeAreaView className="flex justify-center px-4 h-full">
      <CustomInputField title="Email" value={form.email} handleTextChange={(e)=>setForm({...form,email:e})}/>
      <CustomInputField title="Password" value={form.password} handleTextChange={(e)=>setForm({...form,password:e})}/>
      <View className="flex flex-row">
        <CustomButton handlePress={onSignInPress} title="Sign In" containerStyle="bg-yellow-600 p-3 mt-2 rounded-md w-18" titleStyle="text-white font-semibold text-center"/>
        <CustomButton handlePress={handlePressSignup} title="Sign Up" containerStyle="bg-yellow-600 p-3 mt-2 ml-2 rounded-md w-18" titleStyle="text-white font-semibold text-center"/>
      </View>
    </SafeAreaView>
  )
}

export default signIn