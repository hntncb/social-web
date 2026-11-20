# <Social Web>

Ứng dụng web đăng bài và bình luận (full-stack) với xác thực JWT, phân quyền theo vai trò, bình luận lồng nhau, được đóng gói bằng Docker và đã triển khai thực tế.

## Demo

| Thành phần                | Liên kết                                   |
| ------------------------- | ------------------------------------------ |
| Ứng dụng web              | https://render-proxy-6mhp.onrender.com/    |
| Tài liệu API (Swagger UI) | https://render-proxy-6mhp.onrender.com/api |

Tài khoản demo (quyền admin):

```
Username: admin
Password: 1
```

Bạn cũng có thể tự đăng ký một tài khoản thường ngay trên trang đăng ký. Vui lòng không nhập thông tin nhạy cảm vì đây là trang thử nghiệm.

## Ảnh giao diện

<img src="./docs/login.png" width="400" alt="Mô tả ảnh">

| Danh sách bài viết                                       | Chi tiết bài viết và bình luận                                  |
| -------------------------------------------------------- | --------------------------------------------------------------- |
| <img src="./docs/home.png" height="400" alt="Mô tả ảnh"> | <img src="./docs/detailspost.png" height="400" alt="Mô tả ảnh"> |

## Tính năng

**Xác thực và phân quyền**

- Đăng ký, đăng nhập; mật khẩu được băm bằng bcrypt.
- Xác thực bằng JWT (Bearer token), token có thời hạn cấu hình qua biến môi trường.
- Hai vai trò: `user` và `admin`. Chủ sở hữu hoặc admin mới được sửa/xoá tài nguyên tương ứng.
- Frontend tự gắn token vào mọi request và hỏi đăng nhập lại khi phiên hết hạn (401).

**Bài viết**

- Tạo, xem, sửa, xoá bài viết (xoá mềm bằng `deleted_at`).
- Đính kèm một đường dẫn ảnh cho bài viết (bảng `post_links`, cập nhật theo kiểu upsert trong transaction).
- Hai kiểu phân trang: theo offset (`/v1/posts/pages`) dùng cho giao diện, và theo con trỏ (`/v1/posts`).
- Hiển thị thời điểm chỉnh sửa cuối của bài viết.

**Bình luận**

- Bình luận và trả lời bình luận nhiều cấp (cột `parent_id` tự tham chiếu).
- Sửa bình luận của chính mình; xoá bình luận (chủ sở hữu hoặc admin).

**Người dùng**

- Trang thông tin cá nhân, cập nhật email/mật khẩu.
- API quản trị người dùng (danh sách, xem, xoá) chỉ dành cho admin.

## Công nghệ sử dụng

| Class         | TechStack                                                                         |
| ------------- | --------------------------------------------------------------------------------- |
| Backend       | Node.js 22, Express 5, `pg` (PostgreSQL driver), `jsonwebtoken`, `bcrypt`, `cors` |
| Cơ sở dữ liệu | PostgreSQL 16, quản lý migration bằng `dbmate`                                    |
| Tài liệu API  | `swagger-jsdoc`, `swagger-ui-express` (OpenAPI 3.0)                               |
| Frontend      | React 19, Vite, React Router 7, Tailwind CSS 4, Axios, React Toastify             |
| Kiểm thử      | `node:test` (test runner có sẵn của Node), Supertest                              |
| DevOps        | Docker, Docker Compose, GitHub Actions, Husky (pre-commit)                        |

## Kiến trúc

Backend tổ chức theo từng tính năng (feature-based), mỗi tính năng tách thành các lớp:

```
route  ->  middleware (xác thực, phân quyền, validate)  ->  controller  ->  service  ->  repository  ->  PostgreSQL
```

- `route`: khai báo endpoint và tài liệu Swagger ngay trên route.
- `middleware`: `authenticate` (JWT), `authorization` (owner/admin/role), `validateParams`, xử lý lỗi và 404 tập trung.
- `service`: chứa nghiệp vụ, ném lỗi kèm `statusCode`.
- `repository`: chỉ làm việc với SQL (truy vấn có tham số hoá, chống SQL injection).
- `database/transaction.js`: hàm tiện ích bọc `BEGIN/COMMIT/ROLLBACK` dùng cho các thao tác nhiều bước (ví dụ cập nhật bài viết kèm link).

Cấu trúc thư mục rút gọn:

```
.
├── backend
│   ├── db/migrations          # migration SQL (dbmate)
│   └── src
│       ├── features           # auth, users, posts, comment
│       ├── midlleware         # auth, authorization, validate, error
│       ├── database           # pool, transaction
│       ├── test               # unit và integration
│       └── app.js, server.js
├── frontend
│   └── src
│       ├── features           # auth, posts, comments (components, hooks, services)
│       ├── pages              # các trang và layout điều hướng
│       └── shared             # Button, Form, axios instance
├── docker-compose.yml
└── .github/workflows/test.yml # CI
```

Frontend chia theo mô hình `components -> hooks -> services`: component lo giao diện, hook lo trạng thái loading/error, service lo gọi API qua một Axios instance dùng chung (interceptor gắn token và xử lý 401).

## Cơ sở dữ liệu

Các bảng chính (xem thư mục `backend/db/migrations`):

- `users`: `username`, `email`, `password_hash`, `role`, `deleted_at`.
- `posts`: `title`, `content`, `author_id`, `edited_at`, `deleted_at`; có index theo `(author_id, created_at DESC)`.
- `post_links`: liên kết ảnh của bài viết (`post_id` duy nhất), kiểu enum `link_category`.
- `comments`: `user_id`, `post_id`, `parent_id`, `content`, `deleted_at`.

