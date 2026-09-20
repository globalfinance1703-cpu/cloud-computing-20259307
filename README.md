# 클라우드컴퓨팅실습 개인 과제

- 이름: 이동주
- 소속: 디지털금융MBA
- 학번: 20259307

개인 소개 페이지와 FastAPI 연동 실습을 한 저장소에서 관리합니다.
2주차 메모 앱 흐름(React → FastAPI)과 3주차 Swagger UI 테스트를 그대로 제출용으로 묶었습니다.

## 주요 구성

| 구분 | 내용 | 배포 |
| --- | --- | --- |
| 개인 소개 | 이름, 학습 기록, 백엔드 `GET /profile` 결과 | Vercel |
| 프론트엔드 | React(Vite)에서 메모 추가·삭제, API 호출 결과 표시 | Vercel |
| 백엔드 | FastAPI 메모 CRUD + 프로필 + `/docs` | Render |
| 문서 | 이 README | GitHub |

페이지는 하나로 두고, 위쪽 메뉴로 **개인 소개**와 **API 연동 실습**을 오갑니다.

```
cloud_computing/
├── README.md
├── 제출주소.md
├── frontend/          # Vercel Root Directory
│   ├── src/pages/About.jsx
│   ├── src/pages/MemoLab.jsx
│   └── .env.example
└── backend/           # Render Root Directory
    ├── main.py
    ├── profile_data.py
    ├── database.py
    ├── models.py
    └── requirements.txt
```

## 배포 주소

- GitHub 저장소: https://github.com/globalfinance1703-cpu/cloud-computing-20259307
- Vercel 페이지: https://cloud-computing-20259307.vercel.app
- Render Swagger UI: `(Render 로그인 후 배포하면 여기에 주소를 넣습니다)`

## 이름과 소개

소개 페이지와 `GET /profile`에 아래 정보가 들어 있습니다.

- 이름: 이동주
- 소속: 디지털금융MBA
- 학번: 20259307

값을 더 바꾸려면 `backend/profile_data.py`의 `PROFILE`만 고치면 됩니다.

## 로컬 실행

터미널을 **두 개** 엽니다.

백엔드:

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

프론트엔드:

```powershell
cd frontend
npm install
npm run dev
```

- 화면: http://localhost:5173
- API 문서: http://127.0.0.1:8000/docs

## 배포 순서

과제 완료 기준은 **배포된 Vercel 화면에서 Render API 결과가 보이는 것**입니다.

### 1) GitHub

1. GitHub에서 빈 저장소를 만듭니다. README 옵션은 켜지 않습니다.
2. 이 폴더에서 원격만 연결한 뒤 push 합니다.

```powershell
git add .
git commit -m "개인과제: 소개 페이지와 FastAPI 연동"
git branch -M main
git remote add origin https://github.com/<사용자명>/<저장소>.git
git push -u origin main
```

이미 `git init`이 되어 있으면 `remote add`와 `push`만 하면 됩니다.

### 2) Vercel 프론트엔드

1. [vercel.com/new](https://vercel.com/new)에서 이 저장소를 가져옵니다.
2. **Root Directory**를 `frontend`로 지정합니다.
3. Framework Preset은 Vite, Build Command는 `npm run build`, Output은 `dist`입니다.
4. Environment Variable에 `VITE_API_URL`을 넣습니다.
   - 처음에는 `http://localhost:8000`
   - Render 주소가 나오면 `https://<서비스>.onrender.com`으로 바꾸고 **Redeploy** 합니다. 끝의 `/`는 넣지 않습니다.

### 3) Render 백엔드

1. Render → **New Web Service** → 같은 GitHub 저장소를 연결합니다.
2. 설정:

| 항목 | 값 |
| --- | --- |
| Root Directory | `backend` |
| Runtime | Python 3 |
| Build Command | `pip install -r requirements.txt` |
| Start Command | `uvicorn main:app --host 0.0.0.0 --port $PORT` |
| Plan | Free |

3. Environment Variable
   - `ALLOWED_ORIGINS` = Vercel 주소 (`https://xxxx.vercel.app`, 끝 `/` 없음)
4. 배포가 Live가 되면 `https://<서비스>.onrender.com/docs`를 엽니다.
5. Vercel의 `VITE_API_URL`을 이 Render 주소로 바꾼 뒤 Redeploy 합니다.

무료 Render는 처음 열 때 30~60초 걸릴 수 있습니다.

## 확인 체크리스트

- [ ] 소개 페이지에 이름과 학습 기록이 보인다
- [ ] 소개 페이지에 `GET /profile 성공`이 뜬다
- [ ] API 연동 실습에서 메모를 추가하면 목록에 남는다
- [ ] Render `/docs`에서 `GET /memos`를 실행하면 같은 메모가 보인다
- [ ] 소개 ↔ 연동 실습 메뉴가 서로 연결된다

## API 목록

| 메서드 | 경로 | 설명 |
| --- | --- | --- |
| GET | `/` | API 안내 |
| GET | `/health` | 상태 확인 |
| GET | `/profile` | 개인 소개 JSON |
| GET | `/memos` | 메모 목록 |
| POST | `/memos` | 메모 추가 |
| DELETE | `/memos/{id}` | 메모 삭제 |
