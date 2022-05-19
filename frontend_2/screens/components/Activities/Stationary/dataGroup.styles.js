import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    
    container:{
        marginTop: 20
    },

    containerSpacer:{
        marginTop: 25
    },

    title:{
        marginBottom: 10
    },

    topRow:{
        flexDirection: 'row', 
        justifyContent:'space-around'
    },

    bottomRow:{
        flexDirection: 'row', 
        justifyContent:'space-around',
        marginTop: 10
    },

    buttonLeft:{
        width:150, 
        marginRight: 45
    },

    buttonRight:{
        width:150, 
        marginRight: 10
    },

    buttonBottom:{
        width:150, 
        marginTop: 10, 
        alignSelf: 'center'
    }

});

export default styles;