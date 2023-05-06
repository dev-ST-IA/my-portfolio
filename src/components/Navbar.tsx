import React, { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PostTopic from '@/types/PostTopic';
import { Nav, NavItem, NavList, StyledLink } from '@/styles/styledComponents';
import { ContentfulContext } from '@/context/ContentfulContext';

type Props = {
  topics? : PostTopic[]|undefined
}
const Navbar: React.FC<Props> = ({topics}) => {
  const router = useRouter();
  const contentfulContext = useContext(ContentfulContext)
  const navItems = topics?.map((topic: PostTopic) =>(
    <Link href={`/topics/${topic.path}`} passHref key={topic.id}>
      <StyledLink onClick={() => contentfulContext?.switchPath(topic.path)}>
        <NavItem
          isActive={router.asPath === `/topics/${topic.path}`}>
          {topic.topicName}
        </NavItem>
      </StyledLink>
    </Link>
  ))
  return (
    <Nav>
      <NavList>
        {navItems}
      </NavList>
    </Nav>
  );
};

export default Navbar;
