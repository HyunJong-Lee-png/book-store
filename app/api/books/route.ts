import { TypeBook } from "@/types/books";
import db from "../../../db";
import { books } from "@/db/schema";
import { count, desc, ilike, or } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

  try {
    //검색어,페이지네이션 처리를 위한 쿼리파라미터 가져오기
    //ex) localhost:3000?search=테스트&page=3
    const { searchParams } = req.nextUrl;

    //검색어 필터링을 위한 search 변수
    const search = searchParams.get('search');
    //페이지네이션을 위한 page 변수
    const page = parseInt(searchParams.get("page") || '1');
    //9개씩 페이지네이션
    const limit = 9;
    const offset = (page - 1) * limit;

    let data = [] as TypeBook[];

    if (search) {
      data = await db.query.books.findMany({
        where: or(ilike(books.title, `%${search}%`), ilike(books.author, `%${search}%`)),
        orderBy: desc(books.salesVolume),
        limit,
        offset
      })
    } else {
      data = await db.select().from(books).orderBy(desc(books.createdAt)).offset(offset).limit(limit);
    }
    const { value } = (await db.select({ value: count() }).from(books))[0];
    const totalPage = Math.ceil(value / limit);

    if (!data) {
      return NextResponse.json({ error: '해당 테이블이 없습니다.' }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: { booksData: data, currentPage: page, totalPage, } }, { status: 200 });
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

