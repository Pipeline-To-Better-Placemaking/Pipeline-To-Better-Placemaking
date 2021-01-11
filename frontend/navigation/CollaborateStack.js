import React, {Component} from 'react';
import Collaborate from '../screens/Collaborate/Collaborate.js';
import TeamPage from '../screens/Collaborate/Team/TeamPage.js';
import ProjectPage from '../screens/Collaborate/Project/ProjectPage.js';
import ActivitySignUp from '../screens/ResearchActivities/ActivitySignUp.js';
import { createStackNavigator } from '@react-navigation/stack';

const CollaborateScreenStack = createStackNavigator();

class CollaborateStack extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedTeam: null,
            selectedProject: null,
            selectedActivity: null,
            activityTypes: {
                PeopleMoving: {name:'People Moving'},
                StationaryMap: {name:'Stationary Map'},
                Survey: {name:'Survey'}
            }
        };

        this.setSelectedTeam = this.setSelectedTeam.bind(this);
        this.getSelectedTeam = this.getSelectedTeam.bind(this);

        this.setSelectedProject = this.setSelectedProject.bind(this);
        this.getSelectedProject = this.getSelectedProject.bind(this);

        this.setSelectedActivity = this.setSelectedActivity.bind(this);
        this.getSelectedActivity = this.getSelectedActivity.bind(this);

        this.getActivityTypes = this.getActivityTypes.bind(this);
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

    render() {
        return(
            <CollaborateScreenStack.Navigator>
                <CollaborateScreenStack.Screen
                    name="Collaborate"
                    options={{headerShown: false}}>
                    {props => <Collaborate
                                   {...props}
                                   setSelectedTeam={this.setSelectedTeam}
                              />}
                </CollaborateScreenStack.Screen>
                <CollaborateScreenStack.Screen
                    name="TeamPage"
                    options={{headerShown: false}}>
                    {props => <TeamPage
                                    {...props}
                                    getSelectedTeam={this.getSelectedTeam}
                                    setSelectedProject={this.setSelectedProject}
                              />}
                </CollaborateScreenStack.Screen>
                <CollaborateScreenStack.Screen
                    name="ProjectPage"
                    options={{headerShown: false}}>
                    {props => <ProjectPage
                                    {...props}
                                    getSelectedProject={this.getSelectedProject}
                                    setSelectedActivity={this.setSelectedActivity}
                                    getActivityTypes={this.getActivityTypes}
                              />}
                </CollaborateScreenStack.Screen>
                <CollaborateScreenStack.Screen
                    name="SignUpPage"
                    options={{headerShown: false}}>
                    {props => <ActivitySignUp
                                    {...props}
                                    getSelectedActivity={this.getSelectedActivity}
                                    getActivityTypes={this.getActivityTypes}
                              />}
                </CollaborateScreenStack.Screen>
            </CollaborateScreenStack.Navigator>
        )
    }
}

export default CollaborateStack;
