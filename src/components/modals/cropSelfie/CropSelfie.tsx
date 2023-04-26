import React, {useEffect, useState} from 'react';
import {
  Container,
  Title,
  CloseButton,
  Instruction,
  ButtonsContainer,
  StyledButton,
  Span,
  Input } from './components'
import Cropper from 'react-easy-crop'
import closeIcon from './closeIcon.svg'
import './index.css'
import getCroppedImg from './saveCroppedImage';
import selfieService from '../../../service/selfieService';
import { uploadToS3 } from './uploadToS3'
import { useNavigate } from 'react-router-dom';
import { DASHBOARD_ROUTE } from '../../../utils/consts';


const CropSelfie = (props: { selfie: File |null }) => {

  const [preview, setPreview] = useState<undefined | string>()
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedImage, setCroppedImage] = useState<Blob | null>(null)
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
    // setPreview(undefined)
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
    const presignedPostUrl = await selfieService.signSelfie()
    try {
      if (croppedImage) {
         await uploadToS3(croppedImage, presignedPostUrl)
        closeModal()
        navigate(DASHBOARD_ROUTE)
      }
    } catch (e) {
      console.log(e)
    }
  }


  return (
    <Container id="initialSelfie">
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
        > Save</StyledButton >
      </ButtonsContainer>
    </Container>
  );
};

export default CropSelfie;