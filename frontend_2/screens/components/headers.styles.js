import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({

    header: {
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        marginBottom:5,
    },

    leftContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },

    rightContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },

    button: {
        marginLeft: 25,
      },

    menu: {
        marginRight:15
    },

});

export default styles;
