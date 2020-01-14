import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

function App() {
  const [getName, setName] = useState('name');
  const update = () => {
    setName('umer');
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
      }}
    >
      <Text>{getName}</Text>
      <TouchableOpacity
        onPress={update}
        style={{
          backgroundColor: '#d3d3d3'
        }}
      >
        <Text>Update Name</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
}
export default App;