/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {FC} from 'react';
import {FlatList, Modal, Pressable, Text} from 'react-native';

import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {runOnJS, withTiming} from 'react-native-reanimated';

interface MyModalProps {
  onClose: () => void;
  open: boolean;
}

const logTap = () => console.log('Gesture Detector - tap - onStart');

type FadeOutProps = {
  onClosed?: () => void;
};
type FadeInProps = {
  onOpened?: () => void;
  elevation: number;
};

export const CustomFadeIn = ({onOpened, elevation}: FadeInProps) => {
  return () => {
    'worklet';
    const animations = {
      opacity: withTiming(1, {duration: 250}),
      transform: [{translateY: withTiming(0, {duration: 250})}],
      elevation: withTiming(elevation, {
        duration: 250,
      }),
    };

    const initialValues = {
      opacity: 0,
      transform: [{translateY: 3}],
      elevation: 0,
    };

    const callback = () => {
      'worklet';
      if (onOpened) runOnJS(onOpened)();
    };

    return {
      initialValues,
      animations,
      callback,
    };
  };
};

export const CustomFadeOut = ({
  onClosed,
  elevation,
}: FadeOutProps & {elevation: number}) => {
  return () => {
    'worklet';
    const animations = {
      opacity: withTiming(0, {duration: 350}),
      transform: [{translateY: withTiming(3, {duration: 350})}],
      elevation: withTiming(0, {
        duration: 350,
      }),
    };

    const initialValues = {
      opacity: 1,
      transform: [{translateY: 0}],
      elevation,
    };

    const callback = (finished: boolean) => {
      'worklet';
      if (finished && onClosed) {
        runOnJS(onClosed)();
      }
    };

    return {
      animations,
      initialValues,
      callback,
    };
  };
};

export const MyModal: FC<MyModalProps> = ({onClose, open}) => {
  const tap = Gesture.Tap().onStart(() => {
    runOnJS(logTap)();
  });

  return (
    (open && (
      <Modal animationType="none" transparent visible>
        <GestureHandlerRootView>
          <GestureDetector gesture={tap}>
            <Animated.View
              entering={CustomFadeIn({elevation: 10})}
              exiting={CustomFadeOut({elevation: 10})}>
              <Pressable
                onPressIn={() => console.log('Modal Button - onPressIn')}
                onPressOut={() => console.log('Modal Button - onPressOut')}
                onPress={onClose}
                style={{backgroundColor: 'plum', height: 50}}>
                <Text style={{fontSize: 20}}>Close Modal</Text>
              </Pressable>
              <FlatList
                data={[{text: 'Close Modal (inside flatlist)', id: 1}]}
                keyExtractor={(item: any) => item.id}
                scrollEnabled
                overScrollMode="never"
                contentContainerStyle={{
                  overflow: 'hidden',
                }}
                style={{
                  flexGrow: 0,
                }}
                renderItem={({
                  item,
                }: {
                  item: {text: string; id: number};
                  index: number;
                }) => {
                  return (
                    <Pressable
                      onPressIn={() => console.log('Modal Button - onPressIn')}
                      onPressOut={() =>
                        console.log('Modal Button - onPressOut')
                      }
                      onPress={onClose}
                      style={{
                        backgroundColor: 'purple',
                        height: 50,
                        borderWidth: 3,
                      }}>
                      <Text style={{fontSize: 20, color: 'white'}}>
                        {item.text}
                      </Text>
                    </Pressable>
                  );
                }}
                testID="mm-menu-base-flat-list"
              />
            </Animated.View>
          </GestureDetector>
        </GestureHandlerRootView>
      </Modal>
    )) || <></>
  );
};
