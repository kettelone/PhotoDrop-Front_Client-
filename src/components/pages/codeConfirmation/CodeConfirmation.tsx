import React, {useEffect, useState} from 'react';
import OtpInput from 'react-otp-input';
import Button from '../../common/button/Button';
import { useNavigate } from 'react-router-dom';
import './index.css'
import loginService from '../../../service/loginService';
import { Container, Title, SubTitle, Phone, ResendButton, ButtonContainer, Wrapper, ErrorMessage } from './components'
import { ALBUMS_DASHBOARD_ROUTE, DASHBOARD_ROUTE, UPLOAD_SELFIE_ROUTE } from '../../../utils/consts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import checkToken from '../../../utils/checkJWT';
import albumService from '../../../service/albumService';


const CodeConfirmation = () => {

  useEffect(() => {
    const isLoggedIn = checkToken()
    if (isLoggedIn) {
      navigate(DASHBOARD_ROUTE)
    }
  }, [])
  
  const [otp, setOtp] = useState('');
  const [resendPressed, setResendPressed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const navigate = useNavigate()
  const  phoneNumber = localStorage.getItem('phoneNumber')
  const handleNext = async () => {
    if (!phoneNumber) {
      return 
    }
    setDisabled(true)
    setIsLoading(true)
    const response = await loginService.login(phoneNumber, otp)
    if (response) {
        const fetchData = async () => {
          setTimeout(async () => {
            const data = await albumService.getAlbums()
            if (data) {
              const { allPhotos, user } = data.data
              
              const { selfieUrl } = user
              if (!selfieUrl) {
                navigate(UPLOAD_SELFIE_ROUTE)
                setIsLoading(false)
              }else if (selfieUrl && allPhotos.length > 0) {
                navigate(ALBUMS_DASHBOARD_ROUTE)
                setIsLoading(false)
              } else if (selfieUrl) {
                navigate(DASHBOARD_ROUTE)
                setIsLoading(false)
              }
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
      setDisabled(true)
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
      <Button 
            style={{
            opacity: otp.length === 6 ? 1 : 0.5, cursor: "pointer"}}
            disabled={otp.length !== 6 || disabled ? true : false}
        onClick={handleNext}
          >{
              isLoading
                ? <FontAwesomeIcon icon={faSpinner} className="spinner" />
                :"Next"
            }
          </Button>
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