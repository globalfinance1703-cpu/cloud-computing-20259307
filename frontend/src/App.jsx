import { useState } from "react";
import About from "./pages/About.jsx";
import MemoLab from "./pages/MemoLab.jsx";

export default function App() {
  const [page, setPage] = useState("about");

  return (
    <div className="shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">CC</span>
          <div>
            <strong>클라우드컴퓨팅실습</strong>
            <p>개인 소개 · 프론트엔드 · 백엔드 연동</p>
          </div>
        </div>
        <nav>
          <button
            className={page === "about" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPage("about")}
          >
            개인 소개
          </button>
          <button
            className={page === "lab" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPage("lab")}
          >
            API 연동 실습
          </button>
        </nav>
      </header>

      <main>{page === "about" ? <About onOpenLab={() => setPage("lab")} /> : <MemoLab />}</main>

      <footer className="foot">
        <span>9월 22일 제출 · Vercel + Render + GitHub</span>
        <button className="linkish" onClick={() => setPage(page === "about" ? "lab" : "about")}>
          {page === "about" ? "연동 실습으로 이동 →" : "← 소개로 돌아가기"}
        </button>
      </footer>
    </div>
  );
}
