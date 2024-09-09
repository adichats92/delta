import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, View } from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';

export default function App() {
	const { isLoading, isLoggedIn } = useGlobalContext();
	if (!isLoading && isLoggedIn) return <Redirect href='/home' />;
	return (
		<SafeAreaView className='bg-primary h-full'>
			<ScrollView contentContainerStyle={{ height: '100%' }}>
				<View className='w-full px-4 items-center justify-center min-h-[85vh]'>
					<Image
						source={images.logo}
						className='w-[150px] h-[130px]'
						resizeMode='contain'
					/>
					<Image
						source={images.cards}
						className='max-w-[380px] w-full h-[300px]'
						resizeMode='contain'
					/>
					<View className='relative mt-5'>
						<Text className='text-3xl text-white font-bold text-center'>
							Discover Endless Possibilities with{' '}
							<Text className='text-secondary-200'> Delta</Text>
						</Text>
						<Image
							source={images.path}
							className='w-[136px] h-[15px] absolute -bottom-2 -right-8'
						/>
					</View>
					<Text className='text-sm font-pregular text-gray-100 mt-7 text-center'>
						Where creativity meets innovation: limitless artistic exploration
					</Text>
					<CustomButton
						title='Continue with Email'
						handlePress={() => router.push('/sign-in')}
						containerStyles='mt-7 w-full'
					/>
				</View>
			</ScrollView>
			<StatusBar
				backgroundColor='#161622'
				style='light'
			/>
		</SafeAreaView>
	);
}
