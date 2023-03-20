import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    
    textTitle:{
        fontSize:20
    },

    listItemView:{
        justifyContent:'space-between'
    },

    rowView:{
        flexDirection:'row'
    },

    inviteButton:{
        marginTop:10
    },

    msgView:{
        justifyContent:'center', 
        alignItems:'center'
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

    divider:{
        marginTop: 5
    },

    listView:{
        flexDirection:'row', 
        justifyContent:'center', 
        maxHeight: '50%', 
        marginTop: 15
    },

    list:{
        maxHeight:'100%', 
        maxWidth:'90%', 
        minHeight:100, 
        backgroundColor: 'rgba(0, 0, 0, 0)'
    },

    list1:{
        maxHeight:'100%', 
        maxWidth:'90%',
        minHeight: 100
    }

});

export default styles;