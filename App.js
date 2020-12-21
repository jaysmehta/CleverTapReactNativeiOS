/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { NativeModules,Linking } from 'react-native';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Alert,
  Button,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const CleverTap = require('clevertap-react-native');
const CleverTapReact = NativeModules.CleverTapReact;

class App extends React.Component {
//const App: () => React$Node = () => {

// UNSAFE_componentWillMount(){
	
// 	// Alert.alert('Component will mount');
// }

constructor(props){
    super(props);
    console.log('initial props:', props);
    if(props.UIApplicationLaunchOptionsRemoteNotificationKey){
    	Alert.alert(JSON.stringify(props.UIApplicationLaunchOptionsRemoteNotificationKey.aps.alert.title));
    }
    
  }

  componentDidMount() {
    //CleverTap.registerForPush();
    Linking.addEventListener('url', this._handleOpenUrl);
    CleverTap.addListener(CleverTap.CleverTapPushNotificationClicked, (event) => { this._handleCleverTapEvent(CleverTap.CleverTapPushNotificationClicked,event); });



        // this handles the case where a deep link launches the application
        Linking.getInitialURL().then((url) => {
            if (url) {
                console.log('launch url', url);
                this._handleOpenUrl({url});
            }
        }).catch(err => console.error('launch url error', err));

        // check to see if CleverTap has a launch deep link
        // handles the case where the app is launched from a push notification containing a deep link
        CleverTap.getInitialUrl((err, url) => {
            if (url) {
                console.log('CleverTap launch url', url);
                this._handleOpenUrl({url}, 'CleverTap');
            } else if (err) {
                console.log('CleverTap launch url', err);
                // Alert.alert(err);
            }
        });



  } 
	
componentWillUnmount() {
        // clean up listeners
        // Linking.removeEventListener('url', this._handleOpenUrl);
        // CleverTap.removeListeners();
    }

    _handleOpenUrl(event, from) {
        console.log('handleOpenUrl', event.url, from);
        Alert.alert(event.url);
    }

    _handleCleverTapEvent(eventName,event) {
    	console.log("Push Notification Clicked ",eventName);
    	console.log("Payload ",event);
    	Alert.alert(eventName);
    }
  

	updateUserProfile() {
		CleverTap.setDebugLevel(0);
    // CleverTapReact.setDebugLevel(0);
		CleverTapReact.onUserLogin({'Name': 'ReactNative iOS', 'Identity': '9876', 'Email': 'test@reactnative.com', 'custom1': '007'});
		Alert.alert('Profile Pushed');
	}

	pushEvent() {
		CleverTap.recordEvent('Product Pushed', {'productName':'React Native','productId':'1234'});
    CleverTap.recordEvent('Plan Purchased');
		Alert.alert('Event Pushed');
	}
	
	showInBox(){
		CleverTap.initializeInbox();
		CleverTap.showInbox();
	}

render(){	
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
		<View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Welcome To Clevertap</Text>
              <Button title = "Click Here to Push Profile" onPress={ this.updateUserProfile }/>
	      <Button title = "Click Here to Push Event" onPress={ this.pushEvent }/>
	      <Button title = "Show App InBox" onPress={ this.showInBox }/>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
//};
}
}


const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
