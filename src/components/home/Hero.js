import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { api } from "../../services/api";

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  padding: 2rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  overflow: hidden;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }
`;

const TextContent = styled.div`
  z-index: 1;
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #333;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.h2)`
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const TagLine = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;

  @media (max-width: 968px) {
    justify-content: center;
  }
`;

const Tag = styled(motion.span)`
  background: ${(props) => props.color || "#0070f3"};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.9rem;
  white-space: nowrap;
`;

const CTAButtons = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 968px) {
    justify-content: center;
  }
`;

const Button = styled(Link)`
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  &.primary {
    background: #0070f3;
    color: white;
  }

  &.secondary {
    background: transparent;
    border: 2px solid #0070f3;
    color: #0070f3;
  }
`;

const ImageContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 500px;

  @media (max-width: 968px) {
    height: 400px;
  }
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
`;

const BackgroundShapes = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
`;

const Shape = styled(motion.div)`
  position: absolute;
  background: ${(props) => props.color};
  border-radius: 50%;
  opacity: 0.1;
`;

const Hero = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.getAbout();
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const shapes = [
    { size: "300px", top: "10%", left: "5%", color: "#0070f3" },
    { size: "200px", bottom: "20%", right: "10%", color: "#ff0080" },
    { size: "150px", top: "50%", left: "50%", color: "#7928ca" },
  ];

  return (
    <HeroSection>
      <BackgroundShapes>
        {shapes.map((shape, index) => (
          <Shape
            key={index}
            color={shape.color}
            style={{
              width: shape.size,
              height: shape.size,
              top: shape.top,
              left: shape.left,
              right: shape.right,
              bottom: shape.bottom,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, delay: index * 0.2 }}
          />
        ))}
      </BackgroundShapes>

      <HeroContent>
        <TextContent>
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <Title variants={itemVariants}>{profile?.name || "Jai Dhiman"}</Title>
            <Subtitle variants={itemVariants}>{profile?.title || "Full-Stack Web Developer"}</Subtitle>

            <TagLine>
              {profile?.key_skills?.slice(0, 3).map((skill, index) => (
                <Tag
                  key={index}
                  color={index === 0 ? "#0070f3" : index === 1 ? "#7928ca" : "#ff0080"}
                  variants={itemVariants}
                >
                  {skill}
                </Tag>
              ))}
            </TagLine>

            <motion.p variants={itemVariants}>
              {profile?.summary || "Crafting efficient, user-centric web solutions"}
            </motion.p>

            <CTAButtons variants={itemVariants}>
              <Button to="/projects" className="primary">
                View Projects
              </Button>
              <Button to="/contact" className="secondary">
                Get in Touch
              </Button>
            </CTAButtons>
          </motion.div>
        </TextContent>

        <ImageContainer
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <HeroImage src="/your-profile-image.jpg" alt="Jai Dhiman" loading="eager" />
        </ImageContainer>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;
