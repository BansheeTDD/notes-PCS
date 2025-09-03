from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import notes
from app.database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Notes API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(notes.router, prefix="/api")

@app.get("/")
def root():
    return {"message": "Notes API is running"}