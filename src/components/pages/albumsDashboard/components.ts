import styled from 'styled-components'

const Container = styled.div`
	@media only screen and (min-width: 1200px) {
		display: flex;
		justify-content: center;
	}
`

const PhotoIcon = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	padding: 8px;
	cursor: pointer;
	@media only screen and (min-width: 450px) {
		padding-right: 33px;
	}
	@media only screen and (min-width: 740px) {
		padding: 12.5px 33px 12.5px 12.5px;
	}
`
const Img = styled.img`
	width: 35px;
	height: 35px;
	border-radius: 50%;
`

const AlbumsContainer = styled.div`
	padding-left: 15px;
	padding-top: 5px;
	margin-bottom: 10.5%;
	margin-top: 3.335%;
	@media only screen and (min-width: 1200px) {
		padding-left: 0px;
	}
`

const AlbumName = styled.div`
	text-align: center;
	color: white;
	font-weight: 450;
	font-size: 12px;
	line-height: 15.38px;
	margin: -40px 5px 0px;
	@media only screen and (min-width: 740px) {
		font-size: 14px;
		line-height: 17.95px;
	}
`
const TitlePhotos = styled.div`
	margin-left: 15px;
	font-size: 15px;
	font-weight: 500;
	margin-bottom: 15px;
	@media only screen and (min-width: 1200px) {
		margin-left: 0px;
		font-size: 16px;
	}
`

const Title = styled.div`
	font-size: 15px;
	font-weight: 500;
	margin-bottom: 15px;
	@media only screen and (min-width: 1200px) {
		font-size: 16px;
	}
`
const Albums = styled.div`display: flex;`
const Album = styled.div`margin-right: 5px;`

const AlbumCover = styled.img`
	max-width: 200px;
	max-height: 255px;
	aspect-ratio: 78.6/100;
	width: 95.75%;
	border-radius: 10px;
	object-fit: cover;
	cursor: pointer;
`

const Photo = styled.img`
	width: 100%;
	max-width: 400px;
	object-fit: cover;
	cursor: pointer;
`

const GridWrapper = styled.div`
	min-height: 80vh;
	@media only screen and (max-width: 450px) {
		min-height: 60vh;
	}
`

const GridContainer = styled.div`
	display: grid;
	grid-row-gap: 0px;
	justify-content: center;
	grid-template-columns: auto auto auto;
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
export {
	Container,
	PhotoIcon,
	Img,
	AlbumsContainer,
	Title,
	Albums,
	Album,
	AlbumCover,
	TitlePhotos,
	Photo,
	AlbumName,
	GridWrapper,
	GridContainer,
	Blur
}
