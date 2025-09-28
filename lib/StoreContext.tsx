import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { storage } from './storage';

export type RecipeLite = { id: string; name: string; image: string };

type State = {
  likes: RecipeLite[];
  swipedIds: string[];
};

type Action =
  | { type: 'ADD_LIKE'; item: RecipeLite }
  | { type: 'REMOVE_LIKE'; id: string }
  | { type: 'ADD_SWIPED'; id: string }
  | { type: 'HYDRATE'; state: State };

const initialState: State = { likes: [], swipedIds: [] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_LIKE':
      if (state.likes.some(x => x.id === action.item.id)) return state;
      return { ...state, likes: [...state.likes, action.item] };
    case 'REMOVE_LIKE':
      return { ...state, likes: state.likes.filter(x => x.id !== action.id) };
    case 'ADD_SWIPED':
      if (state.swipedIds.includes(action.id)) return state;
      return { ...state, swipedIds: [...state.swipedIds, action.id] };
    case 'HYDRATE':
      return action.state;
    default:
      return state;
  }
}

type Ctx = {
  likes: RecipeLite[];
  swipedIds: string[];
  addLike: (m: RecipeLite) => void;
  removeLike: (id: string) => void;
  addSwiped: (id: string) => void;
};

const StoreContext = createContext<Ctx | null>(null);
const KEY = 'cravecrush-store';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // hydrate once
  useEffect(() => {
    (async () => {
      const raw = await storage.getItem(KEY);
      if (raw) {
        try {
          const parsed = JSON.parse(raw) as State;
          dispatch({ type: 'HYDRATE', state: { likes: parsed.likes ?? [], swipedIds: parsed.swipedIds ?? [] } });
        } catch { /* ignore */ }
      }
    })();
  }, []);

  // persist on changes
  useEffect(() => {
    (async () => {
      await storage.setItem(KEY, JSON.stringify(state));
    })();
  }, [state]);

  const value = useMemo<Ctx>(() => ({
    likes: state.likes,
    swipedIds: state.swipedIds,
    addLike: (m) => dispatch({ type: 'ADD_LIKE', item: m }),
    removeLike: (id) => dispatch({ type: 'REMOVE_LIKE', id }),
    addSwiped: (id) => dispatch({ type: 'ADD_SWIPED', id }),
  }), [state]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export function useAppStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useAppStore must be used inside <StoreProvider>');
  return ctx;
}
