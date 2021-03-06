/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import React, {FunctionComponent} from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {isEmpty} from '../../utils/validate';
import {color} from "../../theme/styles";
import {useTheme} from 'react-native-paper';

const InputAuthText: FunctionComponent = (props) => {
  const {
    showLabel,
    placeholder,
    autoFocus,
    onChangeText,
    secureTextEntry,
    type,
    label,
    value,
    error,
    onEndEditing,
  } = props;

  const paperTheme = useTheme();
  const textColor = paperTheme.dark ? color.white : color.black;

  return (
    <View style={styles.container}>
      {showLabel && <Text>{label}</Text>}
      <TextInput
        autoCapitalize="none"
        clearButtonMode="while-editing"
        underlineColorAndroid={'#fff'}
        placeholder={placeholder}
        placeholderTextColor="#666666"
        autoFocus={autoFocus}
        secureTextEntry={secureTextEntry}
        style={[styles.textInput, {
          color: textColor,
        }]}
        keyboardType={type}
        defaultValue={value}
        onChangeText={onChangeText}
        onEndEditing={(e) => onEndEditing(e.nativeEvent.text)}
      />
      {!isEmpty(error) && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  textInput: {
    fontSize: 12,
    margin: 5,
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 15,
    height: 35,
    borderRadius: 8,
    borderColor: color.brand,
    borderWidth: 1,
  },
  errorText: {
    fontSize: 12,
    fontWeight: 'normal',
    color: 'red',
  },
});


export default connect(null, null)(InputAuthText);
