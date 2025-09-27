import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type RecipeLite = { id: string; name: string; image: string };

type Store = {
  likes: RecipeLite[];
  swipedIds: string[];
  addLike: (m: RecipeLite) => void;
  removeLike: (id: string) => void;
  addSwiped: (id: string) => void;
  hasSwiped: (id: string) => boolean;
};

const storage =
  Platform.OS === 'web'
    ? createJSONStorage(() => localStorage)
    : createJSONStorage(() => AsyncStorage as unknown as Storage);

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      likes: [],
      swipedIds: [],
      addLike: (m) => set((s) => (s.likes.some((x) => x.id === m.id) ? s : { likes: [...s.likes, m] })),
      removeLike: (id) => set((s) => ({ likes: s.likes.filter((x) => x.id !== id) })),
      addSwiped: (id) => set((s) => (s.swipedIds.includes(id) ? s : { swipedIds: [...s.swipedIds, id] })),
      hasSwiped: (id) => get().swipedIds.includes(id),
    }),
    { name: 'cravecrush-store', storage }
  )
);
