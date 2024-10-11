import { router } from 'expo-router';
import { Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';

export default function App() {
  const handlePressStarted=()=>{
    router.push("(auth)/signIn")
  }
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl text-center p-3 font-bold">Welcome! Muhammad Wasiq Ansari...</Text>
      <CustomButton handlePress={handlePressStarted} title="Get Started" containerStyle="bg-yellow-600 p-2 rounded-md" titleStyle="text-white"/>
    </View>
  );
}

