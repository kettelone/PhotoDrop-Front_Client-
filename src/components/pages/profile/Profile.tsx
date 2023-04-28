import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { update } from '../../../app/selfieSlice/selfieSlice';
import pen from './pen.svg'
import { DASHBOARD_ROUTE, EDIT_NAME_ROUTE, PROFILE_ROUTE } from '../../../utils/consts';
import CropSelfie from '../../modals/cropSelfie/CropSelfie';
import checkToken from '../../../utils/checkJWT';
import albumsService from '../../../service/albumService';
import { LOGIN_ROUTE } from '../../../utils/consts';
import Loader from '../../modals/loader/Loader';
import arrowRight from './arrowRight.svg'
import GoBack from '../../common/goBack/GoBack';
import {
  Wrapper,
  Container,
  Welcome,
  YourSelfie,
  SelfieContainer,
  Img,
  Pen,
  Blur,
  IconContainer,
  Input,
  Options,
  Option,
  Title,
  Description,
  ArrowWrapper,
  ArrowContainer
 } from './components'

const Profile = () => {
  const [userName, setUserName] = useState('Guest')
  const [selectedFile, setSelectedFile] = useState<null | File>(null)
  const [selfie, setSelfie] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    // setIsLoading(true)
    // const loggedIn = checkToken()
    // if (loggedIn) {
    //   const fetchData = async () => {
    //     const data = await albumsService.getAlbums()
    //     if (data) {
    //       const { user } = data.data
    //       const { selfieUrl } = user
    //       dispatch(update({ selfieUrl }))
    //       setSelfie(selfieUrl)
    //     }
    //     setIsLoading(false)
    //   }
    //   fetchData()

    // } else {
    //   navigate(LOGIN_ROUTE);
    // }
  }, [])

  const selectPhoto = (event: any) => {
    if (event.target.files) {
      document.getElementById('initialSelfie')?.classList.add('show')
      setSelectedFile(event.target.files[0])
    }
  }

  const goToEditName = () => {
    navigate(EDIT_NAME_ROUTE)
  }

  return (
    <Wrapper>
      <GoBack route={ DASHBOARD_ROUTE} />
      <Container>
      {
        isLoading
          ? <div><Loader /><Blur /></div>
          : ''
      }
      <CropSelfie selfie={selectedFile} page={PROFILE_ROUTE} />
      <Welcome>Welcome, {userName}.</Welcome>
      <YourSelfie>Your selfie</YourSelfie>
      <SelfieContainer>
        <Img src={selfie} alt="selfie" />
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
          <Option>
            <div>
              <Title>
                Your name
              </Title>
              <Description>
                Tell us your name to personalize communications.
              </Description>
            </div>
            <ArrowWrapper
              onClick={goToEditName}
            >
              <ArrowContainer>
                <img src={arrowRight} alt="arrow-right" />
              </ArrowContainer>
              </ArrowWrapper>
          </Option>
          <Option>
            <div>
            <Title>
              Account settings
            </Title>
            <Description>
              Update your phone and email
              </Description>
            </div>
            <ArrowWrapper>
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