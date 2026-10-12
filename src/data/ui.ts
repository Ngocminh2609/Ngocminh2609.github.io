// Interface copy (labels, headings, buttons). Profile facts live in profile.ts.
import type { Text } from '../lib/i18n'

export const SECTION_IDS = ['solutions', 'projects', 'experience', 'skills', 'approach', 'contact'] as const
export type SectionId = (typeof SECTION_IDS)[number]

export const nav: Record<SectionId, Text> = {
  solutions: { en: 'Solutions', vi: 'Giải pháp' },
  projects: { en: 'Projects', vi: 'Dự án' },
  experience: { en: 'Experience', vi: 'Kinh nghiệm' },
  skills: { en: 'Skills', vi: 'Kỹ năng' },
  approach: { en: 'How I work', vi: 'Cách làm việc' },
  contact: { en: 'Contact', vi: 'Liên hệ' },
}

export const ui = {
  skipToContent: { en: 'Skip to content', vi: 'Bỏ qua, đến nội dung' },
  openMenu: { en: 'Open menu', vi: 'Mở menu' },
  closeMenu: { en: 'Close menu', vi: 'Đóng menu' },
  toDark: { en: 'Switch to dark mode', vi: 'Chuyển sang giao diện tối' },
  toLight: { en: 'Switch to light mode', vi: 'Chuyển sang giao diện sáng' },
  language: { en: 'Language', vi: 'Ngôn ngữ' },
  greeting: { en: "Hi, I'm", vi: 'Xin chào, tôi là' },
  viewProjects: { en: 'See my work', vi: 'Xem dự án' },
  downloadCv: { en: 'Download CV', vi: 'Tải CV' },
  statsLabel: { en: 'Highlights in numbers', vi: 'Một vài con số' },
  solutionsEyebrow: { en: 'What I can help with', vi: 'Tôi có thể giúp gì' },
  solutionsTitle: { en: 'Problems I solve', vi: 'Những vấn đề tôi giải quyết' },
  solutionsIntro: {
    en: 'Concrete problems, how I approach them, and where I have already done it.',
    vi: 'Vấn đề cụ thể, cách tôi xử lý, và nơi tôi đã làm thực tế.',
  },
  solutionSteps: { en: 'How I handle it', vi: 'Cách tôi xử lý' },
  solutionProof: { en: 'Done in', vi: 'Đã làm ở' },
  solutionResult: { en: 'Result', vi: 'Kết quả' },
  watchDemo: { en: 'Watch demo video', vi: 'Xem video demo' },
  projectsEyebrow: { en: 'Selected work', vi: 'Dự án tiêu biểu' },
  projectsTitle: { en: 'Things I have built', vi: 'Những gì tôi đã xây dựng' },
  projectsIntro: {
    en: 'Two projects that show how I work end to end: from architecture to tests to deployment.',
    vi: 'Hai dự án cho thấy cách tôi làm từ đầu đến cuối: từ kiến trúc, kiểm thử đến triển khai.',
  },
  pipelineTitle: { en: 'How a run flows', vi: 'Một lần chạy diễn ra thế nào' },
  pipelineLoop: {
    en: 'A failed E2E check loops back to coding. Nothing is reported as done until it passes.',
    vi: 'E2E thất bại sẽ quay lại bước code. Không có gì được báo là xong cho đến khi test đạt.',
  },
  viewCode: { en: 'View source', vi: 'Xem mã nguồn' },
  experienceEyebrow: { en: 'Experience', vi: 'Kinh nghiệm' },
  experienceTitle: { en: 'Where I work', vi: 'Nơi tôi làm việc' },
  skillsEyebrow: { en: 'Toolbox', vi: 'Công cụ' },
  skillsTitle: { en: 'Skills & technologies', vi: 'Kỹ năng & công nghệ' },
  approachEyebrow: { en: 'Principles', vi: 'Nguyên tắc' },
  approachTitle: { en: 'How I work', vi: 'Cách tôi làm việc' },
  educationTitle: { en: 'Education', vi: 'Học vấn' },
  certificationTitle: { en: 'Certification', vi: 'Chứng chỉ' },
  languagesTitle: { en: 'Languages', vi: 'Ngoại ngữ' },
  contactEyebrow: { en: 'Contact', vi: 'Liên hệ' },
  contactTitle: { en: "Let's talk", vi: 'Cùng trò chuyện nhé' },
  contactBody: {
    en: 'Have a role or a project in mind? Email is the best way to reach me.',
    vi: 'Bạn có vị trí hoặc dự án phù hợp? Email là cách tốt nhất để liên hệ với tôi.',
  },
  copyEmail: { en: 'Copy email', vi: 'Sao chép email' },
  copied: { en: 'Copied!', vi: 'Đã sao chép!' },
  sendEmail: { en: 'Send an email', vi: 'Gửi email' },
  builtWith: { en: 'Built with React & Tailwind CSS.', vi: 'Xây dựng bằng React & Tailwind CSS.' },
  backToTop: { en: 'Back to top', vi: 'Lên đầu trang' },
} satisfies Record<string, Text>
