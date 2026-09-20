import { useEffect, useState } from "react";
import { API_URL, fetchJson } from "../api.js";

const FALLBACK = {
  name: "이동주",
  affiliation: "디지털금융MBA",
  student_id: "20259307",
  role: "디지털금융MBA · 클라우드컴퓨팅실습",
  tagline: "화면에서 서버까지, 한 흐름으로 연결하는 법을 배우는 중",
  about:
    "디지털금융MBA 이동주입니다. 학번 20259307. 웹이 요청과 응답으로 움직인다는 것부터 시작해, React 화면이 FastAPI를 호출하고 그 결과가 다시 화면에 나타나는 풀스택 흐름을 직접 만들어 보고 있습니다.",
  skills: ["HTML/CSS", "Git · GitHub", "React (Vite)", "FastAPI", "Vercel · Render"],
  weeks: [
    {
      week: "1주차",
      title: "웹 기초와 Git",
      detail: "HTML · CSS · JavaScript로 화면을 만들고, GitHub에 코드를 올리는 흐름을 익혔습니다.",
    },
    {
      week: "2주차",
      title: "최소 코드 풀스택",
      detail: "메모 앱으로 프론트 → 백엔드 → 저장소를 잇고, 클라우드 배포를 경험했습니다.",
    },
    {
      week: "3주차",
      title: "FastAPI 백엔드 기초",
      detail: "Pydantic 검증과 Swagger UI로 API를 설계하고 테스트하는 방법을 배웠습니다.",
    },
  ],
};

export default function About({ onOpenLab }) {
  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await fetchJson("/profile");
        if (!cancelled) {
          setProfile(data);
          setStatus("ok");
        }
      } catch (err) {
        if (!cancelled) {
          setProfile(FALLBACK);
          setStatus("fallback");
          setError(err.message);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const data = profile || FALLBACK;

  return (
    <div className="page">
      <section className="hero">
        <p className="eyebrow">About</p>
        <h1>{data.name}</h1>
        <p className="role">{data.role}</p>
        <dl className="meta">
          <div>
            <dt>소속</dt>
            <dd>{data.affiliation}</dd>
          </div>
          <div>
            <dt>학번</dt>
            <dd>{data.student_id}</dd>
          </div>
        </dl>
        <p className="tagline">{data.tagline}</p>
        <div className="hero-actions">
          <button className="primary" onClick={onOpenLab}>
            API 연동 실습 보기
          </button>
          <a className="ghost" href={`${API_URL}/docs`} target="_blank" rel="noreferrer">
            Swagger UI 열기
          </a>
        </div>
      </section>

      <section className="card api-card">
        <div className="card-head">
          <h2>백엔드 연동 상태</h2>
          <span className={`badge ${status}`}>
            {status === "loading" && "호출 중"}
            {status === "ok" && "GET /profile 성공"}
            {status === "fallback" && "로컬 소개로 표시"}
          </span>
        </div>
        {status === "ok" && (
          <p>
            이 소개 내용은 화면이 아니라 <strong>Render FastAPI의 <code>/profile</code></strong>에서
            받아 온 결과입니다. 아래 학습 기록도 같은 JSON입니다.
          </p>
        )}
        {status === "fallback" && (
          <p>
            API에 잠시 닿지 않아 화면에 준비해 둔 소개를 보여 줍니다. Render 무료 플랜은 처음
            접속할 때 서버를 깨우는 데 30~60초가 걸릴 수 있습니다.
            {error ? ` (${error.slice(0, 80)})` : ""}
          </p>
        )}
        {status === "loading" && <p>백엔드에서 소개 데이터를 불러오는 중입니다.</p>}
        <p className="mono">API: {API_URL}</p>
      </section>

      <section className="card">
        <h2>소개</h2>
        <p>{data.about}</p>
        <ul className="chips">
          {data.skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </section>

      <section className="weeks">
        <h2>이번 학기 학습</h2>
        <div className="week-grid">
          {data.weeks.map((item) => (
            <article key={item.week} className="card week">
              <p className="eyebrow">{item.week}</p>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="card stack">
        <h2>이 과제의 구성</h2>
        <ol className="layers">
          <li>
            <strong>프론트엔드 · Vercel</strong>
            <span>개인 소개와 메모 연동 화면</span>
          </li>
          <li>
            <strong>백엔드 · Render</strong>
            <span>FastAPI + Swagger UI (`/docs`)</span>
          </li>
          <li>
            <strong>코드 · GitHub</strong>
            <span>소스와 README를 한 저장소에서 관리</span>
          </li>
        </ol>
      </section>
    </div>
  );
}
