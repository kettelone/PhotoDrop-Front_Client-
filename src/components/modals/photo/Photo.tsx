import React, {useEffect, useState} from 'react';
import paymentService from '../../../service/paymentService';
import {
  Img, Wrapper, Container, CloseButton, DownloadContainer,
  Arrow,
  Line,
  Text,
  ButtonContainer,
  StyledButton
} from './components'
import closeIcon from '../../../assets/closeIcon.svg'
import arrowDown from './arrowDown.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'


const PhotoModal = (props:
  {
    url: string,
    photoId: string,
    isPaid: boolean,
    albumId: string | undefined,
    photoCover: string,
    albumName: string
  }) => {
  
  const [isLoading, setIsLoading] = useState(false)
    if (props.albumId) {
    localStorage.setItem('albumID', props.albumId)
    localStorage.setItem('albumCover', props.photoCover)
    localStorage.setItem('albumName', props.albumName)
    }


  const handlePayment = async () => {
    setIsLoading(true)
    if (props.albumId) {
    const paymentLink = await paymentService.requestPayment(props.albumId)
    window.location.replace(paymentLink);
    }
    setIsLoading(false)
  }
  
  const closeModal = () => {
    document.getElementById('singlePhoto')?.classList.remove('show')
    document.body.classList.remove('noScroll')
  }

  return (
    <Wrapper id='singlePhoto'>
      <CloseButton
      onClick={closeModal}
      >
        <img src={closeIcon} alt="closeIcon" />
      </CloseButton>
      <Container>
        <Img src={props.url} alt={props.photoId} />

      </Container>
      {
        props.isPaid
        ? <DownloadContainer
          href={props.url} download >
          <Arrow src={arrowDown} alt="arrowDown" />
          <Line />
          <Text>Download</Text>
        </DownloadContainer>
          :<ButtonContainer>
            <StyledButton
              onClick={handlePayment}
            >
              {
                isLoading 
                  ? <FontAwesomeIcon icon={faSpinner} className="spinner" />
                  :'Unlock photo'
              }
              </StyledButton>
          </ButtonContainer>
      }

    </Wrapper>
  );
};

export default PhotoModal;