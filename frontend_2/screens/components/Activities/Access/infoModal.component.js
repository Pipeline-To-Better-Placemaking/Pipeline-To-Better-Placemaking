import React, { useState } from 'react';
import { View, Modal,  TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useTheme, Text, Button } from '@ui-kitten/components';

import { styles } from './infoModal.styles';

export function InfoModal(props) {

    const theme = useTheme();

    console.log("\n info data: \n" , props.data);
    
    // only render the modal if the passed in data prop is something 
    if(props.data !== undefined){
        let purposeFormat = [];
        // formats the purpose array for a cleaner display
        if(props.data.accessType === "Access Point"){   
            // props.data.purpose.forEach(element =>{ 
            //     // if we are not at the last element, concat with comma and a whitespace
            //     if(element.localeCompare(props.data.purpose[props.data.purpose.length - 1]) !== 0) purposeFormat.push(element.concat(", "));
            //     // when we are at the last element, concat with nothing
            //     else purposeFormat.push(element.concat(''));
            // })
        
            return(
                <Modal transparent={true} animationType='slide' visible={props.visible}>
                        <TouchableOpacity onPress={() => props.close()} activeOpacity={1}>
                            <TouchableWithoutFeedback style={styles.sizing}>
                                <View style={[ styles.viewContainer, {backgroundColor:theme['background-basic-color-1']}]}>   
                                    <Text category={'h4'} style={styles.titleText}>{props.data.accessType}</Text>
                                    <View style={styles.dataView}>

                                        <View style={styles.spacing}>
                                            <Text style={styles.infoText}>Description: {props.data.description}</Text>
                                        </View>

                                        <View style={styles.spacing}>                
                                                <Text style={styles.infoText}>{props.data.inPerimeter ? `Inside project area` : `${props.data.distanceFromArea.toFixed(2)}m from project area`}</Text>                                          
                                        </View>

                                        <View style={styles.spacing}>                
                                                <Text style={styles.infoText}>Difficulty Rating: {props.data.details.diffRating}</Text>                                          
                                        </View>
                                        
                                        <View style={styles.spacing}>                
                                                <Text style={styles.infoText}>Spots: {props.data.details.spots}</Text>                                          
                                        </View>

                                        {/* Extra data for specific types */}
                                            <View style={styles.spacing}>
                                                <Text style={styles.infoText}>Cost: {(props.data.details.cost) ? (props.data.details.cost != 0 ? props.data.details.cost : "FREE!") : "FREE!"}</Text>
                                            </View>
                                        
                                        <View style={styles.buttonView}>
                                            <Button style={styles.closeButton} onPress={() => props.close()}>Close</Button>
                                        </View>
                                    </View>                      
                                </View>
                            </TouchableWithoutFeedback>
                        </TouchableOpacity>
                </Modal>
            )
        } else if(props.data.accessType === "Access Path"){             
            return(
                <Modal transparent={true} animationType='slide' visible={props.visible}>
                        <TouchableOpacity onPress={() => props.close()} activeOpacity={1}>
                            <TouchableWithoutFeedback style={styles.sizing}>
                                <View style={[ styles.viewContainer, {backgroundColor:theme['background-basic-color-1']}]}>   
                                    <Text category={'h4'} style={styles.titleText}>{props.data.accessType}</Text>
                                    <View style={styles.dataView}>

                                        <View style={styles.spacing}>
                                            <Text style={styles.infoText}>Description: {props.data.description}</Text>
                                        </View>

                                        <View style={styles.spacing}>                
                                        <Text style={styles.infoText}>{props.data.inPerimeter ? `Inside project area` : `${props.data.distanceFromArea.toFixed(2)}m from project area`}</Text>                                          
                                        </View>
                                        
                                        <View style={styles.spacing}>                
                                                <Text style={styles.infoText}>Difficulty Rating: {props.data.details.diffRating}</Text>                                          
                                        </View>

                                        <View style={styles.spacing}>                
                                                <Text style={styles.infoText}>Length: {props.data.area}m</Text>                                          
                                        </View>

                                        <View style={styles.spacing}>                
                                                <Text style={styles.infoText}>Lane Count: {props.data.details.laneCount}</Text>                                          
                                        </View>

                                        <View style={styles.spacing}>                
                                                <Text style={styles.infoText}>{(props.data.details.median) ? "The path has a median" : "The path does not have a median"}</Text>                                          
                                        </View>

                                        <View style={styles.spacing}>                
                                                <Text style={styles.infoText}>{(props.data.details.paved) ? "The path is paved" : "The path is not paved"}</Text>                                          
                                        </View>

                                        <View style={styles.spacing}>
                                            <Text style={styles.infoText}>{(props.data.details.tollLane) ? "The path has tolls" : "The path does not have tolls"}</Text>
                                        </View>

                                        <View style={styles.spacing}>
                                            <Text style={styles.infoText}>{(props.data.details.twoWay) ? "The path is two-way" : "The path is one-way"}</Text>
                                        </View>

                                         <View style={styles.spacing}>                
                                                <Text style={styles.infoText}>{
                                                (props.data.details.turnLane.length > 1 ? "The path has both left and right turn lanes" : (props.data.details.turnLane.length == 1 ? (props.data.details.turnLane[0] === 1 ? "The path has a left turn lane" : "The path has a right turn lane") : "The path has no turn lanes"))
                                                // if(props.data.details) {
                                                //     if(props.data.details.turnLane && props.data.details.turnLane.length > 1) {
                                                //     setTurnLane("The access path has both left and right turn lanes");
                                                //     } else if (props.data.details && props.data.details.turnLane && props.data.details.turnLane.length === 1) {
                                                //         if (props.data.details.turnLane[0] === 1) {
                                                //             setTurnLane("The access path has a left turn lane");
                                                //         } else if (props.data.details.turnLane[0] === 2) {
                                                //             setTurnLane("The access path has a right turn lane");
                                                //         }
                                                //     }
                                                // }
                                                }</Text>                                          
                                        </View>
                                        
                                        <View style={styles.buttonView}>
                                            <Button style={styles.closeButton} onPress={() => props.close()}>Close</Button>
                                        </View>
                                    </View>                      
                                </View>
                            </TouchableWithoutFeedback>
                        </TouchableOpacity>
                </Modal>
            )
        } else if(props.data.accessType === "Access Area"){   
            // props.data.purpose.forEach(element =>{ 
            //     // if we are not at the last element, concat with comma and a whitespace
            //     if(element.localeCompare(props.data.purpose[props.data.purpose.length - 1]) !== 0) purposeFormat.push(element.concat(", "));
            //     // when we are at the last element, concat with nothing
            //     else purposeFormat.push(element.concat(''));
            // })
        
            return(
                <Modal transparent={true} animationType='slide' visible={props.visible}>
                        <TouchableOpacity onPress={() => props.close()} activeOpacity={1}>
                            <TouchableWithoutFeedback style={styles.sizing}>
                                <View style={[ styles.viewContainer, {backgroundColor:theme['background-basic-color-1']}]}>   
                                    <Text category={'h4'} style={styles.titleText}>{props.data.accessType}</Text>
                                    <View style={styles.dataView}>

                                        <View style={styles.spacing}>
                                            <Text style={styles.infoText}>Description: {props.data.description}</Text>
                                        </View>

                                        <View style={styles.spacing}>                
                                        <Text style={styles.infoText}>{props.data.inPerimeter ? `Inside project area` : `${props.data.distanceFromArea.toFixed(2)}m from project area`}</Text>                                          
                                        </View>
                                        
                                        <View style={styles.spacing}>                
                                                <Text style={styles.infoText}>Difficulty Rating: {props.data.details.diffRating}</Text>                                          
                                        </View>

                                        <View style={styles.spacing}>                
                                                <Text style={styles.infoText}>Spots: {props.data.details.spots}</Text>                                          
                                        </View>

                                        {/* Extra data for specific types */}
                                            <View style={styles.spacing}>
                                                <Text style={styles.infoText}>Cost: {(props.data.details.cost) ? (props.data.details.cost != 0 ? props.data.details.cost : "FREE!") : "FREE!"}</Text>
                                            </View>
                                        
                                        <View style={styles.buttonView}>
                                            <Button style={styles.closeButton} onPress={() => props.close()}>Close</Button>
                                        </View>
                                    </View>                      
                                </View>
                            </TouchableWithoutFeedback>
                        </TouchableOpacity>
                </Modal>
            )
        } else return null
    }
    else return null
}
   