import React, { useRef } from 'react';
import { View, Text, Image, StyleSheet, PanResponder, Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.25;

export default function SwipeCard({
  title,
  subtitle,
  image,
  onSwipeLeft,
  onSwipeRight,
}: {
  title: string;
  subtitle?: string;
  image: string;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}) {
  const pan = useRef(new Animated.ValueXY()).current;

  const rotate = pan.x.interpolate({
    inputRange: [-width, 0, width],
    outputRange: ['-10deg', '0deg', '10deg'],
  });

  const cardStyle = {
    transform: [{ translateX: pan.x }, { translateY: pan.y }, { rotate }],
  };

  const responder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false }),
      onPanResponderRelease: (_, { dx, vy }) => {
        if (dx > SWIPE_THRESHOLD) {
          Animated.timing(pan, { toValue: { x: width, y: 0 }, duration: 200, useNativeDriver: false }).start(() => {
            pan.setValue({ x: 0, y: 0 });
            onSwipeRight();
          });
        } else if (dx < -SWIPE_THRESHOLD) {
          Animated.timing(pan, { toValue: { x: -width, y: 0 }, duration: 200, useNativeDriver: false }).start(() => {
            pan.setValue({ x: 0, y: 0 });
            onSwipeLeft();
          });
        } else {
          Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
        }
      },
    })
  ).current;

  return (
    <Animated.View style={[styles.card, cardStyle]} {...responder.panHandlers}>
      <Image source={{ uri: image }} style={styles.img} />
      <View style={{ padding: 12 }}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.sub}>{subtitle}</Text> : null}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  img: { width: '100%', height: 280 },
  title: { fontSize: 20, fontWeight: '700' },
  sub: { fontSize: 14, color: '#666', marginTop: 2 },
});
