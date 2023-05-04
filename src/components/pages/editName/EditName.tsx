import React, {useEffect, useState} from 'react';
import GoBack from '../../common/goBack/GoBack';
import { PROVIDE_EMAIL_ROUTE, PROFILE_ROUTE, DASHBOARD_ROUTE } from '../../../utils/consts';
import { Wrapper,Container, Title, Input, StyledButton } from './components'
import accountService from '../../../service/accountService';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import checkToken from '../../../utils/checkJWT';



const EditName = () => {
  useEffect(() => {
    const isLoggedIn = checkToken()
    if (isLoggedIn) {
      navigate(DASHBOARD_ROUTE)
    }
},[])
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e: any) => {
    setName(e.target.value)
  }

  const saveName = async () => {
    setIsLoading(true)
    if (name) {
      const response = await accountService.editName(name)
      if (response) {
        navigate(PROVIDE_EMAIL_ROUTE)
        setIsLoading(false)
      }
    }
  }

  return (
    <Wrapper>
      <GoBack route={ PROFILE_ROUTE} />
      <Container>
        <Title>Your name</Title>
        <Input
          placeholder='Your name'
          onChange={handleChange}
        />
        <StyledButton
          style={{ opacity: name.length > 1 ? 1 : 0.5 }}
          disabled={ name.length > 1 ? false : true }
          onClick={saveName}
        >
          {isLoading
            ? <FontAwesomeIcon icon={faSpinner} className="spinner" />
            :'Save'
          }
          </StyledButton>
      </Container>
    </Wrapper>
  );
};

export default EditName;