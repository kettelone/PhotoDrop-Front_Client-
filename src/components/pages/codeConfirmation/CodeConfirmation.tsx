import React, {useState} from 'react';
import OtpInput from 'react-otp-input';
import Button from '../../common/button/Button';
import { useNavigate } from 'react-router-dom';
import './index.css'
import loginService from '../../../service/loginService';
import { useAppSelector } from '../../../app/hooks';
import { Container, Title, SubTitle, Phone, ResendButton, ButtonContainer, Wrapper } from './components'
import { UPLOAD_SELFIE_ROUTE } from '../../../utils/consts';



const CodeConfirmation = () => {
  const [otp, setOtp] = useState('');
  const [resendPressed, setResendPressed] = useState(false)
  const navigate = useNavigate()
  const phoneNumber = useAppSelector(state => state.countryUpdate.fullNumber)

  const handleNext = async () => {
    const response = await loginService.login(phoneNumber, otp)
    if (response) {
      navigate(UPLOAD_SELFIE_ROUTE)
    }
  }

  const handleReset = async () => {
    if (!resendPressed) {
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
        style={{ opacity: otp.length === 6 ? 1 : 0.5 }}
        disabled={otp.length === 6 ? false : true}
        onClick={handleNext}
        >Next</Button>
      </ButtonContainer>
      </Container>
    </Wrapper>
  );
};

export default CodeConfirmation;