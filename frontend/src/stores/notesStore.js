import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'http://localhost:8000/api/notes'

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: []
  }),

  actions: {
    async fetchNotes() {
      try {
        const response = await axios.get(API_URL)
        this.notes = response.data
      } catch (error) {
        console.error('Ошибка загрузки заметок:', error)
      }
    },

    async addNote(noteData) {
      try {
        const response = await axios.post(API_URL, noteData)
        this.notes.push(response.data)
      } catch (error) {
        console.error('Ошибка добавления заметки:', error)
      }
    },

    async updateNote(updatedNote) {
      try {
        const response = await axios.put(`${API_URL}/${updatedNote.id}`, updatedNote)
        const index = this.notes.findIndex(n => n.id === updatedNote.id)
        if (index !== -1) {
          this.notes[index] = response.data
        }
      } catch (error) {
        console.error('Ошибка обновления заметки:', error)
      }
    },

    async deleteNote(id) {
      try {
        await axios.delete(`${API_URL}/${id}`)
        this.notes = this.notes.filter(n => n.id !== id)
      } catch (error) {
        console.error('Ошибка удаления заметки:', error)
      }
    }
  }
})