'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BookAudioIcon } from "lucide-react";
import { BookFormValues, BookSchema } from '@/schemas/book';
import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function AddBookPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [fileError, setFileError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookFormValues>({
    resolver: zodResolver(BookSchema),
  });
  const router = useRouter();

  const uploadImage = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'book_upload');

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

  const onSubmit = async (data: BookFormValues) => {
    try {

      let imageUrl = '';

      if (file) {
        const uploadedUrl = await uploadImage(file);
        if (!uploadedUrl) throw new Error('이미지 업로드 실패');
        imageUrl = uploadedUrl;
      }

      const res = await fetch('/api/books', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...data, image: imageUrl })
      });

      if (!res.ok) throw new Error('책 추가 실패...');
      toast.success('책 추가 성공!')
      const bookData = await res.json();
      router.push(`/books/${bookData.data.id}`);
    }
    catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
        router.push('/')
      } else {
        toast.error('알 수 없는 오류발생');
      }
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

  return (
    <div className="max-w-md mx-auto mt-28 mb-10 flex flex-col">
      <h1 className="text-3xl font-bold flex items-center gap-5 justify-center py-10"><BookAudioIcon /> 도서 추가 페이지</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <input type="text" {...register('title')} placeholder="책 제목" className="border p-2" />
        {<p className={`text-red-500 ${errors.title ? 'visible' : 'invisible'}`}>{errors.title?.message || 'none'}</p>}

        <input type="text" {...register('author')} placeholder="저자" className="border p-2" />
        {<p className={`text-red-500 ${errors.author ? 'visible' : 'invisible'}`}>{errors.author?.message || 'none'}</p>}

        <input type="number" {...register('price', { valueAsNumber: true })} placeholder="가격" className="border p-2" />
        {<p className={`text-red-500 ${errors.price ? 'visible' : 'invisible'}`}>{errors.price?.message || 'none'}</p>}

        <input type="number" {...register('stockQuantity', { valueAsNumber: true })} placeholder="재고량" className="border p-2" />
        {<p className={`text-red-500 ${errors.stockQuantity ? 'visible' : 'invisible'}`}>{errors.stockQuantity?.message || 'none'}</p>}

        <label htmlFor='image' className='text-center bg-blue-500 px-4 py-2 rounded text-white cursor-pointer'>
          {file ? `${file.name} 첨부 완료 ☑️` : '이미지 등록'}
        </label>
        <input id='image' type="file" placeholder="이미지 URL" className="hidden" onChange={handleFile} />
        {<p className={`text-red-500 ${fileError ? 'visible' : 'invisible'}`}>{fileError || 'none'}</p>}

        <input type="date" {...register('publishedDate')} className="border p-2" />
        {<p className={`text-red-500 ${errors.publishedDate ? 'visible' : 'invisible'}`}>{errors.publishedDate?.message || 'none'}</p>}

        <button className="px-4 py-2 bg-black text-white rounded disabled:opacity-50" disabled={isSubmitting || uploading}>
          {isSubmitting || uploading ? '추가중...' : '책 추가'}
        </button>
      </form>
    </div>
  );
}

