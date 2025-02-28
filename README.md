# 온라인 서점 API

이 프로젝트는 **Next.js**를 사용하여 책을 관리하는 간단한 API입니다.
책 목록 조회, 추가, 수정, 삭제와 같은 기본적인 CRUD 기능을 제공합니다.

---

## 기능

- 책 목록 조회 (페이지네이션)
- 책 추가
- 책 정보 수정
- 책 삭제
- 에러 처리

---

## 설치 방법

1. 저장소 클론:

```bash
git clone https://github.com/yourusername/bookstore-api.git
cd bookstore-api
```

2. 패키지 설치:

```bash
npm install (or i)
```

3. 개발 서버 실행:

```bash
npm run dev
```

---

### API 엔드포인트

## 책 목록 조회

```http
GET /api/books
```

**응답**

```json
{
  "books": [
    { "id": "1", "title": "책 제목 1", "author": "저자 1", "stock": 10 },
    { "id": "2", "title": "책 제목 2", "author": "저자 2", "stock": 8 }
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
  "stock": 15
}
```

**응답**

```json
{
  "id": "21",
  "title": "새로운 책",
  "author": "새로운 저자",
  "stock": 15
}
```

## 책 상세 조회

```http
GET /api/books/:id
```

**응답**

```json
{
  "id": "1",
  "title": "책 제목 1",
  "author": "저자 1",
  "stock": 10
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
  "stock": 12
}
```

**응답**

```json
{
  "id": "1",
  "title": "수정된 제목",
  "author": "수정된 저자",
  "stock": 12
}
```

## 책 삭제

```http
DELETE /api/books/:id
```

**응답**

```json
{
  "message": "책이 삭제되었습니다"
}
```

---

## 에러 처리

API는 적절한 HTTP 상태 코드와 에러 메시지를 반환합니다. 예제:

```json
{
  "error": "책을 찾을 수 없습니다"
}
```

---

## 기여 방법

1. 저장소를 포크하세요.
2. 새로운 브랜치를 생성하세요 (`git checkout -b feature-new`).
3. 변경 사항을 커밋하세요 (`git commit -m 'feat: 새로운 기능 추가'`).
4. 브랜치를 푸시하세요 (`git push origin feature-new`).
5. Pull Request를 생성하세요.

---
