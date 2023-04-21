import React from 'react';
import styled from 'styled-components';
import personIcon from './personIcon.png'
import { Title, SubTitle, IconContainer, AddSign } from './components'

const Input = styled.input`
  display:none;
`

const AddSelfie = () => {

  const handleClick = () => {
    console.log('Clicked')
  }

  return (
    <div>
      <Title> Add a selfie</Title>
      <SubTitle>A selfie allows your photos to be synced with your account.</SubTitle>
      <IconContainer>
        <img src={personIcon} alt='icon' />
        <AddSign htmlFor="imageOnly"
          onClick={handleClick}
        />
    
        <Input id="imageOnly" type="file" accept="image/*"/>
      </IconContainer>
    </div>
  );
};

export default AddSelfie;