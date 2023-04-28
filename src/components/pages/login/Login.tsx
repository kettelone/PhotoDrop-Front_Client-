import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
// import Header from '../../common/header/Header';
import stroke from '../../../assets/stroke.svg'
import CountrySelect from '../../modals/countrySelect/CountrySelect';
import { useAppSelector } from '../../../app/hooks'
import loginService from '../../../service/loginService';
import { CODE_CONFIRMATION_ROUTE } from '../../../utils/consts'
import { updateFullNumber } from '../../../app/countrySlice/countrySlice'
import { useAppDispatch } from '../../../app/hooks';
import {
  ConsentP2,
  ConsentP1,
  ConsentConatainer,
  ButtonContainer,
  NumberContainer,
  Numberinput,
  StrokeImg,
  FlagImg,
  StrokeContainer,
  CountryInput,
  InputContainer,
  InputLabel,
  Title,
  Body,
  Container,
  StyledButton
} from './components'


const Login = () => {

  const { country, dial_code } = useAppSelector(state => state.countryUpdate)
  const [digits, setDigits] = useState<string>('')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handlePhoneNumber = (event: ChangeEvent<HTMLInputElement>) => {
    const regex = /^[0-9\b]+$/;
    if (event.target.value === '' || regex.test(event.target.value)) {
        setDigits(event.target.value)
    }
  }

  const hanleCountry = () => {
    document.getElementById('countryModal')?.classList.add('show')
  }

  const handleCreate = async () => {
    if (dial_code && digits.length <= 10 && digits.length >=9) {
      const fullNumber = `${dial_code.substring(1)}${digits}`
      dispatch(updateFullNumber({ fullNumber }))
      navigate(CODE_CONFIRMATION_ROUTE)
      await loginService.requestOtp(fullNumber)
    }
  }

  return (
    <Container>
      <CountrySelect />
      {/* <Header/> */}
    <Body>
      <Title>Let`s get started</Title>
      <InputLabel>Enter your phone number</InputLabel>
        <InputContainer>
          <CountryInput
            onClick={hanleCountry}
          >
            <span>
              <FlagImg
                src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${country}.svg`}
              />
            </span>
            <StrokeContainer>
              <StrokeImg
                src={stroke}
              />
            </StrokeContainer>
          </CountryInput>
          <NumberContainer>
            <span>{dial_code}</span>
            <Numberinput
              placeholder='(555) 555-5555'
              maxLength={10}
              value={digits}
              onChange={handlePhoneNumber}
            />
          </NumberContainer>
        </InputContainer>
        <ButtonContainer>
          <StyledButton
          onClick={handleCreate}
          >Create Account</StyledButton>
        </ButtonContainer>
      <ConsentConatainer>
        <ConsentP1>
          By proceeding, you consent to get WhatsApp or SMS messages, from PhotoDrop and its affiliates to the number provided. Text “STOP” to 89203 to opt out.
        </ConsentP1>
        <ConsentP2>
          By continuing, you indicate that you have read and agree to our <u><a href="/">Terms of Use</a></u> & <u><a href="/">Privacy Policy</a></u>
        </ConsentP2>
      </ConsentConatainer>
      </Body>
    </Container>
  );
};

export default Login;