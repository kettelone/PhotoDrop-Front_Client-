import React, { useEffect } from 'react';
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
import { EDIT_EMAIL, EDIT_PHONE_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE } from '../../../utils/consts';
import { useAppSelector } from '../../../app/hooks';


const AccountSettings = () => {
  const navigate = useNavigate()
  const phone = useAppSelector(state => state.userUpdate.phone)
  const email = useAppSelector(state => state.userUpdate.email)

  useEffect(() => {
    const isLoggedIn = checkToken()
    if (!isLoggedIn) {
      navigate(LOGIN_ROUTE)
    }
  }, [])

  return (
    <div>
      <span onClick={() => navigate(PROFILE_ROUTE)}>
        <GoBack />
      </span>
      <Wrapper>
        <SubWrapper>
      <Header>Account settings</Header>
      <Options>
            <Option
              onClick={() => navigate(EDIT_PHONE_ROUTE)}
            >
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
          <ArrowWrapper>
            <ArrowContainer>
              <img src={arrowRight} alt="arrow-right" />
            </ArrowContainer>
          </ArrowWrapper>
        </Option>
            <Option
              onClick={() => navigate(EDIT_EMAIL)}
            >
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
              <ArrowWrapper>
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