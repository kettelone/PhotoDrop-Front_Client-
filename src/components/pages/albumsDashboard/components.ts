import styled from 'styled-components'

const Container = styled.div``

const PhotoIcon = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	padding: 8px;
	cursor: pointer;
	@media only screen and (min-width: 450px) {
		padding-right: 33px;
	}
`
const Img = styled.img`
	width: 35px;
	height: 35px;
	border-radius: 50%;
`

const AlbumsContainer = styled.div``

const PhotosContainer = styled.div``
const Title = styled.div`
	font-size: 15px;
	font-weight: 500;
`

const AlbumsPreview = styled.div``

export {
	Container,
	PhotoIcon,
	Img,
	AlbumsContainer,
	PhotosContainer,
	Title,
	AlbumsPreview
}
