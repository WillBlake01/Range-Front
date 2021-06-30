import styled from 'styled-components';
import Logo from '../components/Logo';
import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';
import Footer from '../components/Footer';

const StyledReset = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('https://res.cloudinary.com/willblake01/image/upload/v1538509893/range-front/topography.png');
  padding: 120px;
`;

const FooterPosition = styled.footer`
    position: fixed;
    bottom: 0;
    width: 100%;
  `;

export default function ResetPage({ query }) {
  if (!query?.token) {
    return (
      <>
        <p>Sorry you must supply a token</p>
        <StyledReset>
          <Logo />
          <RequestReset />
        </StyledReset>
        <FooterPosition>
          <Footer />
        </FooterPosition>
      </>
    );
  }
  return (
    <>
      <p>RESET YOUR PASSWORD</p>
      <Reset token={query.token} />
    </>
  );
}
