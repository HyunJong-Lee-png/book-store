import db from "@/db";
import { books } from "@/db/schema";
import { TypeBook } from "@/types/books";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

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
    const bookData: Partial<TypeBook> = await req.json();

    const updatedData = await db
      .update(books)
      .set({ ...bookData, updatedAt: new Date() })
      .where(eq(books.id, id))
      .returning();

    if (!updatedData.length) {
      return NextResponse.json({ error: '해당 책을 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedData[0] }, { status: 200 });
  } catch (error) {
    console.error("PUT api/books/:id 오류:", error);
    return NextResponse.json({ error: 'DB 서버 오류' }, { status: 500 });
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