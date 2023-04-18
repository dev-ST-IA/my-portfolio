import React, { ReactNode, useContext } from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import { ContentfulContext } from "@/context/ContentfulContext";
import { Container, Main } from "../styles/styledComponents";
import Footer from "./Footer";

interface LayoutProps {
  title?: string,
  children : ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children, title = "My Portfolio Site" }) => {
    const context = useContext(ContentfulContext)
    const topics = context?.postTopics

    return (
      <Container>
        <Head>
          <title>{title}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <header>
          <Navbar topics={topics} />
        </header>
  
        <Main>{children}</Main>
  
        <Footer />
      </Container>
    );
};

export default Layout;
