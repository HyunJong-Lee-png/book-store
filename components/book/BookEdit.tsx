'use client'
import { BookFormValues, BookSchema } from "@/schemas/book";
import { TypeBook } from "@/types/books";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function BookUpdate({ foundBook }: { foundBook: TypeBook }) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [fileError, setFileError] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookFormValues>({
    resolver: zodResolver(BookSchema),
    defaultValues: {
      'title': foundBook.title,
      'author': foundBook.author,
      'price': foundBook.price,
      'publishedDate': foundBook.publishedDate,
      'stockQuantity': foundBook.stockQuantity,
    }
  });

  const uploadImage = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'upload_preset');

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      return data.secure_url;
    } catch (error) {
      console.log(error)
      toast.error('이미지 업로드 실패');
      return null;
    } finally {
      setUploading(false);
    }
  };


  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      if (!["image/jpeg", "image/png", "image/webp"].includes(files[0].type)) {
        setFileError("이미지 파일은 JPG, PNG, WEBP 형식만 허용됩니다.");
      }
      setFile(files[0]);
    }
  }

  const onSubmit = async (data: BookFormValues) => {

    try {
      let imageUrl = foundBook.image;

      if (file) {
        const uploadedUrl = await uploadImage(file);
        if (!uploadedUrl) throw new Error('이미지 업로드 실패');
        imageUrl = uploadedUrl;
      }

      const res = await fetch(`/api/books/${foundBook.id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...data, image: imageUrl }) // 이미지 URL 포함
      });

      if (!res.ok) throw new Error('책 수정 실패..');
      toast.success('책 수정 성공!');
      router.push(`/books/${foundBook.id}`)
      router.refresh()
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
        router.push('/');
      }
    }
  };

  return (
    <motion.div
      className="border rounded-md p-4 overflow-scroll flex-1"
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1, transformOrigin: 'right center' }}
      exit={{ opacity: 0, scaleX: 0 }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <span className="font-semibold">제목수정:</span>
        <input type="text" {...register('title')} placeholder="책 제목" className="border p-2" />
        {<p className={`text-xs text-red-500 ${errors.title ? 'visible' : 'invisible'}`}>{errors.title?.message || 'none'}</p>}
        <span className="font-semibold">작가수정:</span>
        <input type="text" {...register('author')} placeholder="저자" className="border p-2" />
        {<p className={`text-xs text-red-500 ${errors.author ? 'visible' : 'invisible'}`}>{errors.author?.message || 'none'}</p>}
        <span className="font-semibold">가격수정:</span>
        <input type="number" {...register('price', { valueAsNumber: true })} placeholder="가격" className="border p-2" />
        {<p className={`text-xs text-red-500 ${errors.price ? 'visible' : 'invisible'}`}>{errors.price?.message || 'none'}</p>}
        <span className="font-semibold">재고량수정:</span>
        <input type="number" {...register('stockQuantity', { valueAsNumber: true })} placeholder="재고량" className="border p-2" />
        {<p className={`text-xs text-red-500 ${errors.stockQuantity ? 'visible' : 'invisible'}`}>{errors.stockQuantity?.message || 'none'}</p>}

        <label htmlFor='image' className='text-center bg-blue-500 px-4 py-2 rounded text-white cursor-pointer'>
          {file ? `${file.name} 첨부 완료 ☑️` : '이미지 등록'}
        </label>
        <input id='image' type="file" placeholder="이미지 URL" className="hidden" onChange={handleFile} />
        {<p className={`text-xs text-red-500 ${fileError ? 'visible' : 'invisible'}`}>{fileError || 'none'}</p>}
        <span className="font-semibold">출판일수정:</span>
        <input type="date" {...register('publishedDate')} className="border p-2" />
        {<p className={`text-xs text-red-500 ${errors.publishedDate ? 'visible' : 'invisible'}`}>{errors.publishedDate?.message || 'none'}</p>}

        <button className="px-4 py-2 bg-black text-white rounded disabled:opacity-50" disabled={isSubmitting || uploading}>
          {isSubmitting || uploading ? '수정중...' : '책 수정'}
        </button>
      </form>
    </motion.div>

  );
}