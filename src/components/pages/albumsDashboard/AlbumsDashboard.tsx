import React, { useEffect, useState } from 'react';
import checkToken from '../../../utils/checkJWT';
import albumService from '../../../service/albumService';
import { Link } from 'react-router-dom';
import Loader from '../../modals/loader/Loader';
import { useNavigate } from 'react-router-dom';
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
import PhotoModal from '../../modals/photo/Photo';

const AlbumsDashboard = () => {
  const [selfie, setSelfie] = useState()
  const [albums, setAlbums] = useState<Array<any>>()
  const [photos, setPhotos] = useState<Array<any>>()
  const [isLoading, setIsLoading] = useState(false)
  const [url, setUrl] = useState('')
  const [photoId, setPhotoId] = useState('')
  const [photoLoading, setPhotoLoading] = useState(false)
  const [albumId, setAlbumId] = useState('')
  const [isPaid,setIsPaid] = useState(false)
  const [albumCover, setAlbumCover]= useState('')
  const [albumName, setAlbumName] = useState('')


  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true)
    const loggedIn = checkToken()
    if (loggedIn) {
      const fetchData = async () => {
        const data = await albumService.getAlbums()
        if (data) {
          const { user, albums, allPhotos } = data.data
          const { selfieUrl } = user
          setSelfie(selfieUrl)
          setAlbums(albums)
          setPhotos(allPhotos)
        }
        setTimeout(() => {
          setIsLoading(false)
        },500)
      }
      fetchData()

    } else {
      navigate(LOGIN_ROUTE)
    }
  }, [])

  const goToProfile = () => {
    navigate(PROFILE_ROUTE)
  }

  const handlePhoto = async (id: string, albumID:string) => {
    setPhotoLoading(true)
    const album = albums?.filter(album => album.albumID === albumID)
    if (!album) {
      return
    }
    setPhotoId(id)
    setAlbumId(albumID)
    setIsPaid(album[0].isPaid)
    setAlbumCover(album[0].url)
    setAlbumName(album[0].name)
    const data = await photoService.getOriginalPhoto(id)
    if (data) {
      setUrl(data?.data)
      document.body.classList.add('noScroll')
      document.getElementById('singlePhoto')?.classList.add('show')
      setTimeout(() => {
        setPhotoLoading(false)
      }, 2000)
    }
  }

  return (
    <Wrapper>
      {
        isLoading || photoLoading
          ? <div><Loader /><Blur /></div>
          : ''
      }
      <Container>
        <PhotoModal
        url={url}
        photoId={photoId}
        isPaid={isPaid}
        albumId={albumId}
        photoCover={albumCover}
        albumName={albumName}
      />
      <div>
        <PhotoIcon
          onClick={goToProfile}
          >
        <Img src={selfie} alt="selfie" />
      </PhotoIcon>
          <AlbumsContainer>
        <Title>Albums</Title>
        <Albums>
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