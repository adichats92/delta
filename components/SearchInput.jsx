import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { icons } from '../constants';

const SearchInput = ({
	title,
	value,
	placeholder,
	handleChangeText,
	otherStyles,
	...props
}) => {
	const [showPassword, setShowPassword] = useState(false);
	return (
		<View className='border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4'>
			<TextInput
				className='text-white font-pregular text-base mt-1 flex-1'
				value={value}
				placeholder='Search a video topic'
				placeholderTextColor='#CDCDE0'
				onChangeText={handleChangeText}
			/>
			<TouchableOpacity>
				<Image
					source={icons.search}
					className='w-5 h-5'
					resizeMode='contain'
				/>
			</TouchableOpacity>
		</View>
	);
};

export default SearchInput;
