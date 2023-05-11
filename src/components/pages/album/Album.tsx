import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import checkToken from '../../../utils/checkJWT';
import albumService from '../../../service/albumService';
import { ALBUMS_DASHBOARD_ROUTE, DASHBOARD_ROUTE, LOGIN_ROUTE } from '../../../utils/consts';
import { useParams } from 'react-router-dom';
import Loader from '../../modals/loader/Loader';
import { Link } from 'react-router-dom';
import arrowLeft from '../../../assets/arrowLeft.svg'
import paymentService from '../../../service/paymentService';
import PhotoModal from '../../modals/photo/Photo';
import photoService from '../../../service/photoService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

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
  GridWrapper,
  GridContainer,
  Blur,
  GoBack,
  ButtonContainer,
  StyledButton
} from './components'
import Footer from '../../common/footer/Footer';

const Album = () => {
  let { id } = useParams();
  useEffect(() => {
    const isLoggedIn = checkToken()
    if (!isLoggedIn) {
      navigate(LOGIN_ROUTE)
    }
    if (id == 'false' || id == 'null') {
      navigate(DASHBOARD_ROUTE)
    }
  }, [])

  const [photos, setPhotos] = useState<Array<any>>()
  const [quantity, setQuantity] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [photoLoading, setPhotoLoading] = useState(false)
  const [paymentLoading, setPaymentLoading] =useState(false)
  const [albumName, setAlbumName] = useState('')
  const [albumCover, setAlbumCover] = useState('')
  const [url, setUrl] = useState('')
  const [photoId, setPhotoId] = useState('')
  const[isPaid, setIsPaid] = useState(false)
  const navigate = useNavigate()


  useEffect(() => {
    setIsLoading(true)
    const loggedIn = checkToken()
    if (loggedIn) {
      const fetchData = async () => {
        const data = await albumService.getAlbums()
        if (data) {
          const { allPhotos, albums }= data.data
          //@ts-ignore
          const albumPhotos = allPhotos.filter(photo => photo.albumID === id)
          setQuantity(albumPhotos.length)
          setPhotos(albumPhotos)
          //@ts-ignore
          const album = albums.filter(album => album.albumID === id)
          setAlbumCover(album[0].url)
          setAlbumName(album[0].name)
          setIsPaid(album[0].isPaid)
          if (id) {
          localStorage.setItem('albumID', id)
          localStorage.setItem('albumCover', album[0].url)
          localStorage.setItem('albumName', album[0].name)
          }
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
    setPaymentLoading(true)
    if (id) {
    const paymentLink = await paymentService.requestPayment(id)
      window.location.replace(paymentLink);
    }
    setTimeout(() => {
      setPaymentLoading(false)
    },1000)
  }

  const handlePhoto = async (id: string) => {
    document.body.classList.add('noScroll')
    setPhotoLoading(true)
    const data = await photoService.getOriginalPhoto(id)
    if (data) {
      setUrl(data?.data)
      setPhotoId(id)
      setTimeout(() => {
        setPhotoLoading(false)
        document.getElementById('singlePhoto')?.classList.add('show')
      }, 2000)
    }
  }

  return (
    <Wrapper>
      <PhotoModal
        url={url}
        photoId={photoId}
        isPaid={isPaid}
        albumId={id}
        photoCover={albumCover}
        albumName={albumName}
      />
      {
        isLoading || photoLoading
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
      <GridWrapper>
        <GridContainer id="grid">
          {
            photos && photos.length > 0
              ? photos.map(photo =>
                <Photo
                  onClick={() => handlePhoto(photo.photoID)}
                  src={photo.url}
                  alt="photo"
                  className='photos'
                  data-name={photo.photoID}
                  key={photo.url}
                />
              )
              : ''
          }
        </GridContainer>
      </GridWrapper>
      {
        isPaid
          ?''
          : <ButtonContainer>
            <StyledButton
              onClick={handlePayment}
            >
            {
                paymentLoading
                  ? <FontAwesomeIcon icon={faSpinner} className="spinner" />
                  : "Unlock your photos"
            }
              </StyledButton>
          </ButtonContainer>
      }

      <Footer/>
    </Wrapper>
  );
};

export default Album;