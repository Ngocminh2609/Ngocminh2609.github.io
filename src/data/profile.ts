// All page content lives here. Facts mirror public/Do-Ngoc-Minh-CV.pdf; update both together.
import type { Text } from '../lib/i18n'
import type { IconName } from '../components/icon'

export type Link = { label: string; handle: string; href: string; icon: IconName }

export type Project = {
  name: string
  subtitle: Text
  period: Text
  summary: Text
  role?: Text
  highlights: Text[]
  tags: string[]
  repo: string
  video?: string
  showPipeline?: boolean
}

export type Solution = {
  icon: IconName
  problem: Text
  steps: Text[]
  result?: { value: string; label: Text }
  proof: Text
  href: string
}

export type Engagement = {
  name: Text
  period: Text
  highlights: Text[]
  tags: string[]
}

const PRESENT: Text = { en: 'Present', vi: 'Nay' }
const since = (start: string): Text => ({ en: `${start} – ${PRESENT.en}`, vi: `${start} – ${PRESENT.vi}` })
const range = (start: string, end: string): Text => ({ en: `${start} – ${end}`, vi: `${start} – ${end}` })

const EMAIL = 'ngocminhlcyl@gmail.com'

export const profile = {
  name: { en: 'Do Ngoc Minh', vi: 'Đỗ Ngọc Minh' } satisfies Text,
  role: { en: 'Full-stack Software Engineer', vi: 'Kỹ sư phần mềm Full-stack' } satisfies Text,
  focus: {
    en: 'Java · TypeScript · AI Code Review & Agentic Tooling',
    vi: 'Java · TypeScript · AI Code Review & công cụ agent',
  } satisfies Text,
  location: { en: 'Hanoi, Vietnam', vi: 'Hà Nội, Việt Nam' } satisfies Text,
  email: EMAIL,
  emailHref: `mailto:${EMAIL}`,
  avatar: '/avatar.jpg',
  cv: '/Do-Ngoc-Minh-CV.pdf',
  pageTitle: {
    en: 'Do Ngoc Minh · Full-stack Software Engineer',
    vi: 'Đỗ Ngọc Minh · Kỹ sư phần mềm Full-stack',
  } satisfies Text,
  intro: {
    en: 'I ship Java/Spring Boot microservices and React/TypeScript front ends for large government data platforms, and I build AI tooling that turns a spec into tested code behind hard review gates.',
    vi: 'Tôi xây dựng microservice Java/Spring Boot và giao diện React/TypeScript cho các nền tảng dữ liệu lớn của cơ quan nhà nước, đồng thời phát triển công cụ AI biến bản đặc tả thành code đã kiểm thử, qua các cổng review bắt buộc.',
  } satisfies Text,
  links: [
    { label: 'GitHub', handle: 'Ngocminh2609', href: 'https://github.com/Ngocminh2609', icon: 'github' },
    { label: 'GitLab', handle: 'ngocminhlcyl', href: 'https://gitlab.com/ngocminhlcyl', icon: 'gitlab' },
    {
      label: 'LinkedIn',
      handle: 'Ngọc Minh Đỗ',
      href: 'https://www.linkedin.com/in/ng%E1%BB%8Dc-minh-%C4%91%E1%BB%97-a4ba332a6/',
      icon: 'linkedin',
    },
  ] satisfies Link[],
}

export const stats: { value: string; label: Text }[] = [
  { value: '1.5+', label: { en: 'years shipping production code', vi: 'năm làm sản phẩm thực tế' } },
  { value: '1,300+', label: { en: 'commits on a 50+ engineer codebase', vi: 'commit trên codebase hơn 50 kỹ sư' } },
  { value: '800+', label: { en: 'merge requests shipped', vi: 'merge request đã bàn giao' } },
  { value: '30→72%', label: { en: 'test coverage raised in aidev', vi: 'độ phủ test nâng lên trong aidev' } },
]

