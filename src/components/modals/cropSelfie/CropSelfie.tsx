import React, {useEffect, useState} from 'react';
import {
  Container,
  Wrapper,
  Title,
  CloseButton,
  Instruction,
  ButtonsContainer,
  StyledButton,
  Span,
  Input  
  } from './components'
import Cropper from 'react-easy-crop'
import closeIcon from './closeIcon.svg'
import './index.css'
import getCroppedImg from './saveCroppedImage';
import selfieService from '../../../service/selfieService';
import { uploadToS3 } from './uploadToS3'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'


const CropSelfie = (props: { selfie: File |null , page:string}) => {

  const [preview, setPreview] = useState<undefined | string>()
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedImage, setCroppedImage] = useState<Blob | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  let objectUrl = ''

  useEffect(() => {
    if (!props.selfie) {
      setPreview(undefined)
      return
    }

     objectUrl = URL.createObjectURL(props.selfie)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [props.selfie])


  const closeModal = () => {
    URL.revokeObjectURL(objectUrl)
    document.getElementById('initialSelfie')?.classList.remove('show')
    setPreview(undefined)
  }

  const handleRetake = (event: any) => {
    URL.revokeObjectURL(objectUrl)
    objectUrl = URL.createObjectURL(event.target.files[0])
    setPreview(objectUrl)
  }


  const onCropComplete = async (croppedArea: any, croppedAreaPixels: any) => {
    try {
      if (preview) {
        const croppedImage :any = await getCroppedImg(
          preview,
          croppedAreaPixels
        )
        setCroppedImage(croppedImage)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const saveSelfie = async () => {
    setIsLoading(true)
    const presignedPostUrl = await selfieService.signSelfie()
    try {
      if (croppedImage) {
        await uploadToS3(croppedImage, presignedPostUrl)
        navigate(props.page)
        setIsLoading(false)
        closeModal()
      }
    } catch (e) {
      console.log(e)
    }
  }


  return (
    <Container id="initialSelfie">
      <Wrapper id='wrapper'>
      <CloseButton
        onClick={closeModal}
      >
        <img src={closeIcon} alt="closeIcon" />
      </CloseButton>
      <Title>Take selfie</Title>
      <Instruction>Drag and zoom image to crop </Instruction>
        <Cropper
        image={preview}
        crop={crop}
        zoom={zoom}
        zoomWithScroll={true}
        aspect={4 / 3}
        maxZoom={7}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
        showGrid={false}
        cropShape={'round'}
        classes={
          {
          containerClassName: 'containerClassName',
          mediaClassName: 'mediaClassName',
          cropAreaClassName: 'cropAreaClassName'
          }
        }
          />
      <ButtonsContainer>
        <StyledButton
          color="white"
          backgroundColor="#262626"
          htmlFor='retakePhoto'
          // onClick={resetURL}
        > Retake</StyledButton >
        <Input
          type="file"
          id="retakePhoto"
          onChange={handleRetake}
          accept="image/*"
        />
        <Span></Span>
        <StyledButton
          color="none"
          backgroundColor="white"
          onClick={saveSelfie}
          >
            {isLoading
              ? <FontAwesomeIcon icon={faSpinner} className="spinner" />
              : 'Save'
            }
          </StyledButton >
        </ButtonsContainer>
      </Wrapper>
      </Container>

  );
};

export default CropSelfie;