import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({

    container:{
        flex:1,
        //justifyContent: 'space-between',
        flexDirection:'column',
        margin:5
    },

    activityView:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        margin:5,
    },

    buttonView:{
        flex: 1,
        backgroundColor: 'red',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        //margin:5,
    },

    input:{
        flex: 1
    },

    leftShift:{
        marginLeft:-20
    },

    errorMsgView:{
        margin:15, 
        borderWidth:4, 
        borderColor:'red'
    },

    errorText:{
        padding:5
    },

    button:{
        marginRight: width * .03,
        marginBottom: height * .02
    },
    
    deleteButton:{
        marginLeft: width * .03,
        marginBottom: height * .02
    }

});

export default styles;