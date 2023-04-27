import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { update } from '../../../app/selfieSlice/selfieSlice';
import styled from 'styled-components';
import pen from './pen.svg'
import { PROFILE_ROUTE } from '../../../utils/consts';
import CropSelfie from '../../modals/cropSelfie/CropSelfie';
import checkToken from '../../../utils/checkJWT';
import albumsService from '../../../service/albumService';
import { LOGIN_ROUTE } from '../../../utils/consts';
import Loader from '../../modals/loader/Loader';


const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 23em;
`
const Welcome = styled.div`
  font-weight:700;
  font-size:18px;
  font-family: 'Termina Test', sans-serif;
  text-align:center;
  margin-top: 22px;
  margin-bottom: 20px;
`

const YourSelfie= styled.div`
  font-weight:500;
  font-size:16px;
  margin: 0px 15px 15px;
` 

const SelfieContainer = styled.div`
  display:flex; 
  align-items: flex-end;
  padding:15px;
`

const Img = styled.img`
  width:100px;
  height:100px;
  border-radius:50%;
`

const Pen = styled.img`

`
const Blur = styled.div`
	position: fixed;
	top: 0;
	height: 100%;
	width: 100%;
	background: rgba(
		white 0.9
	); // Make sure this color has an opacity of less than 1
	backdrop-filter: blur(5px); // This be the blur
	z-index: 2;
`


const IconContainer = styled.label`
 border-radius:50%;
  background-color:#3300CC;
  border: 2px solid white;
  width: 36.5px;
  height:36.5px;
  margin-left: -20px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Input = styled.input`display: none;`

const Options = styled.div`
  
`
const Option = styled.div`
  border: 1px solid #CECCB5;
  border-radius: 10px;
  height:55px;
  padding:9px;
  font-size:14px;
  line-height:17.95px;
  margin-bottom:5px;
`
const Title = styled.div`
  font-weight:500;
  height:10px;
  margin-bottom:10px;
`

const Description = styled.div`
  height:11px;
`

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
          const { selfieUrl } = user
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
            <Title>
              Your name
            </Title>
            <Description>
              Tell us your name to personalize communications.
            </Description>
          </Option>
          <Option>
            <Title>
              Account settings
            </Title>
            <Description>
              Update your phone and email
            </Description>
          </Option>
          <Option>
            <Title>
              Notification settings
            </Title>
            <Description>
              How should we contact you?
            </Description>
          </Option>
        </Options>
      </Container>
    </Wrapper>
  );
};

export default Profile;