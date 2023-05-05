import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Header,
  Wrapper,
  Options,
  Option,
  OptionContainer,
  Title,
  Img,
  Description,
  TextContainer,
  ArrowWrapper,
  ArrowContainer
} from './components'
import arrowRight from '../../../assets/arrowRight.svg'
import GoBack from '../../common/goBack/GoBack';
import mailIcon from './mailIcon.svg'
import phoneIcon from './phoneIcon.svg'


const AccountSettings = () => {
  const navigate = useNavigate()
  return (
    <div>
      <span onClick={() => navigate(-1)}>
        <GoBack />
      </span>
      <Wrapper>
        <div>
      <Header>Account settings</Header>
      <Options>
            <Option>
              <OptionContainer>
                <Img src={phoneIcon} alt="phoneIcon" />
                <TextContainer>
                  <Title>
                    Phone
                  </Title>
                  <Description>
                    Tell us your name to personalize communications.
                  </Description>
                </TextContainer>
              </OptionContainer>
          <ArrowWrapper
            onClick={() => navigate('/')}
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
                    Update your phone and email
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
        </div>
        </Wrapper>
    </div>
  );
};

export default AccountSettings;