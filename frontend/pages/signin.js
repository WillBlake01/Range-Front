import styled from 'styled-components';
import Logo from '../components/Logo';
import SignIn from '../components/SignIn';
import Footer from '../components/Footer';

const StyledSignIn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('https://res.cloudinary.com/willblake01/image/upload/v1538509893/range-front/topography.png');
  padding: 120px;
  height: 1000px;
`;

const FooterPosition = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
`;

export default function SignInPage() {
  return (
    <>
      <StyledSignIn>
        <Logo />
        <SignIn /> 
      </StyledSignIn> 
      <FooterPosition>
        <Footer />
      </FooterPosition>
    </>
  );
}
