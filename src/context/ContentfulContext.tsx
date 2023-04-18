import { createContext, useState, useEffect} from "react";
import PostTopic from "@/types/PostTopic";
import ContentfulProviderProps from "@/types/ContentfulProviderProps";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import Person from "@/types/Person";
import SocialProfile from "@/types/SocialProfile";
import ContentfulProviderValues from "@/types/ContentfulProviderValues";
import Splash from "@/components/Splash";
import { gql,useQuery } from "@apollo/client";

const POST_TOPICS_QUERY = gql`
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
`;

// Create the context
export const ContentfulContext = createContext<ContentfulProviderValues|null>(null);

// Create the provider
const ContentfulProvider = ({
  children
}: ContentfulProviderProps) => {
  const [currentPostTopic, setCurrentPostTopic] = useState<PostTopic | null>();
  const [person, setCurrentPerson] = useState<Person|null>()
  const [socialProfiles,setSocials] = useState<[SocialProfile]|null>()
  const [postTopics,setPostTopics] = useState<[PostTopic]|null>()
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
    if(newPath && newPath!=oldPath ) setCurrentPostTopic(topic)
  }

  const switchPath = (path:string)=>{
    const topic = postTopics?.find((t)=>t.path===path)
    if(topic)switchTopic(topic)
  }

  useEffect(()=>{
    setLoading(true)
    if(topicsLoading)return
    const newTopics : [PostTopic]|null = postTopicsData?.postTopicCollection?.items?.map((topic:any)=>({topicName:topic?.topicName,id:topic?.sys?.id,path:topic?.path}))
    setPostTopics(newTopics)
    setLoading(false)
  },[postTopicsData])
  
  const data: any = { person, socialProfiles, currentPostTopic, postTopics,switchTopic,setCurrentPerson,setPostTopics,setSocials,setLoading,switchPath};
  return (
    <ContentfulContext.Provider value={data}>
        <Splash loading={loading} />
        <Layout>{children}</Layout>
    </ContentfulContext.Provider>
  );
};

export default ContentfulProvider;
