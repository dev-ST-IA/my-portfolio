import { FC, ReactElement, useEffect, useState } from "react";
import {
  PostBody, PostTitle,
  PostsBodyContainer,
  PostsContainer
} from "@/styles/styledComponents";
import Post from "@/types/Post";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import PostSubSection from "./PostSubSection";
import PostSection from "@/types/PostSection";
import PostGroup from "@/types/PostGroup";
type PostsProps = {
  activePostGroup? : PostGroup|undefined;
};

const Posts: FC<PostsProps> = ({ activePostGroup }) => {
  const [postsContent, setPostsContent] = useState<ReactElement[]>([]);
  const [postSections,setPostSections] = useState<PostSection[]>([]);

  useEffect(() => {
    let content:ReactElement[]= []
    let sections:Array<PostSection>|[] = []
    if (activePostGroup && activePostGroup.posts) {
      content = activePostGroup.posts.map((post: Post,i:number) =><PostBody key={i} id={""+i}><ReactMarkdown 
      rehypePlugins={[rehypeRaw]} 
      remarkPlugins={[remarkGfm]} 
      components={
        {img:({node,...props})=><img style={{maxWidth:'100px'}} {...props}/>}}>
        {post.post}
        </ReactMarkdown>
      </PostBody>)
      sections = activePostGroup.posts.map((post: Post,i:number) =>({title:post.title,key:i}));
    } else {
      content =  [<PostTitle key="empty">It appears to be empty...</PostTitle>]
    }
    setPostsContent(content)
    setPostSections(sections);
  }, [activePostGroup]);

  return <PostsContainer>
            <PostsBodyContainer>
              {postsContent}
            </PostsBodyContainer>
            <PostSubSection sections={postSections}/>
        </PostsContainer>;
};

export default Posts;
