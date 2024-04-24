import { View, Text } from '@/src/components/Themed'
import TrackListItem from '@/src/components/TrackListItem'
import { FlatList, StyleSheet, TextInput } from 'react-native'
import { tracks } from './../../../assets/data/tracks';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/src/components/useColorScheme';
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { useState } from 'react';


export default function SearchScreen() {

  const [search, setSearch] = useState('');

  return (
    <SafeAreaView>
      <View style={styles.header}>
        {/* Header */}
        <FontAwesome name="search" size={16} color="#e31b23" />
        <TextInput style={styles.input}
          value={search}
          onChangeText={setSearch}
          placeholderTextColor="#e31b23"
          placeholder='What Do You Want To Listen To?' />
        <Text onPress={() => setSearch('')} style={{ color: "silver" }}>Cancel</Text>
      </View>
      <FlatList
        data={tracks}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <TrackListItem track={item} />}
      />
    </SafeAreaView>


  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10
  },
  input: {
    flex: 1,
    backgroundColor: "#121314",
    padding: 8,
    marginHorizontal: 10,
    borderRadius: 5,
    color: "white"
  },
})
