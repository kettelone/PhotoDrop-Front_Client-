import React , {useState} from 'react';
import styled from 'styled-components';
import personIcon from './personIcon.svg'
import { Title, SubTitle, IconContainer, AddSign } from './components'

const Input = styled.input`
  display:none;
`

const AddSelfie = () => {
  const [selectedPhoto, setSelectedPhoto] = useState()

  const selectPhoto = (event: any) => {
    if (event.target.files) { 
      console.log(event.target.files[0])
      setSelectedPhoto(event.target.files[0])
    }
  }

  return (
    <div>
      <Title> Add a selfie</Title>
      <SubTitle>A selfie allows your photos to be synced with your account.</SubTitle>
      <IconContainer>
        <img src={personIcon} alt='icon' />
        <AddSign htmlFor="imageOnly"
        />
        <Input
          type="file"
          id="imageOnly"
          onChange={selectPhoto}
          accept="image/*"
        />
      </IconContainer>
    </div>
  );
};

export default AddSelfie;