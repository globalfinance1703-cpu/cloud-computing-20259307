import { useEffect, useState } from "react";
import { API_URL, fetchJson } from "../api.js";

export default function MemoLab() {
  const [memos, setMemos] = useState([]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("서버에서 메모를 불러오는 중…");
  const [ok, setOk] = useState(false);

  const loadMemos = async () => {
    const data = await fetchJson("/memos");
    setMemos(data);
    setOk(true);
    setMessage(`GET /memos 성공 · ${data.length}개`);
  };

  useEffect(() => {
    loadMemos().catch((err) => {
      setOk(false);
      setMessage(
        `백엔드에 연결하지 못했습니다. Render가 잠들어 있으면 30~60초 뒤 다시 눌러 보세요. ${err.message}`
      );
    });
  }, []);

  const addMemo = async () => {
    if (!text.trim()) return;
    setBusy(true);
    try {
      await fetchJson("/memos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text }),
      });
      setText("");
      await loadMemos();
    } catch (err) {
      setOk(false);
      setMessage(`추가에 실패했습니다. ${err.message}`);
    } finally {
      setBusy(false);
    }
  };

  const deleteMemo = async (id) => {
    setBusy(true);
    try {
      await fetch(`${API_URL}/memos/${id}`, { method: "DELETE" });
      await loadMemos();
    } catch (err) {
      setOk(false);
      setMessage(`삭제에 실패했습니다. ${err.message}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="page lab">
      <section className="hero compact">
        <p className="eyebrow">Lab</p>
        <h1>📝 메모장 · FastAPI 연동</h1>
        <p className="tagline">
          2주차 실습워크북과 같은 흐름입니다. 화면의 추가·삭제가 Render 백엔드의
          <code> POST /memos</code>, <code> DELETE /memos/{"{id}"}</code>를 호출합니다.
        </p>
      </section>

      <section className={`card api-card ${ok ? "good" : ""}`}>
        <div className="card-head">
          <h2>호출 결과</h2>
          <span className={`badge ${ok ? "ok" : "fallback"}`}>{ok ? "연결됨" : "대기/오류"}</span>
        </div>
        <p>{message}</p>
        <p className="mono">
          {API_URL}/memos ·{" "}
          <a href={`${API_URL}/docs`} target="_blank" rel="noreferrer">
            Swagger UI
          </a>
        </p>
      </section>

      <section className="card memo-box">
        <div className="composer">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addMemo()}
            placeholder="메모를 입력하세요"
          />
          <button className="primary" onClick={addMemo} disabled={busy}>
            추가
          </button>
        </div>

        {memos.length === 0 ? (
          <p className="empty">아직 메모가 없습니다. 한 줄을 추가하면 GET /memos 결과에 나타납니다.</p>
        ) : (
          <ul className="memo-list">
            {memos.map((m) => (
              <li key={m.id}>
                <span>{m.content}</span>
                <button onClick={() => deleteMemo(m.id)} disabled={busy}>
                  삭제
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
