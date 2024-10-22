import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {Album} from 'hooks/useFetchAlbum';

type AlbumGalleryRouteProp = RouteProp<{params: {album: Album}}, 'params'>;

const AlbumGallery: React.FC = () => {
  const route = useRoute<AlbumGalleryRouteProp>();
  const {album} = route.params;
  return (
    <View>
      <Text style={{color: 'black'}}>{album?.title}</Text>
    </View>
  );
};

export default AlbumGallery;

const styles = StyleSheet.create({});
