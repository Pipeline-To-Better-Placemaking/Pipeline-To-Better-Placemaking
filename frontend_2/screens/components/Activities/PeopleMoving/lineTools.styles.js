import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

    columnView:{
        alignSelf: 'center'
    },

    iconSize: {
        width: 50,
        height: 50
    },
    
    container:{
        flex: 1, 
        flexDirection: 'row', 
        marginTop: -90, 
        justifyContent:'space-between'
    },

    button:{
        flex: 1
    },

    buttonView:{
        flexDirection:'column'
    }

});

export default styles;
