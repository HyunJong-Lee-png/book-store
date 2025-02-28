import db from "../../../../db";
import { books } from "@/db/schema";
import { eq } from "drizzle-orm";
import { writeFileSync } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const data = await db.select().from(books).where(eq(books.id, id)).limit(1);
    if (!data.length) {
      return NextResponse.json({ error: '해당 책을 찾을 수 없습니다.' }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: data[0] }, { status: 200 })
  } catch (error) {
    console.log("GET api/books/:id 오류:", error);
    return NextResponse.json({ error: 'DB서버 오류' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {

  try {
    const { id } = await params;

    let bookData = {};
    //콘텐츠 타입(이미지파일 유무)에 따라 분기처리
    const contentType = req.headers.get('Content-Type') || '';
    console.log(contentType, '여기얌')
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
      console.log('여기')
    }

    //DB 업데이트
    const updatedData = await db
      .update(books)
      .set({ ...bookData, updatedAt: new Date() })
      .where(eq(books.id, id))
      .returning();
    if (!updatedData.length) {
      return NextResponse.json({ error: '해당 책을 찾을 수 없습니다.' }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: updatedData[0] }, { status: 200 })
  }
  catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'DB서버 오류' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const data = await db.delete(books).where(eq(books.id, id)).returning();
    if (!data.length) {
      return NextResponse.json({ error: '해당 책을 찾을 수 없습니다.' }, { status: 404 });
    }
    return NextResponse.json({ success: true }, { status: 200 });
  }
  catch (error) {
    console.log("DELETE api/books/:id 오류:", error);
    return NextResponse.json({ error: 'DB서버 오류' }, { status: 500 })
  }
}