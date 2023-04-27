import React, { useState } from 'react';
import personIcon from './personIcon.svg'
import { Title, SubTitle, IconContainer, AddSign, Input } from './components'
import CropSelfie from '../../modals/cropSelfie/CropSelfie';
import { DASHBOARD_ROUTE } from '../../../utils/consts';

const AddSelfie = () => {
  const [selectedFile, setSelectedFile] = useState<null | File>(null)

  const selectPhoto = (event: any) => {
    if (event.target.files) { 
      document.getElementById('initialSelfie')?.classList.add('show')
      setSelectedFile(event.target.files[0])
    }
  }

  return (
    <div>
      <CropSelfie selfie={selectedFile} page={DASHBOARD_ROUTE} />
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