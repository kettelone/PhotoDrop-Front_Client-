import React from 'react';

import { Img, Wrapper, Container, CloseButton } from './components'
import closeIcon from '../../../assets/closeIcon.svg'

const PhotoModal = (props: { url: string, photoId: string }) => {
  const closeModal = () => {
    document.getElementById('singlePhoto')?.classList.remove('show')
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
    </Wrapper>
  );
};

export default PhotoModal;