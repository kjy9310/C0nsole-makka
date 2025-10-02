# C0nsole-makka

Next.js와 MDX를 기반으로 한 DOS/터미널 테마의 인터랙티브 블로그입니다.

## ✨ 주요 특징

- **DOS 터미널 스타일 UI**: 독특한 레트로 감성의 사용자 인터페이스를 제공합니다.
- **MDX 기반 컨텐츠**: 마크다운 파일(`.mdx`) 내에 React 컴포넌트를 직접 사용하여 동적인 컨텐츠를 쉽게 작성할 수 있습니다.
- **자동 포스트 목록 생성**: 새 포스트를 추가하고 서버를 실행하면 자동으로 포스트 목록이 업데이트됩니다.

## 🚀 기술 스택

- **Framework**: [Next.js](https://nextjs.org/)
- **UI Library**: [React](https://reactjs.org/)
- **Content**: [MDX](https://mdxjs.com/)
- **Styling**: [Styled Components](https://styled-components.com/) (및 인라인 스타일)

## 🏁 시작하기

1.  **의존성 설치**
    ```bash
    npm install
    ```

2.  **개발 서버 실행**
    ```bash
    npm run dev
    ```
    - 이 명령어를 실행하면 `scripts/generate-blog-list-js.js`가 먼저 실행되어 포스트 목록을 자동으로 업데이트한 후, 개발 서버가 시작됩니다.
    - 브라우저에서 `http://localhost:3000`으로 접속하세요.

## ✍️ 블로그 포스트 작성 및 관리

새로운 블로그 포스트를 작성하는 과정은 매우 간단합니다.

1.  `pages/blog` 디렉토리 안에 새로운 `.mdx` 파일을 생성합니다.
2.  파일의 이름이 URL의 경로(slug)가 됩니다. 예를 들어, `hello-world.mdx` 파일은 `/blog/hello-world` 주소로 접근할 수 있습니다.
3.  파일 상단에 `frontmatter`를 사용하여 제목 등의 메타데이터를 추가할 수 있습니다.

    ```mdx
    ---
    title: '나의 첫 포스트'
    date: '2025-10-01'
    ---

    여기에 포스트 내용을 작성하세요.

    ## 마크다운 문법 사용 가능

    - 리스트 1
    - 리스트 2

    > 인용문도 멋지게 표시됩니다.
    ```

4.  `npm run dev`를 실행 중이었다면, 파일을 저장하는 것만으로 대부분의 변경사항이 반영됩니다. 만약 포스트 목록이 갱신되지 않으면 서버를 재시작하세요.

## 🎨 스타일 및 테마 커스터마이징

이 프로젝트의 DOS 테마는 주로 인라인 스타일과 Styled Components로 구현되어 있습니다.

- **전역적인 터미널 스타일**: `components/DosPrompt.jsx` 컴포넌트에서 주된 터미널 UI의 스타일을 찾고 수정할 수 있습니다.
- **블로그 포스트 스타일**: `pages/blog/[slug].js` 파일과 `components/BlogViewer.jsx` 에 정의된 스타일(폰트, 색상, 배경 등)을 수정하여 개별 포스트의 디자인을 변경할 수 있습니다.
  - **주요 스타일 속성**:
    - `fontFamily`: `'Courier New', monospace`
    - `color`: `'#0f0'` (녹색 텍스트)
    - `background`: `'#000'` (검은색 배경)

## 🛠️ 주요 스크립트

- `npm run dev`: 개발 서버를 시작합니다. (포스트 목록 자동 생성 포함)
- `npm run build`: 프로덕션용으로 프로젝트를 빌드합니다.
- `npm run start`: 빌드된 프로덕션 서버를 시작합니다.
- `npm run generate:blog-list`: `pages/blog` 디렉토리의 `.mdx` 파일 목록을 읽어 `data/blogList.js` 파일을 수동으로 생성/업데이트합니다.
