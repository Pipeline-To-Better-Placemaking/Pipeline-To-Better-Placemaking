import React, { useState, useRef, useEffect } from 'react';
import { View, Modal, TextInput, SafeAreaView } from 'react-native';
import { useTheme, Text, Button } from '@ui-kitten/components';
import RNPickerSelect from 'react-native-picker-select';
import { ErrorModal } from '../../../components/Activities/Access/errorModal.component';
import { ShowOptions } from '../../../components/Activities/Access/showOptions.component';

import { styles } from './dataModal.styles';

export function DetailsModal(props){

    const theme = useTheme();

    //Size responsive variables
    const [containerHeight, setContainerHeight] = useState(500);
    const showOptionsRef = useRef(null);
    const [errorModal, setErrorModal] = useState(false);
    const [noneSelect, setNoneSelect] = useState(false);
    const [noOptions, setNoOptions] = useState(false);

    //Details fields
    const [diffValue, setDiffValue] = useState(null)

    const handleLayout = (event) => {
        const { height } = event.nativeEvent.layout;
        setContainerHeight(height);
    };

    const updateStateValues = (values) => {
        values.diffRating = diffValue;
        sendData(values);
    }

    function handleSubmitPress() {
        sendData({diffRating: diffValue});
    }      

    const dismiss = () =>{
        setErrorModal(false);
    }

    const sendData = async (data) => {
        let obj = await data;
        // Check if all fields are filled
        if(diffValue == null) {
            setErrorModal(true);
            return;
        } else obj.diffRating = parseInt(diffValue);

        // console.log("🚀 ~ file: detailsModal.component.js:61 ~ sendData ~ data:", obj);
        // console.log("🚀 ~ file: detailsModal.component.js:61 ~ sendData ~ data:", errorModal);


        if(!errorModal) {

            // reset modal control for subsequent entires
            setNoneSelect(false);
            setOptionsNull()

            // closes the modal (in accessTest)
            await props.closeDetails(await obj);
        }
    }

    const getButtonAppearance = (option, group) => {        
        if (Array.isArray(group)) {
            if (group.includes(option)) {
              return 'primary';
            }
        } else {
            if (option === group) {
              return 'primary';
            }
          }
        return 'outline';
    };

    const packageData = () =>{

        // if an option is selected push its contents onto the options data object
        // then reset that state for subsequent entries

        var options = { diffRating: diffValue }

        // Package options data for point, path, or area
        if(props.accessType === "Point") {
            // Package options data for bike rack
            if(props.data.description === "Bike Rack" || props.data.description === "E-scooter Parking") {
                var options = {
                    spots: spotsCount,
                }
                setSpotsCount(0)
            } else if(props.data.description === "Public Transport Stop") {
                var options = {
                    spots: spotsCount,
                    lineNumber: lineNumber,
                }
                setSpotsCount(0)
                setLineNumber(0)
            } 
        }
        else if(props.accessType === "Path") {
            // Package options data for roads
            if(props.data.description === "Main Road" || props.data.description === "Side Road") {
                var options = {
                    laneCount: parseInt(laneCount),
                    paved: (select1 === 1 ? true : false),
                    median: (select5 === 1 ? true : false),
                    twoWay: (select2 === 1 ? true : false),
                    tollLane: (select3 === 1 ? true : false),
                    turnLane: select4,
                }
                setLaneCount(null)
                setSelect1(false)
                setSelect2(false)
                setSelect3(false)
                setSelect4([])
                setSelect5(false)
            }
        }
        else if(props.accessType === "Area") {
            if(props.data.description === "Parking Garage") {
                var options = {
                    spots: parseInt(spotsCount),
                    cost: parseFloat(costValue),
                    floors: parseInt(laneCount),
                }
                setSpotsCount(0)
                setCostValue(0)
                setLaneCount(null)
            }
            else {
                var options = {
                    spots: spotsCount,
                    cost: costValue,
                }
                setSpotsCount(0)
                setCostValue(0)
            }
        } 


        //console.log(diffValue);
        //options.diffRating = diffValue

        // return the object of options data
        return options
    }

    const setOptionsNull = () => {
        setDiffValue(0)
    }
    
    // changes apperance of buttons based on if its selected or not
    const setSelect = (ind) =>{
        // whenever a button is pushed, based on the select number, change the state to the opposite state (select/deselect)
        switch(ind){
            case 1:
                setSelect1(!select1);
                break;
            
            case 2:
                setSelect2(!select2);
                break;
            
            case 3:
                setSelect3(!select3);
                break;

            case 5:
                setSelect4(!select4);
                break;

            case 6:
                setSelect7(!select5);
                break;
            
            default:
                console.log("switch's default; ERROR should never enter here");        
        }
    }


    return(
        //<View style={styles.modalContainer}>    
            //<Modal onShow={console.log("Modal Showing: " + props.visible)} transparent={true} animationType='slide' visible={props.visible}>
            <View>
                <View style={[ styles.largePurposeViewContainer, { height: 'auto', backgroundColor:theme['background-basic-color-1']}]}
                >
                    <ErrorModal 
                        errorModal={errorModal}
                        errorMessage={"One or more fields are empty"}
                        dismiss={dismiss}
                    />
                        
                    <Text category={'h1'} style={styles.titleText}>Details</Text>
                    <View style={styles.dataView}>
                                
                        <View style={styles.titleDesc}>
                            <Text category={'s1'} style={styles.titleDescTxt}>Enter the Access {props.accessType} details</Text>
                        </View>

                        { noneSelect ?
                            <View style={styles.selectError}>
                                <Text style={styles.redTxt}>Please fill in the details</Text>
                            </View>
                        :
                            null
                        }

                        <View style={styles.buttonRow}>
                            <Text
                                style={styles.inputLabel}
                            >Access Difficulty</Text>
                            <TextInput
                                style={styles.inputField}
                                onChangeText={setDiffValue}
                                value={diffValue}
                                placeholder="1-5"
                                keyboardType='numeric'
                                returnKeyType="done"
                            />
                        </View>  

                        <ShowOptions 
                            onLayout={handleLayout} 
                            props={props} 
                            updateStateValues={updateStateValues}
                            setErrorModal={setErrorModal}
                            setNoOptions={setNoOptions}
                        />

                        {noOptions ? 
                            <View style={styles.controlButtonRow}>
                                <Button style={styles.multiSubmit} onPress={handleSubmitPress}>
                                    <View>
                                        <Text style={styles.backButtonTxt}>Submit</Text>
                                    </View>
                                </Button>
                            </View> 
                        : null}

                    </View>
                </View>                      
            </View>
            //</Modal>
        //</View>
    )
}