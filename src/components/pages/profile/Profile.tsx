import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { update } from '../../../app/selfieSlice/selfieSlice';
import pen from './pen.svg'
import { ACCOUNT_SETTINGS, DASHBOARD_ROUTE, EDIT_NAME_ROUTE, PROFILE_ROUTE } from '../../../utils/consts';
import CropSelfie from '../../modals/cropSelfie/CropSelfie';
import checkToken from '../../../utils/checkJWT';
import albumsService from '../../../service/albumService';
import { LOGIN_ROUTE } from '../../../utils/consts';
import Loader from '../../modals/loader/Loader';
import arrowRight from '../../../assets/arrowRight.svg'
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
  ArrowContainer,
  LoaderWrapper
 } from './components'

const Profile = () => {
  const [userName, setUserName] = useState('Guest')
  const [selectedFile, setSelectedFile] = useState<null | File>(null)
  const [selfie, setSelfie] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()


  useEffect(() => {
    setIsLoading(true)
    const loggedIn = checkToken()
    if (loggedIn) {
      const fetchData = async () => {
        const data = await albumsService.getAlbums()
        if (data) {
          const { user } = data.data
          localStorage.setItem('phone', user.phone)
          localStorage.setItem('email', user.email)
          const { selfieUrl, name } = user
          if (name ) {
            setUserName(name)
          } else {
            setUserName('Guest')

          }
          dispatch(update({ selfieUrl }))
          setSelfie(selfieUrl)
        }
        setIsLoading(false)
      }
      fetchData()

    } else {
      navigate(LOGIN_ROUTE);
    }
  }, [])

  const selectPhoto = (event: any) => {
    if (event.target.files) {
      document.getElementById('initialSelfie')?.classList.add('show')
      setSelectedFile(event.target.files[0])
    }
  }
  return (
    <Wrapper>
      {
        isLoading
          ? <LoaderWrapper><Loader /><Blur /></LoaderWrapper>
          : ''
      }
      <span onClick={()=>navigate(-1)}>
        <GoBack />
      </span>
      <Container>
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
              onClick={()=>navigate(EDIT_NAME_ROUTE)}
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
            <ArrowWrapper
              onClick={() => navigate(ACCOUNT_SETTINGS)}
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