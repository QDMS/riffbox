import { View, Text } from '@/src/components/Themed'
import TrackListItem from '@/src/components/TrackListItem'
import { FlatList, StyleSheet } from 'react-native'
import { tracks } from './../../../assets/data/tracks';
import Player from '@/src/components/Player';

export default function HomeScreen() {
  return (

    <FlatList
      data={tracks}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <TrackListItem track={item} />}

    />

  )
}

const styles = StyleSheet.create({

})
