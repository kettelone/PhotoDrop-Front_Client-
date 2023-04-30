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

const PhotosContainer = styled.div``

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
	border-radius: 10px;
	object-fit: cover;
	cursor: pointer;
	max-width: 200px;
	max-height: 255px;
	width: 95.5%;
	height: 122.55%;
`
const Photos = styled.div`
	display: flex;
	justify-content: center;
`

const Photo = styled.img`
	width: 33.33%;
	max-width: 400px;
	object-fit: cover;
	cursor: pointer;
`
export {
	Container,
	PhotoIcon,
	Img,
	AlbumsContainer,
	PhotosContainer,
	Title,
	Albums,
	Album,
	AlbumCover,
	TitlePhotos,
	Photos,
	Photo,
	AlbumName
}
