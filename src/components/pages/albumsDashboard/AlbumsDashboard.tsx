import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import checkToken from '../../../utils/checkJWT';
import albumService from '../../../service/albumService';

import {
  Container,
  PhotoIcon,
  Img,
  AlbumsContainer,
  PhotosContainer,
  Title,
  AlbumsPreview
} from './components'

const AlbumsDashboard = () => {
  const [selfie, setSelfie] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true)
    const loggedIn = checkToken()
    if (loggedIn) {
      const fetchData = async () => {
        const data = await albumService.getAlbums()
        if (data) {
          const { user } = data.data
          const { selfieUrl } = user
          setSelfie(selfieUrl)
        }
        setIsLoading(false)
      }
      fetchData()

    } else {
    }
  }, [])
  return (
    <Container>
      <PhotoIcon
      >
        <Img src={selfie} alt="selfie" />
      </PhotoIcon>
      <AlbumsContainer>
        <Title>Albums</Title>
      </AlbumsContainer>
      <PhotosContainer>
        <Title>All photos</Title>
      </PhotosContainer>
    </Container>
  );
};

export default AlbumsDashboard;