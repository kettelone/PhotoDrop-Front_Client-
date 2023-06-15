import React from 'react';

import styled from 'styled-components';

import arrowLeft from '../../../assets/arrowLeft.svg'

 const GoBackWrapper = styled.div`
    width: 50px;
    height: 55px;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: -10px;
`

const GoBack = () => {
  return (
      <div>
        <img src={arrowLeft} alt="arrow-let " />
      </div>
  );
};

export {GoBackWrapper,GoBack};