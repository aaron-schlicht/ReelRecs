import { View, Text, StatusBar, Image, ImageSourcePropType, ScrollView } from 'react-native';
import SearchFunction from './SearchFunction';
import SimilarMoviesFunction from './SimilarMoviesFunction';
import ProviderSelect from './ProviderSelect';
import { Ionicons } from '@expo/vector-icons';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { SafeAreaView } from 'react-native';

export default function Home() {
	const imagePath = require('./assets/tmdb.png');
	return (
		<View style={{ backgroundColor: '#1f2224', height: '100%' }}>
			<SafeAreaView>
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
						<View
							style={{
								width: '80%',
								flexDirection: 'row',
								marginTop: 50,
								borderBottomWidth: 2,
								borderBottomColor: '#ccc'
							}}
						>
							<Text
								style={{
									fontSize: 20,
									fontWeight: '300',
									letterSpacing: 1,
									color: '#ccc',
									paddingBottom: 10
								}}
							>
								Add up to three movies
							</Text>
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
				<View style={{ position: 'absolute', bottom: 2 }}>
					<BannerAd unitId={TestIds.BANNER} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
				</View>
			</SafeAreaView>
		</View>
	);
}
