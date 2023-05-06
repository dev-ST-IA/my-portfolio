import PostGroup from '@/types/PostGroup'
import {FC, useContext, useEffect, useState} from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { client } from '@/lib/apolloClient'
import Post from '@/types/Post'
import PostsGroups from '../../components/PostsGroup'
import Posts from '../../components/Posts'
import { PageContainer } from '@/styles/styledComponents'
import { POST_GROUPS_QUERY, POST_TOPICS_QUERY } from '@/lib/queries'
import { useLazyQuery } from '@apollo/client'
import {ContentfulContext} from '@/context/ContentfulContext'
import ContentfulProviderValues from '@/types/ContentfulProviderValues'

type Props = {
  initialGroups : Array<PostGroup>|undefined,
  initialGroupTitles : Array<string>|undefined,
  totalGroups : number|null,
  path : string,
  data : any,
}

const Page : FC<Props> = ({ initialGroups,initialGroupTitles,totalGroups,path}: Props) => {
  const initialGroup = initialGroups? initialGroups[0]:undefined;
  const [getGroups,{loading,error,data:groupsData}] = useLazyQuery(POST_GROUPS_QUERY);
  const context = useContext<ContentfulProviderValues|undefined>(ContentfulContext);
  useEffect(()=>{
    if(context == null) return;
    context.setCurrentPostsGroups(initialGroups)
    context.setCurrentPostGroup(initialGroup);
  },[initialGroups, initialGroupTitles, path])

  if(!context)return null;
  const {setLoading,currentPostGroup,currentPostsGroups,setCurrentPostGroup,setCurrentPostsGroups} = context
  

  const changeActiveGroup = (groupTitle:string)=>{
  const filteredGroup = currentPostsGroups
    ?.filter((group: PostGroup) => group.title === groupTitle)
    ?.reduce(
      (previous: PostGroup|undefined, current: PostGroup) => {
        if(!previous) return {title:groupTitle,posts:[]};
        if(previous.posts && current?.posts){
          return {
            title: current.title,
            posts: [...previous.posts, ...current.posts],
          };
        }
        return previous; 
      },
      { title: groupTitle,posts:[] });
    setCurrentPostGroup(filteredGroup);
  }

  const fetchGroups = async(search:string|null=null,skip:number = 0,limit:number=20)=>{
    setLoading(true);
    const data = await getGroups({variables:{path, personId: process.env.PORTFOLIO_ID,search:search,skip,limit}})
    setLoading(false);
    if(!error){
      const fetchedPostsAndGroups : [PostGroup]|undefined = data?.data?.postGroupCollection?.items?.map((postGroup:any)=>{
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
      setCurrentPostsGroups(fetchedPostsAndGroups)
      setCurrentPostGroup(fetchedPostsAndGroups? fetchedPostsAndGroups[0]:undefined);
    }else{
      setCurrentPostsGroups(initialGroups)
      setCurrentPostGroup(initialGroup);
    }
  }

  return (
    <PageContainer>
        <PostsGroups groups={currentPostsGroups?.map((group:PostGroup)=>group.title)} 
          totalGroups={totalGroups??0} 
          changeActiveGroup={changeActiveGroup} 
          fetchGroups={fetchGroups} 
        />
        <Posts activePostGroup={currentPostGroup} />
    </PageContainer>
  )
}

export const getStaticPaths: GetStaticPaths<any> = async ()=> {
  const { data: postTopicsData } = await client.query({
    query: POST_TOPICS_QUERY,variables: { personId: process.env.PORTFOLIO_ID },});
  
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
    query: POST_GROUPS_QUERY,variables: { path, personId: process.env.PORTFOLIO_ID,search:null, skip:0,limit:20 },
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
  const setOfGroups : Array<string> | undefined = postGroups?.map((group:PostGroup)=>group.title)
  
    return {
    props: {
      initialGroupTitles:setOfGroups,
      initialGroups:postGroups,
      path,
      totalGroups:groups?.postGroupCollection?.total     
    }
  };
};

export default Page

