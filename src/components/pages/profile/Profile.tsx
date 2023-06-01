import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector} from '../../../app/hooks';
import pen from './pen.svg'
import {
  LOGIN_ROUTE,
  ACCOUNT_SETTINGS,
  // ALBUMS_DASHBOARD_ROUTE,
  // DASHBOARD_ROUTE,
  EDIT_NAME_ROUTE,
  PROFILE_ROUTE,
  MAIN_DASHBOARD_ROUTE
} from '../../../utils/consts';
import CropSelfie from '../../modals/cropSelfie/CropSelfie';
import checkToken from '../../../utils/checkJWT';
import arrowRight from '../../../assets/arrowRight.svg'
import GoBack from '../../common/goBack/GoBack';
import defaultImage from '../../../assets/defaultImage.svg';
import {
  Wrapper,
  Container,
  Welcome,
  YourSelfie,
  SelfieContainer,
  Img,
  Pen,
  IconContainer,
  Input,
  Options,
  Option,
  Title,
  Description,
  ArrowWrapper,
  ArrowContainer,
 } from './components'

const Profile = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const loggedIn = checkToken()
    if (!loggedIn) {
      navigate(LOGIN_ROUTE);
    }
  }, [])

  const userName = useAppSelector(state => state.userUpdate.name)
  const selfie = useAppSelector(state => state.userUpdate.selfieUrl)

  const [selectedFile, setSelectedFile] = useState<null | File>(null)
  const [albumsExist, setAlbumExist] = useState(() => {
    const value = localStorage.getItem('albumsExist')
    return value || ''
  })
  // once selfie updated change state for the page to reload after timeOut
  
  const selectPhoto = (event: any) => {
    if (event.target.files) {
      document.getElementById('initialSelfie')?.classList.add('show')
      document.getElementById('background')?.classList.add('show')
      setSelectedFile(event.target.files[0])
    }
  }

  const goBack = () => {
      // navigate(albumsExist ? ALBUMS_DASHBOARD_ROUTE : DASHBOARD_ROUTE)
     navigate(MAIN_DASHBOARD_ROUTE)
  }
  return (
    <Wrapper>
      <span onClick={goBack}>
        <GoBack />
      </span>
      <Container>
      <CropSelfie selfie={selectedFile} page={PROFILE_ROUTE} />
      <Welcome>Welcome, {userName || "Guest"}.</Welcome>
      <YourSelfie>Your selfie</YourSelfie>
      <SelfieContainer>
        <Img src={selfie || defaultImage} alt="selfie" />
        <IconContainer htmlFor='imageOnly'>
          <Pen src={pen} alt="pen" />
          <Input
            type="file"
            id="imageOnly"
            onChange={selectPhoto}
            accept="image/*"
          />
        </IconContainer>
        </SelfieContainer>
        <Options>
          <Option
            onClick={() => navigate(EDIT_NAME_ROUTE)}
          >
            <div>
              <Title>
                Your name
              </Title>
              <Description>
                Tell us your name to personalize communications.
              </Description>
            </div>
            <ArrowWrapper
            >
              <ArrowContainer>
                <img src={arrowRight} alt="arrow-right" />
              </ArrowContainer>
              </ArrowWrapper>
          </Option>
          <Option
            onClick={() => navigate(ACCOUNT_SETTINGS)}
          >
            <div>
            <Title>
              Account settings
            </Title>
            <Description>
              Update your phone and email
              </Description>
            </div>
            <ArrowWrapper
            >
              <ArrowContainer>
                <img src={arrowRight} alt="arrow-right" />
              </ArrowContainer>
            </ArrowWrapper>
          </Option>
          <Option>
          <div>
            <Title>
              Notification settings
            </Title>
            <Description>
              How should we contact you?
          </Description>
            </div>
            <ArrowWrapper>
              <ArrowContainer>
                <img src={arrowRight} alt="arrow-right" />
              </ArrowContainer>
            </ArrowWrapper>
          </Option>
        </Options>
      </Container>
    </Wrapper>
  );
};

export default Profile;