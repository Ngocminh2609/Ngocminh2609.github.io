# My_Profile

Trang profile cá nhân song ngữ (EN/VI) của Đỗ Ngọc Minh: React 19 + Vite 8 + TypeScript + Tailwind CSS 4.

## Chạy

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + build ra dist/
npm run preview   # xem bản build
```

## Sửa nội dung

| Muốn đổi | File |
|---|---|
| Thông tin, dự án, kinh nghiệm, kỹ năng, số liệu | `src/data/profile.ts` |
| Nhãn menu, tiêu đề mục, chữ trên nút | `src/data/ui.ts` |
| Ảnh đại diện | `public/avatar.jpg` (nên dùng ảnh vuông ≥ 400×400) |
| File CV để tải | `public/Do-Ngoc-Minh-CV.pdf` |

Mỗi đoạn chữ là `{ en, vi }`. Nội dung bám theo CV PDF, nên khi cập nhật CV thì sửa cả `profile.ts`.

## Cấu trúc

```
src/
  data/        nội dung (profile.ts) + chữ giao diện (ui.ts)
  lib/         i18n, theme sáng/tối, lưu lựa chọn, theo dõi mục đang xem
  components/  header, hero, projects (kèm sơ đồ pipeline), experience,
               skills, approach (+ học vấn/ngoại ngữ), contact, footer
```

Ngôn ngữ mặc định theo trình duyệt (`vi*` → VI, còn lại → EN). Theme mặc định theo hệ điều hành. Cả hai được nhớ trong `localStorage`.

## Deploy

Vercel: import repo, framework **Vite**, build `npm run build`, output `dist`.
