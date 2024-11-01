import Hero from "./Hero";
import styled from "styled-components";

const HomeContainer = styled.div`
  width: 100%;
`;

const Home = () => {
  return (
    <HomeContainer>
      <Hero />
    </HomeContainer>
  );
};

export default Home;
