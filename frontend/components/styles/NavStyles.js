import styled from 'styled-components';

const NavStyles = styled.ul`
  height: 55px;
  width: 100%;
  background-color: var(--darkOrange);
  opacity: .9;
  margin: 0;
  padding: 5px 20px 5px 20px;
  display: flex;
  align-items: center;
  /* justify-self: end; */
  font-size: 1.6rem;
  a {
    margin-right: 5px;
    margin-left: 5px;
    color: var(--white);
  }
  a:hover {
    color: blue;
  }
`;

export default NavStyles;