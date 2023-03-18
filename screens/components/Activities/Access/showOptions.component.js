import React, { useState, useRef, useEffect } from 'react';
import { View, Modal, TextInput, SafeAreaView } from 'react-native';
import { useTheme, Text, Button } from '@ui-kitten/components';

import { styles } from './dataModal.styles';

export function ShowOptions(props) {
    
    const [spotsCount, setSpotsCount] = useState(null);
    const [lineNumber, setLineNumber] = useState(null);
    const [loopsCount, setLoopsCount] = useState(null);
    const [costValue, setCostValue] = useState(null);
    const [laneCount, setLaneCount] = useState(null);
    const [select1, setSelect1] = useState(null);
    const [select2, setSelect2] = useState(null);
    const [select3, setSelect3] = useState(null);
    const [select4, setSelect4] = useState([]);
    const [select5, setSelect5] = useState(null);
    const [noneSelect, setNoneSelect] = useState(false);
    const optionProp = props.props;

    //Road Details Options
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
        { label: 'No Toll', value: 2 },
    ];

    const setOptionsNull = () => {
        setSelect1(null)
        setSelect2(null)
        setSelect3(null)
        setSelect4([])
        setSelect5(null)
        setCostValue(null)
        setLaneCount(0)
        setLineNumber(0)
        setLoopsCount(0)
        setSpotsCount(0)
    }

    const sendData = async () => {

        console.log("🚀 ~ file: showOptions.component.js:136 ~ sendData ~ optionProp:", optionProp);
        // check for null fields
        switch(optionProp.accessType) {

            case "Point":
                switch(optionProp.data.description) {
                    case "Bike Rack":
                        if(spotsCount === null){
                            props.setErrorModal(true);
                            return;
                        }
                        break;
                    case "Public Transport Stop":
                        if(lineNumber == null || loopsCount == null) {
                            props.setErrorModal(true);
                            return;
                        }
                        break;
                }
                break;
            case "Path":
                if(optionProp.data.description == "Main Road")
                    if(laneCount == null || select1 == null || select2 == null || select3 == null || select4 == null || select5 == null) {
                        props.setErrorModal(true);
                        return;
                    }
                break;
            case "Area":
                if(optionProp.data.description == "Parking Garage") 
                        if(laneCount == null) {
                            props.setErrorModal(true);
                            return;
                        }
                if(spotsCount == null) {
                    props.setErrorModal(true);
                    return;
                }
                break;
        
        }

        let obj = packageData();

        // reset modal control for subsequent entires
        setNoneSelect(false);
        setOptionsNull()

        // closes the modal (in accessTest)
        await props.updateStateValues(obj)
    }

    const getButtonAppearance = (optionValue, selectValue) => {
        if (Array.isArray(selectValue) && selectValue.includes(optionValue)) {
            return 'filled';
          } else if (selectValue === optionValue) {
            return 'filled';
          } else {
            return 'outline';
          }
    };
      

    const packageData = async () =>{
        
        // if an option is selected push its contents onto the options data object
        // then reset that state for subsequent entries

        // Package options data for point, path, or area
        if(optionProp.accessType === "Point") {
            // Package options data for bike rack
            if(optionProp.data.description === "Bike Rack" || optionProp.data.description === "E-scooter Parking") {
                var options = {
                    spots: parseInt(spotsCount),
                    cost: parseFloat(costValue),
                }
                setSpotsCount(0)
            } else if(optionProp.data.description === "Public Transport Stop") {
                var options = {
                    lineNumber: parseInt(lineNumber),
                    cost: parseFloat(costValue),
                }
                setSpotsCount(0)
                setLineNumber(0)
            } 
        }
        else if(optionProp.accessType === "Path") {
            // Package options data for roads
            if(optionProp.data.description === "Main Road" || optionProp.data.description === "Side Road") {
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
        else if(optionProp.accessType === "Area") {
            if(optionProp.data.description === "Parking Garage") {
                var options = {
                    spots: parseInt(spotsCount),
                    cost: parseFloat(costValue),
                    floors: parseInt(laneCount),
                }
                setSpotsCount(0)
                setCostValue(null)
                setLaneCount(null)
            }
            else {
                var options = {
                    spots: parseInt(spotsCount),
                    cost: parseFloat(costValue),
                }
                setSpotsCount(0)
                setCostValue(null)
            }
        }

        // return the object of options data
        return options
    }

    // Show options for point, path, or area
    if(optionProp.accessType === "Point") {
        // Show options for bike rack
        if(optionProp.data.description === "Bike Rack" || optionProp.data.description === "E-scooter Parking") {
            return(
                <View>
                    <View style={styles.buttonRow}>
                        <Text
                            style={styles.inputLabel}
                        >Bike Spots</Text>
                        <TextInput
                            style={styles.inputField}
                            onChangeText={setSpotsCount}
                            value={spotsCount}
                            placeholder="00"
                            keyboardType='numeric'
                            returnKeyType="done"
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
                                placeholder="$0.00"
                                keyboardType='numeric'
                                returnKeyType="done"
                            />
                    </View>
                    <View style={styles.controlButtonRow}>
                        <Button style={styles.multiSubmit} onPress={sendData}>
                            <View>
                                <Text style={styles.backButtonTxt}>Submit</Text>
                            </View>
                        </Button>
                    </View>
                </View>
            )
        } else if(optionProp.data.description === "Public Transport Stop") {
            return(
                <View>
                    <View style={styles.buttonRow}>
                        <Text
                            style={styles.inputLabel}
                        >Line Number</Text>
                        <TextInput
                            style={styles.inputField}
                            onChangeText={setLineNumber}
                            value={lineNumber}
                            placeholder="00"
                            keyboardType='numeric'
                            returnKeyType="done"
                        />
                    </View>    
                    <View style={styles.buttonRow}>
                        <Text
                            style={styles.inputLabel}
                        >Daily Loops</Text>
                        <TextInput
                            style={styles.inputField}
                            onChangeText={setLoopsCount}
                            value={loopsCount}
                            placeholder="00"
                            keyboardType='numeric'
                            returnKeyType="done"
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
                                placeholder="$0.00"
                                keyboardType='numeric'
                                returnKeyType="done"
                            />
                    </View> 
                    <View style={styles.controlButtonRow}>
                        <Button style={styles.multiSubmit} onPress={sendData}>
                            <View>
                                <Text style={styles.backButtonTxt}>Submit</Text>
                            </View>
                        </Button>
                    </View>
                </View>

            )
        } else {
            props.setNoOptions(true);
            return null
        }
    }
    if(optionProp.accessType === "Path") {
        // Show options for roads
        if(optionProp.data.description === "Main Road" || optionProp.data.description === "Side Road") {
            return(
                <View>
                    <View style={styles.buttonRow}>
                        <Text
                            style={styles.inputLabel}
                        >Number of Lanes</Text>
                        <TextInput
                            style={styles.inputField}
                            onChangeText={setLaneCount}
                            value={laneCount}
                            placeholder="00"
                            keyboardType='numeric'
                            returnKeyType="done"
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
                                    // if (option.value === turnOptions[0].value) {
                                    //     // If the option is the first option, select only this option
                                    //     setSelect4([option.value]);
                                    // } else {
                                        // Add or remove the option value from select4
                                        if (select4.includes(option.value)) {
                                            // Remove the option value from select4 if it's already in the array
                                            setSelect4(select4.filter(value => value !== option.value));
                                        } else {
                                            // Add the option value to select4 if it's not already in the array
                                            setSelect4([...select4, option.value]);
                                        }
                                        if (option.value === 1) {
                                            // If the option is the "deselect all" option, clear the array
                                            setSelect4([option.value]);
                                        }
                                        if (select4.includes(1)) {
                                            // If the "deselect all" option is selected, remove it from the array
                                            setSelect4(select4.filter(value => value !== 1));
                                        }
                                    // }
                                    console.log(select4);
                                  }}
                                  
                                appearance={`${getButtonAppearance(option.value, select4)}`}
                            >
                            <Text style={styles.backButtonTxt}>{option.label}</Text>
                          </Button>
                        ))}
                    </View>
                    <View style={styles.controlButtonRow}>
                        <Button style={styles.multiSubmit} onPress={sendData}>
                            <View>
                                <Text style={styles.backButtonTxt}>Submit</Text>
                            </View>
                        </Button>
                    </View>
                </View>    
            )
        } else {
            props.setNoOptions(true);
            return null
        }
    }
    if(optionProp.accessType === "Area") {
        if(optionProp.data.description === "Parking Garage") {
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
                                returnKeyType="done"
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
                                placeholder="$0.00"
                                keyboardType='numeric'
                                returnKeyType="done"
                            />
                    </View> 
                    <View style={styles.buttonRow}>
                        <Text
                            style={styles.inputLabel}
                            >Number of Floors</Text>
                            <TextInput
                                style={styles.inputField}
                                onChangeText={setLaneCount}
                                value={laneCount}
                                placeholder="00"
                                keyboardType='numeric'
                                returnKeyType="done"
                            />
                    </View>
                    <View style={styles.controlButtonRow}>
                        <Button style={styles.multiSubmit} onPress={sendData}>
                            <View>
                                <Text style={styles.backButtonTxt}>Submit</Text>
                            </View>
                        </Button>
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
                        returnKeyType="done"
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
                        returnKeyType="done"
                    />
                </View> 
                <View style={styles.buttonRow}>
                    <View style={styles.controlButtonRow}>
                        <Button style={styles.multiSubmit} onPress={sendData}>
                            <View>
                                <Text style={styles.backButtonTxt}>Submit</Text>
                            </View>
                        </Button>
                    </View>
                </View>
            </View>    
        )
    } 
    else {
        props.setNoOptions(true);
        return null;
    }
}