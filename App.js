import React from 'react';
import { WebView, WebViewNavigation} from 'react-native-webview'
import AppContainer from './Navigation/AppContainer';
import {ImageBackground,View} from 'react-native';
import SplashScreen from 'react-native-splash-screen'

global.customer_id = 2281;

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      show:true
    }
  } 
  componentDidMount(){
    SplashScreen.hide();
    setTimeout(()=>{this.setState({show:false})},3000)

  }

  render() {
    return (
    <View style={{flex:1}}>
      {this.state.show?
      <ImageBackground source={require('./launch_screen.png')} width="100%" height="100%" style={{flex:1}}/>
      :<WebView source={{ uri: 'https://rocket.pk/vendors/dashboard/' }} />
      }
  </View>
  // <AppContainer/>
    );
  }
}; 