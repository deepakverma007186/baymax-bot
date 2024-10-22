import {navigate} from '@utils/NavigationUtils';
import useFetchAlbum, {Album} from '../../hooks/useFetchAlbum';
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const ShowAlbum: React.FC = () => {
  const {albumList} = useFetchAlbum();

  return (
    <View style={{flex: 1}}>
      <Text style={{color: 'black', textAlign: 'center'}}>Show Album</Text>
      <FlatList
        data={albumList}
        keyExtractor={item => item?.id?.toString()}
        renderItem={({item}) => <AlbumCard data={item} />}
      />
    </View>
  );
};

interface AlbumCardProps {
  data: Album;
}

const AlbumCard: React.FC<AlbumCardProps> = ({data}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigate('AlbumGallery', {album: data})}>
      <Image
        source={{uri: data?.thumbnailUrl}}
        style={styles.thumbnail}
        resizeMode="cover"
      />
      <View style={{flex: 1}}>
        <Text style={styles.title} numberOfLines={2}>
          {data?.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ShowAlbum;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  thumbnail: {
    width: 50,
    aspectRatio: 1 / 1,
    marginRight: 10,
  },
  title: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
  },
});
