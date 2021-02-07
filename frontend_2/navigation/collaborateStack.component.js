import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Collaborate } from '../screens/Collaborate/collaborate.component';
import { TeamPage } from '../screens/Collaborate/Team/team.component';
import { ProjectPage } from '../screens/Collaborate/Project/project.component';

const { Navigator, Screen } = createStackNavigator();

export function CollaborateStack(props) {

  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [invites, setInvites] = useState(null);
  const [teams, setTeams] = useState(null);
  const [team, setTeam] = useState(null);
  const [projects, setProjects] = useState(null);
  const [project, setProject] = useState(null);

  useEffect(() => {
    async function getTokens() {
      // used for api calls
      let token = await AsyncStorage.getItem("@token");
      setToken(token);

      let id = await AsyncStorage.getItem("@id");
      setUserId(id);

      let teamsList = await AsyncStorage.getItem('@teams');
      teamsList = JSON.parse(teamsList);
      setTeams(teamsList);

      let inviteList = await AsyncStorage.getItem('@invites');
      inviteList = JSON.parse(inviteList);
      setInvites(inviteList);
    }

    getTokens()
  }, []);

  return (
    <Navigator headerMode='none'>
      <Screen name='Collaborate'>
        {props =>
          <Collaborate
            {...props}
            token={token}
            userId={userId}
            setTeam={setTeam}
            teams={teams}
            setTeams={setTeams}
            projects={projects}
            setProjects={setProjects}
            invites={invites}
            setInvites={setInvites}
          />
        }
      </Screen>
      <Screen name='TeamPage'>
        {props =>
          <TeamPage
            {...props}
            token={token}
            userId={userId}
            team={team}
            setTeams={setTeams}
            project={project}
            setProject={setProject}
            projects={projects}
            setProjects={setProjects}
          />
        }
      </Screen>
      <Screen name='ProjectPage'>
        {props =>
          <ProjectPage
            {...props}
            token={token}
            userId={userId}
            team={team}
            setTeams={setTeams}
            project={project}
            setProject={setProject}
            projects={projects}
            setProjects={setProjects}
          />
        }
      </Screen>
    </Navigator>
  );
};
