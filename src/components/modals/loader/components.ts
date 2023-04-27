import styled from 'styled-components'

const Wrapper = styled.div`
	position: fixed;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: 4;
`

const Container = styled.div`
	position: absolute;
	background-color: white;
	height: 100%;
	width: 100%;
	z-index: 3;
	opacity: 0.9;
`

const Img = styled.img`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	animation: fadeIn 1.25s linear infinite;

	@keyframes fadeIn {
		0% {
			scale: 1;
		}
		100% {
			scale: 0.6;
		}
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0.6;
		}
	}
`

const Text = styled.div`
	font-weight: 500;
	font-size: 18px;
	line-height: 23.08px;
	position: absolute;
	top: 60%;
	left: 50%;
	transform: translate(-50%, -60%);
`
export { Wrapper, Container, Img, Text }
