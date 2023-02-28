import React, { useState, useRef, useEffect } from 'react';
import { View, Modal, TextInput, SafeAreaView } from 'react-native';
import { useTheme, Text, Button } from '@ui-kitten/components';
import RNPickerSelect from 'react-native-picker-select';

import { styles } from './dataModal.styles';

export function DetailsModal(props){

    const theme = useTheme();

    //Size responsive variables
    const [containerHeight, setContainerHeight] = useState(500);
    const showOptionsRef = useRef(null);
    
    const [noneSelect, setNoneSelect] = useState(false);
    
    // multi-select useStates
    const [select1, setSelect1] = useState(null);
    const [select2, setSelect2] = useState(null);
    const [select3, setSelect3] = useState(null);
    const [select4, setSelect4] = useState([]);
    const [select5, setSelect5] = useState(null);

    //Details fields
    const [diffValue, setDiffValue] = useState(0)
    const [spotsCount, setSpotsCount] = React.useState(0)
    const [lineNumber, setLineNumber] = React.useState(0)
    const [loopsCount, setLoopsCount] = React.useState(0)
    const [costValue, setCostValue] = React.useState(0)
    const [laneCount, setLaneCount] = React.useState(null)

    //Details Options
    const pavedOptions = [
        { label: 'Paved', value: 1 },
        { label: 'Not Paved', value: 2 },
    ];

    const medianOptions = [
        { label: 'Median', value: 1 },
        { label: 'No Median', value: 2 },
    ];

    const directionOptions = [
        { label: 'Two-way', value: 1 },
        { label: 'One-way', value: 2 },
    ];

    const turnOptions = [
        { label: 'No Turn', value: 1 },
        { label: 'Left Turn', value: 2 },
        { label: 'Right Turn', value: 3 },
    ];
    
    const tollOptions = [
        { label: 'Toll Road', value: 1 },
        { label: 'Not Toll Road', value: 2 },
    ];

    const handleLayout = (event) => {
        const { height } = event.nativeEvent.layout;
        setContainerHeight(height);
    };

    const sendData = async () => {
        let obj = packageData();

        // reset modal control for subsequent entires
        setNoneSelect(false);
        setOptionsNull()

        // closes the modal (in accessTest)
        await props.closeDetails(obj);
    }

    const options1 = [];
    const options2 = [];
    const options3 = [];
    const options4 = [];
    const options5 = [];

    for (let i = 1; i <= 1000; i++) {
        if(i < 6) options1.push({ value: `${i}`, label: `${i}` });
        options2.push({ value: `${i}`, label: `${i}` });
        options3.push({ value: `${i}`, label: `${i}` });
        options4.push({ value: `${i}`, label: `${i}` });
        options5.push({ value: `${i}`, label: `${i}` });
    }

    const ShowOptions = () => {

        //console.log("🚀 ~ file: detailsModal.component.js:41 ~ ShowOptions ~ props.data", props.data);

        // Show options for point, path, or area
        if(props.accessType === "Point") {
            // Show options for bike rack
            if(props.data.description === "Bike Rack") {
                return(
                    <View style={styles.buttonRow}>
                        <Text
                            style={styles.inputLabel}
                        >Bike Spots</Text>
                        <RNPickerSelect
                                onValueChange={(value) => {
                                    if (value !== null && value !== undefined) {
                                        setSpotsCount(value);
                                    }
                                }}
                                items={options2}
                                value={spotsCount}
                                style={styles.scrollWheel}
                            />
                    </View>    
                )
            } else if(props.data.description === "Public Transport Stop") {
                //setContainerHeight(500);
                return(
                    <View>
                        <View style={styles.buttonRow}>
                            <Text
                                style={styles.inputLabel}
                            >Line Number</Text>
                            <RNPickerSelect
                                onValueChange={(value) => {
                                    if (value !== null && value !== undefined) {
                                        setLineNumber(value);
                                    }
                                }}
                                items={options2}
                                value={lineNumber}
                                style={styles.scrollWheel}
                            />
                        </View>    
                        <View style={styles.buttonRow}>
                            <Text
                                style={styles.inputLabel}
                            >Daily Loops</Text>
                            <RNPickerSelect
                                onValueChange={(value) => {
                                    if (value !== null && value !== undefined) {
                                        setLoopsCount(value);
                                    }
                                }}
                                items={options3}
                                value={loopsCount}
                                style={styles.scrollWheel}
                                textStyle={{
                                  color: 'blue',
                                }}
                            />
                        </View>   
                    </View>

                )
            } else {
                return null
            }
        }
        if(props.accessType === "Path") {
            // Show options for roads
            if(props.data.description === "Main Road" || props.data.description === "Side Road") {
                //setContainerHeight(1000);
                return(
                    <View>
                        <View style={styles.buttonRow}>
                            <Text
                                style={styles.inputLabel}
                            >Number of Lanes</Text>
                            <RNPickerSelect
                                onValueChange={(value) => console.log(value)}
                                onDonePress={(value) => setLaneCount(value)}
                                items={options2}
                                value={laneCount}
                                style={styles.scrollWheel}
                            />
                        </View>   
                        <View style={styles.buttonRow}>
                            {pavedOptions.map(option => (
                                <Button  
                                key={option.value}
                                style={styles.button} 
                                onPress={() => {setSelect1(option.value)}}
                                appearance={`${getButtonAppearance(option.value, select1)}`}
                                >
                                    <Text style={styles.backButtonTxt}>{option.label}</Text>
                                </Button>
                            ))}
                        </View>
                        <View style={styles.buttonRow}>
                            {medianOptions.map(option => (
                                <Button  
                                key={option.value}
                                style={styles.button} 
                                onPress={() => {setSelect5(option.value)}}
                                appearance={`${getButtonAppearance(option.value, select5)}`}
                                >
                                    <Text style={styles.backButtonTxt}>{option.label}</Text>
                                </Button>
                            ))}
                        </View>
                        <View style={styles.buttonRow}>
                            {directionOptions.map(option => (
                                <Button  
                                key={option.value}
                                style={styles.button} 
                                onPress={() => {setSelect2(option.value)}}
                                appearance={`${getButtonAppearance(option.value, select2)}`}
                                >
                                    <Text style={styles.backButtonTxt}>{option.label}</Text>
                                </Button>
                            ))}
                        </View>
                        <View style={styles.buttonRow}>
                            {tollOptions.map(option => (
                                <Button  
                                key={option.value}
                                style={styles.button} 
                                onPress={() => {setSelect3(option.value)}}
                                appearance={`${getButtonAppearance(option.value, select3)}`}
                                >
                                    <Text style={styles.backButtonTxt}>{option.label}</Text>
                                </Button>
                            ))}
                        </View>
                        <View style={styles.buttonRow}>
                            {turnOptions.map(option => (
                                <Button
                                key={option.value}
                                style={styles.button}
                                onPress={() => {
                                    if (option.value === turnOptions[0].value) {
                                      // If the option is the first option, select only this option
                                      setSelect4([option.value]);
                                    } else {
                                      // If the option is not the first option, add or remove the option value from select4
                                      if (select4.includes(option.value)) {
                                        // Remove the option value from select4 if it's already in the array
                                        setSelect4(select4.filter(value => value !== option.value));
                                      } else {
                                        // Add the option value to select4 if it's not already in the array
                                        setSelect4([...select4, option.value]);
                                      }
                                      if (select4.includes(turnOptions[0].value)) {
                                          setSelect4(select4.filter(value => value !== turnOptions[0].value));
                                    }
                                    }
                                  }}
                                appearance={getButtonAppearance(option.value, select4)}
                              >
                                <Text style={styles.backButtonTxt}>{option.label}</Text>
                              </Button>
                            ))}
                        </View>
                    </View>    
                )
            } else {
                return null
            }
        }
        if(props.accessType === "Area") {
            if(props.data.description === "Parking Garage") {
                return(
                    <View>
                        <View style={styles.buttonRow}>
                            <Text
                                style={styles.inputLabel}
                                >Number of Spots</Text>
                            <RNPickerSelect
                                onValueChange={(value) => console.log(value)}
                                onDonePress={(value) => setSpotsCount(value)}
                                items={options2}
                                value={spotsCount}
                                style={styles.scrollWheel}
                            />
                        </View>  
                        <View style={styles.buttonRow}>
                            <Text
                                style={styles.inputLabel}
                                >Cost (If any)</Text>
                            <RNPickerSelect
                                onValueChange={(value) => console.log(value)}
                                onDonePress={(value) => setCostValue(value)}
                                items={options3}
                                value={costValue}
                                style={styles.scrollWheel}
                            />
                        </View> 
                        <View style={styles.buttonRow}>
                            <Text
                                style={styles.inputLabel}
                                >Number of Floors</Text>
                            <RNPickerSelect
                                onValueChange={(value) => console.log(value)}
                                onDonePress={(value) => setLaneCount(value)}
                                items={options4}
                                value={laneCount}
                                style={styles.scrollWheel}
                                />
                        </View>
                    </View>    
                )
            }
            return(
                <View>
                    <View style={styles.buttonRow}>
                        <Text
                            style={styles.inputLabel}
                        >Number of Spots</Text>
                        <TextInput
                            style={styles.inputField}
                            onChangeText={setSpotsCount}
                            value={spotsCount}
                            placeholder="00"
                            keyboardType='numeric'
                        />
                    </View>  
                    <View style={styles.buttonRow}>
                        <Text
                            style={styles.inputLabel}
                        >Cost (If any)</Text>
                        <TextInput
                            style={styles.inputField}
                            onChangeText={setCostValue}
                            value={costValue}
                            placeholder="00"
                            keyboardType='numeric'
                        />
                    </View> 
                    <View style={styles.buttonRow}>

                    </View>
                </View>    
            )
        } 
        else return null;
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
        setSelect1(false)
        setSelect2(false)
        setSelect3(false)
        setSelect4([])
        setSelect5(false)
        setSelect4([])
        setCostValue(0)
        setDiffValue(0)
        setLaneCount(0)
        setLineNumber(0)
        setLoopsCount(0)
        setSpotsCount(0)
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
            <Modal onShow={console.log("Modal Showing: " + props.visible)} transparent={true} animationType='slide' visible={props.visible}>
            <View style={{height: containerHeight + 150}}>
                <View style={[ styles.largePurposeViewContainer, {backgroundColor:theme['background-basic-color-1']}]}
                >
                        
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
                            <RNPickerSelect
                            onValueChange={(value) => {
                                if (value !== null && value !== undefined) {
                                    console.log(value);
                                    setDiffValue(value);
                                }
                            }}
                                placeholder={{ label: '1 easiest - 5 hardest', value: 0 }}
                                items={options1}
                                value={diffValue}
                                style={styles.scrollWheel}
                            />
                        </View>  

                        <ShowOptions onLayout={handleLayout}/>
                                    
                    

                    </View>
                    <View style={styles.controlButtonRow}>
                            <Button style={styles.multiSubmit} onPress={sendData}>
                                <View>
                                    <Text style={styles.backButtonTxt}>Submit</Text>
                                </View>
                            </Button>
                            <Button style={styles.multiSubmit} onPress={sendData}>
                                <View>
                                    <Text style={styles.backButtonTxt}>Cancel</Text>
                                </View>
                            </Button>
                    </View>
                </View>                      
            </View>
            </Modal>
        //</View>
    )
}