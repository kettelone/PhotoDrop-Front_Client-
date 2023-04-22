import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { Container, Img } from './components'
import Cropper from 'react-easy-crop'
import closeIcon from './closeIcon.svg'
import './index.css'

const Title = styled.div`
  color: white;
  position:absolute;
  margin-top: 1.5em;
  top: 0;
  right: 50%;
  transform: translate(50%);
  z-index:2;
  font-size:18px;
  font-weight:500;
`

const CloseButton = styled.button`
  position:absolute;
  top: 0;
  z-index:2;
  background:none;
  border:none;
  margin-top: 1.5em;
  margin-left: 1em;
`
const Instruction = styled.div`
  font-size:16px;
  position:absolute;
  z-index:2;
  color:white;
  right: 50%;
  transform: translate(50%);
  width: 100%;
  text-align: center;
  /* margin-top: 25%; */
  `

const ButtonsContainer = styled.div`
    display:flex;
    position:absolute;
    z-index:2;
    bottom:0;
    right: 50%;
    transform: translate(50%);
    margin-bottom: 2.5em;
    padding: 0em 1em;
    width: 100%;
    justify-content: space-between;
  `

  const RetakeButton = styled.button`
    background: none;
    color: white;
    border-radius: 50px;
    width: 10.5em;
    height: 3.15em;
    border: 1px solid white;
  `

const CropSelfie = (props: any) => {

  const [preview, setPreview] = useState<undefined | string>()
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  useEffect(() => {
    if (!props.selfie) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(props.selfie)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [props.selfie])

  const onCropComplete = () => {
    console.log('Crop complete')
  }

  const closeModal = () => {
    document.getElementById('initialSelfie')?.classList.remove('show')
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
        aspect={4 / 3}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
        showGrid={false}
        classes={
          {
          containerClassName: 'containerClassName',
          mediaClassName: 'mediaClassName',
          cropAreaClassName: 'cropAreaClassName'
          }
        }
      />
      <ButtonsContainer>
        <RetakeButton> Retake</RetakeButton >
        <RetakeButton> Retake</RetakeButton >
      </ButtonsContainer>
    </Container>
  );
};

export default CropSelfie;