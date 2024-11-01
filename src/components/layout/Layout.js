import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MainContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Content = styled.main`
  flex: 1;
  padding: 2rem;
`;

const Layout = ({ children }) => (
  <MainContainer>
    <Navbar />
    <Content>{children}</Content>
    <Footer />
  </MainContainer>
);

export default Layout;
