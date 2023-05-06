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
  padding: 1rem;
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
  min-height: 1;
  width: 1;
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
  width:15%;
  display: flex;
  flex-direction: column;
  align-items: start;
  height: 90vh;
  position: sticky;
  top: 0;
`;

export const PostsGroupTitle = styled.div`
  width: 100%;
  text-align: left;
  `;

export const PostGroupSearch = styled.input`
  width: 80%;
  background-color: ${({theme}) => theme.colors.background};
  border: ${({theme}) => `1px solid ${theme.colors.secondary}`};
  border-radius: 5px;
  padding: 5px;
  padding-right:0;
  margin-bottom: 16px;
`;

export const PostGroupPaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top:78%;
  width: 80%;
  padding: 8px 0;
  margin:0;
  font-size: 0.8rem;
`;


export const PostsGroupList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 80%;
  border-right: ${({ theme }) => `1px solid ${theme.colors.secondary}`};
`;

export const PostsGroupItem = styled.li`
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px; 
  padding: 5px 0;
`;

export const PostsContainer = styled.div`
  width: 85%;
  flex:1;
  display: flex;
  flex-direction: row;
`;

export const PostsBodyContainer = styled.div`
  width: 85%;
  padding: 8px;
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

export const PostSubSectionContainer = styled.div`
  width: 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
`;

export const PostSubSectionList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  padding: 8px;
  border-left: ${({ theme }) => `1px solid ${theme.colors.secondary}`};
`;

export const PostSubSectionItem = styled.li`
  cursor: pointer;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
  padding: 5px 0;
`;

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ArrowButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 1rem;
  cursor: pointer;
`;

export const PageInput = styled.input`
  min-width: 30px;
  max-width: 40px;
  margin: 0 5px;
`;

export const PageCount = styled.span`
  margin: 0 5px;
`;
