import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

    listView:{
        marginTop:20
    },

    list:{
        marginBottom: -100
    },

    selectAreaView:{
        flex:1, 
        flexDirection:'column'
    },

    scrollView:{
        maxheight:'30%', 
        marginTop:-100
    },

    textFont:{
        fontSize:20
    },
    
    showAreasText:{
        fontWeight: "bold", 
        backgroundColor:'rgba(0,0,0,0.5)'
    },

    showMarkersText:{
        color:"black"
    },

    mapAddOneMapView:{
        height: '100%'
    }

});

export default styles;