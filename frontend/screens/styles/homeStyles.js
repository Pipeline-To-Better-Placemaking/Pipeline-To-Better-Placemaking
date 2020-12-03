import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
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

    naigationWrapper: {
        flex: 1,
        flexDirection: 'column-reverse'

    },

    bottoNavView: {
        height: 50
    },

    resultBox: {
        marginLeft: 50,
        width: 275,
        height:100,
        borderColor: 'black',
        borderWidth: 1
    },

    resultBoxTab: {
        flexDirection: 'row',
        marginTop: 25,
        marginLeft: 25,
        borderTopLeftRadius: 40,
        borderBottomLeftRadius: 40,
        backgroundColor: '#006FD6',
        borderColor: 'black',
        borderWidth: 0,
        width: 50,
        height: 100
    },

    resultBoxText: {
        marginTop: 10,
        marginLeft: 15,
        color: 'black',
        fontSize: 20
    },

    resultBoxComment: {
        marginTop: 25,
        marginLeft: 15,
        color: 'black',
        fontSize: 12
    },

    resultBoxCheckBox: {
       marginTop: 5,
       marginLeft: 15,
       marginRight: -35
    }
})

export default styles;