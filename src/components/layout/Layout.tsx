import React from 'react';
import Footer from '../common/Footer';
import Header from '../common/Header';
import styled from 'styled-components';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <LayoutStyle>
      <Header />
      <main>{children}</main>
      <Footer />
    </LayoutStyle>
  );
}

const LayoutStyle = styled.main`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.large};
  padding: 20px 0;

  @media screen AND (${({ theme }) => theme.mediaQuery.mobile}) {
    padding: 0 12px;
  }
`;

export default Layout;
