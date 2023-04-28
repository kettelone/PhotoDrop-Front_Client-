import React, {useState} from 'react';
import GoBack from '../../common/goBack/GoBack';
import { PROVIDE_EMAIL_ROUTE, PROFILE_ROUTE } from '../../../utils/consts';
import { Container, Title, Input, StyledButton } from './components'
import accountService from '../../../service/accountService';
import { useNavigate } from 'react-router-dom';


const EditName = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const handleChange = (e: any) => {
    setName(e.target.value)
  }

  const saveName = async () => {
    if (name) {
      const response = await accountService.editName(name)
      if (response) {
        navigate(PROVIDE_EMAIL_ROUTE)
      }
    }
  }

  return (
    <div>
      <GoBack route={ PROFILE_ROUTE} />
      <Container>
        <Title>Your name</Title>
        <Input
          placeholder='Your name'
          onChange={handleChange}
        />
        <StyledButton
        onClick={saveName}
        >Save</StyledButton>
      </Container>
    </div>
  );
};

export default EditName;