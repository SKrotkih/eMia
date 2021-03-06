/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import React, {FunctionComponent, useState, useEffect} from 'react';
import ReactNative, {Alert} from 'react-native';
import {Button, Icon, Text} from 'native-base';
import styles from './styles';
import {Post} from '../../../model/entities/post';
import {useTheme} from "react-native-paper";
import {color} from "../../../theme/styles";
import InputField from "./Components/InputField";
import Photo from "./Components/Photo";
import takePhoto from "../../../components/ImagePicker/TakePhoto";
import {isEmpty} from "../../../utils/validate";
import * as StateStorage from "../../../redux/post/actions";
import {PostItemModel} from "../../../model/network/interfaces";
import {ImagePickerResponse} from 'react-native-image-picker';

const {View} = ReactNative;

interface PostFields {
  _id: string;
  title: string;
  body: string;
  url: string;
  imagePickerResponse: ImagePickerResponse;
}

export const AddNewPost: FunctionComponent = (props) => {
  const {navigation, route} = props;

  const postItem: PostItemModel = route.params;

  const titleLabelText = 'Title:';
  const bodyLabelText = 'Body:';
  const darkTheme = useTheme().dark;

  const [post, setPost] = useState<PostFields>({
    _id: null,
    title: '',
    body: '',
    url: null,
    imagePickerResponse: null,
  });
  const [needSavePost, setNeedSavePost] = useState<boolean>(false);

  useEffect(() => {
    let title;
    if (postItem) {
      title = postItem.post.title;
      setPost({
        ...post,
        _id: postItem.post._id,
        title: postItem.post.title,
        body: postItem.post.body,
        url: postItem.imageUrl,
      });
    } else {
      title = 'New Post';
    }
    navigation.setOptions({
      headerRight: () => <RightBarButtonItem />,
      title: title,
    });
  }, []);

  useEffect(() => {
    if (needSavePost) {
      savePost();
    }
  }, [needSavePost]);

  function getImageUrl(): string {
    if (post.imagePickerResponse) {
      return post.imagePickerResponse.uri;
    } else if (post.url) {
      return post.url;
    } else {
      return null;
    }
  }

  function savePost() {
    const newPost = new Post(post);
    StateStorage.savePost(newPost)
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => {
        if (!isEmpty(error)) {
          Alert.alert('Error', `${error}`);
        }
      });
  }

  // Actions

  function takePhotoButtonPressed() {
    takePhoto()
      .then((response) => {
        updateField('imagePickerResponse', response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function doneButtonPressed() {
    setNeedSavePost(true);
  }

  function updateField(name: string, value: any) {
    setPost({
      ...post,
      [name]: value,
    });
  }

  // Components

  const RightBarButtonItem = () => {
    return (
      <Icon
        style={styles.rightBarButton}
        name="check"
        type="Foundation"
        onPress={() => {
          doneButtonPressed();
        }}
      />
    );
  };

  const AttachedPhoto = (props) => {
    return (
      <View style={styles.backgroundImage}>
        <Photo url={props.url} />
      </View>
    );
  };

  return (
    <View style={[styles.container, {backgroundColor: darkTheme ? color.dark : color.white}]}>
      <InputField
        title={titleLabelText}
        placeholder={'Type title'}
        fieldName={'title'}
        defaultValue={post.title}
        autoFocus={true}
        darkTheme={darkTheme}
        updateField={updateField}
      />
      <InputField
        title={bodyLabelText}
        placeholder={'Type body'}
        fieldName={'body'}
        defaultValue={post.body}
        autoFocus={false}
        darkTheme={darkTheme}
        updateField={updateField}
      />
      <Button
        block
        info
        style={styles.button}
        onPress={() => takePhotoButtonPressed()}>
        <Text>Attach a Photo</Text>
      </Button>
      {getImageUrl() && <AttachedPhoto url={getImageUrl()} />}
    </View>
  );
};
