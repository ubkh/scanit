import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Animated } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useColorMode } from 'native-base';

const ThemeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));

  const toggleMode = () => {
    toggleColorMode();
    Animated.timing(animatedValue, {
      toValue: isDarkMode ? 0 : 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: isDarkMode ? ['#fff', '#fff'] : ['#000', '#000'],
  });

  return (
    <TouchableOpacity onPress={toggleMode}>
      <View style={[styles.container]}>
        <Animated.View style={[styles.iconContainer, { backgroundColor }]}>
          {isDarkMode ? (
            <MaterialCommunityIcons name="weather-night" size={20} color="#000" />
          ) : (
            <Ionicons name="sunny-outline" size={20} color="#fff" />
          )}
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  iconContainer: {
    backgroundColor: 'transparent',
    borderRadius: 50,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ThemeButton;
