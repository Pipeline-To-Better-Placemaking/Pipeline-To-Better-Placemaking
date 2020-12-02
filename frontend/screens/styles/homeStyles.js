import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({

    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    mapStyle: {
        width: 400,
        height: 200
    },

    header: {
        textAlign: 'center', 
        color: '#FFFFFF', 
        marginTop: 75,
        marginBottom: 5
    } ,

    resultTextView: {
        marginTop: 20,
        marginLeft: 10
    },

    resultText: {
        fontSize: 25,
        color: 'black'
    },

    resultLine: {
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        marginTop: 5
    },

    resultCompareButtonView: {
        paddingLeft: 150
    },

    bottoNavView: {
        marginTop: 360,
        height: 100
    },

    bottomNavItem: {
        marginBottom: 50
    },

})

export default styles;