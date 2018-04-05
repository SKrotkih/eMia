import { StyleSheet, Platform, Dimensions } from 'react-native';
import { padding,color, fontSize, fontFamily, windowWidth, normalize } from '../../../theme/styles';

const resizeMode = 'contain';

const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: '#fff',
    height: Platform.OS === "ios" ? deviceHeight : deviceHeight - 20
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  list: {
    flex: 1
  },

  bottomContainer: {
    backgroundColor: 'white',
    paddingVertical: padding * 3,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  // Post item 
  item: {
    flex: 1,
    height: 200,
    margin: 1
  },
  postImageThumbnail: { 
    backgroundColor: '#eee', 
    alignSelf: 'center', 
    height: 110, 
    width: 110 },

  postImage: {
    height: 10,
    width: 10,
    resizeMode: 'cover'  // or 'stretch'    
  },
  postTitle: {
    fontSize: 12,
    marginBottom: 4,
    fontWeight: 'bold',    
    textAlign: 'center'
  },
  postBody: {
    fontSize: 10,
    marginBottom: padding,
    textAlign: 'center'
  },
  separator: {
    height: 1,
    marginBottom: 4,
    backgroundColor: '#eee'
  },
  postYear: {
    textAlign: 'center'
  },
  postThumbnail: {
    width: 53,
    height: 81
  },
});

export default styles;
