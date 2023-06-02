import React, {useState} from 'react';
import OtpInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';

import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { setIsAuth, setIsFetching } from '../../../app/authSlice/authSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {update} from '../../../app/userSlice/userSlice'
import albumService from '../../../service/albumService';
import loginService from '../../../service/loginService';
import {
  MAIN_DASHBOARD_ROUTE,
  UPLOAD_SELFIE_ROUTE} from '../../../utils/consts';
import {
  ButtonContainer,
  Container,
  ErrorMessage,
  Phone,
  ResendButton,
  StyledButton,
  SubTitle,
  Title,
  Wrapper} from './components'

import './index.css'

const CodeConfirmation = () => {
  const dispatch = useAppDispatch()
  const [otp, setOtp] = useState('');
  const [resendPressed, setResendPressed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const navigate = useNavigate()
  const  phoneNumber = useAppSelector(state => state.countryUpdate.fullNumber)
  const handleNext = async () => {
    if (!phoneNumber) {
      return 
    }
    
    setIsLoading(true)
    const response = await loginService.login(phoneNumber, otp)
    if (response) {
        const fetchData = async () => {
          setTimeout(async () => {
            const data = await albumService.getAlbums()
            if (data) {
              const { user } = data.data
              const { selfieUrl } = user
              console.log(selfieUrl)
              dispatch(update({ selfieUrl }))
              dispatch(setIsAuth())
              if (!selfieUrl) {
                navigate(UPLOAD_SELFIE_ROUTE)
                setIsLoading(false)
              } else {
                navigate(MAIN_DASHBOARD_ROUTE)
                setIsLoading(false)
              }
              dispatch(setIsFetching())
            }
            document.body.classList.remove('no-scroll')
          }, 1000)
        }
        fetchData()
    } else {
      setIsError(true)
      setIsLoading(false)
      setTimeout(() => {
        setIsError(false)
      }, 4000)
      console.log(isError)
    }
  }

  const handleReset = async () => {
    if (!resendPressed && phoneNumber) {
      setOtp('')
      await loginService.requestOtp(phoneNumber)
    }
    setResendPressed(true)
  }

  return (
    <Wrapper>
    <Container>
      <Title>What`s the code?</Title>
      <SubTitle>Enter the code sent to <Phone>+{phoneNumber}</Phone></SubTitle>
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        renderInput={(props) => <input {...props} />}
        inputType={"tel"}
        inputStyle='inputStyle'
        containerStyle="containerStyle"
      />
      <div>
        <ResendButton
          onClick={handleReset}
          disabled={resendPressed}
          style={{ opacity: resendPressed  ? 0.5 : 1 }}

        >Resend code</ResendButton>
      </div>
      <ButtonContainer>
      <StyledButton 
            style={{
            opacity: otp.length === 6 ? 1 : 0.5, cursor: "pointer"}}
            disabled={otp.length === 6 ? false : true}
        onClick={handleNext}
          >{
              isLoading
                ? <FontAwesomeIcon icon={faSpinner} className="spinner" />
                :"Next"
            }
          </StyledButton>
        </ButtonContainer>
        {isError
          ? <ErrorMessage id="error-message">The code in not matching</ErrorMessage>
          :''
        }
      </Container>
    </Wrapper>
  );
};

export default CodeConfirmation;