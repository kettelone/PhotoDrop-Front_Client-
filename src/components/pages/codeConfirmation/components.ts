import styled from 'styled-components'

const Container = styled.div`margin-top: 106px;`

const Title = styled.div`
	display: flex;
	justify-content: center;
	font-family: 'Termina Test', sans-serif;
	font-size: 22px;
	font-weight: 700;
	color: #262626;
`
const SubTitle = styled.div`
	padding: 14px 15px 4px;
	font-size: 16px;
`
const Phone = styled.span`font-weight: 500;`

const ResendButton = styled.button`
	border: none;
	background: none;
	color: #3300cc;
	font-size: 16px;
	padding: 4px 15px 0px;
`

const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
`

export { Container, Title, SubTitle, Phone, ResendButton, ButtonContainer }
