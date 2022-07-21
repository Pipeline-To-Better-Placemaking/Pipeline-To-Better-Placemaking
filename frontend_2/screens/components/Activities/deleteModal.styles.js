import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  
  popupModal:{
    width:'80%'
  },
  
  card:{
    width:'80%',
    margin:5
  },

  modalBackgroundStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: '30%'
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

  textCentered:{
    textAlign: 'center'
  },
  
  deleteText:{
    fontSize:25,
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