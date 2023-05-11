import React, {useState} from 'react';
import { Wrapper,Container, Title, P1, P2, P3,Img, StyledButton } from './components'
import successGif from './successGif.gif'
import { useNavigate } from 'react-router-dom';


const PaymentSuccess = () => {
  const navigate = useNavigate()
  const [id, setId] = useState(() => {
    const savedItem = localStorage.getItem("albumID");
    return savedItem || "";
  });

  const [albumCover, setAlbumCover] = useState(() => {
    const savedItem = localStorage.getItem("albumCover");
    return savedItem || "";
  });

  const [albumName, setAlbumName] = useState(() => {
    const savedItem = localStorage.getItem("albumName");
    return savedItem || "";
  });

  console.log(albumCover)
  console.log(id)
  console.log(albumName)

  const goToAlbum = () => {
    navigate(`/album/${id}`)
  }
  return (
    <Wrapper>
    <Container>
      <Title>Thank you!</Title>
        <P1>The album <b>{albumName ? albumName: 'Your album'}</b> is now unlocked.</P1>
      <P2>You can now download, share, post, and print your hi-res, watermark-free, glorious memories.</P2>
        <Img src={albumCover ? albumCover : successGif} alt="congrats_unlocked"/>
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