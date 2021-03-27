import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CreateActivityStack } from './createActivityStack.component.js';
import { Collaborate } from '../screens/Collaborate/collaborate.component';
import { TeamPage } from '../screens/Collaborate/Team/team.component';
import { ProjectPage } from '../screens/Collaborate/Project/project.component';
import { ActivitySignUpPage } from '../screens/Collaborate/ResearchActivities/SignUp/activitySignUp.component';
import { StationaryActivity } from '../screens/Collaborate/ResearchActivities/Stationary/stationaryActivity.component'
import { SurveyActivity } from '../screens/Collaborate/ResearchActivities/Survey/surveyActivity.component'
import { PeopleMovingActivity } from '../screens/Collaborate/ResearchActivities/PeopleMoving/peopeMovingActivity.component.js';

const { Navigator, Screen } = createStackNavigator();

export function CollaborateStack(props) {
  var location = props.location;
  let addProject= props.addProject;
  let removeProject= props.removeProject;

  // Array with activity names
  const activityTypes = ['Stationary Map', 'People Moving', 'Survey'];

  // These are used for api calls
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  // list of current users invites to Teams
  const [invites, setInvites] = useState([]);

  // The selected Team and List of Teams the User is a member of
  const [team, setTeam] = useState(null);
  const [teams, setTeams] = useState([]);

  // The selected Project and List of Projects for the selected Team
  const [project, setProject] = useState(null);
  const [projects, setProjects] = useState([]);

  // The selected Activity and List of Activities for the selected Project
  const [activity, setActivity] = useState(null);
  const [activities, setActivities] = useState([]);
  const [pastActivities, setPastActivities] = useState([]);
  const [updateActivity, setUpdateActivity] = useState(false);

  // Used for starting an Activity (time slot user has selected for the activity)
  const [timeSlot, setTimeSlot] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [initialTimeSlot, setInitialTimeSlot] = useState(null)

  const [firstname, setFirstname] = useState('first name');
  const [lastname, setLastname] = useState('last name');

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

      let first = await AsyncStorage.getItem('@firstName');
      let last = await AsyncStorage.getItem('@lastName');
      setFirstname(first);
      setLastname(last);
    }

    getTokens()
  }, []);

  // returns true if the current user is the owner of the selected Team
  const teamOwner = () => {
    if (team === null || team.users === null) {
      return false;
    }
    let members = team.users;
    let ownerIndex = members.findIndex(element => element.role === "owner");
    // if the owner id and current userId are the same, then this use is the owner
    if (members[ownerIndex].user === userId) {
      return true;
    } else {
      return false;
    }
  }

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
            firstname={firstname}
            lastname={lastname}
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
            setTeam={setTeam}
            teamOwner={teamOwner}
            teams={teams}
            setTeams={setTeams}
            project={project}
            setProject={setProject}
            projects={projects}
            setProjects={setProjects}
            addProject={addProject}
            removeProject={removeProject}
            activities={activities}
            setActivities={setActivities}
            pastActivities={pastActivities}
            setPastActivities={setPastActivities}
            location={location}
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
            setTeam={setTeam}
            teamOwner={teamOwner}
            teams={teams}
            setTeams={setTeams}
            project={project}
            setProject={setProject}
            projects={projects}
            setProjects={setProjects}
            addProject={addProject}
            removeProject={removeProject}
            activity={activity}
            setActivity={setActivity}
            setUpdateActivity={setUpdateActivity}
            activities={activities}
            setActivities={setActivities}
            pastActivities={pastActivities}
            setPastActivities={setPastActivities}
            activityTypes={activityTypes}
            setTimeSlots={setTimeSlots}
          />
        }
      </Screen>
      <Screen name='CreateActivityStack'>
        {props =>
          <CreateActivityStack
            {...props}
            token={token}
            userId={userId}
            team={team}
            setTeams={setTeams}
            project={project}
            setProject={setProject}
            projects={projects}
            setProjects={setProjects}
            activity={activity}
            setActivity={setActivity}
            updateActivity={updateActivity}
            setUpdateActivity={setUpdateActivity}
            activities={activities}
            setActivities={setActivities}
            activityTypes={activityTypes}
          />
        }
      </Screen>
      <Screen name='ActivitySignUpPage'>
        {props =>
          <ActivitySignUpPage
            {...props}
            token={token}
            userId={userId}
            team={team}
            teamOwner={teamOwner}
            project={project}
            activity={activity}
            setActivity={setActivity}
            setUpdateActivity={setUpdateActivity}
            activities={activities}
            setActivities={setActivities}
            timeSlots={timeSlots}
            setTimeSlots={setTimeSlots}
            setTimeSlot={setTimeSlot}
            setInitialTimeSlot={setInitialTimeSlot}
            firstname={firstname}
            lastname={lastname}
          />
        }
      </Screen>
      <Screen
        name="StationaryActivity">
        {props => <StationaryActivity
                        {...props}
                        getSelectedActivity={activities}
                        timeSlot={timeSlot}
                        token={token}
                        initialTimeSlot={initialTimeSlot}
                        setTimeSlot={setTimeSlot}
                    ></StationaryActivity>
        }
      </Screen>
      <Screen
        name="PeopleMovingActivity">
        {props => <PeopleMovingActivity
                    {...props}
                    getSelectedActivity={activities}
                    timeSlot={timeSlot}
                    initialTimeSlot={initialTimeSlot}
                    setTimeSlot={setTimeSlot}
                    token={token}
                  >
                  </PeopleMovingActivity>
        }
      </Screen>
      <Screen
        name="SurveyActivity">
        {props =>
          <SurveyActivity
            {...props}
            getSelectedActivity={activities}
            timeSlot={timeSlot}
            setTimeSlot={setTimeSlot}
          />
        }
      </Screen>
    </Navigator>
  );
};
