import React from 'react';
import {
    TouchableOpacity,
    Text,
} from 'react-native';
import {Icon} from 'react-native-elements';
import colors from '../colors/colors'

const ProfileButton = props => (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
        height: 50,
        backgroundColor: colors.gray + '50',
        borderBottomWidth: 1,
        borderBottomColor: colors.gray + '20'
      }}
      onPress={() => props.navigation.navigate(props.navigate)}
    >
      <Text
        style={{ paddingLeft:7, fontSize: 16 }}
      >{props.title}</Text>
      <Icon
        name='right'
        type='antdesign'
        size={16}
      />
    </TouchableOpacity>
  );

  export default ProfileButton