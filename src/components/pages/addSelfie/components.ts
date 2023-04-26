import styled from 'styled-components'

const Title = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 4.5em;
	font-family: 'Termina Test', sans-serif;
	text-align: center;
	font-weight: 700;
	color: #262626;

	@media only screen and (min-height: 570px) {
		width: 6em;
	}
`

const SubTitle = styled.div`
	text-align: center;
	font-size: 18px;
	margin: 0.775em 0.85em;
`

const IconContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: flex-end;
	margin-top: 2em;
`

const AddSign = styled.label`
	background-color: #3300cc;
	width: 42px;
	height: 42px;
	border-radius: 50%;
	margin-left: -3em;

	&::before {
		display: flex;
		content: "+";
		font-size: 2.5em;
		color: white;
		justify-content: center;
	}
`
const Input = styled.input`display: none;`

export { Title, SubTitle, IconContainer, AddSign, Input }
