import styled from 'styled-components'

const Container = styled.div``

const Body = styled.div`
	margin-top: 136px;
	display: flex;
	flex-direction: column;
	align-items: center;
`
const Title = styled.div`
	font-family: 'Termina Test', sans-serif;
	text-align: center;
	font-weight: 700;
	color: #262626;
`
const InputLabel = styled.div`
	font-weight: 500;
	color: #262626;
	padding: 1em;
`
const InputContainer = styled.div`display: flex;`
const CountryInput = styled.span`
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	width: 70px;
	height: 40px;
	background-color: #f4f4f4;
	border: 1px solid #eeeeee;
	margin-left: 15px;
	border-radius: 10px;
`
const StrokeContainer = styled.span`display: flex;`
const FlagImg = styled.img`
	width: 28px;
	height: 28px;
`

const StrokeImg = styled.img``

const NumberContainer = styled.div`
	display: flex;
	align-items: center;
	width: 275px;
	height: 40px;
	padding: 15px 13px 14px 13px;
	background-color: #f4f4f4;
	border: 1px solid #eeeeee;
	margin-left: 10px;
	border-radius: 10px;
	font-size: 16px;
`
const Numberinput = styled.input`
	border: none;
	background-color: #f4f4f4;

	&:focus {
		outline: none;
	}
`
const CreateButton = styled.button`
	background-color: #3300cc;
	color: #ffffff;
	width: 345px;
	height: 50px;
	border: none;
	border-radius: 50px;
	margin: 20px 15px;
`
const ButtonContainer = styled.div``
const ConsentConatainer = styled.div`
	color: #6d6d6d;
	font-size: 14px;
`
const ConsentP1 = styled.div`margin: 0px 19px 38px 16px;`
const ConsentP2 = styled.div`margin: 0px 15px;`

export {
	ConsentP2,
	ConsentP1,
	ConsentConatainer,
	ButtonContainer,
	CreateButton,
	NumberContainer,
	Numberinput,
	StrokeImg,
	FlagImg,
	StrokeContainer,
	CountryInput,
	InputContainer,
	InputLabel,
	Title,
	Body,
	Container
}