Các khoá ngoại dùng `ON DELETE CASCADE`; dữ liệu người dùng, bài viết, bình luận được xoá mềm.

## API chính

Toàn bộ endpoint được mô tả và có thể thử trực tiếp tại Swagger UI: `/api`.

| Method | Endpoint                         | Quyền                    | Mô tả                          |
| ------ | -------------------------------- | ------------------------ | ------------------------------ |
| POST   | `/v1/auth/register`              | Công khai                | Đăng ký                        |
| POST   | `/v1/auth/login`                 | Công khai                | Đăng nhập, trả về access token |
| GET    | `/v1/posts/pages?limit=&offset=` | Công khai                | Danh sách bài viết (offset)    |
| GET    | `/v1/posts?post_id=&limit=`      | Công khai                | Danh sách bài viết (con trỏ)   |
| GET    | `/v1/posts/:id`                  | Công khai                | Chi tiết bài viết              |
| POST   | `/v1/posts`                      | Đăng nhập                | Tạo bài viết                   |
| PATCH  | `/v1/posts/:id`                  | Chủ bài viết             | Sửa bài viết                   |
| DELETE | `/v1/posts/:id`                  | Chủ bài viết hoặc admin  | Xoá bài viết                   |
| GET    | `/v1/comments/post/:post_id`     | Công khai                | Bình luận của một bài viết     |
| GET    | `/v1/comments/reply/:parent_id`  | Công khai                | Các phản hồi của một bình luận |
| POST   | `/v1/comments`                   | Đăng nhập                | Tạo bình luận hoặc phản hồi    |
| PATCH  | `/v1/comments/:id`               | Chủ bình luận            | Sửa bình luận                  |
| DELETE | `/v1/comments/:id`               | Chủ bình luận hoặc admin | Xoá bình luận                  |
| GET    | `/v1/users`, `/v1/users/:id`     | Admin                    | Xem người dùng                 |
| PATCH  | `/v1/users/:id`                  | Chủ tài khoản hoặc admin | Cập nhật thông tin             |
| DELETE | `/v1/users/:id`                  | Admin                    | Xoá người dùng                 |

## Chạy dự án trên máy

Yêu cầu: Docker và Docker Compose.

**1. Clone và tạo file môi trường**

```bash
git clone <URL_REPO>
cd <TÊN_THƯ_MỤC>
cp .env.example .env
```

Các biến cần có trong `.env`:

| Biến                                                | Ý nghĩa                                                                                     |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `PORT`                                              | Cổng của API (ví dụ `3000`)                                                                 |
| `DATABASE_URL`                                      | Chuỗi kết nối PostgreSQL, ví dụ `postgres://USER:PASSWORD@postgres:5432/DB?sslmode=disable` |
| `JWT_SECRET`                                        | Khoá bí mật ký JWT                                                                          |
| `JWT_EXPIRES_IN`                                    | Thời hạn token, ví dụ `1h`                                                                  |
| `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB` | Thông tin khởi tạo PostgreSQL                                                               |

**2. Khởi động**

```bash
docker compose up --build
```

**3. Chạy migration (lần đầu)**

```bash
docker compose exec api npm run db:up
```

**4. Truy cập**

- Ứng dụng: http://localhost:5173
- Swagger UI: http://localhost:5173/api (frontend proxy `/v1` và `/api` sang backend)

**5. Tạo tài khoản admin (tuỳ chọn)**

Đăng ký một tài khoản trên giao diện, sau đó nâng quyền trong cơ sở dữ liệu:

```bash
docker compose exec postgres psql -U <POSTGRES_USER> -d <POSTGRES_DB> \
  -c "UPDATE users SET role = 'admin' WHERE username = '<USERNAME>';"
```

Sau đó đăng nhập lại để nhận token mới có quyền admin.

## Kiểm thử

Chạy trong thư mục `backend`:

```bash
# Unit test (không cần database)
npm run test:unit

# Integration test (chạy trong Docker với PostgreSQL riêng, tự migrate)
docker compose --profile test run --rm api-test npm run test:integration:internal
```

- Unit test kiểm tra service và middleware bằng cách mock repository/JWT/bcrypt.
- Integration test gọi API thật qua Supertest trên một database test tạm thời (lưu trên `tmpfs`), phủ các luồng xác thực, bài viết, bình luận, người dùng và các mã lỗi 400/401/403/404/409.

## CI/CD và chất lượng mã

- **GitHub Actions** (`.github/workflows/test.yml`): mỗi lần push hoặc pull request vào `main`/`dev` sẽ chạy unit test, sau đó chạy integration test trong Docker, in log container khi thất bại và dọn dẹp sau cùng.
- **Husky pre-commit**: tự chạy unit test trước mỗi commit.

## Triển khai

Hệ thống chạy bằng Docker Compose trên một máy chủ Linux (gồm các dịch vụ frontend, API và PostgreSQL). Dịch vụ trên Render đóng vai trò proxy công khai, chuyển tiếp truy cập tới stack này, nên địa chỉ demo ở đầu tài liệu là địa chỉ của Render.

## Hướng phát triển

- Bổ sung refresh token và lưu token an toàn hơn (cookie `HttpOnly`).
- Cho phép tải ảnh lên thay vì chỉ dán đường dẫn.
- Thêm giới hạn tần suất request (rate limiting) và validate dữ liệu đầu vào bằng thư viện schema.
- Bổ sung test cho frontend.
