import React,{useEffect} from 'react';

import { updateAlbum } from '../../../app/albumsSlice/albumsSlice';
import { useAppDispatch,useAppSelector } from '../../../app/hooks';
import { updatePhoto } from '../../../app/photosSlice/photosSlice';
import { update } from '../../../app/userSlice/userSlice'
import albumService from '../../../service/albumService';
import Footer from '../../common/footer/Footer';
import AlbumsDashboard from '../albumsDashboard/AlbumsDashboard';
import NoAlbumsDashboard from '../noAlbumsDashboard/NoAlbumsDashboard'

const MainDashboard = () => {
  const dispatch = useAppDispatch()
  const photos = useAppSelector(state => state.photosUpdate)
  const selfie = useAppSelector(state => state.userUpdate.selfieUrl)
  useEffect(() => {
    const fetchData = async () => {
        const data = await albumService.getAlbums()
        if (!data) {
          return
        }
      const { user, albums, allPhotos } = data.data
      const { selfieUrl, name, phone, email } = user
      // if (allPhotos.length > photos.length) {
          dispatch(update({ selfieUrl, name, phone, email }))
          dispatch(updateAlbum({ albums }))
          dispatch(updatePhoto({ allPhotos }))
        }
      // }
      fetchData()
  }, [])
  return (
    <div>
      {photos.length > 0 && <AlbumsDashboard />}
      {photos.length === 0 && <NoAlbumsDashboard />}
      <Footer/>
    </div>
  );
};

export default MainDashboard;