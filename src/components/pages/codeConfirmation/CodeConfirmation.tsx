import React, {useState} from 'react';
import styled from 'styled-components';
import OtpInput from 'react-otp-input';
import Button from '../../common/button/Button';
import './index.css'
import loginService from '../../../service/loginService';
import { useAppSelector } from '../../../app/hooks';
import { Container, Title, SubTitle, Phone, ResendButton } from './components'


const CodeConfirmation = () => {
  const [otp, setOtp] = useState('');
  const [resendPressed, setResendPressed] = useState(false)
  const phoneNumber = useAppSelector(state => state.countryUpdate.fullNumber)

  const handleNext = async () => {
    // await loginService.login(phoneNumber,otp)
  }

  const handleReset = () => {
    setResendPressed(true)
  }


  const ButtonContainer = styled.div`
  display:flex;
  justify-content:center;
  /* padding: 1.25em 0.95em; */

`

  return (
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
  );
};

export default CodeConfirmation;