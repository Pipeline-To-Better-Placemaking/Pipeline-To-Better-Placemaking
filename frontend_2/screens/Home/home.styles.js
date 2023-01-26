import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection:'column',
    },

    confirmCompareCount: {
        backgroundColor: '#DEBD07',
    },

    confirmCompareButton:{
        marginRight:10
    },

    resultTextView: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'flex-end',
        marginLeft: 5,
    },

    resultText: {
        fontSize: 25,
    },

    resultLine: {
        borderBottomWidth: 2,
        marginTop:5
    },

    resultCompareButtonView: {
        marginRight: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    mapSpace:{
        height:'35%'
    },

    listView:{
        flexDirection:'row', 
        justifyContent:'center', 
        maxHeight:'55%', 
        marginTop:15
    },

    listElements:{
        maxHeight:'100%', 
        minHeight:150, 
        backgroundColor: 'rgba(0, 0, 0, 0)'
    }

});

export default styles;