// Problems phrased the way the person who has them would say it; `proof` points to where it was done.
export const solutions: Solution[] = [
  {
    icon: 'database',
    problem: {
      en: 'Slow queries causing sluggish pages and request timeouts',
      vi: 'Hiệu năng truy vấn kém khiến trang tải chậm, request bị timeout',
    },
    steps: [
      {
        en: 'Analyse execution plans to pinpoint the highest-cost queries',
        vi: 'Phân tích execution plan để khoanh vùng các truy vấn có chi phí cao nhất',
      },
      {
        en: 'Diagnose the root cause, such as full table scans on large tables or predicates that bypass existing indexes',
        vi: 'Chẩn đoán nguyên nhân gốc, như full table scan trên bảng dữ liệu lớn hoặc điều kiện truy vấn không tận dụng được index',
      },
      {
        en: 'Rework filter conditions and join keys so the optimizer uses the right index, and add missing indexes, eliminating full table scans and sharply reducing query cost',
        vi: 'Tối ưu điều kiện lọc và khóa join để optimizer chọn đúng index, bổ sung index còn thiếu, loại bỏ full table scan và giảm mạnh query cost',
      },
    ],
    // Approximate figures from the user: ~5 min → ~10 s.
    result: {
      value: '−97%',
      label: {
        en: 'execution time: from ~5 min to ~10 s, about 30× faster',
        vi: 'thời gian thực thi: từ ~5 phút xuống ~10 giây, nhanh gấp ~30 lần',
      },
    },
    proof: {
      en: 'SQL Server on the national statistics platform, MySQL on Tech Nova, PostgreSQL',
      vi: 'SQL Server ở nền tảng thống kê quốc gia, MySQL ở Tech Nova, PostgreSQL',
    },
    href: '#experience',
  },
  {
    icon: 'key',
    problem: {
      en: 'Login, SSO and permissions scattered across services',
      vi: 'Đăng nhập, SSO, phân quyền rời rạc giữa các service',
    },
    steps: [
      { en: 'Centralise identity in Keycloak (OAuth2 / OIDC)', vi: 'Gom định danh về một chỗ bằng Keycloak (OAuth2 / OIDC)' },
      { en: 'Each service validates JWTs as a resource server', vi: 'Mỗi service tự kiểm tra JWT như một resource server' },
      { en: 'Map roles to features with RBAC; add social login where needed', vi: 'Gắn vai trò với tính năng bằng RBAC; thêm đăng nhập Google khi cần' },
    ],
    proof: {
      en: 'Both FPT-IS platforms (SSO) and Tech Nova (Google login)',
      vi: 'Cả hai nền tảng tại FPT-IS (SSO) và Tech Nova (đăng nhập Google)',
    },
    href: '#experience',
  },
  {
    icon: 'layers',
    problem: {
      en: 'Many services that are hard to route, configure and keep in sync',
      vi: 'Nhiều service khó định tuyến, cấu hình và giữ đồng bộ',
    },
    steps: [
      { en: 'One entry point with Spring Cloud Gateway', vi: 'Một cổng vào duy nhất với Spring Cloud Gateway' },
      { en: 'Service discovery and shared config in Consul; async events over Kafka', vi: 'Tìm service và cấu hình chung qua Consul; sự kiện bất đồng bộ qua Kafka' },
      {
        en: 'Or Spring Modulith when one deployable with clear module boundaries fits better',
        vi: 'Hoặc Spring Modulith khi một bản deploy với ranh giới module rõ ràng phù hợp hơn',
      },
    ],
    proof: {
      en: 'Spring Cloud microservices and a Spring Modulith back end at FPT-IS; gateway + services in Tech Nova',
      vi: 'Microservice Spring Cloud và back end Spring Modulith tại FPT-IS; gateway + service trong Tech Nova',
    },
    href: '#experience',
  },
  {
    icon: 'zap',
    problem: { en: 'Users have to refresh to see new data', vi: 'Người dùng phải F5 mới thấy dữ liệu mới' },
    steps: [
      { en: 'Push updates over WebSocket / STOMP, with SockJS as a fallback', vi: 'Đẩy cập nhật qua WebSocket / STOMP, có SockJS dự phòng' },
      { en: 'Subscribe each screen only to the topics it shows', vi: 'Mỗi màn hình chỉ đăng ký những topic nó hiển thị' },
    ],
    proof: {
      en: 'Real-time updates on the statistics platform; live statistics and chat in Tech Nova',
      vi: 'Cập nhật thời gian thực ở nền tảng thống kê; thống kê và chat trực tiếp trong Tech Nova',
    },
    href: '#projects',
  },
  {
    icon: 'card',
    problem: { en: 'Integrating a payment gateway safely', vi: 'Tích hợp cổng thanh toán an toàn' },
    steps: [
      { en: 'Keep secrets and request signing on the server', vi: 'Giữ khóa bí mật và việc ký request ở phía server' },
      { en: 'Sign payment requests with HMAC-SHA512 as the gateway requires', vi: 'Ký request thanh toán bằng HMAC-SHA512 theo yêu cầu của cổng' },
    ],
    proof: { en: 'VNPay in Tech Nova', vi: 'VNPay trong Tech Nova' },
    href: '#projects',
  },
  {
    icon: 'form',
    problem: { en: 'Forms that change every survey cycle', vi: 'Biểu mẫu thay đổi liên tục theo từng kỳ khảo sát' },
    steps: [
      { en: 'Render forms from a schema (Form.io) instead of hard-coding each one', vi: 'Dựng biểu mẫu từ schema (Form.io) thay vì code cứng từng form' },
      { en: 'Keep validation and data shape in the schema', vi: 'Để validation và cấu trúc dữ liệu nằm trong schema' },
    ],
    proof: { en: 'Dynamic survey forms on the business statistics platform', vi: 'Biểu mẫu khảo sát động ở nền tảng thống kê doanh nghiệp' },
    href: '#experience',
  },
  {
    icon: 'shield',
    problem: {
      en: 'AI-generated code that looks right but breaks the rules',
      vi: 'Code do AI sinh ra trông đúng nhưng sai quy tắc nghiệp vụ',
    },
    steps: [
      { en: 'Write domain rules the coding assistant must follow', vi: 'Viết quy tắc nghiệp vụ mà trợ lý code bắt buộc tuân theo' },
      { en: 'Put hard review gates between design, code and QA', vi: 'Đặt cổng review bắt buộc giữa thiết kế, code và QA' },
      { en: 'Verify the result in a real browser, and fail loudly', vi: 'Kiểm chứng trên trình duyệt thật, sai thì báo lỗi rõ ràng' },
    ],
    proof: {
      en: 'aidev pipeline; AI guidelines for DDI / GSIM / GSBPM at FPT-IS',
      vi: 'Pipeline aidev; bộ hướng dẫn AI cho DDI / GSIM / GSBPM tại FPT-IS',
    },
    href: '#projects',
  },
  {
    icon: 'checkCircle',
    problem: { en: 'Code nobody dares to change because there are no tests', vi: 'Code không ai dám sửa vì thiếu test' },
    steps: [
      { en: 'Cover the riskiest paths first, then broaden', vi: 'Phủ test cho những luồng rủi ro nhất trước, rồi mở rộng dần' },
      { en: 'Run tests and coverage in CI on every merge request', vi: 'Chạy test và đo coverage trong CI ở mỗi merge request' },
    ],
    proof: {
      en: 'aidev coverage 30% → 72% (36 Vitest suites); JUnit in Tech Nova; GitLab CI test stage at FPT-IS',
      vi: 'aidev coverage 30% → 72% (36 bộ Vitest); JUnit trong Tech Nova; bước test GitLab CI tại FPT-IS',
    },
    href: '#projects',
  },
]

