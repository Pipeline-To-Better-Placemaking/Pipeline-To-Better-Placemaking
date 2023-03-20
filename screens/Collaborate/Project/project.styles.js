import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({

    teamView: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 20
    },

    teamTextView:{
        flexDirection:'column', 
        justifyContent:'flex-end'
    },

    teamText: {
        fontSize: 25,
    },

    createTeamButtonView: {
        marginRight: 20,
    },

    textTitle:{
        fontSize:20
    },

    mapWrapper:{
        height:'45%'
    },

    divider:{
        marginTop: 5
    },

    listView:{
        flexDirection:'row', 
        justifyContent:'center', 
        maxHeight: height * .335
    },

    list:{
        maxHeight:'100%', 
        maxWidth:'90%',
        minHeight: 100
    }

});

export default styles;