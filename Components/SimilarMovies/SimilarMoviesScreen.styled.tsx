import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const styles = StyleSheet.create({
	navBar: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		height: 40,
		backgroundColor: 'black',
		paddingHorizontal: 20,
		justifyContent: 'space-between'
	},
	scrollContainer: {
		marginTop: 0,
		paddingHorizontal: 15,
		backgroundColor: '#1f2224',
		paddingTop: 10,
		height: '100%'
	},
	movieFlex: {
		marginVertical: 5,
		flexDirection: 'row',
		width: '100%',
		paddingBottom: 10,
		borderBottomWidth: 2,
		borderBottomColor: '#ccc'
	},
	moviePoster: {
		width: 80,
		height: 120,
		borderRadius: 5,
		borderWidth: 2,
		borderColor: '#ccc'
	},
	titleContainer: {
		width: 250,
		marginLeft: 10,
		height: 110,
		justifyContent: 'center'
	},
	titleText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 20
	},
	serviceLogo: {
		width: 55,
		height: 55,
		borderRadius: 5,
		marginRight: 10
	}
});

export const NavBar: React.FC<{ onBack: () => void; onPressFilter: () => void }> = ({ onBack, onPressFilter }) => {
	return (
		<View style={styles.navBar}>
			<TouchableOpacity onPress={onBack}>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<Ionicons name="caret-back" color="white" size={22} />
					<Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, paddingLeft: 1 }}>Back</Text>
				</View>
			</TouchableOpacity>
			<TouchableOpacity onPress={onPressFilter}>
				<Ionicons name="swap-horizontal" color="white" size={30} />
			</TouchableOpacity>
		</View>
	);
};