export const projects: Project[] = [
  {
    name: 'aidev',
    subtitle: { en: 'Multi-agent software-engineering pipeline', vi: 'Pipeline phát triển phần mềm đa agent' },
    period: since('08/2026'),
    summary: {
      en: 'A local CLI and web UI on the Claude Agent SDK. It takes a Markdown spec and a target repo, gets the design reviewed, implements it, and verifies it in a real browser.',
      vi: 'CLI và web UI chạy local trên Claude Agent SDK. Nhận một bản đặc tả Markdown và repo đích, đưa thiết kế qua review, triển khai code, rồi kiểm chứng trên trình duyệt thật.',
    },
    highlights: [
      {
        en: 'Direct SDK query() calls give every stage a hard approval gate; a failed run exits non-zero with the reason instead of reporting false success.',
        vi: 'Gọi query() trực tiếp từ SDK để mỗi bước có cổng duyệt bắt buộc; lần chạy thất bại sẽ thoát với mã lỗi kèm lý do, không báo thành công giả.',
      },
      {
        en: 'Safety by design: read-only reference repos enforced by canUseTool path checks, no git access, DB connection strings never logged, localhost-only UI.',
        vi: 'An toàn từ thiết kế: repo tham chiếu chỉ-đọc nhờ kiểm tra đường dẫn trong canUseTool, không truy cập git, không bao giờ ghi log chuỗi kết nối DB, UI chỉ chạy localhost.',
      },
      {
        en: 'Resumable checkpoints per stage; clone mode ports features between repos with deterministic (no-LLM) coverage and wiring checks.',
        vi: 'Checkpoint theo từng bước để chạy tiếp được; chế độ clone chuyển tính năng giữa các repo, kiểm tra độ phủ và kết nối bằng logic tất định (không dùng LLM).',
      },
      {
        en: 'Raised test coverage from 30% to 72% across 36 Vitest suites, with per-stage token and cost tracking.',
        vi: 'Nâng độ phủ test từ 30% lên 72% với 36 bộ test Vitest, theo dõi token và chi phí từng bước.',
      },
    ],
    tags: ['TypeScript', 'Node.js', 'Claude Agent SDK', 'Playwright', 'Vitest'],
    repo: 'https://github.com/Ngocminh2609/claude-sdlc-agents',
    showPipeline: true,
  },
  {
    name: 'Tech Nova',
    subtitle: { en: 'Full-stack e-commerce platform', vi: 'Nền tảng thương mại điện tử full-stack' },
    period: range('02/2026', '08/2026'),
    summary: {
      en: 'A tech-store site with catalog, cart, VNPay payments, an admin console, real-time statistics and chat.',
      vi: 'Website bán đồ công nghệ với danh mục sản phẩm, giỏ hàng, thanh toán VNPay, trang quản trị, thống kê và chat thời gian thực.',
    },
    role: { en: 'Sole developer · 81 commits', vi: 'Phát triển một mình · 81 commit' },
    highlights: [
      {
        en: 'Microservices: Spring Cloud Gateway with reactive Redis, a core service and an S3-compatible file service (Java 21, Spring Boot 3.5).',
        vi: 'Microservice: Spring Cloud Gateway với Redis reactive, một core service và một file service tương thích S3 (Java 21, Spring Boot 3.5).',
      },
      {
        en: 'Keycloak OAuth2 resource server with Google login, VNPay payment signing with HMAC-SHA512, WebSocket/STOMP for live statistics and chat.',
        vi: 'Keycloak OAuth2 resource server có đăng nhập Google, ký thanh toán VNPay bằng HMAC-SHA512, WebSocket/STOMP cho thống kê và chat trực tiếp.',
      },
      {
        en: 'React 19 + TypeScript + Vite PWA front end with Ant Design 6 and React Router 7.',
        vi: 'Front end PWA bằng React 19 + TypeScript + Vite, dùng Ant Design 6 và React Router 7.',
      },
      {
        en: 'Docker Compose locally (MySQL 8.4, Redis 7, MinIO, Keycloak); deployed to Vercel (front end) and Render + Backblaze B2 (back end), with JUnit tests for services, controllers and SQL contracts.',
        vi: 'Chạy local bằng Docker Compose (MySQL 8.4, Redis 7, MinIO, Keycloak); deploy lên Vercel (front end) và Render + Backblaze B2 (back end), có JUnit test cho service, controller và SQL contract.',
      },
    ],
    tags: ['Java 21', 'Spring Boot', 'Spring Cloud Gateway', 'React 19', 'Keycloak', 'Docker'],
    repo: 'https://github.com/Ngocminh2609/website_application',
    // The live servers are down; the recorded demo is the way to see it running.
    video: 'https://drive.google.com/drive/u/0/folders/1K3w86kS8xo6fcma-uzUWslflQCTaftG6',
  },
]

