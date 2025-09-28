import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link, router } from 'expo-router';
import React from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppStore } from '@/lib/StoreContext';

export default function Matches() {
  const { likes, removeLike } = useAppStore();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={{ flex:1, padding: 16 }}>
        <ThemedText style={{ fontSize: 22, fontWeight: '700', marginBottom: 12 }}>
          Your Matches
        </ThemedText>
        <FlatList
          data={likes}
          keyExtractor={(item)=>item.id}
          renderItem={({item}) => (
            <Pressable style={styles.card} onPress={()=>router.push(`/recipe/${item.id}`)}>
              <Image source={{ uri: item.image }} style={styles.img} />
              <View style={{ flex:1, paddingHorizontal: 10 }}>
                <Text style={{ fontSize:16, fontWeight:'600' }}>{item.name}</Text>
                <Text style={{ color:'#555' }}>Tap to view recipe + music</Text>
              </View>
              <Pressable onPress={()=>removeLike(item.id)}>
                <MaterialIcons name="delete" size={24} color="red" />
              </Pressable>
            </Pressable>
          )}
          ListEmptyComponent={<Text>No matches yet. Go swipe some dishes!</Text>}
        />
        <Link href="/" style={{ marginTop: 12, textAlign:'center', textDecorationLine:'underline' }}>
          ← Back to swiping
        </Link>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems:'center', marginBottom:12, backgroundColor:'#f3f4f6', borderRadius:12, overflow:'hidden' },
  img: { width: 90, height: 70 }
});
