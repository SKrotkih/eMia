import React, {FunctionComponent} from 'react';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {Button} from 'react-native-elements';
import styles from './styles';
import * as config from '../../config/constants';

const SplashScreen: FunctionComponent = () => {
  function signUp() {
    Actions.Register;
  }

  function signIn() {
    Actions.Login;
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image
          style={styles.image}
          source={require('../../assets/images/logo.png')}
        />
        <Text style={styles.title}>{config.APP_NAME}</Text>
      </View>
      <View style={styles.bottomContainer}>
        <View style={[styles.buttonContainer]}>
          <Button
            raised
            borderRadius={4}
            title={'Sign Up with E-MAIL'}
            containerViewStyle={[styles.containerView]}
            buttonStyle={[styles.button]}
            textStyle={styles.buttonText}
            onPress={signUp()}
          />
        </View>
        <View style={styles.bottom}>
          <Text style={styles.bottomText}>Already have an account?</Text>
          <TouchableOpacity onPress={signIn()}>
            <Text style={styles.signInText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default connect(null, {})(SplashScreen);
