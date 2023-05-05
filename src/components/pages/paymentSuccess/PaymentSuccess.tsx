import React from 'react';
import { Wrapper,Container, Title, P1, P2, P3,Img, StyledButton } from './components'
import successGif from './successGif.gif'
import { useNavigate } from 'react-router-dom';


const PaymentSuccess = () => {
  const navigate = useNavigate()
  const id = localStorage.getItem('albumID')
  let albumCover = localStorage.getItem('albumCover')
  if (!albumCover) {
    albumCover = successGif
  }
  console.log({albumCover})
  console.log({id})


  const goToAlbum = () => {
    navigate(`/album/${id}`)
  }
  return (
    <Wrapper>
    <Container>
      <Title>Thank you!</Title>
      <P1>The album <b>Brooklyn Bridge</b> is now unlocked.</P1>
      <P2>You can now download, share, post, and print your hi-res, watermark-free, glorious memories.</P2>
        <Img src={albumCover} alt="congrats_unlocked"/>
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