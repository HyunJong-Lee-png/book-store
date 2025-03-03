import BookDetail from "@/components/book/BookDetail";

const BASE_URL = process.env.BASE_URL;

export default async function BookDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await fetch(`${BASE_URL}/api/books/${id}`);
  await new Promise(res => setTimeout(res, 2000))
  if (!res.ok) {
    return (<div>책을 찾을 수 없습니다!</div>);
  }

  const bookData = await res.json();

  return (
    <div className="max-w-4xl mx-auto mt-36">
      <BookDetail foundBook={bookData.data} />
    </div>
  );

}
