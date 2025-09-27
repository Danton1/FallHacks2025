import React from 'react';
import { View, Text, Image, FlatList, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { useStore } from '../../state/useStore';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function Matches() {
  const likes = useStore(s=>s.likes);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={{ flex:1, padding: 16 }}>
        <ThemedText style={{ fontSize: 22, fontWeight: '700', marginBottom: 12 }}>Your Matches</ThemedText>
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
            </Pressable>
          )}
          ListEmptyComponent={<Text>No matches yet. Go swipe some dishes!</Text>}
        />
      <Link href="/" style={{ marginTop: 12, textAlign:'center', textDecorationLine:'underline' }}>← Back to swiping</Link>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems:'center', marginBottom:12, backgroundColor:'#f3f4f6', borderRadius:12, overflow:'hidden' },
  img: { width: 90, height: 70 }
});
