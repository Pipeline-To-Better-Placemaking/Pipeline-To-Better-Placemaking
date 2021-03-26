import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({

  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
  },

  modalBackgroundStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  circle: {
    width: 60,
    height: 60,
    borderRadius: 60/2,
    backgroundColor: '#FF0000',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '5%'
  },

  confirmDelete: {
    width:'80%',
    borderWidth: 3,
    borderColor: '#FF0000'
  },

});
