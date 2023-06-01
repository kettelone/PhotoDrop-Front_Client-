import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../../app/hooks';
import checkToken from '../../../utils/checkJWT';
import { LOGIN_ROUTE } from '../../../utils/consts';
import { Container, ImageContainer,Img, P1, P2, P3,StyledButton,Title, Wrapper } from './components'
import successGif from './successGif.gif'

const PaymentSuccess = () => {
  
  useEffect(() => {
    const isLoggedIn = checkToken()
    if (!isLoggedIn) {
      navigate(LOGIN_ROUTE)
    }
  }, [])

  const navigate = useNavigate()
  const id = useAppSelector(state => state.paidAlbumsUpdate.albumID) 
  const albumCover = useAppSelector(state =>state.paidAlbumsUpdate.albumCover)
  const albumName = useAppSelector(state => state.paidAlbumsUpdate.albumName)

  const goToAlbum = () => {
    navigate(`/album/${id}`)
  }
  return (
    <Wrapper>
    <Container>
      <Title>Thank you!</Title>
        <P1>The album <b>{albumName ? albumName: 'Your album'}</b> is now unlocked.</P1>
        <P2>You can now download, share, post, and print your hi-res, watermark-free, glorious memories.</P2>
        <ImageContainer>
          <Img src={albumCover ? albumCover : successGif} alt="congrats_unlocked" />

        </ImageContainer>
        <StyledButton
          onClick={goToAlbum}
        >See Photos
        </StyledButton>
        <P3>You will receive an email with your order details.</P3>
      </Container>
    </Wrapper>
  );
};

export default PaymentSuccess;