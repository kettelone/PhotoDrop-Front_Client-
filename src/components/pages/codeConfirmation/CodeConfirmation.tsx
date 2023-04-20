import React, {useState} from 'react';
import styled from 'styled-components';
import OtpInput from 'react-otp-input';
import Button from '../../common/button/Button';
import './index.css'
import loginService from '../../../service/loginService';
import { useAppSelector } from '../../../app/hooks';

const Container = styled.div`
  margin-top:106px;
`

const Title = styled.div`
  display: flex;
  justify-content: center;
  font-family: 'Termina Test', sans-serif;
  font-size:22px;
  font-weight:700;
  color:#262626;
`
const SubTitle = styled.div`
  padding: 14px 15px 4px;
  font-size:16px;
`
const Phone = styled.span`
  font-weight:500;
`

const ResendButton = styled.button`
  border:none;
  background:none;
  color:#3300CC;
  font-size:16px;
  padding:4px 15px 0px;
`

const CodeConfirmation = () => {
  const [otp, setOtp] = useState('');
  const [resendPressed, setResendPressed] = useState(false)
  const phoneNumber = useAppSelector(state => state.countryUpdate.fullNumber)

  const handleNext = async () => {
    console.log('Next clicked')
    console.log(phoneNumber, otp)
    // await loginService.login(phoneNumber,otp)
  }

  const handleReset = () => {
    setResendPressed(true)
  }


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
      <Button 
        style={{ opacity: otp.length === 6 ? 1 : 0.5 }}
        disabled={otp.length === 6 ? false : true}
        onClick={handleNext}
      >Next</Button>
    </Container>
  );
};

export default CodeConfirmation;