export const pipelineSteps: { label: Text; detail: Text }[] = [
  { label: { en: 'Spec', vi: 'Đặc tả' }, detail: { en: 'Markdown + target repo', vi: 'Markdown + repo đích' } },
  { label: { en: 'Design review', vi: 'Review thiết kế' }, detail: { en: 'approve / amend / reject, ≤ 3 rounds', vi: 'duyệt / sửa / từ chối, tối đa 3 vòng' } },
  { label: { en: 'Task breakdown', vi: 'Chia task' }, detail: { en: 'small, ordered tasks', vi: 'task nhỏ, có thứ tự' } },
  { label: { en: 'Code + unit tests', vi: 'Code + unit test' }, detail: { en: 'per task', vi: 'theo từng task' } },
  { label: { en: 'E2E / QA', vi: 'E2E / QA' }, detail: { en: 'Playwright, real browser', vi: 'Playwright, trình duyệt thật' } },
]

export const experience = {
  company: 'FPT-IS',
  role: { en: 'Fullstack Developer', vi: 'Lập trình viên Fullstack' } satisfies Text,
  period: since('02/2025'),
  location: { en: 'Hanoi, Vietnam', vi: 'Hà Nội, Việt Nam' } satisfies Text,
  engagements: [
    {
      name: {
        en: 'Statistical microdata platform: metadata registry and microdata hub',
        vi: 'Nền tảng vi dữ liệu thống kê: metadata registry và microdata hub',
      },
      period: since('07/2026'),
      highlights: [
        {
          en: 'Top committer on both back end and front end since joining the project.',
          vi: 'Người có nhiều commit nhất ở cả back end lẫn front end kể từ khi tham gia dự án.',
        },
        {
          en: 'Back end: Java 25, Spring Boot 4 and Spring Modulith modules (approval flow, auth, category, organization, user), with Micrometer tracing, Redis, MinIO, Consul and Keycloak.',
          vi: 'Back end: Java 25, Spring Boot 4 và các module Spring Modulith (luồng phê duyệt, xác thực, danh mục, tổ chức, người dùng), cùng Micrometer tracing, Redis, MinIO, Consul và Keycloak.',
        },
        {
          en: 'Front end: React 19 + TypeScript with UmiJS Max, Ant Design 6 + ProComponents, TanStack Query and Tailwind, plus Keycloak SSO.',
          vi: 'Front end: React 19 + TypeScript với UmiJS Max, Ant Design 6 + ProComponents, TanStack Query và Tailwind, kèm Keycloak SSO.',
        },
        {
          en: 'Wrote AI coding-assistant guidelines for statistical metadata standards (DDI-L 3.3, GSIM 2.0, GSBPM 5.2), statistical disclosure control and access control, so that AI-generated code follows the domain rules.',
          vi: 'Viết bộ hướng dẫn cho trợ lý code AI về chuẩn metadata thống kê (DDI-L 3.3, GSIM 2.0, GSBPM 5.2), kiểm soát công bố số liệu và phân quyền truy cập, để code do AI sinh ra tuân thủ quy tắc nghiệp vụ.',
        },
      ],
      tags: ['Java 25', 'Spring Boot 4', 'Spring Modulith', 'React 19', 'UmiJS', 'Tailwind'],
    },
    {
      name: {
        en: 'Business statistics platform for a national statistics agency',
        vi: 'Nền tảng thống kê doanh nghiệp cho cơ quan thống kê quốc gia',
      },
      period: range('02/2025', '06/2026'),
      highlights: [
        {
          en: 'Full-stack developer on a 50+ engineer team: 1,270+ non-merge commits (917 front end, 354 back end); one of the top four front-end contributors.',
          vi: 'Lập trình viên full-stack trong team hơn 50 kỹ sư: hơn 1.270 commit (917 front end, 354 back end); một trong bốn người đóng góp front end nhiều nhất.',
        },
        {
          en: "Shipped 800+ merge requests through the team's GitLab merge-request workflow.",
          vi: 'Bàn giao hơn 800 merge request qua quy trình merge request trên GitLab của team.',
        },
        {
          en: 'Back end: Java 21, Spring Boot 3.5 and Spring Cloud microservices in a Maven multi-module build, with SQL Server, Redis, Kafka, MinIO, Consul and Keycloak OAuth2/JWT.',
          vi: 'Back end: microservice Java 21, Spring Boot 3.5 và Spring Cloud trong build Maven multi-module, dùng SQL Server, Redis, Kafka, MinIO, Consul và Keycloak OAuth2/JWT.',
        },
        {
          en: 'Front end: React 18 + TypeScript in a pnpm monorepo with Vite, Ant Design, Redux, Form.io dynamic survey forms and real-time updates over STOMP/SockJS.',
          vi: 'Front end: React 18 + TypeScript trong pnpm monorepo với Vite, Ant Design, Redux, biểu mẫu khảo sát động Form.io và cập nhật thời gian thực qua STOMP/SockJS.',
        },
        {
          en: 'Delivery: GitLab CI pipelines (validate → test with JUnit reports and coverage → build) and Kubernetes deployments.',
          vi: 'Triển khai: pipeline GitLab CI (validate → test có báo cáo JUnit và coverage → build) và deploy lên Kubernetes.',
        },
      ],
      tags: ['Java 21', 'Spring Cloud', 'Kafka', 'React 18', 'Redux', 'Kubernetes'],
    },
  ] satisfies Engagement[],
}

