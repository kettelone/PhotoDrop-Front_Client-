import React, { useEffect, useState } from 'react';
import checkToken from '../../../utils/checkJWT';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../modals/loader/Loader';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { update } from '../../../app/userSlice/userSlice'
import { updateAlbum } from '../../../app/albumsSlice/albumsSlice';
import { updatePhoto } from '../../../app/photosSlice/photosSlice';
import {updateOriginalPhotos} from '../../../app/originalPhotosSlice/originalPhotosSlice'
import {
  Container,
  PhotoIcon,
  Img,
  AlbumsContainer,
  Title,
  Albums,
  Album,
  AlbumCover,
  TitlePhotos,
  Photo,
  AlbumName,
  GridWrapper,
  GridContainer,
  Blur,
  Wrapper
} from './components'
import Footer from '../../common/footer/Footer';
import { LOGIN_ROUTE, PROFILE_ROUTE } from '../../../utils/consts';
import photoService from '../../../service/photoService';
import albumService from '../../../service/albumService';
import PhotoModal from '../../modals/photo/Photo';
import defaultImage from '../../../assets/defaultImage.svg';


const AlbumsDashboard = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const loggedIn = checkToken()
    if (!loggedIn) {
      navigate(LOGIN_ROUTE)
    } else {
      const fetchData = async () => {
        // setIsPageLoading(true)
        const data = await albumService.getAlbums()
        if (!data) {
          return 
        }
        const localData = localStorage.getItem('data')
        if (!localData) {
          const { user, albums, allPhotos } = data.data
          const { selfieUrl, name, phone, email } = user
          localStorage.setItem('data', JSON.stringify(data.data))
          dispatch(update({ selfieUrl, name, phone, email }))
          dispatch(updateAlbum({ albums }))
          dispatch(updatePhoto({ allPhotos }))
          // setIsPageLoading(false)
        } else if (localData.length !== JSON.stringify(data.data).length) {
          const { user, albums, allPhotos } = data.data
          const { selfieUrl, name, phone, email } = user
            localStorage.setItem('data', JSON.stringify(data.data))
            dispatch(update({ selfieUrl, name, phone, email }))
            dispatch(updateAlbum({ albums }))
            dispatch(updatePhoto({ allPhotos }))
            // setIsPageLoading(false)
        } else if (localData.length === JSON.stringify(data.data).length) {
          const data = JSON.parse(localData)
          const { user, albums, allPhotos } = data
          const { selfieUrl, name, phone, email } = user
          dispatch(update({ selfieUrl, name, phone, email }))
          dispatch(updateAlbum({ albums }))
          dispatch(updatePhoto({ allPhotos }))
          setIsPageLoading(false)
        }
        
      }
      fetchData()
    }
  }, [])
  const albums = useAppSelector(state => state.albumsUpdate)
  const photos = useAppSelector(state => state.photosUpdate)
  const selfie = useAppSelector(state => state.userUpdate.selfieUrl)
  const originalPhotos = useAppSelector(state => state.originalPhotosUpdate)
  const [isPageLoading, setIsPageLoading] = useState(false)
  const [isPhotoLoading, setIsPhotoLoading] = useState(false)
  const [originalPhotoUrl, setOriginalPhotoUrl] = useState('')
  const [photoId, setPhotoId] = useState('')
  const [albumId, setAlbumId] = useState('')
  const [isPaid,setIsPaid] = useState(false)
  const [albumCover, setAlbumCover]= useState('')
  const [albumName, setAlbumName] = useState('')  

  const handlePhoto = async (id: string, albumID: string) => {
    document.body.classList.add('noScroll')
    setOriginalPhotoUrl('')
    const album = albums?.filter(album => album.albumID === albumID)
    if (!album) {
      return
    }
    setPhotoId(id)
    setAlbumId(albumID)  
    setIsPaid(album[0].isPaid)
    setAlbumCover(album[0].url)
    setAlbumName(album[0].name)

    if (originalPhotos[id]) {
      setOriginalPhotoUrl(originalPhotos[id])
    } else {
      setIsPhotoLoading(true)
      const data = await photoService.getOriginalPhoto(id)
      if (!data) {
        return
      }
      dispatch(updateOriginalPhotos({ [id]: data?.data }))
      setOriginalPhotoUrl(data?.data) 
      setIsPhotoLoading(false)
    }

    document.getElementById('singlePhoto')?.classList.add('show')
  }

  return (
    <Wrapper>
      {
        isPageLoading || isPhotoLoading
          ? <div><Loader /><Blur /></div>
          : ''
      }
      <Container>
        <PhotoModal
        url={originalPhotoUrl}
        photoId={photoId}
        isPaid={isPaid}
        albumId={albumId}
        photoCover={albumCover}
        albumName={albumName}
      />
      <div>
        <PhotoIcon
            onClick={() => navigate(PROFILE_ROUTE)}
          >
        <Img src={selfie || defaultImage} alt="selfie" />
      </PhotoIcon>
          <AlbumsContainer>
        <Title>Albums</Title>
        <Albums className='albums-cover'>
            {albums?.map(album => 
              <Link to={`/album/${album.albumID}`} key={album.albumID}>
                <Album>
                  <AlbumCover src={album.url} alt="cover" />
                  <AlbumName>{album.name}</AlbumName>
                </Album>
              </Link>
          )}
        </Albums>
      </AlbumsContainer>
      <TitlePhotos>All photos</TitlePhotos> 
          <GridWrapper>
          <GridContainer id="grid">
            {
              photos && photos.length > 0
                ? photos.map(photo =>
                    <Photo
                      src={photo.url}
                      alt="photo"
                      className='photos'
                      data-name={photo.photoID}
                      key={photo.url}
                      onClick={() => handlePhoto(photo.photoID, photo.albumID)}
                    />
                )
                : ''
            }
          </GridContainer>
          </GridWrapper>
      </div>
      </Container>
      <Footer/>
    </Wrapper>
  );
};

export default AlbumsDashboard;