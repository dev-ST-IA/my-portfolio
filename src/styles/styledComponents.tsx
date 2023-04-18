import styled from 'styled-components'
import { MyTheme } from './theme';

interface ContainerProps {
  theme?: MyTheme;
}

export const Container = styled.div<ContainerProps>`
  background-color: ${({ theme }) => theme.colors.background };
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.body };
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const Main = styled.main`
  background-color: ${({theme}) => theme.colors.background };
  flex: 1;
  padding: 2rem;
`;

export const Nav = styled.nav`
  background-color: ${props=> props.theme.colors.background};
  color: ${props=> props.theme.colors.text};
  font-family: ${props=> props.theme.fonts.body};
  padding: 1rem;
`;

export const NavList = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

interface NavItemProps {
  theme: MyTheme;
  isActive: boolean;
}

export const NavItem = styled.li<NavItemProps>`
  margin-right: 20px;
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.secondary : theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.heading};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const StyledLink = styled.a`
  text-decoration: none;
  color: inherit;
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vw;
`;

export const StyledFooter = styled.footer`
background-color: ${({theme}) => theme.colors.background};
color: ${({theme}) => theme.colors.text};
font-family: ${({theme}) => theme.fonts.body};
padding: 2rem;
text-align: center;
`;

export const ContentContainer = styled.div`
  flex: 1;
  padding: 20px;
`;

export const PostsGroupContainer = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
`;

export const PostsGroupTitle = styled.h2`
  margin-bottom: 16px;
`;

export const PostsGroupList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
`;

export const PostsGroupItem = styled.li`
  padding: 8px;
  cursor: pointer;
`;

export const PostsContainer = styled.div`
  flex: 1;
  padding: 16px;
`;

export const PostTitle = styled.h2`
  margin-bottom: 16px;
`;

export const PostBody = styled.div`
  font-size: 16px;
  line-height: 1.5;
`;

export const PostImage = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 16px;
`;

