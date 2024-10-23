<script lang="ts">
  import type { Game, GameQuestion } from '../../../../../@types/game'

  import { saveGameQuestions } from '$lib/infrastructure/http/admin/adminHTTP'

  import { IconEdit, IconTrashX } from '@tabler/icons-svelte'

  const saveGameQuestionsHandler = async () => {
    if (!game || !game.gameId) throw new Error('No se ha encontrado el juego')
    editSuccess = await saveGameQuestions(game.gameId, gameQuestions)
  }

  const addQuestion = () => {
    const questionId = Math.random().toString(36).slice(2, 6)
    gameQuestions = gameQuestions.concat({
      questionId,
      question: '',
      time: '20',
      answers: [
        {
          answerId: `${questionId}-1`,
          answer: '',
          isCorrect: false,
        },
        {
          answerId: `${questionId}-2`,
          answer: '',
          isCorrect: false,
        },
        {
          answerId: `${questionId}-3`,
          answer: '',
          isCorrect: false,
        },
        {
          answerId: `${questionId}-4`,
          answer: '',
          isCorrect: false,
        },
      ],
    })
    keyActualQuestionEdit = gameQuestions.length - 1
  }

  const changeActualQuestionEdit = (event: MouseEvent) => {
    const target = event.target as HTMLButtonElement
    if (target?.dataset.pkey === undefined) return
    keyActualQuestionEdit = parseInt(target.dataset.pkey)
  }

  const removeQuestion = (event: MouseEvent) => {
    const target = event.target as HTMLButtonElement
    if (target?.dataset.pkey === undefined) return
    const questionKey = parseInt(target?.dataset.pkey)
    gameQuestions = gameQuestions.filter((_, key) => key != questionKey)
    keyActualQuestionEdit = 0
  }

  interface Props {
    game: Game;
    keyActualQuestionEdit: number;
    gameQuestions: GameQuestion[];
    editSuccess: boolean;
  }

  let {
    game,
    keyActualQuestionEdit = $bindable(),
    gameQuestions = $bindable(),
    editSuccess = $bindable()
  }: Props = $props();
</script>

{#if game}
  <div class="navbar bg-base-100">
    <div class="container mx-auto">
      <div class="grid w-full grid-cols-2">
        <div class="">
          <p>Juego</p>
          <p><strong>{game.gameName}</strong></p>
        </div>
        <div class="">
          <button
            onclick={() => saveGameQuestionsHandler()}
            class="btn btn-outline btn-success w-full max-w-xs">Guardar</button
          >
        </div>
      </div>
    </div>
  </div>

  <button
    onclick={() => addQuestion()}
    class="btn btn-sm btn-outline btn-info my-3 w-full">Añadir Pregunta</button
  >

  {#if gameQuestions}
    <div class="overflow-x-auto">
      <table class="table">
        <tbody>
          {#each gameQuestions as question, key}
            <tr
              data-questionNumber={question.questionNumber}
              class={key === keyActualQuestionEdit ? 'bg-base-200' : ''}
            >
              <td>Pregunta {key + 1}</td>
              <th class="text-right">
                <button
                  onclick={changeActualQuestionEdit}
                  data-pkey={key}
                  class="btn btn-info btn-xs"
                >
                  <IconEdit size={15} stroke={1} />
                  Editar
                </button>
                <button
                  onclick={removeQuestion}
                  data-pkey={key}
                  class="btn btn-error btn-xs"
                >
                  <IconTrashX size={15} stroke={1} />
                  Eliminar
                </button>
              </th>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
{/if}
