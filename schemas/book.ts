import { z } from "zod";

//가격,재고량,판매량 스키마
const numberSchema = z
  .number({ invalid_type_error: '숫자를 입력해주세요.' })
  .int("정수만 입력 가능합니다.")
  .min(0, "0 이상의 값이어야 합니다.");

export const BookSchema = z.object({
  title: z
    .string()
    .min(1, '책 제목을 입력해주세요.')
    .max(20, '책 제목은 20자 이하로 입력해주세요.')
    .regex(/^[a-zA-Z0-9가-힣\s]+$/, '책 제목에는 특수문자를 사용할 수 없습니다.'),
  author: z
    .string()
    .min(1, '작가를 입력해주세요.')
    .max(20, '저자명은 20자 이하로 입력해주세요.')
    .regex(/^[a-zA-Z가-힣0-9\s]+$/, '저자명에는 특수문자와 숫자를 사용할 수 없습니다.'),
  publishedDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "출판일은 YYYY-MM-DD 형식이어야 합니다.")
    .refine((date) => new Date(date) <= new Date(), {
      message: "출판일은 미래 날짜일 수 없습니다.",
    }),
  price: numberSchema,
  stockQuantity: numberSchema,
});

export type BookFormValues = z.infer<typeof BookSchema>
