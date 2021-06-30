import styled from 'styled-components';
import Logo from '../components/Logo';
import SignUp from '../components/SignUp';
import Footer from '../components/Footer';

const StyledSignUp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('https://res.cloudinary.com/willblake01/image/upload/v1538509893/range-front/topography.png');
  padding: 120px;
  height: 100%;
`;

const FooterPosition = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
`;

export default function SignInPage() {
  return (
    <>
      <StyledSignUp>
        <Logo />
        <SignUp />
      </StyledSignUp>
      <FooterPosition>
        <Footer />
      </FooterPosition>
    </>
  );
}
