import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection:'column'
    },

    textTitle:{
      fontSize:20
    },

    teamTextTitle:{
      flexDirection:'column', 
      justifyContent:'flex-end'
    },

    teamTextView: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 30
    },

    teamText: {
        fontSize: 25,
    },

    line: {
        borderBottomWidth: 2,
        marginTop: 5
    },

    createTeamButtonView: {
        marginRight: 30,
    },

    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      flex: 1,
      justifyContent: 'center',
    },

    modalBackgroundStyle: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    messageView:{
      justifyContent:'center', 
      alignItems:'center'
    },

    mapSpace:{
      height:'35%'
    },

    metaDataView:{
      marginTop: 10, 
      marginLeft: 20, 
      flexDirection: 'column',
      justifyContent: 'flex-start'
    },

    metaDataRow:{
      flexDirection:'row'
    },

    metaDataDesc:{
      fontWeight: "bold"
    },
    
    emailButton:{
      marginRight: 10
    },

    dividerMargin:{
      marginTop: 5
    },
    
    listView:{
      flexDirection:'row', 
      justifyContent:'center',
      maxHeight: height * .38
    },

    listElements:{
      maxHeight:'100%', 
      maxWidth:'90%'
    }

});

export default styles;