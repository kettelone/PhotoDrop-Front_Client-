import styled from 'styled-components'

const Img = styled.img`
	object-fit: contain;
	width: 100%;
	height: 100%;
	width: 600px;
`
const Wrapper = styled.div`
	display: none;
	background-color: rgba(0, 0, 0, 0.9);
	width: 100%;
	height: 100%;
	position: fixed;
`
const Container = styled.div`
	overflow: hidden;
	position: fixed;
	display: flex;
	justify-content: center;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100%;
`

const CloseButton = styled.button`
	cursor: pointer;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 3;
	background-color: rgba(0, 0, 0, 0);
	border: none;
	margin-top: 1.5em;
	margin-left: 1em;
	width: 27;
	height: 27px;
`
export { Img, Wrapper, Container, CloseButton }
