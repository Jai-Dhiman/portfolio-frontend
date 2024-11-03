import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  padding: 2rem;
  background: #f8f9fa;
  text-align: center;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>{new Date().getFullYear()} Jai Dhiman</p>
    </FooterContainer>
  );
};

export default Footer;
