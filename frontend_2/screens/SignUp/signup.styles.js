import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    
    background:{
        flex: 1,
        backgroundColor:'#006FD6'
    },
    
    container: {
        flexGrow : 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },

    title: {
        alignSelf: 'center'
    },

    inputText: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 18,
        color: '#FFFFFF'
    },

    inputRow: {
        flexDirection: "row"
    },

    inputBox: {
        width: width * .7,
    },

    signUpButton: {
        marginTop: height * .025,
        width: width * .7,
        backgroundColor: '#DEBD07'
    },

    backButton: {
        marginTop: height * .015,
        backgroundColor: '#DEBD07'
    },

    modalBackgroundStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    invalidText: {
        color: '#FF3D71',
        fontSize: 20,
        marginBottom: 10
    },
    
    errorMsg:{
        color: '#FF3D71'
    }
});

export default styles;