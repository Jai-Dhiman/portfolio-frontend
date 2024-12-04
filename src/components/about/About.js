import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { api } from "../../services/api";

const AboutSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

const ProfileContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ProfileImage = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProfileInfo = styled.div`
  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #333;
  }

  h2 {
    font-size: 1.5rem;
    color: #666;
    margin-bottom: 2rem;
  }
`;

const Summary = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  margin-bottom: 2rem;
`;

const ExperienceSection = styled.div`
  margin-top: 4rem;
`;

const ExperienceCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;

  h3 {
    font-size: 1.3rem;
    color: #333;
    margin-bottom: 0.5rem;
  }

  .period {
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin-bottom: 0.5rem;
    padding-left: 1.5rem;
    position: relative;

    &:before {
      content: "•";
      color: #0070f3;
      position: absolute;
      left: 0;
    }
  }
`;

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aboutResponse, experienceResponse] = await Promise.all([api.getAbout(), api.getExperience()]);

        setAboutData(aboutResponse.data);
        setExperience(experienceResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!aboutData) return <div>Failed to load profile</div>;

  return (
    <AboutSection>
      <ProfileContainer initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <ProfileImage>
          <img src="/profilepic.jpg" alt={aboutData.name} />
        </ProfileImage>

        <ProfileInfo>
          <h1>{aboutData.name}</h1>
          <h2>{aboutData.title}</h2>
          <Summary>{aboutData.summary}</Summary>
        </ProfileInfo>
      </ProfileContainer>

      <ExperienceSection>
        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          Experience and Education
        </motion.h2>

        {experience.map((exp, index) => (
          <ExperienceCard
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * (index + 1) }}
          >
            <h3>
              {exp.position} at {exp.company}
            </h3>
            <div className="period">{exp.period}</div>
            <ul>
              {exp.achievements.map((achievement, i) => (
                <li key={i}>{achievement}</li>
              ))}
            </ul>
          </ExperienceCard>
        ))}
      </ExperienceSection>
    </AboutSection>
  );
};

export default About;
