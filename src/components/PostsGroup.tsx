import { PostsGroupContainer, PostsGroupItem, PostsGroupList } from "@/styles/styledComponents";
import { FC } from "react";

type PostsGroupProps = {
    groups: Array<string>| undefined;
}
const PostsGroup: FC<PostsGroupProps> = ({ groups }: PostsGroupProps) => {
    return (
      <PostsGroupContainer>
        <PostsGroupList>
          {groups?.map((group) => (
            <PostsGroupItem key={group}><h1>{group}</h1></PostsGroupItem>
          ))}
        </PostsGroupList>
      </PostsGroupContainer>
    );
  };
  

export default PostsGroup