import React from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { View, ScrollView, Pressable, Image, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Layout, TopNavigation, TopNavigationAction, useTheme } from '@ui-kitten/components';
import { Text, Button, Input, Icon, Popover, Divider, List, ListItem, Card } from '@ui-kitten/components';
import { Header } from '../components/headers.component';
import { ViewableArea, ContentContainer } from '../components/content.component';
import { styles } from './collaborate.styles';

const ForwardIcon = (props) => (
  <Icon {...props} name='arrow-ios-forward'/>
);

const teamItem = ({ item, index }) => (
    <ListItem
      title={
            <Text style={{fontSize:20}}>
                {`${item.title}`}
            </Text>}
      accessoryRight={ForwardIcon}
      onPress={() => this.openTeamPage(item)}
    />
);

const popUpAnchor = () => (
    <Divider style={{marginTop: 5}} />
);

const MainContent = () => (
  <View>
    <View style={styles.teamTextView}>
        <View style={{flexDirection:'column', justifyContent:'flex-end'}}>
            <Text style={styles.teamText}> Teams </Text>
        </View>
        <View style={styles.createTeamButtonView}>
            <Button status='primary' appearance='outline' onPress={this.onOpenCreateTeam}>
                Create New
            </Button>
        </View>
    </View>

    <View style={{flexDirection:'row', justifyContent:'center', maxHeight:'50%', marginTop:15}}>

    </View>

    <View style={styles.teamTextView}>
        <View style={{flexDirection:'column', justifyContent:'flex-end'}}>
            <Text style={styles.teamText}> Invites </Text>
        </View>
    </View>
    <Divider style={{marginTop: 5}} />
  </View>
);

export const Collaborate = ({ navigation }) => {
  return (
    <ViewableArea>
      <Header text={'Collaborate'}/>
      <ContentContainer>
        <MainContent />
      </ContentContainer>
    </ViewableArea>
  );
};
