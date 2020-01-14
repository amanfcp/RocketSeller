import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import {
  Tab,
  Tabs,
  ScrollableTab
} from 'native-base';
import {
  Icon
} from 'react-native-elements'
import colors from '../../colors/colors'
import { List } from 'react-native-paper'
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortOpen: false,
      selectedSort: 'New-Old',
      newOld: true,
      oldNew: false,
      closestExpire: false,
    }
  }

  handleSortAccordion = () => {
    this.setState({
      sortOpen: !this.state.sortOpen
    })
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitleStyle: {
      color: colors.white,
    },
    headerStyle: {
      backgroundColor: colors.red
    },
    headerLeft: () =>
      <Icon
        iconStyle={{ padding: 10, color: '#fff' }}
        name='ios-arrow-back'
        type='ionicon'
        size={20}
        onPress={() => navigation.goBack()} />
    ,
    headerRight: () => null,
  })
  render() {
    return (

      <Tabs
        tabBarUnderlineStyle={{
          height: 0,
        }}
        renderTabBar={() => <ScrollableTab style={{ borderWidth: 0 }} />}
      >
        <Tab
          activeTextStyle={styles.activeTabText}
          textStyle={styles.tabText}
          tabStyle={styles.tabStyle}
          activeTabStyle={styles.activeTabStyle}
          heading="All">
          <List.Accordion
            style={{
              backgroundColor: colors.gray + '80'
            }}
            expanded={this.state.sortOpen}
            onPress={this.handleSortAccordion}
            titleStyle={{ color: colors.green }}
            title={`Sort: ${this.state.selectedSort}`}
          >
            <List.Item
              style={
                this.state.newOld ?
                  { backgroundColor: colors.green + '50' }
                  :
                  { backgroundColor: colors.gray + '80' }
              }
              onPress={() => {
                this.setState({ selectedSort: 'New-Old', oldNew: false, newOld: true, closestExpire: false })
                this.handleSortAccordion()
              }}
              title="New-Old" />
            <List.Item
              style={
                this.state.oldNew ?
                  { backgroundColor: colors.green + '50' }
                  :
                  { backgroundColor: colors.gray + '80' }
              }
              onPress={() => {
                this.setState({ selectedSort: 'Old-New', oldNew: true, newOld: false, closestExpire: false })
                this.handleSortAccordion()
              }}
              title="Old-New" />
            <List.Item
              style={
                this.state.closestExpire ?
                  { backgroundColor: colors.green + '50' }
                  :
                  { backgroundColor: colors.gray + '80' }
              }
              onPress={() => {
                this.setState({ selectedSort: 'Closest Expire', oldNew: false, newOld: false, closestExpire: true })
                this.handleSortAccordion()
              }}
              title="Closest Expire" />
          </List.Accordion>
          <Text>No product Found</Text>
        </Tab>
        <Tab
          activeTextStyle={styles.activeTabText}
          textStyle={styles.tabText}
          tabStyle={styles.tabStyle}
          activeTabStyle={styles.activeTabStyle}
          heading="Live">
          <List.Accordion
            style={{
              backgroundColor: colors.gray + '80'
            }}
            expanded={this.state.sortOpen}
            onPress={this.handleSortAccordion}
            titleStyle={{ color: colors.green }}
            title={`Sort: ${this.state.selectedSort}`}
          >
            <List.Item
              style={
                this.state.newOld ?
                  { backgroundColor: colors.green + '50' }
                  :
                  { backgroundColor: colors.gray + '80' }
              }
              onPress={() => {
                this.setState({ selectedSort: 'New-Old', oldNew: false, newOld: true, closestExpire: false })
                this.handleSortAccordion()
              }}
              title="New-Old" />
            <List.Item
              style={
                this.state.oldNew ?
                  { backgroundColor: colors.green + '50' }
                  :
                  { backgroundColor: colors.gray + '80' }
              }
              onPress={() => {
                this.setState({ selectedSort: 'Old-New', oldNew: true, newOld: false, closestExpire: false })
                this.handleSortAccordion()
              }}
              title="Old-New" />
            <List.Item
              style={
                this.state.closestExpire ?
                  { backgroundColor: colors.green + '50' }
                  :
                  { backgroundColor: colors.gray + '80' }
              }
              onPress={() => {
                this.setState({ selectedSort: 'Closest Expire', oldNew: false, newOld: false, closestExpire: true })
                this.handleSortAccordion()
              }}
              title="Closest Expire" />
          </List.Accordion>
          <Text>No product Found</Text>
        </Tab>
        <Tab
          activeTextStyle={styles.activeTabText}
          textStyle={styles.tabText}
          tabStyle={styles.tabStyle}
          activeTabStyle={styles.activeTabStyle}
          heading="Pending">
          <List.Accordion
            style={{
              backgroundColor: colors.gray + '80'
            }}
            expanded={this.state.sortOpen}
            onPress={this.handleSortAccordion}
            titleStyle={{ color: colors.green }}
            title={`Sort: ${this.state.selectedSort}`}
          >
            <List.Item
              style={
                this.state.newOld ?
                  { backgroundColor: colors.green + '50' }
                  :
                  { backgroundColor: colors.gray + '80' }
              }
              onPress={() => {
                this.setState({ selectedSort: 'New-Old', oldNew: false, newOld: true, closestExpire: false })
                this.handleSortAccordion()
              }}
              title="New-Old" />
            <List.Item
              style={
                this.state.oldNew ?
                  { backgroundColor: colors.green + '50' }
                  :
                  { backgroundColor: colors.gray + '80' }
              }
              onPress={() => {
                this.setState({ selectedSort: 'Old-New', oldNew: true, newOld: false, closestExpire: false })
                this.handleSortAccordion()
              }}
              title="Old-New" />
            <List.Item
              style={
                this.state.closestExpire ?
                  { backgroundColor: colors.green + '50' }
                  :
                  { backgroundColor: colors.gray + '80' }
              }
              onPress={() => {
                this.setState({ selectedSort: 'Closest Expire', oldNew: false, newOld: false, closestExpire: true })
                this.handleSortAccordion()
              }}
              title="Closest Expire" />
          </List.Accordion>
          <Text>No product Found</Text>

        </Tab>
        <Tab
          activeTextStyle={styles.activeTabText}
          textStyle={styles.tabText}
          activeTabStyle={styles.activeTabStyle}
          tabStyle={styles.tabStyle}
          heading="Rejected">
          <List.Accordion
            style={{
              backgroundColor: colors.gray + '80'
            }}
            expanded={this.state.sortOpen}
            onPress={this.handleSortAccordion}
            titleStyle={{ color: colors.green }}
            title={`Sort: ${this.state.selectedSort}`}
          >
            <List.Item
              style={
                this.state.newOld ?
                  { backgroundColor: colors.green + '50' }
                  :
                  { backgroundColor: colors.gray + '80' }
              }
              onPress={() => {
                this.setState({ selectedSort: 'New-Old', oldNew: false, newOld: true, closestExpire: false })
                this.handleSortAccordion()
              }}
              title="New-Old" />
            <List.Item
              style={
                this.state.oldNew ?
                  { backgroundColor: colors.green + '50' }
                  :
                  { backgroundColor: colors.gray + '80' }
              }
              onPress={() => {
                this.setState({ selectedSort: 'Old-New', oldNew: true, newOld: false, closestExpire: false })
                this.handleSortAccordion()
              }}
              title="Old-New" />
            <List.Item
              style={
                this.state.closestExpire ?
                  { backgroundColor: colors.green + '50' }
                  :
                  { backgroundColor: colors.gray + '80' }
              }
              onPress={() => {
                this.setState({ selectedSort: 'Closest Expire', oldNew: false, newOld: false, closestExpire: true })
                this.handleSortAccordion()
              }}
              title="Closest Expire" />
          </List.Accordion>
          <Text>No product Found</Text>

        </Tab>
        <Tab
          activeTextStyle={styles.activeTabText}
          textStyle={styles.tabText}
          activeTabStyle={styles.activeTabStyle}
          tabStyle={styles.tabStyle}
          heading="Inactive">
          <List.Accordion
            style={{
              backgroundColor: colors.gray + '80'
            }}
            expanded={this.state.sortOpen}
            onPress={this.handleSortAccordion}
            titleStyle={{ color: colors.green }}
            title={`Sort: ${this.state.selectedSort}`}
          >
            <List.Item
              style={
                this.state.newOld ?
                  { backgroundColor: colors.green + '50' }
                  :
                  { backgroundColor: colors.gray + '80' }
              }
              onPress={() => {
                this.setState({ selectedSort: 'New-Old', oldNew: false, newOld: true, closestExpire: false })
                this.handleSortAccordion()
              }}
              title="New-Old" />
            <List.Item
              style={
                this.state.oldNew ?
                  { backgroundColor: colors.green + '50' }
                  :
                  { backgroundColor: colors.gray + '80' }
              }
              onPress={() => {
                this.setState({ selectedSort: 'Old-New', oldNew: true, newOld: false, closestExpire: false })
                this.handleSortAccordion()
              }}
              title="Old-New" />
            <List.Item
              style={
                this.state.closestExpire ?
                  { backgroundColor: colors.green + '50' }
                  :
                  { backgroundColor: colors.gray + '80' }
              }
              onPress={() => {
                this.setState({ selectedSort: 'Closest Expire', oldNew: false, newOld: false, closestExpire: true })
                this.handleSortAccordion()
              }}
              title="Closest Expire" />
          </List.Accordion>
          <Text>No product Found</Text>

        </Tab>
        <Tab
          activeTextStyle={styles.activeTabText}
          textStyle={styles.tabText}
          activeTabStyle={styles.activeTabStyle}
          tabStyle={styles.tabStyle}
          heading="Policy Violation">
          <List.Accordion
            style={{
              backgroundColor: colors.gray + '80'
            }}
            expanded={this.state.sortOpen}
            onPress={this.handleSortAccordion}
            titleStyle={{ color: colors.green }}
            title={`Sort: ${this.state.selectedSort}`}
          >
            <List.Item
              style={
                this.state.newOld ?
                  { backgroundColor: colors.green + '50' }
                  :
                  { backgroundColor: colors.gray + '80' }
              }
              onPress={() => {
                this.setState({ selectedSort: 'New-Old', oldNew: false, newOld: true, closestExpire: false })
                this.handleSortAccordion()
              }}
              title="New-Old" />
            <List.Item
              style={
                this.state.oldNew ?
                  { backgroundColor: colors.green + '50' }
                  :
                  { backgroundColor: colors.gray + '80' }
              }
              onPress={() => {
                this.setState({ selectedSort: 'Old-New', oldNew: true, newOld: false, closestExpire: false })
                this.handleSortAccordion()
              }}
              title="Old-New" />
            <List.Item
              style={
                this.state.closestExpire ?
                  { backgroundColor: colors.green + '50' }
                  :
                  { backgroundColor: colors.gray + '80' }
              }
              onPress={() => {
                this.setState({ selectedSort: 'Closest Expire', oldNew: false, newOld: false, closestExpire: true })
                this.handleSortAccordion()
              }}
              title="Closest Expire" />
          </List.Accordion>
          <Text>No product Found</Text>

        </Tab>
      </Tabs>
    );
  }
};

const styles = {
  tabStyle: {
    backgroundColor: colors.gray,
  },
  activeTabStyle: {

    backgroundColor: colors.tabRed
  },
  tabText: {
    color: colors.black
  },
  activeTabText: {
    color: colors.white,
  }
}