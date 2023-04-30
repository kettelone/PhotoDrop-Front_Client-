import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import checkToken from '../../../utils/checkJWT';
import albumService from '../../../service/albumService';
import GoBack from '../../common/goBack/GoBack';
import { ALBUMS_DASHBOARD_ROUTE } from '../../../utils/consts';
import { useParams } from 'react-router-dom';

import {
  TopContainer,
  Name,
  Date,
  Amount,
  PhotosContainer,
  Photos,
  Photo
} from './components'

const Album = () => {
  let { id } = useParams();
  if (id) {
    document.getElementById('header')?.classList.add("hide")
  }
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
          const { allPhotos } = data.data
          //@ts-ignore
          const albumPhotos = allPhotos.filter(photo => photo.albumID === id)
          setPhotos(albumPhotos)
        }
        setTimeout(() => {
          setIsLoading(false)
        }, 500)
      }
      fetchData()

    } else {
    }
  }, [])
  return (
    <div>
      <TopContainer>
        <GoBack route={ALBUMS_DASHBOARD_ROUTE} />
        <Name>Album name</Name>
        <Date>Jan 10, 2022</Date>
        <Amount>{ 1} photos</Amount>
      </TopContainer>
      <PhotosContainer>
        <Photos>
          {photos?.map(photo =>
            <Photo src={photo.url} alt='photo' key={photo.photoID} />
          )}
        </Photos>
      </PhotosContainer>


    </div>
  );
};

export default Album;