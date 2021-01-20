import React, { Component } from 'react';
import { View,  ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Text, Button, BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import styles from './compareStyles'

import EmptyCompareBox from '../components/EmptyCompareBox.js'
import CompareBox from '../components/CompareBox.js';
import MyHeader from '../components/MyHeader.js';


class CompareScreen extends Component {

    constructor(props){
        super(props);

        this.state = {
            index: 0
        }

        console.log(this.props.selectedProjects)

    }

    setIndex = (index) => {
        this.setState({
            index: index
        })
    }

    render() {

        const CompareBoxList = () => {

            return (
                this.props.selectedProjects.map((name, key) => {
                    return(
                    <CompareBox
                        key={key}
                        projectName={name}
                        index={this.state.index}
                        setIndex={this.setIndex}
                    />)
                })
            )
        }

        return(
            <View style={styles.container}>

                <MyHeader myHeaderText={"Compare"}/>

                <ScrollView>

                    <CompareBoxList/>

                    {/* <EmptyCompareBox/> */}
                    <View>
                        <Button style={styles.confirmCompare}> Confirm Compare </Button>
                    </View>

                </ScrollView>
                
            </View>
        )
    }
}

export default CompareScreen;