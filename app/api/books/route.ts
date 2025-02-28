import db from "../../../db";
import { books } from "@/db/schema";
import { desc } from "drizzle-orm";
import { writeFileSync } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function GET() {
  try {
    const data = await db.select().from(books).orderBy(desc(books.publishedDate));
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
    const contentType = req.headers.get('Content-Type') || '';

    let bookData: any = {};

    //이미지 파일이 있다면
    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const jsonData = JSON.parse(formData.get('json') as string) || {};
      const imageFile = formData.get('image') as File | null;
      if (imageFile) {
        //파일 -> 버퍼변환
        const buffer = Buffer.from(await imageFile.arrayBuffer());
        //파일 저장경로 설정
        const filePath = path.join(process.cwd(), 'public', imageFile.name);
        //서버에 이미지파일 저장
        writeFileSync(filePath, buffer);
        bookData = { ...jsonData, image: `/${imageFile.name}` }
      }
    }
    //이미지 파일이 없다면
    else {
      bookData = await req.json();
    }
    const newBook = await db.insert(books).values(bookData).returning();

    if (!newBook.length) {
      return NextResponse.json({ success: false })
    }
    return NextResponse.json({ success: true, data: newBook[0] }, { status: 201 })

  }
  catch (error) {
    console.log("POST api/books 오류:", error);
    return NextResponse.json({ error: 'DB서버 오류' }, { status: 500 });
  }
}

