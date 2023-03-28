import { View, SafeAreaView, Text, Image, Modal, ImageSourcePropType, ScrollView } from 'react-native';
import { FC } from 'react';
import { FullMovie, Providers } from './constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

const MovieScreen: FC<{ movie: FullMovie | null; visible: boolean; onClose: any }> = ({ movie, visible, onClose }) => {
	const base_path = 'https://image.tmdb.org/t/p/original/';
	return (
		<Modal visible={visible} animationType="slide">
			<View style={{ height: '100%', backgroundColor: 'black', alignItems: 'center' }}>
				<SafeAreaView style={{ width: '100%' }}>
					<View
						style={{ height: 40, flexDirection: 'row', paddingHorizontal: 20, justifyContent: 'flex-end' }}
					>
						<TouchableOpacity onPress={() => onClose()}>
							<Text style={{ color: 'white', fontWeight: 'bold' }}>Close</Text>
						</TouchableOpacity>
					</View>
					<ScrollView
						style={{
							backgroundColor: '#1f2224',
							height: '100%',
							width: '100%'
						}}
					>
						{movie ? (
							<View style={{ width: '100%' }}>
								<Image
									resizeMode="contain"
									style={{
										height: 220,
										width: '100%',
										borderBottomLeftRadius: 10,
										borderBottomRightRadius: 10
									}}
									source={{ uri: base_path + movie.backdrop_path }}
								/>
								<View
									style={{
										flexDirection: 'row',
										width: '100%',
										alignItems: 'center',
										paddingHorizontal: 20
									}}
								>
									<Image
										style={{
											width: 100,
											height: 150,
											borderRadius: 5,
											marginTop: -30,
											borderWidth: 2,
											borderColor: '#6e7275'
										}}
										source={{ uri: base_path + movie.poster_path }}
									/>
									<View
										style={{
											paddingLeft: 20,
											paddingRight: 20
										}}
									>
										<View style={{ flexDirection: 'row' }}>
											<Text
												style={{
													flex: 1,
													flexWrap: 'wrap',
													fontSize: 20,
													fontWeight: 'bold',
													color: 'white'
												}}
											>
												{movie.title}
											</Text>
										</View>
										<View style={{ flexDirection: 'row', gap: 10, paddingTop: 10 }}>
											<Text
												style={{
													color: 'white',
													fontWeight: 'bold',
													fontSize: 16
												}}
											>
												{new Date(movie.release_date).getFullYear()}
											</Text>
											<Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>|</Text>
											<Text
												style={{
													color: 'white',
													fontWeight: 'bold',
													fontSize: 16
												}}
											>
												{movie.runtime} minutes
											</Text>
										</View>
										<View style={{ flexDirection: 'row', paddingTop: 15, alignItems: 'center' }}>
											<Text style={{ color: 'white' }}>Average Rating: </Text>
											<Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>
												{movie.vote_average.toFixed(2)}
											</Text>
											<Text style={{ color: 'white' }}>/10</Text>
										</View>
									</View>
								</View>
								<Text
									style={{
										color: 'white',
										paddingTop: 15,
										paddingHorizontal: 15,
										fontWeight: '600',
										textTransform: 'uppercase',
										letterSpacing: 1
									}}
								>
									{movie.tagline}
								</Text>
								<Text
									style={{
										color: 'white',
										fontSize: 16,
										paddingHorizontal: 15,
										paddingTop: 15,
										fontWeight: '300',
										lineHeight: 20
									}}
								>
									{movie.overview}
								</Text>
								{movie.serviceIds && movie.serviceIds.length > 0 ? (
									<View
										style={{
											width: '100%',
											marginTop: 20,
											paddingHorizontal: 20,
											marginBottom: 60
										}}
									>
										<View
											style={{
												borderBottomWidth: 2,
												borderBottomColor: 'white',
												paddingBottom: 15,
												width: 250
											}}
										>
											<Text
												style={{
													color: 'white',
													fontWeight: 'bold',
													paddingLeft: 10,
													fontSize: 20
												}}
											>
												Available On
											</Text>
										</View>
										<View style={{ paddingTop: 15, flexDirection: 'row' }}>
											{movie.serviceIds.map((id) => {
												const provider = Providers.find((service) => service.provider_id == id);
												if (provider) {
													return (
														<Image
															key={`provider-${id}`}
															source={provider.logo_url as ImageSourcePropType}
															style={{
																width: 55,
																height: 55,
																borderRadius: 5,
																marginRight: 10
															}}
														/>
													);
												}
											})}
										</View>
									</View>
								) : null}
							</View>
						) : (
							<Text style={{ color: 'white' }}>
								Sorry, there was an issue retrieving the info for this film
							</Text>
						)}
					</ScrollView>
				</SafeAreaView>
			</View>
		</Modal>
	);
};

export default MovieScreen;

/*

									<Image
										resizeMode="contain"
										style={{
											height: 220,
											width: '100%',
											borderBottomLeftRadius: 10,
											borderBottomRightRadius: 10
										}}
										source={{ uri: base_path + movie.backdrop_path }}
									/>



*/
