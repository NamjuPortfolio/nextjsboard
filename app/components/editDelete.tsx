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
        <Link href={`/edit/${results && results?.id}`} className="bg-green-500 text-white px-4 py-2 rounded shadow-md hover:bg-green-600">수정</Link>
      <button className="bg-orange-500 text-white px-4 py-2 rounded shadow-md hover:bg-orange-600">삭제{results && results?.id}</button>
        </>
      }
    </>
  )
}