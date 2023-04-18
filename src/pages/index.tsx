import { FC, useEffect, useContext } from "react";
import { client } from "../lib/apolloClient";
import { gql } from "@apollo/client";
import { GetStaticProps } from "next";
import Person from "@/types/Person";
import PostTopic from "@/types/PostTopic";
import SocialProfile from "@/types/SocialProfile";
import { ContentfulContext } from "@/context/ContentfulContext";
import ContentfulProviderValues from "@/types/ContentfulProviderValues";

type HomeProps = {
  person?:Person|undefined,
  socialProfiles?:[SocialProfile]|undefined,
  postTopics?:[PostTopic]|undefined
}

const Home: FC<HomeProps> = ({person,postTopics,socialProfiles}: HomeProps) => {
  const context : ContentfulProviderValues|null = useContext(ContentfulContext)
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
      context.switchTopic(topic);
    }
  },[person,socialProfiles,postTopics])

  return (
      <p>welcome</p>
  )
};

export const getStaticProps: GetStaticProps<any> = async () => {
  const { data: personData } = await client.query({
    query: gql`
      query GetPerson($id: String!) {
        person(id: $id) {
          fullName
          firstName
          lastName
          userName
          email
        }
      }
    `,
    variables: {
      id: process.env.PORTFOLIO_ID,
    },
  });
  const person: Person | null = personData?.person;

  const { data: socialProfilesData } = await client.query({
    query: gql`
      query socialProfilesQuery ($personId : String!) {
        socialProfileCollection(
          where: { person: { sys: { id: $personId } } }
        ) {
          items {
            url
            mediaName
            icon {
              url
            }
            profilePhoto {
              url
            }
            sys {
              id
            }
          }
        }
      }
    `,variables: { personId: process.env.PORTFOLIO_ID }});

const socials : [SocialProfile] |null = socialProfilesData?.socialProfileCollection?.items?.map((item:any)=>({...item,id:item?.sys?.id}))

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
  `,
  variables: { personId: process.env.PORTFOLIO_ID },
});
  
const postTopics : [PostTopic]|null = postTopicsData?.postTopicCollection?.items?.map((topic:any)=>({topicName:topic?.topicName,id:topic?.sys?.id,path:topic?.path}))

  return {
    props: {
      person: personData.person,
      socialProfiles: socials,
      postTopics: postTopics
    }
  };
};
export default Home;
