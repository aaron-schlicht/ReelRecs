import { View, Modal, Text, SafeAreaView, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';

enum SortStyles {
	POP_DESC = 'Popularity (Highest to Lowest)',
	POP_ASC = 'Popularity (Lowest to Highest)',
	RATE_DESC = 'Rating (Highest to Lowest)',
	RATE_ASC = 'Rating (Lowest to Highest)',
	RELEASE_DESC = 'Release Date (Newest to Oldest)',
	RELEASE_ASC = 'Release Date (Oldest to Newest)'
}

const SortModal: React.FC<{ visible: boolean; setVisible: any; setActiveSort: any }> = ({
	visible,
	setVisible,
	setActiveSort
}) => {
	return (
		<Modal animationType="slide" visible={visible}>
			<StatusBar barStyle="light-content" />
			<View style={{ backgroundColor: 'black', height: '100%' }}>
				<SafeAreaView>
					<View
						style={{ flexDirection: 'row', justifyContent: 'flex-end', height: 40, paddingHorizontal: 20 }}
					>
						<TouchableOpacity onPress={() => setVisible(false)}>
							<Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Done</Text>
						</TouchableOpacity>
					</View>
					<View style={{ backgroundColor: '#1f2224', height: '100%', paddingTop: 30, paddingHorizontal: 20 }}>
						<Text
							style={{
								fontWeight: 'bold',
								letterSpacing: 1,
								color: 'white',
								fontSize: 20,
								paddingHorizontal: 5,
								paddingBottom: 10
							}}
						>
							Sort By
						</Text>
						{Object.values(SortStyles).map((sortStyle, index) => {
							const handlePress = (sort: string) => {
								Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
								setActiveSort(sort);
								setVisible(false);
							};
							return <SortButton key={`sort-${index}`} text={sortStyle} handlePress={handlePress} />;
						})}
					</View>
				</SafeAreaView>
			</View>
		</Modal>
	);
};

export default SortModal;

const SortButton: React.FC<{ text: string; handlePress: any }> = ({ text, handlePress }) => {
	const sortType = Object.keys(SortStyles)[Object.values(SortStyles).indexOf(text)];
	return (
		<TouchableOpacity
			style={{
				backgroundColor: '#6e7275',
				borderRadius: 5,
				marginVertical: 10,
				borderWidth: 2,
				borderColor: '#ccc'
			}}
			onPress={() => handlePress(sortType)}
		>
			<Text style={{ color: 'white', paddingVertical: 15, paddingHorizontal: 10 }}>{text}</Text>
		</TouchableOpacity>
	);
};
