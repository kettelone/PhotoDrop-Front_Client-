import styled from 'styled-components'

import Button from '../../common/button/Button'

const Img = styled.img`
	object-fit: contain;
	width: 100%;
	height: 100%;
	max-width: 100%;

	@media only screen and (max-width: 420px) {
		max-width: 100%;
		max-height: 70%;
		margin-top: -21px;
	}
`
const Wrapper = styled.div`
	display: none;
	background-color: #262626;
	width: 100%;
	height: 100%;
	position: fixed;
	z-index: 3;
	top: 0;
	@media only screen and (min-width: 800px) {
		background-color: rgba(0, 0, 0, 0.9);
	}
`
const SubWrapper = styled.div`
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100%;
	height: 100%;
`

const CloseButton = styled.button`
	cursor: pointer;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 3;
	background-color: rgba(0, 0, 0, 0);
	border: none;
	margin-top: 23px;
	margin-left: 40px;
	width: 27;
	height: 27px;
	@media only screen and (max-width: 400px) {
		margin-top: 22px;
		margin-left: 15px;
	}
`
const ContainerWrapper = styled.div`
	position: absolute;
	bottom: 36px;
	left: 15px;
	display: flex;
	@media only screen and (min-width: 480px) {
		left: 50%;
		transform: translate(-50%, 0%);
	}
`

const Container = styled.a`
	display: flex;
	flex-direction: column;
	align-items: center;
	cursor: pointer;
	margin-right: 29px;
`
const Icon = styled.img`margin-bottom: 4.33px;`
const Line = styled.div`
	width: 24px;
	height: 1.25px;
	background-color: white;
	margin-bottom: 5px;
`
const Text = styled.div`
	color: white;
	font-size: 14px;
	line-height: 17.95px;
`

const ButtonContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
`

const StyledButton = styled(Button)`
	font-weight:500;
	cursor:pointer;
	background-color:white;
	color:#262626;
	position:absolute;
	bottom:30px;
	@media only screen and (min-width: 376px) {
	max-width:200px;
	font-weight:500;
	font-size:22px;
	line-height:28.2px;
	margin:0;
}
`

export {
	Img,
	Wrapper,
	SubWrapper,
	CloseButton,
	ContainerWrapper,
	Container,
	Icon,
	Line,
	Text,
	ButtonContainer,
	StyledButton
}
