import { motion } from "framer-motion";
import Hero from "./Hero";
import styled from "styled-components";

const HomeContainer = styled.div`
  width: 100%;
`;

const FeaturedSection = styled.section`
  padding: 4rem 2rem;
  background: white;
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 3rem;
  color: #333;
`;

const Home = () => {
  return (
    <HomeContainer>
      <Hero />
      <FeaturedSection>
        <SectionTitle initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          Featured Projects
        </SectionTitle>
        {/* You can add a ProjectList component here with a limit of 3 projects */}
      </FeaturedSection>
      {/* Add more sections as needed */}
    </HomeContainer>
  );
};

export default Home;
