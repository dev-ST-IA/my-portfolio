import { FC, ReactElement, useEffect, useState } from "react";
import {
  PostBody, PostTitle,
  PostsContainer
} from "@/styles/styledComponents";
import Post from "@/types/Post";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
type PostsProps = {
  posts?: [Post] | null;
};

const Posts: FC<PostsProps> = ({ posts }) => {
  const [postsContent, setPostsContent] = useState<ReactElement[]>([]);

  useEffect(() => {
    let content:ReactElement[]= []
    if (posts) {
      content = posts.map((post: Post,i:number) =><PostBody key={i}><ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>{post.post}</ReactMarkdown></PostBody>)
    } else {
      content =  [<PostTitle key="empty">It appears to be empty...</PostTitle>]
    }
    setPostsContent(content)
  }, [posts]);

  return <PostsContainer>{postsContent}</PostsContainer>;
};

export default Posts;
