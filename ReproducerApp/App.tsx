/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {Button, SafeAreaView, ScrollView, StatusBar, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {MyModal} from './MyModal';

function App(): React.JSX.Element {
  const progressSV = useSharedValue(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [redBackground, setRedBackground] = useState(false);

  console.log(`redBackground: ${redBackground}`);

  const textStyles = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progressSV.value,
      [0, 1],
      ['red', 'yellow'],
    ),
    fontSize: 20,
    transform: [{rotate: `${progressSV.value * 180}deg`}],
  }));

  const toggleBackgroundColor = () => {
    progressSV.value = withTiming(redBackground ? 0 : 1, {duration: 1000});

    setRedBackground(!redBackground);
  };

  const openModal = () => {
    toggleBackgroundColor();
    setModalOpen(!modalOpen);
  };

  const onModalClose = () => {
    console.log('Modal Button - onPress');

    toggleBackgroundColor();
    setModalOpen(false);
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.lighter,
      }}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.lighter} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{
          backgroundColor: Colors.lighter,
        }}>
        <Button
          onPress={toggleBackgroundColor}
          title="Toggle background color"
        />
        <Button onPress={openModal} title="Toggle Modal" />
        <View
          style={{
            backgroundColor: Colors.white,
          }}>
          <View>
            <Animated.Text style={textStyles}>
              My background changes - red or yellow. And I rotate.
            </Animated.Text>
          </View>
        </View>
        <GestureHandlerRootView>
          <MyModal onClose={onModalClose} open={modalOpen} />
        </GestureHandlerRootView>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
