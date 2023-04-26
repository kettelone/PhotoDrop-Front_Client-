import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import albumsService from '../../../service/albumService'
import checkToken from '../../../utils/checkJWT';
import { LOGIN_ROUTE } from '../../../utils/consts';
import { update } from '../../../app/selfieSlice/selfieSlice';
import { updateAlbum } from '../../../app/albumsSlice/albumsSlice';
import { updatePhoto } from '../../../app/photosSlice/photosSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  Container,
  PhotoIcon,
  Img,
  Wrapper,
  GraphicsContainer,
  Graphics,
  Title,
  SubTitle,
  Separator,
  BrowseTitle,
  PreviewContainer,
  PreviewImg,
  VerticalSeparator,Blur
} from './components'
import Footer from '../../common/footer/Footer';
import Loader from '../../modals/loader/Loader';
import graphics from './combo.png'
import test1 from './test1.jpg'
import test2 from './test2.jpg'
import test3 from './test3.jpg'


const Dashboard = () => {
  const navigate = useNavigate()
  const[isLoading, setIsLoading] = useState(false)
  const dispatch = useAppDispatch()
  const [selfie, setSelfie] = useState<string | undefined>()

  useEffect(() => {
    setIsLoading(true)
    const loggedIn = checkToken()
    if (loggedIn) {
      const fetchData = async () => {
        const data = await albumsService.getAlbums()
        if (data) {
          const { albums, allPhotos, user } = data.data
          const { selfieUrl } = user
          dispatch(update({ selfieUrl }))
          dispatch(updateAlbum({albums}))
          dispatch(updatePhoto({ allPhotos }))
          setSelfie(selfieUrl)
        }
        setIsLoading(false)
      }
      fetchData()

    } else {
      navigate(LOGIN_ROUTE);
    }
  }, [selfie])
  

  return (
    <div>
      {
        isLoading
        ? <div><Loader /><Blur /></div>
        : ''
      }
      <Container>
            <PhotoIcon>
              <Img src={selfie} alt="selfie" />
            </PhotoIcon>
            <Wrapper>
              <GraphicsContainer>
                <Graphics src={graphics} alt="graphics
              " />
              </GraphicsContainer>
              <Title>
                Your photos will drop soon.
              </Title>
              <SubTitle>
                You will get a text message when they are ready. It can take up to 48 hours.
              </SubTitle>
          <Separator />
              <BrowseTitle>Browse Art Prints  </BrowseTitle>
              <PreviewContainer>
                <PreviewImg src={test1} alt="test" />
                <VerticalSeparator />
                <PreviewImg src={test2} alt="test" />
                <VerticalSeparator></VerticalSeparator>
                <PreviewImg src={test3} alt="test" />
              </PreviewContainer>
        </Wrapper>
        <Footer />
          </Container>
  </div> 
  );
};

export default Dashboard;