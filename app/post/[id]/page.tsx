import db from '@/db';
import { RowDataPacket } from 'mysql2/promise';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

interface userInfo {
  user:{
    name: string;
    email?: string;
    image?: string;
    level?: number;
  }
}
interface propsType{
  results: {
    id: number;
    userid: string;
    title?: string;
    content?: string;
    username?: string;
    count?: number;
    date?: string; // 또는 string, 실제 데이터 형식에 따라 결정
  };
}

import Comment from "@/app/components/comment";
import Link from "next/link";
import EditDelete from '@/app/components/editDelete';

export default async function Detail({
  params,
}: {
  params?: { id?: number }
}){

  const postId = params?.id !== undefined ? params.id : 1;
  const [results] = await db.query<RowDataPacket[]>('SELECT * FROM parknamju.board where id = ?',[postId]);
  let session = await getServerSession(authOptions) as userInfo;
  console.log(results[0])

  return(
    <>
       {
        results.length > 0 && (
          <>
            <p>제목 : {results && results[0]?.title}</p>
            <p>제목 : {results && results[0]?.content}</p>
            {
              session ? <Comment id={results && results[0]?.id} /> : <p className="block border p-4 text-center my-5 rounded-md"> <Link href="/login">로그인 이후 댓글을 작성할 수 있습니다.</Link> </p>
            }

            <EditDelete results={results[0] as propsType['results']}/>
          </>
        ) 
      }


      
       <Link href="/">목록</Link>
    </>
  )
}
