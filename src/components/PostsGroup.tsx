import { PostGroupPaginationWrapper, PostGroupSearch, PostsGroupContainer, PostsGroupItem, PostsGroupList, PostsGroupTitle } from "@/styles/styledComponents";
import React, { FC, useEffect, useState } from "react";
import Paginator from "./Paginator";

type PostsGroupProps = {
    groups: Array<string>| undefined;
    totalGroups : number;
    fetchGroups : (search:string|null,skip:number,limit:number) => void;
    changeActiveGroup : (groupTitle:string) => void
}
const GROUPS_LIMIT = 20;

const PostsGroups: FC<PostsGroupProps> = ({ groups, totalGroups,fetchGroups, changeActiveGroup}: PostsGroupProps) => {
  const [page, setPage] = useState<number>(1);
  const [search,setSearch] = useState<string>("");
  const handleSearchChange = (e:React.ChangeEvent<HTMLInputElement>)=>setSearch(e.target.value);

  useEffect(()=>{
    fetchGroups(search!=""? search:null,(page-1)*GROUPS_LIMIT,GROUPS_LIMIT);
  },[page,search])

    return (
      <PostsGroupContainer>
        <PostsGroupTitle><h3>Content</h3></PostsGroupTitle>
        <PostGroupSearch placeholder="Search" value={search} onChange={handleSearchChange}/>
        <PostsGroupList>
          {groups?.map((group) => (
            <PostsGroupItem key={group} onClick={(e)=>changeActiveGroup(group)}>{group}</PostsGroupItem>
          ))}
        </PostsGroupList>
        {(totalGroups/GROUPS_LIMIT)>1&&<PostGroupPaginationWrapper>
          <Paginator currentPage={page} totalPages={totalGroups} onPageChange={e=>setPage(e)}/>
        </PostGroupPaginationWrapper>}
      </PostsGroupContainer>
    );
  };
  

export default PostsGroups