export const skills: { group: Text; items: string[] }[] = [
  { group: { en: 'Languages', vi: 'Ngôn ngữ' }, items: ['Java', 'TypeScript', 'JavaScript', 'SQL'] },
  {
    group: { en: 'Back end', vi: 'Back end' },
    items: ['Spring Boot 3/4', 'Spring Cloud Gateway', 'Spring Modulith', 'Node.js (Fastify, Express)', 'REST', 'WebSocket/STOMP', 'Kafka'],
  },
  {
    group: { en: 'Front end', vi: 'Front end' },
    items: ['React 18/19', 'TypeScript', 'Vite', 'Ant Design', 'Redux', 'TanStack Query', 'UmiJS', 'Tailwind'],
  },
  { group: { en: 'Data', vi: 'Dữ liệu' }, items: ['SQL Server', 'MySQL', 'PostgreSQL', 'Redis', 'MinIO / S3'] },
  { group: { en: 'Security', vi: 'Bảo mật' }, items: ['Keycloak', 'OAuth2 / OIDC', 'JWT', 'RBAC', 'HMAC request signing'] },
  {
    group: { en: 'AI / LLM', vi: 'AI / LLM' },
    items: ['Claude Agent SDK', 'Gemini API / Veo', 'Vertex AI', 'Multi-agent orchestration', 'Prompt engineering', 'Claude Code / Cursor / Codex'],
  },
  {
    group: { en: 'Testing & quality', vi: 'Kiểm thử & chất lượng' },
    items: ['Vitest', 'JUnit', 'Jest', 'Playwright E2E', 'Code review', 'Systematic debugging'],
  },
  {
    group: { en: 'DevOps', vi: 'DevOps' },
    items: ['Docker', 'Kubernetes', 'Consul', 'GitLab CI', 'GitHub Actions', 'Vercel / Render'],
  },
]

