import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import checkToken from '../../../utils/checkJWT';
import { MAIN_DASHBOARD_ROUTE, LOGIN_ROUTE } from '../../../utils/consts';
import Loader from '../../modals/loader/Loader';
import arrowLeft from '../../../assets/arrowLeft.svg'
import paymentService from '../../../service/paymentService';
import PhotoModal from '../../modals/photo/Photo';
import photoService from '../../../service/photoService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { updateOriginalPhotos } from '../../../app/originalPhotosSlice/originalPhotosSlice'
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
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { id } = useParams();
  const originalPhotos = useAppSelector(state => state.originalPhotosUpdate)
  const photos = useAppSelector(state => state.photosUpdate.filter(photo => photo.albumID === id))
  const albums = useAppSelector(state => state.albumsUpdate)
  const quantity = photos.length
  const album = albums.filter(album => album.albumID === id)
  const isPaid= album[0].isPaid
  const [originalPhotoUrl, setOriginalPhotoUrl] = useState('')
  const [photoId, setPhotoId] = useState('')
  const [isDisabled, setIsDisabled] = useState(false)
  const [isPhotoLoading, setIsPhotoLoading] = useState(false)
  const [isPaymentLoading, setIsPaymentLoading] = useState(false)

  useEffect(() => {
    const isLoggedIn = checkToken()
    if (!isLoggedIn) {
      navigate(LOGIN_ROUTE)
    }
    if (id == 'false' || id == 'null') {
      navigate(MAIN_DASHBOARD_ROUTE)
    }
  }, [])

  const handlePayment = async () => {
    setIsPaymentLoading(true)
    setIsDisabled(true)
    if (id) {
    const paymentLink = await paymentService.requestPayment(id)
      window.location.replace(paymentLink);
    }
    setTimeout(() => {
      setIsPaymentLoading(false)
      setIsDisabled(false)
    },1000)
  }

  const handlePhoto = async (id: string) => {
    document.body.classList.add('noScroll')
    setOriginalPhotoUrl('')
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
      <PhotoModal
        url={originalPhotoUrl}
        photoId={photoId}
        isPaid={isPaid}
        albumId={id}
      />
      {
        isPhotoLoading
          ? <div><Loader /><Blur /></div>
          : ''
      }
      <TopContainer id="top">
        <GoBack>
          <Link to={MAIN_DASHBOARD_ROUTE}>
          <div>
            <img src={arrowLeft} alt="arrow-let " />
          </div>
          </Link>
        </GoBack>
        <TextWrapper>
          <TextContainer>
            <Name>{album[0].name}</Name>
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
              disabled={isDisabled}
            >
            {
                isPaymentLoading
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