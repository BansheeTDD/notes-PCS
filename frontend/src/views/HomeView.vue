<template>
  <div class="container mx-auto px-4 py-6 max-w-3xl">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Твои, Мои, Наши заметки</h1>

    <NoteForm @save="addNote" />

    <div v-if="notes.length === 0" class="mt-10">
      <div class="flex justify-center">
        <img src="/idea.svg" alt="Idea" class="scale-125">
      </div>
      <p class="text-center text-gray-500 mt-2">
        Здесь будут ваши заметки
      </p>
    </div>

    <transition-group name="list" tag="div">
      <NoteCard
        v-for="note in notes"
        :key="note.id"
        :note="note"
        @delete="deleteNote(note.id)"
        @edit="editNote(note)"
      />
    </transition-group>
  </div>
</template>

<script>
  import { useNotesStore } from '@/stores/notesStore'
  import { onMounted } from 'vue'
  import NoteCard from '@/components/NoteCard.vue'
  import NoteForm from '@/components/NoteForm.vue'

  export default {
    components: { NoteForm, NoteCard },
    setup() {
      const notesStore = useNotesStore()

      onMounted(() => {
        notesStore.fetchNotes()
      })

      return { notesStore }
    },
    computed: {
      notes() {
        return this.notesStore.notes
      }
    },
    methods: {
      addNote(data) {
        this.notesStore.addNote(data)
      },
      deleteNote(id) {
        this.notesStore.deleteNote(id)
      },
      editNote(note) {
        this.$router.push(`/note/${note.id}`)
      }
    }
  }
</script>

<style>
  .list-move, .list-enter-active, .list-leave-active {
    transition: all 0.3s;
  }
  .list-enter-from, .list-leave-to {
    opacity: 0;
    transform: translateY(20px);
  }
  .list-leave-active {
    position: absolute;
  }
</style>