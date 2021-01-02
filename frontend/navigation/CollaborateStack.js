import React, {Component} from 'react';
import Collaborate from '../screens/Collaborate/Collaborate.js';
import TeamPage from '../screens/Collaborate/TeamPage.js';
import ProjectPage from '../screens/Collaborate/ProjectPage.js';
import { createStackNavigator } from '@react-navigation/stack';

const CollaborateScreenStack = createStackNavigator();

class CollaborateStack extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedTeam: null,
            selectedProject: null
        };

        this.setSelectedTeam = this.setSelectedTeam.bind(this);
        this.getSelectedTeam = this.getSelectedTeam.bind(this);
        this.setSelectedProject = this.setSelectedProject.bind(this);
        this.getSelectedProject = this.getSelectedProject.bind(this);
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
                              />}
                </CollaborateScreenStack.Screen>
            </CollaborateScreenStack.Navigator>
        )
    }
}

export default CollaborateStack;
