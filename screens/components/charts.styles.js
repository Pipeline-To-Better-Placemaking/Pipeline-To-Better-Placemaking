import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

    xaxis0:{
        flex: 1,
        fontSize: 10,
        textAlign: 'center'
    },

    xaxisView:{
        flex: 1,
        justifyContent:'flex-start',
        flexDirection:'column',
        height:100,
    },

    xaxis1:{
        fontSize: 10,
        width:110,
        textAlign: 'right',
        marginLeft:-40,
        marginTop:40,
    },

    mainView:{
        marginBottom: 15
    },

    container:{
        flex: 1, 
        marginLeft: 5
    },

    barchart:{
        flex: 1
    },

    labelView:{
        flex: 1,
        marginLeft: 10,
        flexDirection:'row',
        justifyContent:'flex-start'
    },

    legendView:{
        flex: 1,
        flexDirection:'row',
        marginTop:15
    },

    // used for the pie charts
    
    pieLegend:{
        flexDirection:'row',
        justifyContent: 'flex-end',
        marginTop: 5
    },

    pieLegendView:{
        flex: 1,
        marginTop: 2,
        padding: 8,
        alignSelf: 'flex-end',
        backgroundColor: '#3D3D3D',
        borderWidth: 1,
        borderRadius: 20,
        borderColor: "#3D3D3D"
    },

    whiteText:{
        color: '#FFFFFF'
    }

});

export default styles;