import React, { Component } from 'react';

import MyHeader from '../components/Headers/MyHeader.js';
import HomeResultView from './ResultView.js';
import HomeMapView from './HomeMapView.js';
import DummyResult from '../components/DummyResult.js';
import ConfirmCompare from '../components/Compare/ConfirmCompare.js';

import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Text, Button, Input, Icon, Modal } from '@ui-kitten/components';
import styles from './homeStyles.js';

class HomeScreen extends Component {

    constructor(props){
        super(props);

        this.state = {
            location: props.location,
            compare: false,
            compareCount: 0,
            selectedProjects: this.props.selectedProjects
        }

        this.onComparePress = this.onComparePress.bind(this);
        this.compareIncrement = this.compareIncrement.bind(this);
        this.compareDecrement = this.compareDecrement.bind(this);
        this.addToSelectedProjects = this.addToSelectedProjects.bind(this);
    }

    onComparePress() {

        this.setState({
            compare: !this.state.compare
        });
    }

    compareIncrement() {

        this.setState({
            compareCount: this.state.compareCount + 1
        })
    }

    compareDecrement() {

        this.setState({
            compareCount: this.state.compareCount - 1
        })
    }

    async addToSelectedProjects(name) {

        var selectedProjectsArray = this.state.selectedProjects

        selectedProjectsArray.push(name)

        await this.setState({
            selectedProjects: selectedProjectsArray
        })

        await this.props.setProjects(selectedProjectsArray)

    }

    inSelectedProject = (name) => {

        if (this.state.selectedProjects.includes(name)) {
            return true
        }
        else {
            return false
        }
    }

    render() {

        return(
            
            <View style={styles.container}>

                <MyHeader myHeaderText={"Home"}/>

                <View style={{height:'35%'}}>
                    <HomeMapView location={this.state.location}/>
                </View>

                <HomeResultView onComparePress={this.onComparePress}/>

                <ScrollView>
                    <DummyResult 
                        inList={this.inSelectedProject}
                        compare={this.state.compare} 
                        compareIncrement={this.compareIncrement} 
                        compareDecrement={this.compareDecrement}
                        addProject={this.addToSelectedProjects}
                        removeProject={this.props.removeFromSelectedProjects}
                        projectArea={"Lake Lilian"}
                        projectComment={"Pavillion at Lake Lilian"}
                        />
                    <DummyResult 
                        inList={this.inSelectedProject}
                        compare={this.state.compare} 
                        compareIncrement={this.compareIncrement} 
                        compareDecrement={this.compareDecrement}
                        addProject={this.addToSelectedProjects}
                        removeProject={this.props.removeFromSelectedProjects}
                        projectArea={"Lake Eola"}
                        projectComment={"East side of Lake Eola"}
                        />
                    <DummyResult 
                        inList={this.inSelectedProject}
                        compare={this.state.compare} 
                        compareIncrement={this.compareIncrement} 
                        compareDecrement={this.compareDecrement}
                        addProject={this.addToSelectedProjects}
                        removeProject={this.props.removeFromSelectedProjects}
                        projectArea={"J. Blanchard Park"}
                        projectComment={"First mile of trails"}
                        />
                </ScrollView>

                <ConfirmCompare 
                    navigation={this.props.navigation}
                    compare={this.state.compare} 
                    selected={this.state.compareCount}
                    selectedProjects={this.state.selectedProjects}
                    removeFromSelectedProjectes={this.props.removeFromSelectedProjectes}
                />
                
            </View>
        );

    }
}

export default HomeScreen;
