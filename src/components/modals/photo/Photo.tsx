import React, { useState } from 'react';

import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';

import closeIcon from '../../../assets/closeIcon.svg'
import paymentService from '../../../service/paymentService';
import arrowDown from './arrowDown.svg'
import {
  ButtonContainer,
  CloseButton,
  Container,
  ContainerWrapper,
  Icon,
  Img,
  Line,
  StyledButton,
  SubWrapper,
  Text,
  Wrapper
} from './components'
import share from './share.svg'


const PhotoModal = (props:{
    url: string,
    photoId: string,
    isPaid: boolean,
    albumId: string | undefined,
}) => {
  
  const [isLoading, setIsLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)

  const handlePayment = async () => {
    setIsLoading(true)
    setIsDisabled(true)
    if (props.albumId) {
    const paymentLink = await paymentService.requestPayment(props.albumId)
    window.location.replace(paymentLink);
    }
    setTimeout(() => {
      setIsLoading(false)
      setIsDisabled(false)
    },2000)
  }
  
  const handleShare = async (url: string) => {
    try {
      const shareData = {
        title: "PhotoDropImage",
        text: "Learn web development on MDN!",
        url: url,
      };
      await navigator.share(shareData);
    } catch (e) {
      console.log(e)
    }
  }

  const closeModal = () => {
    document.getElementById('singlePhoto')?.classList.remove('show')
    document.getElementById('footer')?.classList.remove('hide')
    document.body.classList.remove('noScroll')
  }

  return (
    <Wrapper id='singlePhoto'>
      <CloseButton
      onClick={closeModal}
      >
        <img src={closeIcon} alt="closeIcon" />
      </CloseButton>
      <SubWrapper>
        <Img src={props.url} alt={props.photoId} />
      </SubWrapper>
      {
        props.isPaid
          ?
          <ContainerWrapper>
            <Container
              href={props.url} download
            >
              <Icon src={arrowDown} alt="arrowDown" />
              <Line />
              <Text>Download</Text>
            </Container>
            <Container
              onClick={()=>handleShare(props.url)}
            >
              <Icon src={share} alt="arrowDown" style={{marginTop:'1.25px'}}/>
              <Text>Share</Text>
            </Container>
          </ContainerWrapper>
          :<ButtonContainer>
            <StyledButton
              onClick={handlePayment}
              disabled={isDisabled}
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