export const approach: { icon: IconName; title: Text; body: Text }[] = [
  {
    icon: 'code',
    title: { en: 'Read code critically', vi: 'Đọc code có phản biện' },
    body: {
      en: 'Correctness first: edge cases, contracts, security. Then clarity. Code written by people and code written by AI meet the same bar.',
      vi: 'Đúng trước: trường hợp biên, hợp đồng API, bảo mật. Sau đó mới đến dễ đọc. Code do người viết hay AI viết đều qua cùng một tiêu chuẩn.',
    },
  },
  {
    icon: 'target',
    title: { en: 'Debug systematically', vi: 'Debug có hệ thống' },
    body: {
      en: 'Reproduce, isolate, prove the root cause, then fix, and leave a test behind so it stays fixed.',
      vi: 'Tái hiện, khoanh vùng, chứng minh nguyên nhân gốc rồi mới sửa, và để lại một test để lỗi không quay lại.',
    },
  },
  {
    icon: 'pen',
    title: { en: 'Write the trade-offs down', vi: 'Viết rõ các đánh đổi' },
    body: {
      en: 'Options, reasons and risks go in writing, so reviewers and future teammates can follow a decision.',
      vi: 'Phương án, lý do và rủi ro đều được viết ra, để người review và đồng đội sau này hiểu được quyết định.',
    },
  },
  {
    icon: 'shield',
    title: { en: 'AI with guardrails', vi: 'Dùng AI có rào chắn' },
    body: {
      en: 'Hard review gates, domain rules for coding assistants, and checks that fail loudly instead of reporting false success.',
      vi: 'Cổng review bắt buộc, quy tắc nghiệp vụ cho trợ lý code, và các bước kiểm tra báo lỗi rõ ràng thay vì báo thành công giả.',
    },
  },
]

export const background = {
  education: {
    school: { en: 'Electric Power University', vi: 'Trường Đại học Điện lực' } satisfies Text,
    degree: { en: "Engineer's Degree · Software Engineering", vi: 'Kỹ sư · Kỹ thuật phần mềm' } satisfies Text,
    period: '2020 – 2025',
  },
  certification: {
    name: 'AI-Driven Software Development Life-Cycle',
    issuer: {
      en: 'SOICT, Hanoi University of Science and Technology',
      vi: 'SOICT, Đại học Bách khoa Hà Nội',
    } satisfies Text,
    date: '07/2026',
  },
  languages: [
    { name: { en: 'Vietnamese', vi: 'Tiếng Việt' }, level: { en: 'Native', vi: 'Bản ngữ' }, dots: 5 },
    {
      name: { en: 'English', vi: 'Tiếng Anh' },
      level: { en: 'Limited working proficiency (technical reading & writing)', vi: 'Đọc & viết tài liệu kỹ thuật' },
      dots: 2,
    },
  ] satisfies { name: Text; level: Text; dots: number }[],
}
