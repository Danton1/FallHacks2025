import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, Link } from "expo-router";
import { fetchMealById, mealTags, Meal } from "@/components/fetch-api";
import { tagsToVibeQuery } from "../../lib/mood";
import YoutubePlayer from "../../components/YoutubePlayer";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RecipeDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [meal, setMeal] = useState<Meal | null>(null);
  const [query, setQuery] = useState<string>("lofi cooking beats");

  useEffect(() => {
    (async () => {
      const m = await fetchMealById(id!);
      setMeal(m);
      setQuery(tagsToVibeQuery(mealTags(m)));
    })();
  }, [id]);

  if (!meal)
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.center}>
          <ActivityIndicator />
        </View>
      </SafeAreaView>
    );

  const ingredients: string[] = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const meas = meal[`strMeasure${i}`];
    if (ing && ing.trim()) ingredients.push(`${meas ?? ""} ${ing}`.trim());
  }

  console.log(meal.strMeal);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        <ThemedText style={styles.title}>{meal.strMeal}</ThemedText>
        <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
        <ThemedView style={{ height: 12 }} />
        <ThemedText
          style={{
            fontStyle: "italic",
            color: "#555",
            marginInline: "auto",
          }}
        >
          {meal.strCategory} {meal.strArea ? `· ${meal.strArea}` : ""}
        </ThemedText>
        <ThemedView style={{ height: 20 }} />
        <YoutubePlayer query={query} />
        <ThemedText style={styles.h}>Ingredients</ThemedText>
        {ingredients.map((it, idx) => (
          <ThemedText key={idx}>• {it}</ThemedText>
        ))}
        <ThemedText style={styles.h}>Instructions</ThemedText>
        <ThemedText style={{ lineHeight: 22 }}>{meal.strInstructions}</ThemedText>
        <Link
          href="/matches"
          style={{
            marginTop: 16,
            textDecorationLine: "underline",
            color: "#007AFF",
          }}
        >
          ← Back to matches
        </Link>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 8 },
  image: { width: "100%", height: 220, borderRadius: 12 },
  h: { marginTop: 16, marginBottom: 6, fontSize: 18, fontWeight: "700" },
});
