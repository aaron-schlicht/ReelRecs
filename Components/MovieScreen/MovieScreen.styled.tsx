import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		height: '100%',
		backgroundColor: 'black',
		alignItems: 'center'
	},
	topBar: {
		height: 40,
		flexDirection: 'row',
		paddingHorizontal: 20,
		justifyContent: 'flex-end'
	},
	closeText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 18
	},
	scrollContainer: {
		backgroundColor: '#1f2224',
		height: '100%',
		width: '100%'
	},
	topInfo: {
		flexDirection: 'row',
		width: '100%',
		alignItems: 'center',
		paddingHorizontal: 20
	},
	moviePoster: {
		width: 100,
		height: 150,
		borderRadius: 5,
		marginTop: 30,
		borderWidth: 2,
		borderColor: '#6e7275'
	},
	titleText: {
		flex: 1,
		flexWrap: 'wrap',
		fontSize: 20,
		fontWeight: 'bold',
		color: 'white'
	},
	infoFlex: {
		flexDirection: 'row',
		gap: 10,
		paddingTop: 10
	},
	infoText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 16,
		lineHeight: 22
	},
	taglineText: {
		color: 'white',
		fontWeight: '400',
		textTransform: 'uppercase',
		fontSize: 16,
		letterSpacing: 1,
		paddingVertical: 10
	},
	servicesContainer: {
		width: '100%',
		marginTop: 20,
		paddingHorizontal: 20,
		marginBottom: 60
	},
	underlinedBox: {
		borderBottomWidth: 2,
		borderBottomColor: 'white',
		paddingBottom: 15,
		width: '75%'
	},
	serviceImage: {
		width: 55,
		height: 55,
		borderRadius: 5,
		margin: 5
	}
});
