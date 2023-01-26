import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

  container:{
    flex: 1, 
    backgroundColor: '#006FD6'
  },

  contentContainer:{
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column'
  },

  modalSafeView:{
    flex: 1,
    flexDirection:'column',
    justifyContent:'space-between',
    margin:20
  },
  
  popupModal:{
    width:'80%'
  },
  
  card:{
    width:'80%',
    margin:5
  },

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

  button:{
    marginTop: 5
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

  circleView:{
    flexDirection:'row',
    marginBottom: 5
  },

  icon:{
    width:30, 
    height:30
  },

  textView:{
    width: '75%'
  },
  
  deleteText:{
    fontSize:25
  },
  
  deleteConfirm:{
    marginBottom: 10
  },

  buttonRow:{
    flexDirection:'row', 
    justifyContent:'space-between'
  }

});

export default styles;