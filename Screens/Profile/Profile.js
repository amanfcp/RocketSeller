import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import colors from '../../colors/colors';
import {
  Image
} from 'react-native';
import ProfileButton from '../../Components/ProfileButton'

export default class App extends React.Component {
  render() {
    return (
      <View>
        <View
          style={styles.headerStyle}
        >
          <Image
            source={require('../../Images/shopIcon.png')}
            resizeMode='cover'
            style={styles.headerImageStyle}
          />
          <View>
            <View
              style={{ margin: 5 }}
            >
              <Text
                style={styles.headerTextHead}
              >
                Seller ID:
                        </Text>
              <Text
                style={{
                  fontSize: 16
                }}
              >
                PK1234
                        </Text>
            </View>
            <View style={{ margin: 5 }}>
              <Text
                style={styles.headerTextHead}
              >
                Shop Name:
                        </Text>
              <Text
                style={{
                  fontSize: 16
                }}>
                ABD Shop
              </Text>
            </View>
          </View>
        </View>
        <ProfileButton title='Seller Account' navigation={this.props.navigation} navigate='SellerAccount' />
        <ProfileButton title='About' navigation={this.props.navigation} navigate='About' />

      </View>
    );
  }
};

const styles = {
  headerStyle: {
    flexDirection: 'row',
    width: '100%',
    height: 150,
    justifyContent: 'flex-start',
    alignItems: "center",
    paddingLeft: 20,
    backgroundColor: colors.gray
  },
  headerImageStyle: {
    marginRight: 10,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  headerTextHead: {
    fontWeight: 'bold',
    fontSize: 16
  }
}