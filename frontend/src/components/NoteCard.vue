<template>
  <div class="bg-white rounded-lg shadow-md p-5 mb-4 border transition-transform hover:scale-102 relative animate-slide-up">
    <h3 class="text-lg font-semibold text-gray-800">{{ note.title }}</h3>
    <p class="text-gray-600 mt-1 line-clamp-2">{{ note.content }}</p>
    <div class="flex justify-between mt-4">
      <button
        @click="$emit('edit')"
        class="text-blue-500 hover:text-blue-700 text-sm font-medium"
      >
        Редактировать
      </button>
      <button
        @click="$emit('delete', note.id)"
        class="text-red-500 hover:text-red-700 text-sm font-medium"
      >
        Удалить
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NoteCard',
    props: ['note'],
    emits: ['delete', 'edit']
  }
</script>