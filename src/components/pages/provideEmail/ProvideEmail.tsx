import React, { useState } from 'react';
import { ALBUMS_DASHBOARD_ROUTE } from '../../../utils/consts';
import { Container, TitleWrapper, Title, Input, StyledButton, Line } from './components'
import accountService from '../../../service/accountService';
import { useNavigate } from 'react-router-dom';
import hey from './hey.svg'


const ProvideEmail = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')


  const handleChange = (e: any) => {
    setEmail(e.target.value)
    console.log({email})
  }

  const saveEmail = async () => {
    if (email) {
      const response = await accountService.editEmail(email)
      if (response) {
        navigate(ALBUMS_DASHBOARD_ROUTE)
      }
    }
  }

  return (
    <div>
      <Container>
        <TitleWrapper>
        <Title>
          <Line>Hey there,</Line>
          <Line>Guest</Line>
          </Title>
          <img src={hey} alt="hey" />
        </TitleWrapper>
        <Input
          placeholder='What’s your email?'
          onChange={handleChange}
        />
        <StyledButton
          style={{ opacity: email.length >= 3 ? 1 : 0.5 }}
          disabled={email.length >= 3 ? false : true}
          onClick={saveEmail}
        >See your photos!</StyledButton>
      </Container>
    </div>
  );
};

export default ProvideEmail;
