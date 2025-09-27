import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';

export default function MatchOverlay({
  visible,
  mealName,
  mealImage,
  onDone,
}: {
  visible: boolean;
  mealName: string;
  mealImage: string;
  onDone: () => void;
}) {
  const opacity = new Animated.Value(0);
  const scale = new Animated.Value(0.8);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }),
        Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
      ]).start(() => setTimeout(onDone, 1000));
    }
  }, [visible]);

  if (!visible) return null;
  return (
    <Animated.View style={[styles.overlay, { opacity }]}>
      <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
        <Image source={{ uri: mealImage }} style={styles.img} />
        <Text style={styles.text}>It's a Match!</Text>
        <Text style={styles.sub}>{mealName}</Text>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 99,
  },
  card: {
    backgroundColor: '#111827',
    borderRadius: 16,
    padding: 16,
    width: 280,
    alignItems: 'center',
  },
  img: { width: 120, height: 120, borderRadius: 12, marginBottom: 10 },
  text: { color: '#22c55e', fontSize: 20, fontWeight: '800' },
  sub: { color: 'white', opacity: 0.9, marginTop: 2 },
});
