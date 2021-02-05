import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Collaborate from '../screens/Collaborate/Collaborate.js';

import TeamPage from '../screens/Collaborate/Team/TeamPage.js';
import ProjectPage from '../screens/Collaborate/Project/ProjectPage.js';
import ActivitySignUp from '../screens/ResearchActivities/ActivitySignUp.js';

import StationaryActivity from '../screens/ResearchActivities/Stationary/ActivityPage.js';
import PeopleActivity from '../screens/ResearchActivities/PeopleMoving/ActivityPage.js';
import SurveyActivity from '../screens/ResearchActivities/Survey/ActivityPage.js';

import { createStackNavigator } from '@react-navigation/stack';

const CollaborateScreenStack = createStackNavigator();

class CollaborateStack extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedTeam: {},
            selectedProject: {},
            selectedActivity: {},
            teams: props.teams,
            invites: props.invites,
            activityTypes: ['Stationary Map', 'People Moving', 'Survey'],
            initialTimeStart: 1,
            time: ""
        };

        this.setSelectedTeam = this.setSelectedTeam.bind(this);
        this.getSelectedTeam = this.getSelectedTeam.bind(this);
        this.updateTeams = this.updateTeams.bind(this);
        this.getTeams = this.getTeams.bind(this);

        this.setSelectedProject = this.setSelectedProject.bind(this);
        this.getSelectedProject = this.getSelectedProject.bind(this);

        this.setSelectedActivity = this.setSelectedActivity.bind(this);
        this.getSelectedActivity = this.getSelectedActivity.bind(this);

        this.getActivityTypes = this.getActivityTypes.bind(this);
    }

    async updateTeams(teams) {
        await this.setState({
            teams: teams
        })
    }

    getTeams() {
        return this.state.teams;
    }

    setSelectedTeam(team) {
        this.setState({
            selectedTeam: team
        });
    }

    getSelectedTeam() {
        return this.state.selectedTeam;
    }

    setSelectedProject(project) {
        this.setState({
            selectedProject: project
        });
    }

    getSelectedProject() {

        return this.state.selectedProject;
    }

    setSelectedActivity(researchActivity) {
        this.setState({
            selectedActivity: researchActivity
        });
    }

    getSelectedActivity() {

        return this.state.selectedActivity;
    }

    getActivityTypes() {
        return this.state.activityTypes;
    }

    setInitialTime = () => {

        this.setState({
            initialTimeStart: 0
        })
    }

    setTime = (time) => {

        this.setState({
            time: time
        })
    }

    setStartTime = (time) => {

        let newTime = this.formatInitialTime(time)

        this.setState({
            time: newTime
        })

    }

    formatInitialTime = (time) => {

        let timeString = time
        timeString += ":"
        timeString += "00"

        return timeString
    }

    render() {
        return(
            <CollaborateScreenStack.Navigator>
                <CollaborateScreenStack.Screen
                    name="Collaborate"
                    options={{headerShown: false}}>
                    {props => <Collaborate
                                   {...props}
                                   setSelectedTeam={this.setSelectedTeam}
                                   updateTeams={this.updateTeams}
                                   getTeams={this.getTeams}
                                   invites={this.state.invites}
                              />}
                </CollaborateScreenStack.Screen>
                <CollaborateScreenStack.Screen
                    name="TeamPage"
                    options={{headerShown: false}}>
                    {props => <TeamPage
                                    {...props}
                                    updateTeams={this.updateTeams}
                                    setSelectedTeam={this.setSelectedTeam}
                                    getSelectedTeam={this.getSelectedTeam}
                                    setSelectedProject={this.setSelectedProject}
                              />}
                </CollaborateScreenStack.Screen>
                <CollaborateScreenStack.Screen
                    name="ProjectPage"
                    options={{headerShown: false}}>
                    {props => <ProjectPage
                                    {...props}
                                    setSelectedTeam={this.setSelectedTeam}
                                    getSelectedTeam={this.getSelectedTeam}
                                    setSelectedProject={this.setSelectedProject}
                                    getSelectedProject={this.getSelectedProject}
                                    setSelectedActivity={this.setSelectedActivity}
                                    getActivityTypes={this.getActivityTypes}
                                    setStartTime={this.setStartTime}
                                    navigation={this.props.navigation}
                              />}
                </CollaborateScreenStack.Screen>
                <CollaborateScreenStack.Screen
                    name="SignUpPage"
                    options={{headerShown: false}}>
                    {props => <ActivitySignUp
                                    {...props}
                                    getSelectedProject={this.getSelectedProject}
                                    getSelectedActivity={this.getSelectedActivity}
                                    getActivityTypes={this.getActivityTypes}
                                    setStartTime={this.setStartTime}
                              />}
                </CollaborateScreenStack.Screen>
                <CollaborateScreenStack.Screen
                    name="StationaryActivity"
                    options={{headerShown: false}}>
                    {props => <StationaryActivity
                                    {...props}
                                    getSelectedActivity={this.getSelectedActivity}
                                    initialTimeStart={this.state.initialTimeStart}
                                    setInitialTime={this.setInitialTime}
                                    time={this.state.time}
                                    setTime={this.setTime}
                              />}
                </CollaborateScreenStack.Screen>
                <CollaborateScreenStack.Screen
                    name="PeopleActivity"
                    options={{headerShown: false}}>
                    {props => <PeopleActivity
                                    {...props}
                              />}
                </CollaborateScreenStack.Screen>
                <CollaborateScreenStack.Screen
                    name="SurveyActivity"
                    options={{headerShown: false}}>
                    {props => <SurveyActivity
                                    {...props}
                              />}
                </CollaborateScreenStack.Screen>
            </CollaborateScreenStack.Navigator>
        )
    }
}

export default CollaborateStack;
