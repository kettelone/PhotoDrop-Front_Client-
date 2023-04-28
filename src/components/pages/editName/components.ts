import React from 'react'
import styled from 'styled-components'

import Button from '../../common/button/Button'

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0px 15px;
	margin-top: 167px;
`
const Title = styled.div`
	font-family: 'Termina Test', sans-serif;
	font-weight: 700;
	font-size: 18px;
	color: #262626;
	margin-bottom: 20px;
`

const Input = styled.input`
	border-radius: 10px;
	background-color: #f4f4f4;
	height: 40px;
	border: 1px solid #eeeeee;
	width: 100%;
	max-width: 345px;
	padding: 15px 13px 14px 13px;
	margin-bottom: 21px;
`

const StyledButton = styled(Button)`
  margin:0px;
  width: 100%!important;
  max-width:345px;
`

export { Container, Title, Input, StyledButton }
