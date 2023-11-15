'use client';
import { useCustomSession } from "../sessions";
import Link from 'next/link';
interface propsType {
  results: {
    id: number;
    userid: string;
    title?: string;
    content?: string;
    username?: string;
    count?: number;
    date?: string;
  };
}
export default function EditDelete({ results }: propsType) {
  const {data: session } = useCustomSession();
  return (
    <>
      {
        session && session.user && (
          (results && session.user.email === results.userid) || session.user.level === 10
        )  && <>
         <div className="max-w-7xl mx-auto my-10">
          <div className="border p-4 rounded-md"></div>
            <div className="flex justify-between pb-24  mt-5">
              <div>
                <Link href="/" className="bg-blue-400  hover:bg-blue-600  focus:ring-blue-400 py-2 px-4  text-white font-semibold rounded-md shadow-md  focus:outline-none focus:ring-2  focus:ring-opacity-75">목록</Link>
              </div>
              <div className="gap-x-5 flex">
                <Link href={`/edit/${results && results?.id}`} className="bg-green-400  hover:bg-green-600  focus:ring-green-400 py-2 px-4  text-white inline-block font-semibold rounded-md shadow-md  focus:outline-none focus:ring-2  focus:ring-opacity-75;">수정</Link>
                <button className="bg-red-400  hover:bg-red-600  focus:ring-red-400 py-2 px-4  text-white font-semibold rounded-md shadow-md  focus:outline-none focus:ring-2  focus:ring-opacity-75">삭제{results && results?.id}</button>
              </div>
            </div>
          </div>
        </>
      }
    </>
  )
}