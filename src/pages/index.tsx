import { FC, useEffect, useContext } from "react";
import { client } from "../lib/apolloClient";
import { GetStaticProps } from "next";
import Person from "@/types/Person";
import PostTopic from "@/types/PostTopic";
import SocialProfile from "@/types/SocialProfile";
import { ContentfulContext } from "@/context/ContentfulContext";
import ContentfulProviderValues from "@/types/ContentfulProviderValues";
import { GET_PERSON_QUERY, POST_TOPICS_QUERY, SOCIAL_PROFILES_QUERY } from "@/lib/queries";
import { useRouter } from "next/router";
import Splash from "@/components/Splash";

type HomeProps = {
  person?:Person|undefined,
  socialProfiles?:[SocialProfile]|undefined,
  postTopics?:[PostTopic]|undefined
}

const Home: FC<HomeProps> = ({person,postTopics,socialProfiles}: HomeProps) => {
  const context : ContentfulProviderValues|undefined = useContext(ContentfulContext)
  const router = useRouter();
  useEffect(()=>{
    if(!context)return
    context.setLoading(true)
    if(person!=null){
      context.setCurrentPerson(person)
    }
    if(socialProfiles!=null){
      context.setSocials(socialProfiles)
    }
    if(postTopics!=null){
      context.setPostTopics(postTopics)
      if(postTopics.length<=0)return
      const topic = postTopics.find((topic:PostTopic)=>topic.path==="home")
      if(!topic)return
      context.switchPath(topic.path);
      router.push(`/topics/${topic.path}`)
    }
  },[person,socialProfiles,postTopics])

  return (
      <Splash loading={true}/>
  )
};

export const getStaticProps: GetStaticProps<any> = async () => {
  const { data: personData } = await client.query({
    query: GET_PERSON_QUERY,
    variables: {
      id: process.env.PORTFOLIO_ID,
    },
  });
  const person: Person | null = personData?.person;

  const { data: socialProfilesData } = await client.query({
    query: SOCIAL_PROFILES_QUERY,variables: { personId: process.env.PORTFOLIO_ID }});

const socials : [SocialProfile] |null = socialProfilesData?.socialProfileCollection?.items?.map((item:any)=>({...item,id:item?.sys?.id}))

const { data: postTopicsData } = await client.query({
  query: POST_TOPICS_QUERY,
  variables: { personId: process.env.PORTFOLIO_ID },
});
  
const postTopics : [PostTopic]|null = postTopicsData?.postTopicCollection?.items?.map((topic:any)=>({topicName:topic?.topicName,id:topic?.sys?.id,path:topic?.path}))

  return {
    props: {
      person,
      socialProfiles: socials,
      postTopics: postTopics
    }
  };
};
export default Home;
