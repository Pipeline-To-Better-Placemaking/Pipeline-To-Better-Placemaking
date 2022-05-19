import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

    projName: {
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },

    input:{
        flex: 1
    },

    searchText:{
        marginTop:20
    },

    searchView: {
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginBottom:20
    },

    button:{
        marginLeft: 10
    },

    errorText:{
        color: '#FF3D71'
    },

    mapHeight: {
        maxHeight:'60%'
    },

    buttonRow:{
        flexDirection:'row', 
        justifyContent:'space-around', 
        marginTop:'30%'
    }

});

export default styles;