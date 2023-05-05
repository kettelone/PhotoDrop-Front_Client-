import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ALBUMS_DASHBOARD_ROUTE } from '../../../utils/consts';

const Container =styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
`

const Message = styled.div`
font-size:14px;
cursor: pointer;
width:200px;
height:40px;
border-radius:15px;
text-align:center;
background-color:black;
color:white;
`

const PaymentFailed = () => {
  const navigate = useNavigate()
  const goToDashboard = () => {
    navigate(ALBUMS_DASHBOARD_ROUTE)
  }
  return (
    <Container>
      <Message
      onClick={goToDashboard}
      > Payment failed</Message>
    </Container>
  );
};

export default PaymentFailed;