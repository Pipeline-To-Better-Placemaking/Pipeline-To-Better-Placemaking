import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    
    conatainer:{
        marginTop: 20
    },

    textTitle:{
        marginBottom: 10
    },

    button:{
        width: width * .7, 
        marginTop: 10, 
        alignSelf: 'center'
    }

});

export default styles;