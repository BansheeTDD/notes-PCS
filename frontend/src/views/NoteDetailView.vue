<template>
  <div class="container mx-auto px-4 py-6 max-w-3xl">
    <button
      @click="$router.back()"
      class="mb-6 text-blue-500 hover:underline flex items-center"
    >
      ← Назад
    </button>

    <div v-if="note && !isEditing" class="bg-white p-6 rounded-lg shadow-md animate-fade-in">
      <h1 class="text-2xl font-bold text-gray-800 mb-3">{{ note.title }}</h1>
      <p class="text-gray-700 leading-relaxed whitespace-pre-wrap">{{ note.content }}</p>

      <button
        @click="startEditing"
        class="mt-6 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg font-medium transition flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.828-2.828z" />
        </svg>
        Редактировать
      </button>
    </div>

    <div v-else-if="isEditing" class="bg-white p-6 rounded-lg shadow-md animate-fade-in">
      <h1 class="text-2xl font-bold text-gray-800 mb-4">Изменим?</h1>

      <input
        v-model="editTitle"
        type="text"
        placeholder="Заголовок"
        class="w-full text-xl font-semibold border-b-2 border-blue-500 focus:border-blue-700 focus:outline-none mb-4 px-1 py-2"
      />

      <textarea
        v-model="editContent"
        placeholder="Содержание заметки"
        rows="8"
        class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y mb-6"
      ></textarea>

      <div class="flex space-x-3">
        <button
          @click="saveNote"
          :disabled="saving"
          class="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg font-medium transition flex items-center"
          :class="{ 'opacity-75 cursor-not-allowed': saving }"
        >
          <svg v-if="!saving" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
          <svg v-else class="animate-spin h-5 w-5 mr-1 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ saving ? 'Сохранение...' : 'Сохранить' }}
        </button>

        <button
          @click="cancelEdit"
          class="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-medium transition flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
          Отмена
        </button>
      </div>
    </div>

    <div v-else class="text-center text-gray-500 mt-10">
      <p>Заметка не найдена.</p>
    </div>
  </div>
</template>

<script>
  import { useNotesStore } from '@/stores/notesStore'
  import { ref, computed } from 'vue'
  import { useRoute } from 'vue-router'

  export default {
    setup() {
      const notesStore = useNotesStore()
      const route = useRoute()

      const isEditing = ref(false)
      const editTitle = ref('')
      const editContent = ref('')
      const saving = ref(false)

      const note = computed(() => {
        const id = parseInt(route.params.id)
        return notesStore.notes.find(n => n.id === id) || null
      })

      const loadNote = async () => {
        if (notesStore.notes.length === 0) {
          await notesStore.fetchNotes()
        }
        if (note.value) {
          editTitle.value = note.value.title
          editContent.value = note.value.content
        }
      }

      const startEditing = () => {
        isEditing.value = true
      }

      const saveNote = async () => {
        if (!note.value) return

        saving.value = true
        const updatedNote = {
          id: note.value.id,
          title: editTitle.value,
          content: editContent.value
        }

        try {
          await notesStore.updateNote(updatedNote)
          isEditing.value = false
        } catch (error) {
          console.error('Ошибка сохранения:', error)
          alert('Не удалось сохранить заметку.')
        } finally {
          saving.value = false
        }
      }

      const cancelEdit = () => {
        isEditing.value = false
        if (note.value) {
          editTitle.value = note.value.title
          editContent.value = note.value.content
        }
      }

      return {
        note,
        isEditing,
        editTitle,
        editContent,
        saving,
        startEditing,
        saveNote,
        cancelEdit,
        loadNote
      }
    },

    async mounted() {
      await this.loadNote()
    }
  }
</script>