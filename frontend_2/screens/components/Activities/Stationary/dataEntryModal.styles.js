import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

    modalContainer: {
        height: '100%',
        backgroundColor:'rgba(0,0,0, 0.5)'
    },

    scorllViewContainer: {
        height: '50%',
        marginTop: 'auto',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        borderWidth: 1
    },

    textTitle:{
        alignSelf: 'center'
    },

    lineTitle:{
        alignSelf: 'center', 
        marginTop: -20
    },

    dataGroupView:{
        flexDirection: 'column', 
        marginLeft: 15
    },

    button:{
        marginTop: 15, 
        marginBottom: 20, 
        width: 100, 
        alignSelf:'center'
    }

});

export default styles;
