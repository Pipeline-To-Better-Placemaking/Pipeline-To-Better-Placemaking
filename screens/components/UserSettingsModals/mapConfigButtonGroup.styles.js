import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    
    container:{
        flexDirection: 'row', 
        alignSelf: 'center', 
        margin:5
    },

    buttonRight:{
        borderTopRightRadius: 0, 
        borderBottomRightRadius: 0, 
        width:'50%'
    },

    buttonLeft:{
        borderTopLeftRadius: 0, 
        borderBottomLeftRadius: 0, 
        width:'50%'
    }

});

export default styles;