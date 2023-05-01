import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import checkToken from '../../../utils/checkJWT';
import albumService from '../../../service/albumService';
import { ALBUMS_DASHBOARD_ROUTE } from '../../../utils/consts';
import { useParams } from 'react-router-dom';
import Loader from '../../modals/loader/Loader';
import { Link } from 'react-router-dom';
import arrowLeft from '../../../assets/arrowLeft.svg'
import paymentService from '../../../service/paymentService';

import {
  Wrapper,
  TopContainer,
  Name,
  Date,
  Amount,
  Photo,
  TextWrapper,
  TextContainer,
  DateAmount,
  GridContainer,
  Blur,
  GoBack,
  ButtonContainer,
  StyledButton
} from './components'
import Footer from '../../common/footer/Footer';

const Album = () => {
  let { id } = useParams();


  const [photos, setPhotos] = useState<Array<any>>()
  const [quantity, setQuantity] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [albumName, setAlbumName] = useState('')
  const[isPaid, setIsPaid] = useState(false)
  const navigate = useNavigate()


  useEffect(() => {
    setIsLoading(true)
    const loggedIn = checkToken()
    if (loggedIn) {
      const fetchData = async () => {
        const data = await albumService.getAlbums()
        if (data) {
          const { allPhotos,albums } = data.data
          //@ts-ignore
          const albumPhotos = allPhotos.filter(photo => photo.albumID === id)
          setQuantity(albumPhotos.length)
          setPhotos(albumPhotos)
          //@ts-ignore
          const album = albums.filter(album => album.albumID === id)
          setAlbumName(album[0].name)
          setIsPaid(album[0].isPaid)
        }
        setTimeout(() => {
          setIsLoading(false)
        }, 500)
      }
      fetchData()

    } else {
    }
  }, [])

  const handlePayment = async () => {
    if (!id) {
      return
    }
    const paymentLink = await paymentService.requestPayment(id)
    window.location.replace(paymentLink);
  }
  return (
    <Wrapper>
      {
        isLoading
          ? <div><Loader /><Blur /></div>
          : ''
      }
      <TopContainer id="top">
        <GoBack>
        <Link to={ALBUMS_DASHBOARD_ROUTE}>
          <div>
            <img src={arrowLeft} alt="arrow-let " />
          </div>
          </Link>
        </GoBack>
        <TextWrapper>
          <TextContainer>
            <Name>{albumName}</Name>
          <DateAmount>
              <Date>Jan 10, 2022 •</Date>
              <Amount>{quantity} { quantity === 1 ? 'photo' :'photos'}</Amount>
          </DateAmount>
          </TextContainer>
        </TextWrapper>
      </TopContainer>
      <div>
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
                // onClick={handlePhoto}
                />
              )
              : ''
          }
        </GridContainer>
      </div>
      {
        isPaid
          ?''
          : <ButtonContainer>
            <StyledButton
              onClick={handlePayment}
            >Unlock your photos</StyledButton>
          </ButtonContainer>
      }

      <Footer/>
    </Wrapper>
  );
};

export default Album;