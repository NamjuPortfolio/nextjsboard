import db from '@/db';
import {RowDataPacket} from 'mysql2/promise';
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
          <p key={i}>{e.title}</p>
        )
      })}

    </div>
  )
}