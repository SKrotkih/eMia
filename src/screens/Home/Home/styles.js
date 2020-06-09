import {StyleSheet, Platform, Dimensions} from 'react-native';
import {windowWidth} from '../../../theme/styles';

const resizeMode = 'contain';

const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: Platform.OS === 'ios' ? deviceHeight : deviceHeight - 20,
  },
  loading: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  separator: {
    height: 1,
    marginBottom: 4,
    backgroundColor: '#eee',
  },
});

const gridItemStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    height: 220,
    margin: 1,
  },
  image: {
    alignSelf: 'center', // 'stretch'􏰸 'contain'􏰸 'cover'􏰸 'repeat' 'center'
    resizeMode: 'cover',
    height: 160,
    width: (windowWidth - 8) / 2,
  },
  title: {
    fontSize: 12,
    marginBottom: 4,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    fontSize: 10,
    marginBottom: 2,
    textAlign: 'center',
  },
});

const TABS = {
  ALLPOSTS: 'allposts',
  MYPOSTS: 'myposts',
}

export {styles, gridItemStyles, TABS};
