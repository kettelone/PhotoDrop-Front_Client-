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
export { Img, Wrapper, Container }
