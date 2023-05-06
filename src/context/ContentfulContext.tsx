import { createContext, useState, useEffect} from "react";
import PostTopic from "@/types/PostTopic";
import ContentfulProviderProps from "@/types/ContentfulProviderProps";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import Person from "@/types/Person";
import SocialProfile from "@/types/SocialProfile";
import ContentfulProviderValues from "@/types/ContentfulProviderValues";
import Splash from "@/components/Splash";
import { useQuery } from "@apollo/client";
import { POST_TOPICS_QUERY } from "@/lib/queries";
import PostGroup from "@/types/PostGroup";

// Create the context
export const ContentfulContext = createContext<ContentfulProviderValues|undefined>(undefined);

// Create the provider
const ContentfulProvider = ({
  children
}: ContentfulProviderProps) => {
  const [currentPostTopic, setCurrentPostTopic] = useState<PostTopic | undefined>();
  const [currentPostGroup, setCurrentPostGroup] = useState<PostGroup|undefined>();
  const [currentPostsGroups, setCurrentPostsGroups] = useState<PostGroup[]|undefined>();
  const [person, setCurrentPerson] = useState<Person|undefined>()
  const [socialProfiles,setSocials] = useState<SocialProfile[]|undefined>()
  const [postTopics,setPostTopics] = useState<PostTopic[]|undefined>()
  const { data: postTopicsData, loading:topicsLoading, error } = useQuery(POST_TOPICS_QUERY, {
    variables: { personId: process.env.PORTFOLIO_ID },
  });

  const [loading,setLoading] = useState<boolean>(false);
  const router = useRouter()
  // useEffect(()=>{
  //   const path = currentPostTopic?.path
  //   if(path)
  //   router.push(`/topics/${path}`);
  // },[currentPostTopic])
  
  const switchTopic = (topic:PostTopic)=>{
    const newPath = topic?.path
    const oldPath = currentPostTopic?.path
    if(newPath!=oldPath || !oldPath) setCurrentPostTopic(topic)
  }

  const switchPath = (path:string)=>{
    const topic = postTopics?.find((t)=>t.path===path)
    if(topic)switchTopic(topic)
  }

  useEffect(()=>{
    setLoading(true)
    if(topicsLoading)return
    const newTopics : PostTopic[]|undefined = postTopicsData?.postTopicCollection?.items?.map((topic:any)=>({topicName:topic?.topicName,id:topic?.sys?.id,path:topic?.path}))
    setPostTopics(newTopics)
    setLoading(false)
  },[postTopicsData])
  
  const data: ContentfulProviderValues = {
    person,
    socialProfiles,
    currentPostTopic,
    setCurrentPostTopic,
    postTopics,
    switchTopic,
    setCurrentPerson,
    setPostTopics,
    setSocials,
    setLoading,
    switchPath,
    setCurrentPostGroup,
    setCurrentPostsGroups,
    currentPostGroup,
    currentPostsGroups
  };
  return (
    <ContentfulContext.Provider value={data}>
        <Splash loading={loading} />
        <Layout>{children}</Layout>
    </ContentfulContext.Provider>
  );
};

export default ContentfulProvider;
