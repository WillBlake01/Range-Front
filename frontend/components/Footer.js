import Link from 'next/link';
import styled from 'styled-components';
import Social from './Social';

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 140px;
  background-color: var(--green);

  .github-link {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: var(--offWhite);
    height: max-content;
    > * {
        margin: 0 4px 0 4px; 
    }
}
`;

const SocialPosition = styled.div`
  
`;

const Footer = () => (
  <StyledFooter>
    <Link href='https://github.com/willblake01/range-front'>
      <a className='github-link' target='_blank' rel='noopener noreferrer'>
        <i className="fab fa-github-alt"></i>
        <p>Created By: Will Blake 2018 &copy;</p>
      </a>
    </Link>
    <SocialPosition>
      <Social />
    </SocialPosition>
  </StyledFooter>
)

export default Footer;
