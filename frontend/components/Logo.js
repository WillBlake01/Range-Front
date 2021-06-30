import styled from 'styled-components';
import Link from 'next/link';

const StyledLogo = styled.h3`
  font-size: 4rem;
  position: absolute;
  top: 1.5rem;
  left: 3rem;
  margin: 0;
  z-index: 2;
  transform: skew(-7deg);
  text-decoration: none;
  a {
    padding: 0.5rem 1rem;
    background: var(--green);
    color: white;
    text-transform: uppercase;
    text-decoration: none;
  }
  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`;

const Logo = () => (
  <StyledLogo>
    <Link href='/'>
      <a>Range Front</a>
    </Link>
  </StyledLogo>
)

export default Logo;
