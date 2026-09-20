"""개인 소개 데이터 — 여기만 고치면 /profile API와 소개 페이지가 함께 바뀝니다."""

PROFILE = {
    "name": "이동주",
    "affiliation": "디지털금융MBA",
    "student_id": "20259307",
    "role": "디지털금융MBA · 클라우드컴퓨팅실습",
    "tagline": "화면에서 서버까지, 한 흐름으로 연결하는 법을 배우는 중",
    "email": "",
    "github": "",
    "about": (
        "디지털금융MBA 이동주입니다. 학번 20259307. "
        "웹이 요청과 응답으로 움직인다는 것부터 시작해, "
        "React 화면이 FastAPI를 호출하고 그 결과가 다시 화면에 나타나는 "
        "풀스택 흐름을 직접 만들어 보고 있습니다."
    ),
    "skills": ["HTML/CSS", "Git · GitHub", "React (Vite)", "FastAPI", "Vercel · Render"],
    "weeks": [
        {
            "week": "1주차",
            "title": "웹 기초와 Git",
            "detail": "HTML · CSS · JavaScript로 화면을 만들고, GitHub에 코드를 올리는 흐름을 익혔습니다.",
        },
        {
            "week": "2주차",
            "title": "최소 코드 풀스택",
            "detail": "메모 앱으로 프론트(React) → 백엔드(FastAPI) → 저장소를 잇고, Vercel · Render 배포를 경험했습니다.",
        },
        {
            "week": "3주차",
            "title": "FastAPI 백엔드 기초",
            "detail": "Pydantic 검증, HTTPException, Swagger UI(/docs)로 API를 설계하고 테스트하는 방법을 배웠습니다.",
        },
    ],
}
