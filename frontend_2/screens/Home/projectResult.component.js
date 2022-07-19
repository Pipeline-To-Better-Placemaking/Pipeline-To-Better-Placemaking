import React, { useState } from 'react';
import { View, RefreshControl } from 'react-native';
import { Text, Button, Icon, Divider, List, ListItem } from '@ui-kitten/components';
import { HeaderBack } from '../components/headers.component';
import { MapAreaWrapper, ShowArea } from '../components/Maps/mapPoints.component';
import { ViewableArea, ContentContainer, PopUpContainer } from '../components/content.component';
import { getDayStr, getTimeStr } from '../components/timeStrings.component';
import { getAllResults, getProject } from '../components/apiCalls';
import { 
  formatStationaryGraphData, 
  formatMovingGraphData, 
  formatSoundGraphData, 
  formatBoundaryGraphData, 
  formatNatureGraphData,
  formatLightGraphData,
  formatOrderGraphData, 
  retrieveTestName 
} from '../components/helperFunctions';
import { Pagination } from '../components/pagination.component';

import { styles } from './projectResult.styles';

const ForwardIcon = (props) => (
  <Icon {...props} name='arrow-ios-forward'/>
);

export function ProjectResultPage(props) {

  const [refreshing, setRefreshing] = useState(false);
  const [sentMsgVisible, setSentMsgVisible] = useState(false);
  const [msg, setMsg] = useState('');

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refreshDetails();
    setRefreshing(false);
  }, []);

  const refreshDetails = async () => {
    let proj = await getProject(props.project);
    if (proj !== null) {
      let _results = await getAllResults(proj); // sets to empty list if no results
      await props.setResults(_results);
    }
  };

  const openActivityPage = async (item) => {
    await props.setSelectedResult(item);
    // open results page
    if (item.test_type === 'stationary') {
      let result = await formatStationaryGraphData(item);
      await props.setSelectedResult(result);
      props.navigation.navigate("StationaryResultPage");
    }
    else if (item.test_type === 'moving') {
      let result = await formatMovingGraphData(item);
      await props.setSelectedResult(result);
      props.navigation.navigate("MovingResultPage");
    }
    else if (item.test_type === 'survey') {
      props.navigation.navigate("SurveyResultPage");
    }
    else if (item.test_type === 'sound') {
      let result = await formatSoundGraphData(item);
      await props.setSelectedResult(result);
      props.navigation.navigate("SoundResultPage");
    }
    else if (item.test_type === 'boundary') {
      let result = await formatBoundaryGraphData(item);
      await props.setSelectedResult(result);
      props.navigation.navigate("BoundaryResultPage");
    }
    else if (item.test_type === 'nature') {
      let result = await formatNatureGraphData(item);
      await props.setSelectedResult(result);
      props.navigation.navigate("NatureResultPage");
    }
    else if (item.test_type === 'light') {
      let result = await formatLightGraphData(item);
      await props.setSelectedResult(result);
      props.navigation.navigate("LightResultPage");
    }
    else if (item.test_type === 'order') {
      let result = await formatOrderGraphData(item);
      await props.setSelectedResult(result);
      props.navigation.navigate("OrderResultPage");
    }
    //add new tests here ^

  };

  const emailResults = async () => {
    let success = false
    let result = null
    try {
        const response = await fetch('https://p2bp.herokuapp.com/api/projects/' + props.project._id + '/export', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.token
            }
        })
        result = await response.json();
        console.log("email result...", result);
        success = true
    } catch (error) {
        console.log("error", error);
        success = false;
    }
    if (result.success !== undefined) {
      success = result.success;
    }

    if(success) {
      await setMsg("Success, sent Project Information!");
    } else {
      await setMsg("Failure, wasn't able to send Project Information :(");
    }
    await setSentMsgVisible(true);
    wait(2000).then(() => setSentMsgVisible(false));
  }
  
  const activityItem = ({ item, index }) => {
    let testType = retrieveTestName(item.test_type);
    return (
      <ListItem
        title={
          <Text style={styles.textTitle}>
              {`${item.title}`}
          </Text>
        }
        description={getTimeStr(item.date) + ' - ' + getDayStr(item.sharedData.date) + ' - ' + testType}
        accessoryRight={ForwardIcon}
        onPress={() => openActivityPage(item)}
      />
    );
  }
  
  // pagination controls
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(10);
  const [currentRange] = useState([1, 6]);
  const rangeInc = 6;
  const lastPage = Math.ceil(props.results.length / resultsPerPage);
  const indexOfLastResults = currentPage * resultsPerPage;
  const indexOfFirstResults = indexOfLastResults - resultsPerPage;
  const currentResults = props.results.slice(indexOfFirstResults, indexOfLastResults);
  
  // changes the 'page'
  const paginate = (pageNumber) =>{
    // if we reached the end of the current range, increment it
    if(currentRange[1] + 1 === pageNumber){
      currentRange[0] = pageNumber
      // checks to make sure it's not rendering extra pages (happens if results.length is not a mutiple of the rangeInc)
      let tempMax = (pageNumber - 1) + rangeInc
      if(tempMax <= lastPage) currentRange[1] = tempMax
      // if it does try to, then it sets the last page as the lastPage number
      else currentRange[1] = lastPage
    }
    // if we reached the start of the current range, decrement it
    else if(currentRange[0] - 1 === pageNumber){
      currentRange[1] = pageNumber
      currentRange[0] = (pageNumber + 1) - rangeInc
    }
    // change the page number
    setCurrentPage(pageNumber)
  }
  // if the max range is larger than the last page number, set the max as the last page number
  if(currentRange[1] > lastPage) currentRange[1] = lastPage
  
  
  return (
    <ViewableArea>
      <HeaderBack {...props} text={props.project.title}/>
      <PopUpContainer
        {...props}
        visible={sentMsgVisible}
        closePopUp={() => setSentMsgVisible(false)}
      >
        <View style={styles.messageView}>
          <Text category={'s1'}>{msg}</Text>
        </View>
      </PopUpContainer>
      <ContentContainer>

        <View style={styles.mapSpace}>
          <MapAreaWrapper area={props.project.subareas[0].points} mapHeight={'100%'}>
            <ShowArea area={props.project.subareas[0].points} />
          </MapAreaWrapper>
        </View>

        <View style={styles.metaDataView}>
          <View style={styles.metaDataRow}>
            <Text style={styles.metaDataDesc}>Location: </Text>
            <Text>{props.project.description}</Text>
          </View>
          <View style={styles.metaDataRow}>
            <Text style={styles.metaDataDesc}>Team: </Text>
            <Text>{props.team.title}</Text>
          </View>
          <View style={styles.metaDataRow}>
            <Text style={styles.metaDataDesc}>Admin: </Text>
            <Text>{props.team.users[0].firstname} {props.team.users[0].lastname}</Text>
          </View>
        </View>

        <View style={styles.teamTextView}>
            <View style={styles.teamtextTitle}>
                <Text style={styles.teamText}>Research Results</Text>
            </View>
            <Button
              size={'small'}
              style={styles.emailButton}
              status={'info'}
              appearance={'outline'}
              accessoryRight={MailIcon}
              onPress={emailResults}
            >
              Email Me Results
            </Button>
        </View>
        <Divider style={styles.dividerMargin} />
        
        <Pagination
          totalResults={props.results.length}
          resultsPerPage={resultsPerPage}
          currentPage={currentPage}
          lastPage={lastPage}
          currentRange={currentRange}
          paginate={paginate}
        />
        
        <View style={styles.listView}>
          <List
            style={styles.listElements}
            data={currentResults}
            ItemSeparatorComponent={Divider}
            renderItem={activityItem}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
          />
        </View>
      </ContentContainer>
    </ViewableArea>
  );
};

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const MailIcon = (props) => (
  <Icon {...props} name='email-outline'/>
);
