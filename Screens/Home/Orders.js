import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
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

function App() {
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
        height: 2,
        backgroundColor: colors.white
      }}
      locked={true}
      renderTabBar={() => <ScrollableTab style={{ borderWidth: 0 }} />}
    >
      <Tab
        activeTextStyle={styles.activeTabText}
        textStyle={styles.tabText}
        tabStyle={styles.tabStyle}
        activeTabStyle={styles.activeTabStyle}
        heading="Forward Orders">

        <Tabs
          tabBarUnderlineStyle={{
            height: 2,
            backgroundColor: colors.white
          }}
          renderTabBar={() => <ScrollableTab style={{ borderWidth: 0 }} />}
        >
          <Tab
            activeTextStyle={styles.activeTabTextSub}
            textStyle={styles.tabTextSub}
            tabStyle={styles.tabStyleSub}
            activeTabStyle={styles.activeTabStyleSub}
            heading="Pending">
            <View
              style={styles.tabContent}
            >
              <Text>No orders Found</Text>
            </View>
          </Tab>
          <Tab
            activeTextStyle={styles.activeTabTextSub}
            textStyle={styles.tabTextSub}
            tabStyle={styles.tabStyleSub}
            activeTabStyle={styles.activeTabStyleSub}
            heading="Ready to Ship">
            <View
              style={styles.tabContent}
            >
              <Text>No orders Found</Text>

            </View>
          </Tab>
          <Tab
            activeTextStyle={styles.activeTabTextSub}
            textStyle={styles.tabTextSub}
            tabStyle={styles.tabStyleSub}
            activeTabStyle={styles.activeTabStyleSub}
            heading="Shipped">
            <View
              style={styles.tabContent}
            >
              <Text>No orders Found</Text>

            </View>
          </Tab>
          <Tab
            activeTextStyle={styles.activeTabTextSub}
            textStyle={styles.tabTextSub}
            tabStyle={styles.tabStyleSub}
            activeTabStyle={styles.activeTabStyleSub}
            heading="Completed">
            <View
              style={styles.tabContent}
            >
              <Text>No orders Found</Text>

            </View>
          </Tab>
        </Tabs>
      </Tab>



      <Tab
        activeTextStyle={styles.activeTabText}
        textStyle={styles.tabText}
        tabStyle={styles.tabStyle}
        activeTabStyle={styles.activeTabStyle}
        heading="Return">
        <Tabs
          tabBarUnderlineStyle={{
            height: 2,
            backgroundColor: colors.tabRedSub
          }}
          renderTabBar={() => <ScrollableTab style={{ borderWidth: 0 }} />}
        >
          <Tab
            activeTextStyle={styles.activeTabTextSub}
            textStyle={styles.tabTextSub}
            tabStyle={styles.tabStyleSub}
            activeTabStyle={styles.activeTabStyleSub}
            heading="Return Initiated">
            <View
              style={styles.tabContent}
            >
              <Text>No orders Found</Text>

            </View>
          </Tab>
          <Tab
            activeTextStyle={styles.activeTabTextSub}
            textStyle={styles.tabTextSub}
            tabStyle={styles.tabStyleSub}
            activeTabStyle={styles.activeTabStyleSub}
            heading="Return In Progress">
            <View
              style={styles.tabContent}
            >
              <Text>No orders Found</Text>

            </View>
          </Tab>
          <Tab
            activeTextStyle={styles.activeTabTextSub}
            textStyle={styles.tabTextSub}
            tabStyle={styles.tabStyleSub}
            activeTabStyle={styles.activeTabStyleSub}
            heading="Dispute In Progress">
            <View
              style={styles.tabContent}
            >
              <Text>No orders Found</Text>

            </View>
          </Tab>
          <Tab
            activeTextStyle={styles.activeTabTextSub}
            textStyle={styles.tabTextSub}
            tabStyle={styles.tabStyleSub}
            activeTabStyle={styles.activeTabStyleSub}
            heading="Refund Issued">
            <View
              style={styles.tabContent}
            >
              <Text>No orders Found</Text>

            </View>
          </Tab>
          <Tab
            activeTextStyle={styles.activeTabTextSub}
            textStyle={styles.tabTextSub}
            tabStyle={styles.tabStyleSub}
            activeTabStyle={styles.activeTabStyleSub}
            heading="Closed">
            <View
              style={styles.tabContent}
            >
              <Text>No orders Found</Text>

            </View>
          </Tab>
          <Tab
            activeTextStyle={styles.activeTabTextSub}
            textStyle={styles.tabTextSub}
            tabStyle={styles.tabStyleSub}
            activeTabStyle={styles.activeTabStyleSub}
            heading="Rejected">
            <View
              style={styles.tabContent}
            >
              <Text>No orders Found</Text>

            </View>
          </Tab>
        </Tabs>
      </Tab>
    </Tabs>

  );
}


const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.lightRed,
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabStyle: {
    backgroundColor: colors.tabGray,
    flex: 1,
  },
  activeTabStyle: {
    backgroundColor: colors.tabRed,
    flex: 1,
  },
  tabText: {
    color: colors.black
  },
  activeTabText: {
    color: colors.white,
  },
  tabContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  tabStyleSub: {
    backgroundColor: colors.tabGray,
    borderWidth: 0.2,
    borderColor: colors.white
  },
  activeTabStyleSub: {
    backgroundColor: colors.tabRedSub,
  },
  tabTextSub: {
    color: colors.black
  },
  activeTabTextSub: {
    color: colors.white,
  },
});

export default App;




