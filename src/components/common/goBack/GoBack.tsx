import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import arrowLeft from './arrowLeft.svg'

const Container = styled.div`
	position: absolute;
	top: 19px;
	left: 15px;
`

const GoBack = ({route}:{route:string}) => {
  return (
    <Link to={route}>
      <Container>
        <img src={arrowLeft} alt="arrow-let " />
      </Container>
    </Link>
  );
};

export default GoBack;