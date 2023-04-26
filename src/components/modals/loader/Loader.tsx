import React from 'react';
import loader from './loader.png'
import { Container, Img, Text, Wrapper } from './components'


const Loader = () => {
  return (
    <Wrapper>
      <Container>
        <Img src={loader} alt="loader" />
        <Text>Almost there...</Text>
      </Container>
    </Wrapper>

  );
};

export default Loader;