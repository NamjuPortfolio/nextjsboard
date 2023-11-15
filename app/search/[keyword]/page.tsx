import db from '@/db';
import {RowDataPacket} from 'mysql2/promise';
import React from 'react';
export default async function SearchResult({
  params,
}: {
  params?: { keyword?: string }
}){

  
  const keywords = params?.keyword !== undefined ? params.keyword : "";
  const [results] = await db.query<RowDataPacket[]>('SELECT * FROM parknamju.board where title Like ?', [`%${keywords}%`]);
  return(
    <div>
      <p>검색 결과 {keywords}</p>
      {results.length === 0 && <p>검색 결과가 없습니다.</p>}
      {results && results.length > 0 && results.map((e,i)=>{
        return (
          <React.Fragment key={i}>
            <p>{e.title}</p>
            <p>{e.userid}</p>

          </React.Fragment>
        )
      })}

    </div>
  )
}