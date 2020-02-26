import React from 'react';
import {
  StyleSheet,
  View,
  Easing,
  Text,
} from 'react-native';
import colors from '../../colors/colors';
import {
  Image
} from 'react-native';
import ProfileButton from '../../Components/ProfileButton'
import Axios from 'axios'
import { Apis, header } from '../../Apis/api';
import {
  Icon,
} from 'react-native-elements';
import {
  BarIndicator,
} from 'react-native-indicators'
import { TouchableRipple, List } from 'react-native-paper';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      profile: ''
    }
  }

  componentDidMount() {
    Axios.get(Apis.Profile + `?customer_id=${13}`, { headers: header }).then(
      res => {
        this.setState({ profile: res.data, loading: false })
      }
    ).catch(err => console.warn(err.message))
  }

  render() {
    return (
      this.state.loading ?
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <BarIndicator
            animationEasing={Easing.linear}
            count={4}
            color={colors.black}
          />
        </View >
        :
        <View style={styles.main}>
          <View
            style={styles.headerStyle}
          >
            <Image
              source={require('../../Images/shopIcon.png')}
              resizeMode='contain'
              style={styles.headerImageStyle}
            />
            <View
              style={{ margin: 5 }}
            >
              <View
                style={styles.headerFields}
              >
                <Icon
                  name='shop'
                  type='entypo'
                  size={20}
                  iconStyle={{
                    padding: 3,
                    paddingBottom: 0,
                  }}
                />
                <Text
                  style={styles.headerText}
                >
                  {this.state.profile.company}
                </Text>
              </View>
              <View
                style={styles.headerFields}
              >
                <Icon
                  name='calendar'
                  type='evilicon'
                  iconStyle={{
                    paddingTop: 3,
                  }}
                />
                <Text
                  style={styles.headerText}
                >
                  {`Joined since \n${this.state.profile.created_at}`}
                </Text>
              </View>
              <View
                style={styles.headerFields}
              >
                <Icon
                  name='phone'
                  type='feather'
                  size={16}
                  iconStyle={{
                    paddingTop: 3,
                    paddingLeft: 5,
                  }}
                />
                <Text
                  style={styles.headerText}
                >
                  {this.state.profile.telephone}
                </Text>
              </View>
              <Text
                style={styles.headerText}
              >
                {this.state.profile.telephone}
              </Text>
            </View>
          </View>
          <List.Accordion
            title='Account Confirmation'
          >
            <View
              style={styles.detailView}
            >
              <Text
                style={styles.detailTextHead}
              >
                Company Name
              </Text>
              <Text
                style={styles.detailText}
              >
                {this.state.profile.company}
              </Text>
            </View>
            <View
              style={styles.detailView}
            >
              <Text
                style={styles.detailTextHead}
              >
                CNIC No. 
              </Text>
              <Text
                style={styles.detailText}
              >
                ABC Shop
              </Text>
            </View> 
            <View
              style={styles.detailView}
            >
              <Text
                style={styles.detailTextHead}
              >
                CNIC
              </Text>
              <Text
                style={styles.detailText}
              >
                ABC Shop
              </Text>
            </View>
            <View
              style={styles.detailView}
            >
              <Text
                style={styles.detailTextHead}
              >
                NTN No.
              </Text>
              <Text
                style={styles.detailText}
              >
                ABC Shop
              </Text>
            </View>
            <View
              style={styles.detailView}
            >
              <Text
                style={styles.detailTextHead}
              >
                NTN
              </Text>
              <Text
                style={styles.detailText}
              >
                ABC Shop
              </Text>
            </View>
          </List.Accordion>
        </View>
    );
  }
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.white
  },
  headerStyle: {
    flexDirection: 'row',
    width: '100%',
    height: 150,
    justifyContent: 'space-around',
    alignItems: "center",
    paddingLeft: 20,
    backgroundColor: colors.backgroundGray
  },
  headerImageStyle: {
    marginRight: 10,
    width: 100,
    height: 100,
  },
  headerFields: {
    flexDirection: 'row',
    paddingVertical: 2,
    margin: 3,
  },
  headerText: {
    fontSize: 16,
  },
  detailView:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:30,
    paddingVertical:10,
    marginBottom:2,
    backgroundColor: colors.backgroundGray +'55'
  },
  detailTextHead:{
    color: colors.black,
    fontSize: 16,
    fontWeight:'bold'
  },
  detailText:{
    color: colors.black,
    fontSize:16
  },
});