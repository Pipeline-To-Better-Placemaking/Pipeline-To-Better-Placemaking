import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

    renderAnchor:{
        marginTop: 5
    },

    textTitle:{
        fontSize:20
    },

    listItem:{
        flex:1, 
        flexDirection:'row',
        justifyContent:'space-between'
    },

    container:{
        flex:1, 
        flexDirection:'column', 
        justifyContent:'flex-start'
    },

    buttonRow:{
        flex:1, 
        flexDirection:'row', 
        justifyContent:'flex-end'
    },

    buttonSpacer:{
        marginLeft:15
    },
    
    teamView: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 30
    },

    teamTextView:{
        flexDirection:'column', 
        justifyContent:'flex-end'
    },

    teamText: {
        fontSize: 25,
    },

    createTeamButtonView: {
        marginRight: 30,
    },

    listView:{
        flexDirection:'row', 
        justifyContent:'center', 
        maxHeight:'40%', 
        marginTop:15
    },

    list:{
        maxHeight:'100%', 
        maxWidth:'90%'
    },
    
    list1:{
        maxHeight:'100%', 
        maxWidth:'90%',
        minHeight:150, 
        backgroundColor: 'rgba(0, 0, 0, 0)'
    }

});

export default styles;