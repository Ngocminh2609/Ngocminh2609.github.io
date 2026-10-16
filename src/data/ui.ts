// Interface copy (labels, headings, buttons). Profile facts live in profile.ts.
import type { Text } from '../lib/i18n'

export const SECTION_IDS = ['experience', 'projects', 'solutions', 'skills', 'approach', 'contact'] as const
export type SectionId = (typeof SECTION_IDS)[number]

export const nav: Record<SectionId, Text> = {
  experience: { en: 'Experience', vi: 'Kinh nghiệm' },
  projects: { en: 'Projects', vi: 'Dự án' },
  solutions: { en: 'Solutions', vi: 'Giải pháp' },
  skills: { en: 'Skills', vi: 'Kỹ năng' },
  approach: { en: 'How I work', vi: 'Cách làm việc' },
  contact: { en: 'Contact', vi: 'Liên hệ' },
}

export const ui = {
  skipToContent: { en: 'Skip to content', vi: 'Bỏ qua, đến nội dung' },
  primaryNav: { en: 'Primary', vi: 'Điều hướng chính' },
  openMenu: { en: 'Open menu', vi: 'Mở menu' },
  closeMenu: { en: 'Close menu', vi: 'Đóng menu' },
  toDark: { en: 'Switch to dark mode', vi: 'Chuyển sang giao diện tối' },
  toLight: { en: 'Switch to light mode', vi: 'Chuyển sang giao diện sáng' },
  language: { en: 'Language', vi: 'Ngôn ngữ' },
  viewProjects: { en: 'See my work', vi: 'Xem dự án' },
  downloadCv: { en: 'Download CV', vi: 'Tải CV' },
  emailMe: { en: 'Email me', vi: 'Gửi email cho tôi' },
  statsLabel: { en: 'Impact at a glance', vi: 'Kết quả nổi bật' },
  solutionsEyebrow: { en: 'How I can help', vi: 'Tôi có thể hỗ trợ gì' },
  solutionsTitle: { en: 'Problems I solve', vi: 'Những vấn đề tôi giải quyết' },
  solutionsIntro: {
    en: 'Real problems, the steps I take to fix them, and where I have shipped the fix.',
    vi: 'Vấn đề thực tế, các bước tôi xử lý, và nơi tôi đã áp dụng thành công.',
  },
  solutionSteps: { en: 'How I handle it', vi: 'Cách tôi xử lý' },
  solutionProof: { en: 'Shipped in', vi: 'Đã áp dụng ở' },
  solutionResult: { en: 'Outcome', vi: 'Kết quả' },
  watchDemo: { en: 'Watch demo video', vi: 'Xem video demo' },
  projectsEyebrow: { en: 'Selected work', vi: 'Dự án tiêu biểu' },
  projectsTitle: { en: 'Projects I have built', vi: 'Dự án tôi đã xây dựng' },
  projectsIntro: {
    en: 'Two end-to-end builds, from architecture and tests to deployment.',
    vi: 'Hai dự án làm trọn vẹn, từ kiến trúc, kiểm thử đến triển khai.',
  },
  pipelineTitle: { en: 'How a run flows', vi: 'Quy trình một lần chạy' },
  pipelineLoop: {
    en: 'A failed E2E check loops back to coding. Nothing is reported as done until it passes.',
    vi: 'E2E thất bại sẽ quay lại bước code. Không có gì được báo là xong cho đến khi test đạt.',
  },
  viewCode: { en: 'View source', vi: 'Xem mã nguồn' },
  experienceEyebrow: { en: 'Experience', vi: 'Kinh nghiệm' },
  experienceTitle: { en: 'Where I have worked', vi: 'Quá trình làm việc' },
  skillsEyebrow: { en: 'Tech stack', vi: 'Công nghệ' },
  skillsTitle: { en: 'Skills & tools', vi: 'Kỹ năng & công cụ' },
  approachEyebrow: { en: 'Principles', vi: 'Nguyên tắc' },
  approachTitle: { en: 'How I work', vi: 'Cách tôi làm việc' },
  educationTitle: { en: 'Education', vi: 'Học vấn' },
  certificationTitle: { en: 'Certification', vi: 'Chứng chỉ' },
  languagesTitle: { en: 'Languages', vi: 'Ngoại ngữ' },
  contactEyebrow: { en: 'Contact', vi: 'Liên hệ' },
  contactTitle: { en: "Let's work together", vi: 'Cùng hợp tác nhé' },
  contactBody: {
    en: 'Hiring, or have a project in mind? Email reaches me fastest.',
    vi: 'Bạn đang tuyển dụng hoặc có dự án phù hợp? Email là cách liên hệ nhanh nhất.',
  },
  copyEmail: { en: 'Copy email', vi: 'Sao chép email' },
  copied: { en: 'Copied!', vi: 'Đã sao chép!' },
  sendEmail: { en: 'Send an email', vi: 'Gửi email' },
  builtWith: { en: 'Built with React & Tailwind CSS.', vi: 'Xây dựng bằng React & Tailwind CSS.' },
  backToTop: { en: 'Back to top', vi: 'Lên đầu trang' },
} satisfies Record<string, Text>
