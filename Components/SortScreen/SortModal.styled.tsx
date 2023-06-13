import { StyleSheet, TouchableOpacity, Text } from 'react-native';

export const styles = StyleSheet.create({
	statusBarFlex: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		height: 40,
		paddingHorizontal: 20
	},
	closeButtonText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 18
	},
	scrollViewContainer: {
		width: '100%',
		alignItems: 'center',
		backgroundColor: '#1f2224',
		height: '100%',
		paddingTop: 30,
		paddingHorizontal: 20
	},
	headingText: {
		fontWeight: '300',
		letterSpacing: 1,
		color: 'white',
		fontSize: 18,
		paddingHorizontal: 5,
		paddingBottom: 10,
		textTransform: 'uppercase',
		textAlign: 'left',
		width: '100%'
	}
});

export enum SortStyles {
	POP_DESC = 'Popularity (Highest to Lowest)',
	POP_ASC = 'Popularity (Lowest to Highest)',
	RATE_DESC = 'Rating (Highest to Lowest)',
	RATE_ASC = 'Rating (Lowest to Highest)',
	RELEASE_DESC = 'Release Date (Newest to Oldest)',
	RELEASE_ASC = 'Release Date (Oldest to Newest)'
}

export const SortButton: React.FC<{ text: string; handlePress: any }> = ({ text, handlePress }) => {
	const sortType = Object.keys(SortStyles)[Object.values(SortStyles).indexOf(text)];
	return (
		<TouchableOpacity
			style={{
				borderRadius: 10,
				marginVertical: 10,
				borderWidth: 2,
				backgroundColor: '#ccc',
				borderColor: '#ccc'
			}}
			onPress={() => handlePress(sortType)}
		>
			<Text
				style={{
					color: '#1f2224',
					fontSize: 16,
					fontWeight: '400',
					paddingVertical: 15,
					paddingHorizontal: 10
				}}
			>
				{text}
			</Text>
		</TouchableOpacity>
	);
};
