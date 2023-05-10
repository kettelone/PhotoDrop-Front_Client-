import styled from 'styled-components'

const Wrapper = styled.div``

const Container = styled.div`
	margin-top: 72px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	@media only screen and (min-height: 740px) {
		margin-top: 171px;
	}
`

const Title = styled.div`
	display: flex;
	justify-content: center;
	font-family: 'Termina Test', sans-serif;
	text-align: center;
	font-weight: 700;
	color: #262626;
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
	cursor: pointer;
	@media only screen and (min-height: 740px) {
		&:hover {
			background-color: grey;
		}
	}

	&::before {
		display: flex;
		content: "+";
		font-size: 2.5em;
		color: white;
		justify-content: center;
	}
`

const Blur = styled.div`
	position: fixed;
	top: 0;
	height: 100%;
	width: 100%;
	background: rgba(
		white 0.9
	); // Make sure this color has an opacity of less than 1
	backdrop-filter: blur(5px); // This be the blur
	z-index: 2;
`
const Input = styled.input`display: none;`

export {
	Wrapper,
	Container,
	Title,
	SubTitle,
	IconContainer,
	AddSign,
	Input,
	Blur
}
