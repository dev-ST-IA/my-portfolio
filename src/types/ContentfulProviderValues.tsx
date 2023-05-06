import { Dispatch, SetStateAction } from "react"
import Person from "./Person"
import PostTopic from "./PostTopic"
import SocialProfile from "./SocialProfile"
import PostGroup from "./PostGroup"


type ContentfulProviderValues = {
    person?:Person|undefined,
    socialProfiles?:SocialProfile[]|undefined,
    postTopics?:PostTopic[]|undefined,
    currentPostTopic?:PostTopic|undefined,
    switchTopic(topic:PostTopic) : void,
    setCurrentPerson:Dispatch<SetStateAction<Person|undefined>>,
    setPostTopics:Dispatch<SetStateAction<PostTopic[]|undefined>>,
    setSocials:Dispatch<SetStateAction<SocialProfile[]|undefined>>,
    setLoading:Dispatch<SetStateAction<boolean>>,
    switchPath(path:string):void,
    setCurrentPostTopic : Dispatch<SetStateAction<PostTopic|undefined>>,
    setCurrentPostGroup : Dispatch<SetStateAction<PostGroup|undefined>>,
    setCurrentPostsGroups : Dispatch<SetStateAction<PostGroup[]|undefined>>,
    currentPostGroup?:PostGroup|undefined,
    currentPostsGroups?:PostGroup[]|undefined,
}

export default ContentfulProviderValues