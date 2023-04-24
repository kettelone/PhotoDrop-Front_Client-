import React, { useState,useEffect } from 'react';
import styled from 'styled-components';
import personIcon from './personIcon.svg'
import { Title, SubTitle, IconContainer, AddSign } from './components'
import CropSelfie from '../../modals/cropSelfie/CropSelfie';
import { useAppSelector } from '../../../app/hooks';

const Input = styled.input`
  display:none;
`

const AddSelfie = () => {
  const [selectedFile, setSelectedFile] = useState('')

  const selectPhoto = (event: any) => {
    if (event.target.files) { 
      document.getElementById('initialSelfie')?.classList.add('show')
      setSelectedFile(event.target.files[0])
    }
  }

  return (
    <div>
      <CropSelfie selfie={selectedFile}/>
      <Title> Add a selfie</Title>
      <SubTitle>A selfie allows your photos to be synced with your account.</SubTitle>
      <IconContainer>
        <img src={personIcon} alt='icon' />
        <AddSign htmlFor="imageOnly"/>
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