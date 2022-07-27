import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({

    container:{
        width: width,
        paddingTop: height * .005,
        paddingBottom: height * .005,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center'
    },

    arrow:{
        width: width * .04,
        height: height * .04,
    },

    button:{
        width: width * .05,
        height: height * .03,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: 'white',
        borderColor: '#006FD6',
        marginRight: 5
    },

    buttonTxt:{
        color: '#006FD6',
        fontWeight: 'bold',
        fontSize: width * .03
    },

    selectedBtn:{
        width: width * .05,
        height: height * .03,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: '#006FD6',
        borderColor: '#006FD6',
        marginRight: 5
    },

    selectedBtnTxt:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: width * .03
    }

});

export default styles;