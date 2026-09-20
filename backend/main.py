import os
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
from database import engine, SessionLocal, Base
import models
from profile_data import PROFILE

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="클라우드컴퓨팅실습 개인과제 API",
    description="소개 프로필과 메모 CRUD를 제공하는 FastAPI 백엔드",
    version="1.0.0",
)

# 배포 시 ALLOWED_ORIGINS 에 Vercel 주소를 넣습니다. 끝에 / 없이, 여러 개는 쉼표로 구분.
origins = [
    origin.strip()
    for origin in os.getenv(
        "ALLOWED_ORIGINS",
        "http://localhost:5173,http://localhost:4173",
    ).split(",")
    if origin.strip()
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


class MemoIn(BaseModel):
    content: str


class MemoOut(BaseModel):
    id: int
    content: str
    model_config = {"from_attributes": True}


@app.get("/")
def read_root():
    return {
        "message": "클라우드컴퓨팅실습 개인과제 API에 오신 것을 환영합니다",
        "docs": "/docs",
        "profile": "/profile",
        "memos": "/memos",
    }


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.get("/profile")
def get_profile():
    return PROFILE


@app.get("/memos", response_model=list[MemoOut])
def list_memos(db: Session = Depends(get_db)):
    return db.query(models.Memo).all()


@app.post("/memos", response_model=MemoOut)
def create_memo(memo: MemoIn, db: Session = Depends(get_db)):
    new = models.Memo(content=memo.content)
    db.add(new)
    db.commit()
    db.refresh(new)
    return new


@app.delete("/memos/{memo_id}")
def delete_memo(memo_id: int, db: Session = Depends(get_db)):
    obj = db.get(models.Memo, memo_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Memo not found")
    db.delete(obj)
    db.commit()
    return {"ok": True}
