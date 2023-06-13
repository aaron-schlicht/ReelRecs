import { View, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { useContext } from 'react';
import { MovieContext } from '../../MovieContext';
import { Providers } from '../../constants';
import * as Haptics from 'expo-haptics';

export default function ProviderSelect() {
	const { updateSelectedServices, selectedServices } = useContext(MovieContext);
	return (
		<View
			style={{
				flexDirection: 'row',
				flexWrap: 'wrap',
				margin: 10,
				width: '80%',
				alignItems: 'center',
				justifyContent: 'center'
			}}
		>
			{Providers.map((provider, index) => {
				const selected = selectedServices.includes(provider);
				return (
					<View key={`provider-${index}`}>
						<TouchableOpacity
							style={{
								width: 70,
								height: 70,
								margin: 10,
								marginVertical: 5,
								borderRadius: 5,
								alignItems: 'center',
								justifyContent: 'center',
								borderWidth: selected ? 2 : 0,
								borderColor: selected ? 'white' : ''
							}}
							onPress={() => {
								Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
								updateSelectedServices(provider);
							}}
						>
							<Image
								source={provider.logo_url as ImageSourcePropType}
								style={{ width: 55, height: 55, borderRadius: 5, opacity: selected ? 1 : 0.65 }}
							/>
						</TouchableOpacity>
					</View>
				);
			})}
		</View>
	);
}
