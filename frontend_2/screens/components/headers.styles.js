import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    
    header: {
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        marginBottom:5,
    },

    leftContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    
    textHeader:{
        flex: 1,
        marginRight: width * .09,
        alignItems: 'center',
        justifyContent: 'center',        
    },

    textHeaderBackView:{
        maxWidth: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    textHeaderBack:{
        maxWidth:'80%'    
    },

    text:{
        marginLeft:25
    },

    rightContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },

    button: {
        marginLeft: 15
      },

    buttonHeaderExit:{
        width:1, 
        height:1, 
        marginRight:25
    },

    menu:{
        marginRight: 15
    },

    logoView:{
        positon: 'absolute',
        left: width * .1,
        bottom: height * .002
    },

    logo:{
        // use hard coded values so logo looks consistent across devices
        width: 40,
        height: 40,
        // makes it somewhat transparent/toned down
        opacity: .8,
        // gives the logo a white tint (better matches app's apperance ?)
        // tintColor: 'rgba(225, 225, 225, .9)' 
    }

});

export default styles;