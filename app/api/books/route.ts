import { TypeBook } from "@/types/books";
import db from "../../../db";
import { books } from "@/db/schema";
import { desc } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await db.select().from(books).orderBy((desc(books.createdAt)));
    if (!data) {
      return NextResponse.json({ error: '해당 테이블이 없습니다.' }, { status: 404 })
    }
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error('GET api/books 오류:', error)
    return NextResponse.json({ error: "DB서버 오류" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const bookData: TypeBook = await req.json();

    const newBook = await db.insert(books).values(bookData).returning();

    if (!newBook.length) {
      return NextResponse.json({ success: false });
    }

    return NextResponse.json({ success: true, data: newBook[0] }, { status: 201 });

  } catch (error) {
    console.error("POST api/books 오류:", error);
    return NextResponse.json({ error: 'DB 서버 오류' }, { status: 500 });
  }
}

