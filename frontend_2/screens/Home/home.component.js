import React, { useState } from 'react';
import { View, ScrollView, Pressable, Image } from 'react-native';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction, Button } from '@ui-kitten/components';
import { Header } from '../components/headers.component';
import { ViewableArea, ContentContainer } from '../components/content.component';
import { DummyResult } from '../components/dummyResult.component.js';
import { HomeMapView } from '../components/Maps/home.map.component.js';
import { HomeResultView } from './home.result.component.js'
import { styles } from './home.styles';

export const HomeScreen = ( location, selectedProjects, setProjects, removeFromSelectedProjects) => {

  const [compare, setCompare] = useState(false)

  onComparePress = () => {
    setCompare(!compare)
  }

  addToSelectedProjects = async (name) => {

    selectedProjectsArray = selectedProjects

    selectedProjectsArray.push(name)

    setSelectedProjects(selectedProjectsArray)

    await setProjects(selectedProjectsArray)
  }

  inSelectedProject = (name) => {

    if (selectedProjects.includes(name)) {
      return true
    }
    else {
      return false
    }
  }


  return (
    <ViewableArea>
      <Header text={'Home Page'}/>
      <ContentContainer>

        {/* <View style={{height:'35%'}}> */}
          <HomeMapView location={location}/>
        {/* </View> */}

        <HomeResultView onComparePress={onComparePress}/>

        <ScrollView>
            <DummyResult 
                inList={inSelectedProject}
                compare={compare} 
                addProject={addToSelectedProjects}
                removeProject={removeFromSelectedProjects}
                projectArea={"Lake Lilian"}
                projectComment={"Pavillion at Lake Lilian"}
                />
            <DummyResult 
                inList={inSelectedProject}
                compare={compare} 
                addProject={addToSelectedProjects}
                removeProject={removeFromSelectedProjects}
                projectArea={"Lake Eola"}
                projectComment={"East side of Lake Eola"}
                />
            <DummyResult 
                inList={inSelectedProject}
                compare={compare} 
                addProject={addToSelectedProjects}
                removeProject={removeFromSelectedProjects}
                projectArea={"J. Blanchard Park"}
                projectComment={"First mile of trails"}
                />
        </ScrollView>

        {/* <ConfirmCompare 
            navigation={this.props.navigation}
            compare={this.state.compare} 
            selected={this.state.compareCount}
            selectedProjects={this.state.selectedProjects}
            removeFromSelectedProjectes={this.props.removeFromSelectedProjectes}
        /> */}
                
      </ContentContainer>
    </ViewableArea>
  );
};
