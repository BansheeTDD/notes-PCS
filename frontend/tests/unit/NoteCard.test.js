import { describe, test, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/vue'
import NoteCard from '@/components/NoteCard.vue'

describe('NoteCard', () => {
  const note = { id: 1, title: 'Test Note', content: 'Test content' }

  test('Отображение заголовка и содержания', () => {
    render(NoteCard, {
      props: { note }
    })

    expect(screen.getByText('Test Note')).toBeInTheDocument()
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  test('Запускает событие delete при нажатии на кнопку/батон удаления', async () => {
    const { emitted } = render(NoteCard, {
      props: { note }
    })

    const buttons = screen.getAllByRole('button')
    await fireEvent.click(buttons[1])

    expect(emitted().delete).toBeTruthy()
    expect(emitted().delete[0]).toEqual([1])
  })

  test('Запускает событие edit при нажатии на кнопку/батон редактирования', async () => {
    const { emitted } = render(NoteCard, {
      props: { note }
    })

    const buttons = screen.getAllByRole('button')
    await fireEvent.click(buttons[0])

    expect(emitted().edit).toBeTruthy()
    expect(emitted().edit[0]).toEqual([])
  })
})