import { View, Modal, Text, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import ProviderSelect from './ProviderSelect';
import { styles, SortButton, SortStyles } from './SortModal.styled';

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
					<View style={styles.statusBarFlex}>
						<TouchableOpacity onPress={() => setVisible(false)}>
							<Text style={styles.closeButtonText}>Done</Text>
						</TouchableOpacity>
					</View>
					<ScrollView contentContainerStyle={styles.scrollViewContainer}>
						<Text style={styles.headingText}>Filter by streaming service</Text>
						<ProviderSelect />
						<Text style={styles.headingText}>Sort By</Text>
						<View style={{ width: '95%' }}>
							{Object.values(SortStyles).map((sortStyle, index) => {
								const handlePress = (sort: string) => {
									Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
									setActiveSort(sort);
									setVisible(false);
								};
								return <SortButton key={`sort-${index}`} text={sortStyle} handlePress={handlePress} />;
							})}
						</View>
					</ScrollView>
				</SafeAreaView>
			</View>
		</Modal>
	);
};

export default SortModal;
