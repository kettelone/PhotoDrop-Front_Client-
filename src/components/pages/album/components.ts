import styled from 'styled-components'

const TopContainer = styled.div``
const Name = styled.div`
	font-family: 'Termina Test', sans-serif;
	font-weight: 700;
	font-size: 18px;
	line-height: 21.6px;
`
const Date = styled.div``
const Amount = styled.div``
const PhotosContainer = styled.div``

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

export { TopContainer, Name, Date, Amount, PhotosContainer, Photos, Photo }
