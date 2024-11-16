// import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { BASE_URL } from "../../services/api";

const Card = styled(motion.div)`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s ease;
`;

const ProjectImage = styled.div`
  width: 100%;
  position: relative;
  padding-top: 56.25%;
  background-color: black;
  background-image: url(${(props) => {
    const staticUrl = BASE_URL.replace("/api", "");
    return `${staticUrl}${props.imageUrl}`;
  }});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const ProjectDescription = styled.p`
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const TechTag = styled.span`
  background: #f0f0f0;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.875rem;
  color: #555;
`;

const Links = styled.div`
  display: flex;
  gap: 1rem;
`;

const LinkButton = styled.a`
  padding: 0.5rem 1rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;

  &.github {
    background: #24292e;
    color: white;

    &:hover {
      background: #1a1e22;
    }
  }

  &.live {
    background: #0070f3;
    color: white;

    &:hover {
      background: #0051af;
    }
  }
`;

const ProjectCard = ({ project, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
  };

  return (
    <Card variants={cardVariants} initial="hidden" animate="visible" whileHover={{ y: -5 }}>
      <ProjectImage imageUrl={project.image_url} />
      <ProjectContent>
        <ProjectTitle>{project.title}</ProjectTitle>
        <ProjectDescription>{project.description}</ProjectDescription>
        <TechStack>
          {project.technologies.map((tech, index) => (
            <TechTag key={index}>{tech}</TechTag>
          ))}
        </TechStack>
        <Links>
          {project.frontend_github_link && (
            <LinkButton
              href={project.frontend_github_link}
              target="_blank"
              rel="noopener noreferrer"
              className="github"
            >
              Frontend
            </LinkButton>
          )}
          {project.backend_github_link && (
            <LinkButton href={project.backend_github_link} target="_blank" rel="noopener noreferrer" className="github">
              Backend
            </LinkButton>
          )}
          {project.live_link && (
            <LinkButton href={project.live_link} target="_blank" rel="noopener noreferrer" className="live">
              Link
            </LinkButton>
          )}
        </Links>
      </ProjectContent>
    </Card>
  );
};

export default ProjectCard;
