import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link } from 'expo-router';
import { getCurrentUser, signIn } from '../../lib/appwrite';

const SignIn = () => {
	const [form, setForm] = useState({
		email: '',
		password: '',
	});

	const [isSubmitting, setIsSubmitting] = useState(false);

	const submit = async () => {
		if (!form.email || !form.password) {
			Alert.alert('Error', 'Please fill all fields');
		}
		setIsSubmitting(true);

		try {
			await signIn(form.email, form.password);
			const result = await getCurrentUser();
			setUser(result);
			setIsLoggedIn(true);

			Alert.alert('Success', 'Logged in successfully');
			router.replace('/home');
		} catch (error) {
			Alert.alert('Error', error.message);
		} finally {
			setIsSubmitting(false);
		}
	};
	return (
		<SafeAreaView className='bg-primary h-full'>
			<ScrollView>
				<View className='w-full justify-center min-h-[80vh] px-4 my-6'>
					<Image
						source={images.logo}
						resizeMode='contain'
						className='w-[115px] h-[105px]'
					/>
					<Text className='text-2xl text-white text-semibold my-10 font-psemibold'>
						Log in to Delta
					</Text>

					<FormField
						title='Email'
						value={form.email}
						handleChangeText={(e) => setForm({ ...form, email: e })}
						otherStyles='mt-7'
						keyboardType='email-address'
					/>
					<FormField
						title='Password'
						value={form.password}
						handleChangeText={(e) => setForm({ ...form, password: e })}
						otherStyles='mt-7'
					/>
					<CustomButton
						title='Sign In'
						handlePress={submit}
						containerStyles='mt-7'
						isLoading={isSubmitting}
					/>
					<View className='flex-row justify-center items-center pt-5 gap-2'>
						<Text className='text-gray-100 text-lg font-pregular'>
							Don't have an account?
						</Text>
						<Link
							href='/sign-up'
							className='text-lg font-psemibold text-secondary-100'
						>
							Sign up
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SignIn;
