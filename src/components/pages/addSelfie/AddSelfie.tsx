import React, { useEffect, useState } from 'react';
import personIcon from './personIcon.svg'
import { Wrapper,Container,Title, SubTitle, IconContainer, AddSign, Input } from './components'
import CropSelfie from '../../modals/cropSelfie/CropSelfie';
import { DASHBOARD_ROUTE } from '../../../utils/consts';
import checkToken from '../../../utils/checkJWT';
import { useNavigate } from 'react-router-dom';

const AddSelfie = () => {
const navigate = useNavigate()
  useEffect(() => {
    const isLoggedIn = checkToken()
    if (isLoggedIn) {
      navigate(DASHBOARD_ROUTE)
    }
  }, [])
  const [selectedFile, setSelectedFile] = useState<null | File>(null)

  const selectPhoto = (event: any) => {
    if (event.target.files) { 
      document.getElementById('initialSelfie')?.classList.add('show')
      setSelectedFile(event.target.files[0])
    }
  }

  return (
    <Wrapper>
      <CropSelfie selfie={selectedFile} page={DASHBOARD_ROUTE} />
      <Container>
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
      </Container>
    </Wrapper>
  );
};

export default AddSelfie;