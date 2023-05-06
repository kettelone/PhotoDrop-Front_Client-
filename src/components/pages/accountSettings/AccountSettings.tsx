import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import checkToken from '../../../utils/checkJWT';
import {
  Header,
  Wrapper,
  SubWrapper,
  Options,
  Option,
  OptionContainer,
  Title,
  Img,
  Description,
  Green,
  TextContainer,
  ArrowWrapper,
  ArrowContainer
} from './components'
import arrowRight from '../../../assets/arrowRight.svg'
import GoBack from '../../common/goBack/GoBack';
import mailIcon from './mailIcon.svg'
import phoneIcon from './phoneIcon.svg'
import { DASHBOARD_ROUTE, EDIT_EMAIL, EDIT_PHONE_ROUTE, LOGIN_ROUTE } from '../../../utils/consts';


const AccountSettings = () => {
  useEffect(() => {
    const isLoggedIn = checkToken()
    if (!isLoggedIn) {
      navigate(LOGIN_ROUTE)
    }
  }, [])
  const [phone, setPhone] = useState(() => {
    const savedItem = localStorage.getItem("phoneNumber");
    return savedItem || "";
  });

  const [email, setEmail] = useState(() => {
    const savedItem = localStorage.getItem("email");
    return savedItem || "no email";
  });
  const navigate = useNavigate()
  return (
    <div>
      <span onClick={() => navigate(DASHBOARD_ROUTE)}>
        <GoBack />
      </span>
      <Wrapper>
        <SubWrapper>
      <Header>Account settings</Header>
      <Options>
            <Option>
              <OptionContainer>
                <Img src={phoneIcon} alt="phoneIcon" />
                <TextContainer>
                  <Title>
                    Phone • <Green>Verified</Green>
                  </Title>
                  <Description>
                    +{phone}
                  </Description>
                </TextContainer>
              </OptionContainer>
          <ArrowWrapper
            onClick={() => navigate(EDIT_PHONE_ROUTE)}
          >
            <ArrowContainer>
              <img src={arrowRight} alt="arrow-right" />
            </ArrowContainer>
          </ArrowWrapper>
        </Option>
        
            <Option>
              <OptionContainer>
                <Img src={mailIcon} alt="mailIcon" />
                <TextContainer>
                  <Title>
                    Email
                  </Title>
                  <Description>
                    {email}
                  </Description>
                </TextContainer>
              </OptionContainer>
              <ArrowWrapper
                onClick={() => navigate(EDIT_EMAIL)}
              >
            <ArrowContainer>
              <img src={arrowRight} alt="arrow-right" />
            </ArrowContainer>
          </ArrowWrapper>
        </Option>
          </Options>
        </SubWrapper>
        </Wrapper>
    </div>
  );
};

export default AccountSettings;