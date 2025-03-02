import db from "@/db";
import { books } from "@/db/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const top5Books = await db.select().from(books).orderBy(desc(books.salesVolume)).limit(20);
    if (!top5Books) {
      return NextResponse.json({ error: '해당 테이블이 없습니다.' }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: top5Books }, { status: 200 });

  } catch (err) {
    console.error('GET api/books/stats 오류', err);
    return NextResponse.json({ error: "DB서버 오류" }, { status: 500 })
  }
}