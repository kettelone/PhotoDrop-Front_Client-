import styled from 'styled-components'
import Button from '../../common/button/Button'

const Container = styled.div``

const Body = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	flex-direction: column;
	align-items: center;
	@media only screen and (min-width: 740px) {
	}
`
const Title = styled.div`
	font-family: 'Termina Test', sans-serif;
	text-align: center;
	font-weight: 700;
	color: #262626;
	@media only screen and (min-width: 740px) {
		font-size: 30px;
	}
`
const InputLabel = styled.div`
	font-weight: 500;
	color: #262626;
	padding: 1em;
`
const InputContainer = styled.div`
	display: flex;
	max-width: 100vw;
	padding: 0px 15px;
	@media only screen and (min-width: 740px) {
		max-width: 420px;
	}
`
const CountryInput = styled.span`
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	width: 4.35em;
	height: 40px;
	background-color: #f4f4f4;
	border: 1px solid #eeeeee;
	border-radius: 10px;
`
const StrokeContainer = styled.span`display: flex;`

const FlagSpan = styled.span`display: flex;`

const FlagImg = styled.img`
	width: 2em;
	height: 2em;
`

const StrokeImg = styled.img``

const NumberContainer = styled.div`
	display: flex;
	align-items: center;
	width: 17.2em;
	height: 40px;
	padding: 15px 13px 14px 13px;
	background-color: #f4f4f4;
	border: 1px solid #eeeeee;
	margin-left: 10px;
	border-radius: 10px;
	font-size: 16px;
	@media only screen and (min-width: 740px) {
		width: 20em;
	}
`
const Numberinput = styled.input`
	border: none;
	background-color: #f4f4f4;

	&:focus {
		outline: none;
	}
`
const ButtonContainer = styled.div`
	max-width: 100vw;
	display: flex;
	@media only screen and (min-width: 740px) {
		max-width: 420px;
	}
`

const StyledButton = styled(Button)`
	@media only screen and (min-width: 740px) {
		width: 420px;
	}
`
const ConsentConatainer = styled.div`
	color: #6d6d6d;
	font-size: 14px;
	max-width: 600px;
`
const ConsentP1 = styled.div`margin: 0px 1.35em 2.7em 1.15em;`
const ConsentP2 = styled.div`margin: 0px 15px;`

export {
	ConsentP2,
	ConsentP1,
	ConsentConatainer,
	ButtonContainer,
	NumberContainer,
	Numberinput,
	StrokeImg,
	FlagSpan,
	FlagImg,
	StrokeContainer,
	CountryInput,
	InputContainer,
	InputLabel,
	Title,
	Body,
	Container,
	StyledButton
}
