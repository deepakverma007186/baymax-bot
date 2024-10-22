import axios from 'axios';
import {useEffect, useState} from 'react';

const ALBUM_URL: string = 'https://jsonplaceholder.typicode.com/photos';

export interface Album {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export default function useFetchAlbum() {
  const [albumList, setAlbumList] = useState<Album[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const getAlbumListData = async () => {
    try {
      const response = await axios.get<Album[]>(ALBUM_URL);

      const modifiedAlbumList = Object.values(
        response?.data?.reduce<Record<number, Album[]>>((acc, album) => {
          if (!acc[album?.albumId]) {
            acc[album?.albumId] = [];
          }

          acc[album?.albumId].push(album);
          return acc;
        }, {}),
      ).map(albumGroup => albumGroup[0]);

      setAlbumList(modifiedAlbumList);
    } catch (error: any) {
      console.error('Error fetching album data ⛔: ', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAlbumListData();
  }, []);

  return {albumList, loading, error};
}
