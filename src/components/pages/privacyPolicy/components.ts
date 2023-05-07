import styled from 'styled-components'
const Container = styled.div`
	padding: 20px 15px;
	display: flex;
	justify-content: center;
	width: 100%;
`
const SubContainer = styled.div`
	max-width: 700px;
	width: 100%;
`
const Title = styled.div`
	font-weight: 700;
	font-size: 18px;
	font-family: 'Termina Test', sans-serif;
	text-align: center;
	line-height: 21.6px;

	@media only screen and (min-width: 740px) {
		font-size: 22px;
	}
`
const P = styled.p`
	font-size: 14px;
	margin-bottom: 16px;
	margin-top: 5px;
	@media only screen and (min-width: 740px) {
		font-size: 18px;
	}
`
const SubTitle = styled.p`
	font-weight: 700;
	margin: 0px;
	@media only screen and (min-width: 740px) {
		font-size: 18px;
	}
`
export { Container, SubContainer, Title, SubTitle, P }
