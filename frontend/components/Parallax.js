import styled from 'styled-components';

const ParallaxStyle = styled.div`
  width: 100%;
  height: 680px;
  background-image: url('https://res.cloudinary.com/willblake01/image/upload/v1538509888/range-front/rock_climber.jpg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
`;

const Parallax = () => (
  <ParallaxStyle />
)

export default Parallax;
