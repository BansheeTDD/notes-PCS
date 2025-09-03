<template>
  <div class="bg-gray-50 p-6 rounded-lg shadow-md mb-6 animate-fade-in">
    <h2 class="text-xl font-bold mb-4 text-gray-800">{{ isEdit ? 'Изменим!' : 'Добавим?' }}</h2>
    <form @submit.prevent="save">
      <input
        v-model="title"
        type="text"
        placeholder="Заголовок"
        class="w-full p-3 mb-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        required
      />
      <textarea
        v-model="content"
        placeholder="Заметка..."
        rows="4"
        class="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        required
      ></textarea>
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-medium transition"
      >
        {{ isEdit ? 'Сохранить' : 'Добавить' }}
      </button>
    </form>
  </div>
</template>

<script>
  export default {
    props: {
      initialData: Object
    },
    data() {
      return {
        title: '',
        content: ''
      }
    },
    computed: {
      isEdit() {
        return !!this.initialData
      }
    },
    created() {
      if (this.initialData) {
        this.title = this.initialData.title
        this.content = this.initialData.content
      }
    },
    methods: {
      save() {
        this.$emit('save', {
          id: this.initialData?.id,
          title: this.title,
          content: this.content
        })
        this.reset()
      },
      reset() {
        this.title = ''
        this.content = ''
      }
    }
  }
</script>