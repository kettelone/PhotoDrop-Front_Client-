import React from 'react';

import { Img, Wrapper, Container } from './components'

const PhotoModal = (props:{url:string, photoId:string}) => {
  return (
    <Wrapper id='singlePhoto'>
      <Container>
        <Img src={props.url} alt={props.photoId} />
      </Container>
    </Wrapper>
  );
};

export default PhotoModal;