import React, { useState} from 'react';
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

function App() {

  const [sortOpen, setSortOpen] = useState(false)
  const [selectedSort, setSelectedSort] = useState('New-Old')
  const [newOld, setNewOld] = useState(true)
  const [oldNew, setOldNew] = useState(false)
  const [closestExpire, setClosestExpire] = useState(false)


  handleSortAccordion = () => {
    setSortOpen(!sortOpen)
  }

  App.navigationOptions = ({ navigation }) => ({
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
          expanded={sortOpen}
          onPress={this.handleSortAccordion}
          titleStyle={{ color: colors.green }}
          title={`Sort: ${selectedSort}`}
        >
          <List.Item
            style={
              newOld ?
                { backgroundColor: colors.green + '50' }
                :
                { backgroundColor: colors.gray + '80' }
            }
            onPress={() => {
              setSelectedSort('New-Old')
              setOldNew(false)
              setNewOld(true)
              setClosestExpire(false)
              handleSortAccordion()
            }}
            title="New-Old" />
          <List.Item
            style={
              oldNew ?
                { backgroundColor: colors.green + '50' }
                :
                { backgroundColor: colors.gray + '80' }
            }
            onPress={() => {
              setSelectedSort('Old-New')
              setOldNew(true)
              setNewOld(false)
              setClosestExpire(false)
              handleSortAccordion()
            }}
            title="Old-New" />
          <List.Item
            style={
              closestExpire ?
                { backgroundColor: colors.green + '50' }
                :
                { backgroundColor: colors.gray + '80' }
            }
            onPress={() => {
              setSelectedSort('Closest Expire')
              setOldNew(false)
              setNewOld(false)
              setClosestExpire(true)
              handleSortAccordion()
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
          expanded={sortOpen}
          onPress={this.handleSortAccordion}
          titleStyle={{ color: colors.green }}
          title={`Sort: ${selectedSort}`}
        >
          <List.Item
            style={
              newOld ?
                { backgroundColor: colors.green + '50' }
                :
                { backgroundColor: colors.gray + '80' }
            }
            onPress={() => {
              setSelectedSort('New-Old')
              setOldNew(false)
              setNewOld(true)
              setClosestExpire(false)
              handleSortAccordion()
            }}
            title="New-Old" />
          <List.Item
            style={
              oldNew ?
                { backgroundColor: colors.green + '50' }
                :
                { backgroundColor: colors.gray + '80' }
            }
            onPress={() => {
              setSelectedSort('Old-New')
              setOldNew(true)
              setNewOld(false)
              setClosestExpire(false)
              handleSortAccordion()
            }}
            title="Old-New" />
          <List.Item
            style={
              closestExpire ?
                { backgroundColor: colors.green + '50' }
                :
                { backgroundColor: colors.gray + '80' }
            }
            onPress={() => {
              setSelectedSort('Closest Expire')
              setOldNew(false)
              setNewOld(false)
              setClosestExpire(true)
              handleSortAccordion()
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
          expanded={sortOpen}
          onPress={this.handleSortAccordion}
          titleStyle={{ color: colors.green }}
          title={`Sort: ${selectedSort}`}
        >
          <List.Item
            style={
              newOld ?
                { backgroundColor: colors.green + '50' }
                :
                { backgroundColor: colors.gray + '80' }
            }
            onPress={() => {
              setSelectedSort('New-Old')
              setOldNew(false)
              setNewOld(true)
              setClosestExpire(false)
              handleSortAccordion()
            }}
            title="New-Old" />
          <List.Item
            style={
              oldNew ?
                { backgroundColor: colors.green + '50' }
                :
                { backgroundColor: colors.gray + '80' }
            }
            onPress={() => {
              setSelectedSort('Old-New')
              setOldNew(true)
              setNewOld(false)
              setClosestExpire(false)
              handleSortAccordion()
            }}
            title="Old-New" />
          <List.Item
            style={
              closestExpire ?
                { backgroundColor: colors.green + '50' }
                :
                { backgroundColor: colors.gray + '80' }
            }
            onPress={() => {
              setSelectedSort('Closest Expire')
              setOldNew(false)
              setNewOld(false)
              setClosestExpire(true)
              handleSortAccordion()
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
          expanded={sortOpen}
          onPress={this.handleSortAccordion}
          titleStyle={{ color: colors.green }}
          title={`Sort: ${selectedSort}`}
        >
          <List.Item
            style={
              newOld ?
                { backgroundColor: colors.green + '50' }
                :
                { backgroundColor: colors.gray + '80' }
            }
            onPress={() => {
              setSelectedSort('New-Old')
              setOldNew(false)
              setNewOld(true)
              setClosestExpire(false)
              handleSortAccordion()
            }}
            title="New-Old" />
          <List.Item
            style={
              oldNew ?
                { backgroundColor: colors.green + '50' }
                :
                { backgroundColor: colors.gray + '80' }
            }
            onPress={() => {
              setSelectedSort('Old-New')
              setOldNew(true)
              setNewOld(false)
              setClosestExpire(false)
              handleSortAccordion()
            }}
            title="Old-New" />
          <List.Item
            style={
              closestExpire ?
                { backgroundColor: colors.green + '50' }
                :
                { backgroundColor: colors.gray + '80' }
            }
            onPress={() => {
              setSelectedSort('Closest Expire')
              setOldNew(false)
              setNewOld(false)
              setClosestExpire(true)
              handleSortAccordion()
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
          expanded={sortOpen}
          onPress={this.handleSortAccordion}
          titleStyle={{ color: colors.green }}
          title={`Sort: ${selectedSort}`}
        >
          <List.Item
            style={
              newOld ?
                { backgroundColor: colors.green + '50' }
                :
                { backgroundColor: colors.gray + '80' }
            }
            onPress={() => {
              setSelectedSort('New-Old')
              setOldNew(false)
              setNewOld(true)
              setClosestExpire(false)
              handleSortAccordion()
            }}
            title="New-Old" />
          <List.Item
            style={
              oldNew ?
                { backgroundColor: colors.green + '50' }
                :
                { backgroundColor: colors.gray + '80' }
            }
            onPress={() => {
              setSelectedSort('Old-New')
              setOldNew(true)
              setNewOld(false)
              setClosestExpire(false)
              handleSortAccordion()
            }}
            title="Old-New" />
          <List.Item
            style={
              closestExpire ?
                { backgroundColor: colors.green + '50' }
                :
                { backgroundColor: colors.gray + '80' }
            }
            onPress={() => {
              setSelectedSort('Closest Expire')
              setOldNew(false)
              setNewOld(false)
              setClosestExpire(true)
              handleSortAccordion()
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
          expanded={sortOpen}
          onPress={this.handleSortAccordion}
          titleStyle={{ color: colors.green }}
          title={`Sort: ${selectedSort}`}
        >
          <List.Item
            style={
              newOld ?
                { backgroundColor: colors.green + '50' }
                :
                { backgroundColor: colors.gray + '80' }
            }
            onPress={() => {
              setSelectedSort('New-Old')
              setOldNew(false)
              setNewOld(true)
              setClosestExpire(false)
              handleSortAccordion()
            }}
            title="New-Old" />
          <List.Item
            style={
              oldNew ?
                { backgroundColor: colors.green + '50' }
                :
                { backgroundColor: colors.gray + '80' }
            }
            onPress={() => {
              setSelectedSort('Old-New')
              setOldNew(true)
              setNewOld(false)
              setClosestExpire(false)
              handleSortAccordion()
            }}
            title="Old-New" />
          <List.Item
            style={
              closestExpire ?
                { backgroundColor: colors.green + '50' }
                :
                { backgroundColor: colors.gray + '80' }
            }
            onPress={() => {
              setSelectedSort('Closest Expire')
              setOldNew(false)
              setNewOld(false)
              setClosestExpire(true)
              handleSortAccordion()
            }}
            title="Closest Expire" />
        </List.Accordion>
        <Text>No product Found</Text>

      </Tab>
    </Tabs>
  );
}


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

export default App;