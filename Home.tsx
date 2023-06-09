import { View, Text, StatusBar, Image, ImageSourcePropType, ScrollView } from 'react-native';
import SearchFunction from './SearchFunction';
import SimilarMoviesFunction from './SimilarMoviesFunction';
import ProviderSelect from './ProviderSelect';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native';

export default function Home() {
	const imagePath = require('./assets/tmdb.png');
	return (
		<View style={{ backgroundColor: '#1f2224', height: '100%' }}>
			<SafeAreaView style={{ height: '100%' }}>
				<ScrollView>
					<StatusBar barStyle="light-content" />
					<View style={{ alignContent: 'center', alignItems: 'center', marginTop: 10 }}>
						<View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
							<Ionicons name="film-outline" color="white" size={35} />
							<Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>ReelRecs</Text>
						</View>
						<View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
							<Text style={{ color: 'white', fontWeight: '300' }}>Powered by</Text>
							<Image
								source={imagePath as ImageSourcePropType}
								resizeMode="contain"
								style={{ width: 70, height: 20 }}
							/>
						</View>
						<SearchFunction />
						<View
							style={{
								flexDirection: 'row',
								width: '80%',
								borderBottomWidth: 2,
								borderBottomColor: '#ccc'
							}}
						>
							<Text
								style={{
									fontWeight: '300',
									letterSpacing: 1,
									color: '#ccc',
									fontSize: 20,
									paddingBottom: 10
								}}
							>
								Filter by streaming source
							</Text>
						</View>
						<ProviderSelect />
						<SimilarMoviesFunction />
					</View>
				</ScrollView>
			</SafeAreaView>
		</View>
	);
}
