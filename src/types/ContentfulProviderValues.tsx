import Person from "./Person"
import PostTopic from "./PostTopic"
import SocialProfile from "./SocialProfile"


type ContentfulProviderValues = {
    person?:Person|undefined,
    socialProfiles?:[SocialProfile]|undefined,
    postTopics?:[PostTopic]|undefined,
    currentPostTopic?:PostTopic|undefined,
    switchTopic(topic:PostTopic) : void,
    setCurrentPerson(person:Person|null) : void,
    setPostTopics(postTopics:[PostTopic]|null):void,
    setSocials(socials:[SocialProfile]|null):void,
    setLoading(loading:boolean):void,
    switchPath(path:string):void
}

export default ContentfulProviderValues