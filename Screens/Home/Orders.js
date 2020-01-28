// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
// } from 'react-native';
// import {
//   Tab,
//   Tabs,
//   ScrollableTab
// } from 'native-base';
// import {
//   Icon
// } from 'react-native-elements'
import colors from '../../colors/colors'

// function App() {
//   App.navigationOptions = ({ navigation }) => ({
//     headerTitleStyle: {
//       color: colors.white,
//     },
//     headerStyle: {
//       backgroundColor: colors.red
//     },
//     headerLeft: () =>
//       <Icon
//         iconStyle={{ padding: 10, color: '#fff' }}
//         name='ios-arrow-back'
//         type='ionicon'
//         size={20}
//         onPress={() => navigation.goBack()} />
//     ,
//     headerRight: () => null,
//   })
//   return (
//     <Tabs
//       tabBarUnderlineStyle={{
//         height: 2,
//         backgroundColor: colors.white
//       }}
//       locked={true}
//       renderTabBar={() => <ScrollableTab style={{ borderWidth: 0 }} />}
//     >
//       <Tab
//         activeTextStyle={styles.activeTabText}
//         textStyle={styles.tabText}
//         tabStyle={styles.tabStyle}
//         activeTabStyle={styles.activeTabStyle}
//         heading="Forward Orders">

//         <Tabs
//           tabBarUnderlineStyle={{
//             height: 2,
//             backgroundColor: colors.white
//           }}
//           renderTabBar={() => <ScrollableTab style={{ borderWidth: 0 }} />}
//         >
//           <Tab
//             activeTextStyle={styles.activeTabTextSub}
//             textStyle={styles.tabTextSub}
//             tabStyle={styles.tabStyleSub}
//             activeTabStyle={styles.activeTabStyleSub}
//             heading="Pending">
//             <View
//               style={styles.tabContent}
//             >
//               <Text>No orders Found</Text>
//             </View>
//           </Tab>
//           <Tab
//             activeTextStyle={styles.activeTabTextSub}
//             textStyle={styles.tabTextSub}
//             tabStyle={styles.tabStyleSub}
//             activeTabStyle={styles.activeTabStyleSub}
//             heading="Ready to Ship">
//             <View
//               style={styles.tabContent}
//             >
//               <Text>No orders Found</Text>

//             </View>
//           </Tab>
//           <Tab
//             activeTextStyle={styles.activeTabTextSub}
//             textStyle={styles.tabTextSub}
//             tabStyle={styles.tabStyleSub}
//             activeTabStyle={styles.activeTabStyleSub}
//             heading="Shipped">
//             <View
//               style={styles.tabContent}
//             >
//               <Text>No orders Found</Text>

//             </View>
//           </Tab>
//           <Tab
//             activeTextStyle={styles.activeTabTextSub}
//             textStyle={styles.tabTextSub}
//             tabStyle={styles.tabStyleSub}
//             activeTabStyle={styles.activeTabStyleSub}
//             heading="Completed">
//             <View
//               style={styles.tabContent}
//             >
//               <Text>No orders Found</Text>

//             </View>
//           </Tab>
//         </Tabs>
//       </Tab>



//       <Tab
//         activeTextStyle={styles.activeTabText}
//         textStyle={styles.tabText}
//         tabStyle={styles.tabStyle}
//         activeTabStyle={styles.activeTabStyle}
//         heading="Return">
//         <Tabs
//           tabBarUnderlineStyle={{
//             height: 2,
//             backgroundColor: colors.tabRedSub
//           }}
//           renderTabBar={() => <ScrollableTab style={{ borderWidth: 0 }} />}
//         >
//           <Tab
//             activeTextStyle={styles.activeTabTextSub}
//             textStyle={styles.tabTextSub}
//             tabStyle={styles.tabStyleSub}
//             activeTabStyle={styles.activeTabStyleSub}
//             heading="Return Initiated">
//             <View
//               style={styles.tabContent}
//             >
//               <Text>No orders Found</Text>

//             </View>
//           </Tab>
//           <Tab
//             activeTextStyle={styles.activeTabTextSub}
//             textStyle={styles.tabTextSub}
//             tabStyle={styles.tabStyleSub}
//             activeTabStyle={styles.activeTabStyleSub}
//             heading="Return In Progress">
//             <View
//               style={styles.tabContent}
//             >
//               <Text>No orders Found</Text>

//             </View>
//           </Tab>
//           <Tab
//             activeTextStyle={styles.activeTabTextSub}
//             textStyle={styles.tabTextSub}
//             tabStyle={styles.tabStyleSub}
//             activeTabStyle={styles.activeTabStyleSub}
//             heading="Dispute In Progress">
//             <View
//               style={styles.tabContent}
//             >
//               <Text>No orders Found</Text>

