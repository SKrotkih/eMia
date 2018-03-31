
import React from 'react';
import ReactNative from 'react-native';
import Grid from 'react-native-grid-component';
import NativeBase from 'native-base';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from './styles';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Thumbnail } from 'native-base';

const {
  AppRegistry,
  Image,
  StyleSheet,
  View,
  Alert,
  TouchableOpacity
} = ReactNative;
const {
  Component
} = React;

export class PostPreview extends Component {
  constructor (props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount () {
  }

  render () {

    const { item } = this.props;
    var title = item.value.title;
    var body = item.value.body;
    
    return (
      <View>
        <Text>
          {title}
        </Text>
        <Text>
          {body}
        </Text>
      </View>
    )
  }
}

export default connect(null, null)(PostPreview)