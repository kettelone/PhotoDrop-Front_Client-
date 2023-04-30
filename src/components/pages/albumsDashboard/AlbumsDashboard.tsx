import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import checkToken from '../../../utils/checkJWT';
import albumService from '../../../service/albumService';
import { Link } from 'react-router-dom';
import {
  Container,
  PhotoIcon,
  Img,
  AlbumsContainer,
  PhotosContainer,
  Title,
  Albums,
  Album,
  AlbumCover,
  TitlePhotos,
  Photos,
  Photo,
  AlbumName
} from './components'

const AlbumsDashboard = () => {
  const [selfie, setSelfie] = useState()
  const [albums, setAlbums] = useState<Array<any>>()
  const [photos, setPhotos] = useState<Array<any>>()
  const [isLoading, setIsLoading] = useState(false)
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
    }
  }, [])
  return (
    <Container>
      <div>
      <PhotoIcon>
        <Img src={selfie} alt="selfie" />
      </PhotoIcon>
      <AlbumsContainer>
        <Title>Albums</Title>
        <Albums>
            {albums?.map(album => 
              <Link to={`/album/${album.albumID}`} key={album.albumID}>
            <Album>
              <AlbumCover src={album.url} alt="cover" />
              <AlbumName>Album Name</AlbumName>
                </Album>
              </Link>
          )}
        </Albums>
      </AlbumsContainer>
      <TitlePhotos>All photos</TitlePhotos> 
      <div>
      <PhotosContainer>
        <Photos>
          {photos?.map(photo =>
            <Photo src={photo.url} alt='photo' key={photo.photoID } />
            )}
        </Photos>
        <Photos>
          {photos?.map(photo =>
            <Photo src={photo.url} alt='photo' key={photo.photoID} />
          )}
        </Photos>
        <Photos>
          {photos?.map(photo =>
            <Photo src={photo.url} alt='photo' key={photo.photoID} />
          )}
          </Photos> 
      </PhotosContainer>
        </div>
      </div>
    </Container>
  );
};

export default AlbumsDashboard;