import React,{useEffect} from 'react';

import { updateAlbum } from '../../../app/albumsSlice/albumsSlice';
import { useAppDispatch,useAppSelector } from '../../../app/hooks';
import { updatePhoto } from '../../../app/photosSlice/photosSlice';
import { update } from '../../../app/userSlice/userSlice'
import albumService from '../../../service/albumService';
import Footer from '../../common/footer/Footer';
import Loader from '../../modals/loader/Loader';
import { Blur } from '../addSelfie/components';
import AlbumsDashboard from '../albumsDashboard/AlbumsDashboard';
import Dashboard from '../dashboard/Dashboard'

const MainDashboard = () => {
  const dispatch = useAppDispatch()
  const photos = useAppSelector(state => state.photosUpdate)
  const albums = useAppSelector(state => state.albumsUpdate)
  const isLoading = useAppSelector(state => state.authUpdate.isFetching)
  useEffect(() => {
      const fetchData = async () => {
        const data = await albumService.getAlbums()
        if (!data) {
          return
        }
        const { user, albums, allPhotos } = data.data
        const { selfieUrl, name, phone, email } = user
        if (allPhotos.length > photos.length) {
          dispatch(update({ selfieUrl, name, phone, email }))
          dispatch(updateAlbum({ albums }))
          dispatch(updatePhoto({ allPhotos }))
        }
      }
      fetchData()
  }, [])
  return (
    <div>
      {
        isLoading
          ? <div><Blur /><Loader /></div>
          : ''
      }
      {albums.length > 0 && <AlbumsDashboard />}
      {albums.length <= 0 && <Dashboard />}
      <Footer/>
    </div>
  );
};

export default MainDashboard;