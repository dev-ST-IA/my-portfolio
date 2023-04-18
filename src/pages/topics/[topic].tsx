import PostGroup from '@/types/PostGroup'
import {FC} from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { gql } from '@apollo/client'
import { client } from '@/lib/apolloClient'
import Post from '@/types/Post'
import PostsGroup from '../../components/PostsGroup'
import Posts from '../../components/Posts'
import { PageContainer } from '@/styles/styledComponents'

type Props = {
  postGroups : [PostGroup]|undefined,
  data : any
}

const Page : FC<Props> = ({ postGroups,data}: Props) => {
  const groups : Array<string> | undefined = postGroups?.map((group:PostGroup)=>group.title)
  const setOfPosts : [Post]|any= postGroups?.flatMap((group: PostGroup) => group.posts);

  return (
    <PageContainer>
        <PostsGroup groups={groups} />
        <Posts posts={setOfPosts} />
    </PageContainer>
  )
}

export const getStaticPaths: GetStaticPaths<any> = async ()=> {
  const { data: postTopicsData } = await client.query({
    query: gql`
      query PostTopicEntryQuery($personId: String!) {
        postTopicCollection(where: { person: { sys: { id: $personId } } }) {
          items {
            topicName
            path
            sys {
              id
            }
          }
        }
      }
    `,variables: { personId: process.env.PORTFOLIO_ID },});
  
  const postTopics : Array<{params:{ topic: string; }}> = 
      await Promise.all(postTopicsData?.postTopicCollection?.items?.map(async (topic:any)=>{
        return ({params:{topic:topic?.path}})
      }))

  return {
    paths: postTopics,
    fallback: false, // can also be true or 'blocking'
  }
}

export const getStaticProps: GetStaticProps<any> = async ({params}) => {
  const path: string|undefined = params?.topic as string|undefined;
  const { data: groups } = await client.query({
    query: gql`
      query postGroups($path: String!, $personId: String!) {
        postGroupCollection(where: { postTopic: { path: $path }, person: { sys: { id: $personId } } }) {
          total
          items {
            title
            postsCollection {
              items {
                title
                metaInformation
                tags
                body {
                  json
                }
              }
            }
          }
        }
      }
    `,
    variables: { path, personId: process.env.PORTFOLIO_ID },
  });
  const postGroups : [PostGroup]|undefined = groups?.postGroupCollection?.items?.map((postGroup:any)=>{
    const postsData : Post|undefined = postGroup?.postsCollection?.items?.map((postObjects:any)=>{
      const postTitle = postObjects?.title
      const metaInformation = postObjects?.metaInformation
      const tags = postObjects?.tags
      const post = postObjects?.body?.json?.content?.map((postSegment:any)=>{
        const contentSegment = postSegment?.content?.map((portion:any)=>portion?.value? portion?.value+"\n":"")?.join("\n")
        return contentSegment
      })?.join("\n")
      return ({title:postTitle,post,metaInformation,tags})
    })
    return ({title:postGroup.title,posts:postsData})
  })
  
    return {
    props: {
      postGroups,
      path
      
    }
  };
};

export default Page

