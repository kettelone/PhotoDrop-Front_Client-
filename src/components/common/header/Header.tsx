import React from 'react';
import styled from 'styled-components';
import photoDrop from '../../../assets/photoDrop.svg'

const StyledHeader = styled.header`
  display:flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #F1F0EC;
  border-bottom: 1px solid #F1F0EC;
  padding: 1.15em 0em;
`

const Header = () => {
  return (
    <StyledHeader>
      <img src={photoDrop} alt='photoDrop' />
    </StyledHeader>
  );
};

export default Header;