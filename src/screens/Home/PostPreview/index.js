import React from 'react';
import ReactNative from 'react-native';
import styles from './styles';
import Time from '@components/Time';
import {connect} from 'react-redux';
import ImageViewer from '@theme/components/ImageViewer';
import {Container, Header, Content, Text, Thumbnail} from 'native-base';
import {ModelView} from './modelView';

const {View} = ReactNative;
const {Component} = React;

export class PostPreview extends Component {
  constructor(props) {
    super(props);
    const {item} = this.props;
    this.mv = new ModelView(item);
    this.state = this.mv.createState();
  }

  setTitle(titleText) {
    const {setParams} = this.props.navigation;
    setParams({title: titleText});
  }

  componentWillMount() {
    this.setTitle(this.mv.title);
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header style={styles.headerBackground}>
          <Text style={styles.title}>{this.mv.title}</Text>
        </Header>
        <Content style={styles.content}>
          <View style={styles.thumbnail}>
            <Thumbnail circular size={55} source={this.mv.avatarUrl} />
            <Text style={styles.userName}>{this.mv.userName}</Text>
          </View>
          <Text style={styles.description}>{this.mv.body}</Text>
          <View style={styles.backgroundPhoto}>
            <ImageViewer
              disabled={false}
              source={this.mv.imageUrl}
              downloadable
              doubleTapEnabled={true}
            />
          </View>
          <Text style={styles.publishedAt}>
            <Time date={this.mv.publishedAt} />
          </Text>
        </Content>
      </Container>
    );
  }
}

export default connect(null, null)(PostPreview);
