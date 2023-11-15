import db from '@/db';
import { NextRequest, NextResponse } from "next/server";
import { RowDataPacket } from 'mysql2/promise';
export const GET = async (req: NextRequest, res: NextResponse) : Promise<NextResponse> => {


    if (req.method === 'GET') {
        try{

            const [results] = await db.query<RowDataPacket[]>('SELECT * FROM parknamju.board');
            const [countResults] = await db.query<RowDataPacket[]>('SELECT COUNT(*) as totalCount FROM parknamju.board');
            const totalCount = countResults[0].totalCount;
            
            return NextResponse.json({ message: 'Database connected successfully!', results, totalCount });
        }catch(error){
            return    NextResponse.json({ error: error });
        }
    } else if(req.method === "post"){

    } else {
        return  NextResponse.json({ error: 'Method not allowed' });
    }

    return NextResponse.json({error: "에러가 발생하였습니다."})


}