import db from '@/db';
import {RowDataPacket} from 'mysql2/promise';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Search from '@/app/components/search';


interface userInfo {
  user:{
    name: string;
    email?: string;
    image?: string;
    level?: number;
  }
}
export default async function PostsList({
  params,
}: {
  params?: { page?: number }
}) {

    const currentPage = params?.page !== undefined ? params.page : 1;
    const perPage = 5;
    const offset = (currentPage - 1) * perPage;

    const [results] = await db.query<RowDataPacket[]>('SELECT * FROM parknamju.board order by date DESC limit ? offset ?', [perPage, offset]);
    const [countResult] = await db.query<RowDataPacket[]>('select count(*) as cnt from parknamju.board');
    const totalCnt = countResult[0].cnt;
    
    const lastPage = Math.ceil(totalCnt / 5);
    const totalPageCnt = 5;
    const startPage = Math.floor((currentPage - 1) / totalPageCnt) * totalPageCnt + 1;
    const endPage = Math.min(lastPage, startPage + totalPageCnt - 1);
    let prevStart = Math.floor((currentPage - 1) / 5) * 5 - 4;
    let nextStart = Math.ceil((currentPage) / 5) * 5 + 1;
  
  let sessions = await getServerSession(authOptions) as userInfo;
  return (
    <>
    <div className="mx-auto max-w-7xl p-6">
         <div className="flex justify-between items-center mb-6">
           <h1 className="text-2xl font-semibold">게시판</h1>
           {
             sessions && <Link href="/write" className='bg-orange-500 text-white px-4 py-2 rounded shadow-md hover:bg-orange-600'>글쓰기</Link>
           }
          
        </div>
        <div className="bg-white shadow-md rounded-lg">
          <div className="min-w-full">
          <ul className="flex justify-between border-t-indigo-500 border-t-2 py-2 bg-indigo-50 text-center text-xs sm:text-sm">
          <li className="basis-1/12">번호</li>
          <li className="basis-5/12">제목</li>
          <li className="basis-3/12">글쓴이</li>
          <li className="basis-2/12">날짜</li>
          <li className="basis-1/12">조회수</li>
        </ul>
            {
              results && results.map((e,i)=>{
                const date = new Date(e.date);
                const year = date.getFullYear();
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const day = date.getDate().toString().padStart(2, '0')
                const formatDate = `${year}-${month}-${day}`
                const itemNumber = totalCnt - ((currentPage - 1) * perPage + i);
                return(
                  <ul key={i} className='flex justify-between'>
                    <li className='px-6 basis-1/12 py-3 text-center'>{itemNumber}</li>
                    <li className='px-6 basis-5/12 py-3 text-center'><Link href={`/post/${e.id}`}>{e.title}</Link></li>
                    <li className='px-6 basis-3/12 py-3 text-center'>{e.username}</li>
                    <li className='px-6 basis-2/12 py-3 text-center'>{formatDate}</li>
                    <li className='px-6 basis-1/12 py-3 text-center'>{e.count}</li>
                  </ul>
                )
              })
            }
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-x-5 mb-5">
      {currentPage > 5 && <Link href={`/page/${prevStart}`} className='bg-white border px-1.5 py-1 rounded text-sm'>이전</Link>}
      {
      Array(endPage - startPage + 1).fill(null).map((_,i)=>{
        const pageNumber = i + startPage;
        return(
          <Link href={`/page/${pageNumber}`} key={i} className={`${Number(currentPage) === pageNumber ? 'bg-orange-500 text-white' : 'bg-white text-black'} border px-1.5 py-1 text-center rounded text-sm basis-8`}>{pageNumber}</Link>
        )
      })
    }
    {nextStart  < lastPage  && <Link href={`/page/${nextStart}`} className='bg-white border px-1.5 py-1 rounded text-sm'>다음</Link>}
      </div>

      <Search/>
    </>
  );
}
