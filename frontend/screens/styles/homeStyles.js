import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-between',
        flexDirection:'column'
    },

    mapStyle: {
       height:'100%'
    },

    header: {
        textAlign: 'center',
        color: '#FFFFFF',
        marginBottom: 5
    } ,

    resultTextView: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 30
    },

    resultText: {
        fontSize: 25,
        color: 'black',
    },

    resultLine: {
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        marginTop: 5
    },

    resultCompareButtonView: {
        marginRight: 30,
    },

    naigationWrapper: {
        flex: 1,
        flexDirection: 'column-reverse'
    },

    bottoNavView: {
        height: 50
    },

    result: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 8,
        marginBottom: 8,
    },

    resultBox: {
        width: '80%',
        borderColor: 'black',
        borderWidth: 1,
        height: 100,
    },

    resultTab: {
        flexDirection: 'row',
        borderTopLeftRadius: 40,
        borderBottomLeftRadius: 40,
        backgroundColor: '#006FD6',
        borderColor: 'black',
        borderWidth: 0,
        width: 50,
        height: 100,
    },

    resultBoxText: {
        marginLeft: 15,
        marginTop: 10,
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
