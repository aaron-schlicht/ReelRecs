import { View, StatusBar, ScrollView } from 'react-native';
import SearchFunction from '../Search';
import SimilarMoviesFunction from '../SimilarMovies/SimilarMoviesFunction';
import { SafeAreaView } from 'react-native';
import { styles } from './Home.styled';
import InfoFunction from '../InfoFunction';

export default function Home() {
	return (
		<View style={styles.container}>
			<SafeAreaView>
				<ScrollView style={{ height: '100%' }}>
					<StatusBar barStyle="light-content" />
					<View style={styles.contentBox}>
						<SearchFunction />
						<InfoFunction />
						<SimilarMoviesFunction />
					</View>
				</ScrollView>
			</SafeAreaView>
		</View>
	);
}
