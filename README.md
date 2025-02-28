# 온라인 서점 API

이 프로젝트는 **Next.js**를 사용하여 책을 관리하는 간단한 API입니다.
책 목록 조회, 추가, 수정, 삭제와 같은 기본적인 CRUD 기능을 만들었습니다.

---

## 기능

- 책 목록 조회 (페이지네이션)
- 책 추가
- 책 정보 수정
- 책 삭제
- 책 통계
- 에러 처리

---

## 설치 방법

1. 저장소 클론:

```bash
git clone https://github.com/HyunJong-Lee-png/book-store.git
cd book-store
```

2. 패키지 설치:

```bash
npm install
```

3. 개발 서버 실행:

```bash
npm run dev
```

---

## API 엔드포인트

### 책 목록 조회

```http
GET /api/books
```

**응답**

```json
{
  "data": [
    {
      "id": "1",
      "title": "책 제목 1",
      "author": "저자 1",
      "image": "/book1.jpg",
      "publishedDate": "2023-03-12",
      "price": 30000,
      "stockQuantity": 10,
      "salesVolume": 5,
      "createdAt": "DATE",
      "updatedAt": "DATE"
    },
    {
      "id": "2",
      "title": "책 제목 2",
      "author": "저자 2",
      "image": "/book2.jpg",
      "publishedDate": "2024-12-25",
      "price": 38000,
      "stockQuantity": 20,
      "salesVolume": 12,
      "createdAt": "DATE",
      "updatedAt": "DATE"
    }
  ]
}
```

## 책 추가

```http
POST /api/books
```

**요청**

```json
{
  "title": "새로운 책",
  "author": "새로운 저자",
  "image": "File (multipart/form-data)",
  "publishedDate": "2021-06-23",
  "price": 15000,
  "stockQuantity": 15
}
```

**응답**

```json
{
  "id": "uuid",
  "title": "새로운 책",
  "author": "새로운 저자",
  "image": "/book.jpg",
  "publishedDate": "2021-06-23",
  "price": 15000,
  "stockQuantity": 15,
  "salesVolume": 0,
  "createdAt": "DATE",
  "updatedAt": "DATE"
}
```

## 책 상세 조회

```http
GET /api/books/:id
```

**응답**

```json
{
  "id": "2",
  "title": "책 제목 2",
  "author": "저자 2",
  "image": "/book2.jpg",
  "publishedDate": "2024-12-25",
  "price": 38000,
  "stockQuantity": 20,
  "salesVolume": 12,
  "createdAt": "DATE",
  "updatedAt": "DATE"
}
```

## 책 정보 수정

```http
PUT /api/books/:id
```

**요청**

```json
{
  "title": "수정된 제목",
  "author": "수정된 저자",
  "stockQuantity": 12
}
```

**응답**

```json
{
  "id": "uuid",
  "title": "수정된 제목",
  "author": "수정된 저자",
  "image": "/book5.jpg",
  "publishedDate": "2021-10-25",
  "price": 32000,
  "stockQuantity": 12,
  "salesVolume": 3,
  "createdAt": "DATE",
  "updatedAt": "DATE"
}
```

## 책 삭제

```http
DELETE /api/books/:id
```

**응답**

```json
{
  "success": true
}
```

---

## 에러 처리

```json
{
  "error": "해당 책을 찾을 수 없습니다."
}
```

---
