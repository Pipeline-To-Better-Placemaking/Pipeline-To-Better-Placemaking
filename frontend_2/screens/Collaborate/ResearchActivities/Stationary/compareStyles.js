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
        height: 225,
        width: '80%',
        marginTop: 50,
        backgroundColor: 'transparent',
        justifyContent:'flex-end',
        alignSelf: 'center',
        borderStyle: 'dashed'
    },

    box: {
        height: 225,
        width: '80%',
        marginTop: 50,
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
        width: 30,
        height: 30,
        borderRadius: 150/2,
        marginBottom: -12,
        position: 'relative'
    },

    removeIcon: {
        position: 'relative',
        width: 30,
        height: 30,
    },
    
});

export default styles;
