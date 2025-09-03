import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NoteDetailView from '../views/NoteDetailView.vue'

const routes = [
  {
    path: '/',
    component: HomeView
  },
  {
    path: '/note/:id',
    component: NoteDetailView
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
