import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column'
    },

    cardContainer: {
        flex: 1,
    },

    emptyBox: {
        height: 200,
        width: '80%',
        marginTop: 50,
        backgroundColor: 'transparent',
        justifyContent:'flex-end',
        alignSelf: 'center',
        borderStyle: 'dashed'
    },

    box: {
        height: 275,
        width: '80%',
        marginTop: 25,
        backgroundColor: 'transparent',
        alignSelf: 'center',
    },

    plusIcon: {
        width: '50',
        height: '50',
        marginRight: 110
    },

    projectText: {
        fontSize: 24,
        marginTop: 5
    },

    textContainer: {
        marginTop: 100,
        marginRight: 225
    },

    confirmCompare: {
        marginTop: 30,
        marginBottom: 5,
        justifyContent: 'flex-end',
        alignSelf: 'center'
    },

    chooseTestButton: {
        marginTop: 10,
        justifyContent: 'center'
    },

    removeButton: {
        marginTop: -10,
        marginLeft: 220,
        position: 'absolute'
    },

    removeIcon: {
        width: 30,
        height: 30,
    },

    margins: {
      margin:5,
      marginLeft:20,
      marginRight:20
    },

});

export default styles;
