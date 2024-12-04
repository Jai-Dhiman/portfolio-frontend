import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { api } from "../../services/api";

const SkillsSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const SkillCategory = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h3 {
    font-size: 1.3rem;
    color: #333;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #0070f3;
  }
`;

const SkillTag = styled(motion.span)`
  display: inline-block;
  background: #f0f0f0;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  margin: 0.5rem;
  font-size: 0.9rem;
  color: #555;
  transition: all 0.2s ease;

  &:hover {
    background: #0070f3;
    color: white;
    transform: translateY(-2px);
  }
`;

const CertificationCard = styled(motion.div)`
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  border-left: 4px solid #0070f3;
`;

const Skills = () => {
  const [skills, setSkills] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await api.getSkills();
        setSkills(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching skills:", error);
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!skills) return <div>Failed to load skills</div>;

  const skillCategories = {
    Frontend: skills.technical.languages_frameworks,
    Backend: skills.technical.data,
    "Tools & Infrastructure": skills.technical.tools,
  };

  return (
    <SkillsSection>
      <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        Technical Skills
      </motion.h2>

      <SkillsGrid>
        {Object.entries(skillCategories).map(([category, skillList], index) => (
          <SkillCategory
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <h3>{category}</h3>
            {skillList.map((skill, i) => (
              <SkillTag key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 * i }}>
                {skill}
              </SkillTag>
            ))}
          </SkillCategory>
        ))}
      </SkillsGrid>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        <h2>Certifications</h2>
        {skills.certifications.map((cert, index) => (
          <CertificationCard
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 * index }}
          >
            {cert}
          </CertificationCard>
        ))}
      </motion.div>
    </SkillsSection>
  );
};

export default Skills;
