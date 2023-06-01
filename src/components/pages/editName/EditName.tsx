import React, {useEffect, useState} from 'react';
import GoBack from '../../common/goBack/GoBack';
import { PROFILE_ROUTE, LOGIN_ROUTE } from '../../../utils/consts';
import { Wrapper,Container, Title, Input, StyledButton } from './components'
import accountService from '../../../service/accountService';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import checkToken from '../../../utils/checkJWT';
import { useAppDispatch } from '../../../app/hooks';
import { update } from '../../../app/userSlice/userSlice';


const EditName = () => {
  useEffect(() => {
    const isLoggedIn = checkToken()
    if (!isLoggedIn) {
      navigate(LOGIN_ROUTE)
    }
  }, [])
  const dispatch = useAppDispatch()
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e: any) => {
    setName(e.target.value)
  }

  const saveName = async () => {
    setIsLoading(true)
    if (name && !disabled) {
      setDisabled(true)
      const response = await accountService.editName(name)
      if (response) {
        dispatch(update({ name }))
        navigate(PROFILE_ROUTE)
        setIsLoading(false)
      }
    }
  }

  return (
    <Wrapper>
      <span onClick={() => navigate(-1)}>
        <GoBack />
      </span>
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