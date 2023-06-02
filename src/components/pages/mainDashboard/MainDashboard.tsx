import React,{useEffect, useState} from 'react';

import { updateAlbum } from '../../../app/albumsSlice/albumsSlice';
import { useAppDispatch,useAppSelector } from '../../../app/hooks';
import { updatePhoto } from '../../../app/photosSlice/photosSlice';
import { update } from '../../../app/userSlice/userSlice'
import albumService from '../../../service/albumService';
import Footer from '../../common/footer/Footer';
import Loader from '../../modals/loader/Loader';
import { Blur } from '../addSelfie/components';
import AlbumsDashboard from '../albumsDashboard/AlbumsDashboard';
import NoAlbumsDashboard from '../noAlbumsDashboard/NoAlbumsDashboard'

const MainDashboard = () => {
  const dispatch = useAppDispatch()
  const photos = useAppSelector(state => state.photosUpdate)
  const userPhone = useAppSelector(state => state.userUpdate.phone)
  const userEmail = useAppSelector(state => state.userUpdate.email)
  const [isLoading, setIsLoading] = useState(false)
  const selfie = useAppSelector(state => state.userUpdate.selfieUrl)
  useEffect(() => {
    const fetchData = async () => {
        setIsLoading(true)
        const data = await albumService.getAlbums()
        if (!data) {
          return
        }
      console.log('hello')
      const { user, albums, allPhotos } = data.data
      const { selfieUrl, name, phone, email } = user
        if (allPhotos.length > photos.length) {
          dispatch(update({ selfieUrl, name, phone, email }))
          dispatch(updateAlbum({ albums }))
          dispatch(updatePhoto({ allPhotos }))
        }
      setIsLoading(false)
      }
      fetchData()
  }, [])
  return (
    <div>
      {
        !selfie && photos.length === 0
          ? <div><Blur /><Loader /></div>
          : ''
      }
      {photos.length > 0 && <AlbumsDashboard />}
      {selfie && photos.length === 0 && <NoAlbumsDashboard />}
      <Footer/>
    </div>
  );
};

export default MainDashboard;