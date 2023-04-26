import styled from 'styled-components'

const Container = styled.div`display: none;`
const Img = styled.img`
	width: 100%;
	height: 100%;
`
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
`

const CloseButton = styled.button`
	position: absolute;
	top: 0;
	z-index: 2;
	background: none;
	border: none;
	margin-top: 1.5em;
	margin-left: 1em;
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
	padding-bottom: 42px;
`

const ButtonsContainer = styled.div`
	display: flex;
	position: absolute;
	bottom: 0;
	right: 50%;
	transform: translate(50%);
	margin-bottom: 2.5em;
	justify-content: space-between;
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
	Img,
	Title,
	CloseButton,
	Instruction,
	ButtonsContainer,
	StyledButton,
	Span,
	Input
}
