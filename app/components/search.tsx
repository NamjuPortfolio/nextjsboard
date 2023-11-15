'use client';

import { useState } from "react";

export default function Search(){
  const [keyword, setKeyword] = useState<string>("");
  const searchValue = (e: React.ChangeEvent<HTMLInputElement>) =>{
    // setComment(e.target.value);
    setKeyword(e.target.value);
  }
  const searchSubmit = ()=>{
    window.location.href = `/search/${keyword}`
  }

  return(
    <>
    <div className="flex justify-center gap-x-5">
      <input onChange={searchValue} name="search" type="text" className="border p-2 " />
      <button onClick={searchSubmit}>검색</button>
    </div>
    </>
  )
}