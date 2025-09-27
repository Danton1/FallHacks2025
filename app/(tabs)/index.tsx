import React, { useEffect, useMemo, useState } from "react";
import { View, ActivityIndicator, StyleSheet, Alert } from "react-native";
import SwipeCard from "@/components/SwipeCard";
import MatchOverlay from "@/components/MatchOverlay";
import { generateTenRecipeObjects, RecipeProps } from "@/components/recipe";
import { useStore } from "@/state/useStore";
import { router } from "expo-router";
import { ThemedView } from "@/components/themed-view";

export default function SwipeScreen() {
  const [deck, setDeck] = useState<RecipeProps[]>([]);
  const [idx, setIdx] = useState(0);
  const [showMatch, setShowMatch] = useState(false);
  const addLike = useStore(s => s.addLike);
  const addSwiped = useStore(s => s.addSwiped);
  const hasSwiped = useStore(s => s.hasSwiped);

  // Load an initial deck and refill when running low
  async function refillDeck() {
    const batch = await generateTenRecipeObjects();
    const filtered = batch.filter(r => !hasSwiped(r.id));
    setDeck(prev => [...prev, ...filtered]);
  }

  useEffect(() => { refillDeck(); }, []);

  useEffect(() => {
    if (idx >= deck.length - 2) {
      // Near the end, fetch more
      refillDeck();
    }
  }, [idx, deck.length]);

  const current = deck[idx];

  if (!current) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <SwipeCard
        title={current.name}
        subtitle={[current.area, current.type].filter(Boolean).join(" • ")}
        image={current.image}
        onSwipeLeft={() => {
          addSwiped(current.id);
          setIdx(i => i + 1);
        }}
        onSwipeRight={() => {
          addSwiped(current.id);
          addLike({ id: current.id, name: current.name, image: current.image });
          setShowMatch(true);
        }}
      />
      <MatchOverlay
        visible={showMatch}
        mealName={current.name}
        mealImage={current.image}
        onDone={() => {
          setShowMatch(false);
          const toOpen = current.id;
          setIdx(i => i + 1);
          router.push(`/recipe/${toOpen}`);
        }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 16 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
