export const vibeMap: Record<string, string[]> = {
  spicy: ["reggaeton party"], thai: ["asian chill beats"], mexican: ["latin fiesta mix"],
  italian: ["italian dinner jazz"], pasta: ["italian dinner jazz"], pizza: ["italian dinner jazz"],
  japanese: ["lofi ramen"], ramen: ["lofi ramen"], sushi: ["tokyo lofi"],
  bbq: ["blues rock bbq"], american: ["rock dinner playlist"],
  dessert: ["feel good pop baking"], baking: ["baking music playlist"],
  vegan: ["indie chill"], salad: ["indie acoustic chill"],
  soup: ["cozy acoustic"], stew: ["rainy day jazz"],
  indian: ["bollywood chill"], chinese: ["chinese instrumental playlist"],
};

export function tagsToVibeQuery(tags: string[]): string {
  for (const t of tags.map(s=>s.toLowerCase())) {
    if (vibeMap[t]?.length) return vibeMap[t][0];
  }
  return "lofi cooking beats";
}
