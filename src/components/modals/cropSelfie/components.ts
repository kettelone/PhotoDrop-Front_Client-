import styled from 'styled-components'

const Container = styled.div`display: none;`

const Wrapper = styled.div``
const Img = styled.img`
	width: 100%;
	height: 100%;
`

const TopContainer = styled.div``
const Title = styled.div`
	color: white;
	position: absolute;
	margin-top: 1.5em;
	top: 0;
	right: 50%;
	transform: translate(50%);
	z-index: 2;
	font-size: 18px;
	font-weight: 500;
	@media only screen and (min-height: 600px) {
		top: 22.5%;
	}
`

const CloseButton = styled.button`
	position: absolute;
	top: 0;
	z-index: 2;
	background: none;
	border: none;
	margin-top: 1.5em;
	margin-left: 1em;
	cursor: pointer;

	@media only screen and (min-height: 900px) {
		top: 22.5%;
		left: 40%;
	}
`
const Instruction = styled.div`
	font-size: 16px;
	position: absolute;
	z-index: 2;
	color: white;
	right: 50%;
	transform: translate(50%);
	width: 100%;
	text-align: center;
	@media only screen and (max-height: 570px) {
		top: 6em;
	}
	@media only screen and (max-height: 490px) {
		top: 5em;
	}
	@media only screen and (min-height: 900px) {
		top: 34%;
	}
`

const ButtonsContainer = styled.div`
	display: flex;
	position: absolute;
	bottom: 0%;
	right: 50%;
	transform: translate(50%);
	margin-bottom: 2.5em;
	justify-content: space-between;
	@media only screen and (min-height: 900px) {
		bottom: 20%;
	}
`

const StyledButton =
	styled.label <
	{ color: string, backgroundColor: string } >
	`
    display:flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.backgroundColor || 'none'};
    color: ${(props) => props.color || 'white'};
    border-radius: 50px;
    max-width: 169.64px;
    width:9.5em;
    max-height: 50px;
    height: 3.5em;
    border: 1px solid white;
    font-weight: 500;
    font-size: 18px;
		cursor:pointer;
   @media only screen and (max-width: 355px) {
      width:8.5em;
   }
  `

const Span = styled.span`
	max-width: 9.7px;
	width: 0.75em;
`
const Input = styled.input`display: none;`
export {
	Container,
	Wrapper,
	Img,
	Title,
	TopContainer,
	CloseButton,
	Instruction,
	ButtonsContainer,
	StyledButton,
	Span,
	Input
}
