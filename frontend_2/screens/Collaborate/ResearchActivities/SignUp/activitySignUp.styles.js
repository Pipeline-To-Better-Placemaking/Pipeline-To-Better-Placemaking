import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({

    errorView:{
        margin:15, 
        borderWidth:4, 
        borderColor:'red'
    },

    errorText:{
        padding:5
    },

    viewSpacer:{
        margin:15
    },

    mapWrapper:{
        height:'40%'
    },

    rowView:{
        flexDirection:'row',
        justifyContent:'space-between'
    },

    infoColumn:{
        flexDirection:'column',
        maxWidth: width * .6
    },

    buttonView:{
        flexDirection:'column', 
        justifyContent:'space-around'
    },

    button:{
        margin:5
    },

    listView:{
        height:'50%'
    },

    list:{
        maxHeight:'100%'
    }
    
});

export default styles;