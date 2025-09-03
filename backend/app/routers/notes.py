from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app import models, schemas, database

router = APIRouter()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/notes", response_model=List[schemas.Note])
def get_notes(db: Session = Depends(get_db)):
    return db.query(models.NoteModel).all()

@router.post("/notes", response_model=schemas.Note, status_code=201)
def create_note(note: schemas.NoteCreate, db: Session = Depends(get_db)):
    db_note = models.NoteModel(**note.dict())
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    return db_note

@router.put("/notes/{note_id}", response_model=schemas.Note)
def update_note(note_id: int, note: schemas.NoteUpdate, db: Session = Depends(get_db)):
    db_note = db.query(models.NoteModel).filter(models.NoteModel.id == note_id).first()
    if not db_note:
        raise HTTPException(status_code=404, detail="Note not found")
    for key, value in note.dict().items():
        setattr(db_note, key, value)
    db.commit()
    db.refresh(db_note)
    return db_note

@router.delete("/notes/{note_id}", status_code=204)
def delete_note(note_id: int, db: Session = Depends(get_db)):
    db_note = db.query(models.NoteModel).filter(models.NoteModel.id == note_id).first()
    if not db_note:
        raise HTTPException(status_code=404, detail="Note not found")
    db.delete(db_note)
    db.commit()
    return