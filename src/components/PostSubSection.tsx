import { PostSubSectionContainer, PostSubSectionItem, PostSubSectionList, StyledLink } from "@/styles/styledComponents";
import PostSection from "@/types/PostSection";
import Link from "next/link";
import { FC } from "react";

type PostSubSectionProps = {
    sections: Array<PostSection>| undefined;
}
const PostSubSection: FC<PostSubSectionProps> = ({ sections }: PostSubSectionProps) => {
    return (
      <PostSubSectionContainer>
        <PostSubSectionList>
          {sections?.map((section) => (
            <StyledLink key={section.key+""} href={`#${section.key}`}><PostSubSectionItem>{section.title}</PostSubSectionItem></StyledLink>
          ))}
        </PostSubSectionList>
      </PostSubSectionContainer>
    );
  };
  

export default PostSubSection