//             </View>
//           </Tab>
//           <Tab
//             activeTextStyle={styles.activeTabTextSub}
//             textStyle={styles.tabTextSub}
//             tabStyle={styles.tabStyleSub}
//             activeTabStyle={styles.activeTabStyleSub}
//             heading="Refund Issued">
//             <View
//               style={styles.tabContent}
//             >
//               <Text>No orders Found</Text>

//             </View>
//           </Tab>
//           <Tab
//             activeTextStyle={styles.activeTabTextSub}
//             textStyle={styles.tabTextSub}
//             tabStyle={styles.tabStyleSub}
//             activeTabStyle={styles.activeTabStyleSub}
//             heading="Closed">
//             <View
//               style={styles.tabContent}
//             >
//               <Text>No orders Found</Text>

//             </View>
//           </Tab>
//           <Tab
//             activeTextStyle={styles.activeTabTextSub}
//             textStyle={styles.tabTextSub}
//             tabStyle={styles.tabStyleSub}
//             activeTabStyle={styles.activeTabStyleSub}
//             heading="Rejected">
//             <View
//               style={styles.tabContent}
//             >
//               <Text>No orders Found</Text>

//             </View>
//           </Tab>
//         </Tabs>
//       </Tab>
//     </Tabs>

//   );
// }


// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: colors.lightRed,
//     width: 200,
//     height: 200,
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   tabStyle: {
//     backgroundColor: colors.tabGray,
//     flex: 1,
//   },
//   activeTabStyle: {
//     backgroundColor: colors.tabRed,
//     flex: 1,
//   },
//   tabText: {
//     color: colors.black
//   },
//   activeTabText: {
//     color: colors.white,
//   },
//   tabContent: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },

//   tabStyleSub: {
//     backgroundColor: colors.tabGray,
//     borderWidth: 0.2,
//     borderColor: colors.white
//   },
//   activeTabStyleSub: {
//     backgroundColor: colors.tabRedSub,
//   },
//   tabTextSub: {
//     color: colors.black
//   },
//   activeTabTextSub: {
//     color: colors.white,
//   },
// });

// export default App;




import React, {
  Component
} from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Video from 'react-native-video';

export default class VideoPlayer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rate: 1,
      volume: 1,
      muted: false,
      resizeMode: 'contain',
      duration: 0.0,
      currentTime: 0.0,
      paused: true,
    };
  }
  
  onLoad = (data) => {
    this.setState({ duration: data.duration });
  };

  onProgress = (data) => {
    this.setState({ currentTime: data.currentTime });
  };

  onEnd = () => {
    this.setState({ paused: true })
    this.video.seek(0)
  };

  onAudioBecomingNoisy = () => {
    this.setState({ paused: true })
  };

  onAudioFocusChanged = (event: { hasAudioFocus: boolean }) => {
    this.setState({ paused: !event.hasAudioFocus })
  };

  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
    }
    return 0;
  };

  render() {
    const flexCompleted = this.getCurrentTimePercentage() * 100;
    const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.fullScreen}
          onPress={() => this.setState({ paused: !this.state.paused })}
        >
          <Video
            ref={(ref) => { this.video = ref }}
            source={require('../../Video/exampleVideo.mp4')}
            style={styles.fullScreen}
            rate={this.state.rate}
            paused={this.state.paused}
            volume={this.state.volume}
            muted={this.state.muted}
            resizeMode={this.state.resizeMode}
            onLoad={this.onLoad}
            onProgress={this.onProgress}
            onEnd={this.onEnd}
            onAudioBecomingNoisy={this.onAudioBecomingNoisy}
            onAudioFocusChanged={this.onAudioFocusChanged}
            repeat={false}
          />
        </TouchableOpacity>
        <View style={styles.controls}>
          <View style={styles.progress}>
            <View style={[styles.innerProgressCompleted, { flex: flexCompleted }]} />
            <View style={[styles.innerProgressRemaining, { flex: flexRemaining }]} />
          </View>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullScreen: {
    width: "100%",
    height: 220,
    backgroundColor: '#2c2c2f',
  },
  controls: {
    backgroundColor: '#2c2c2f',
    width: '100%',
    height: 20,
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  innerProgressCompleted: {
    height: 20,
    backgroundColor: '#cccccc',
  },
  innerProgressRemaining: {
    height: 20,
    backgroundColor: '#2c2c2f',
  },
});
