<script lang="ts">
  import { gameState } from '$lib/store'

  import { manageGame } from '$lib/infrastructure/websockets/admin/adminWSActions'

  import { fly } from 'svelte/transition'

  import { onDestroy } from 'svelte'
  import type { Game } from '../../../../../@types/game'
  import type { Socket } from 'dgram'

  const colors = ['#feca57', '#ff6b6b', '#48dbfb', '#1dd1a1']

  // Seconds left logic to extract
  let dateNow = Date.now()
  setInterval(() => {
    dateNow = Date.now()
  }, 1000)

  $: questionSeconds = $gameState?.currentQuestion?.question.time
  $: questionStart = new Date($gameState?.gameStatus?.currentQuestionStart)

  $: secondsLeft =
    questionSeconds - Math.floor((dateNow - questionStart) / 1000)

  let currentQuestionTimeout = false
  $: if (secondsLeft <= 0) {
    currentQuestionTimeout = true
  }
  $: if (currentQuestionTimeout) {
    manageGame(
      socket,
      game.gameId,
      'GAME_QUESTION_RESULTS',
      $gameState.currentQuestion.question.questionId,
    )
  }

  let unsubscribe = gameState.subscribe((gameStateChange) => {
    if (questionStart !== gameStateChange?.currentQuestion?.questionStart) {
      currentQuestionTimeout = false
    }
  })

  onDestroy(() => {
    unsubscribe()
  })

  export let socket: Socket
  export let game: Game
</script>

<div class="mx-auto w-5/6 text-center">
  <div class="mx-auto mt-2 w-[334px]" in:fly={{ x: '-100%', duration: 500 }}>
    <div class="badge badge-outline mb-4 ml-2 mr-2">
      {$gameState?.currentQuestion?.question.question}
    </div>
    <div class="grid grid-cols-2 grid-rows-2 justify-center gap-4">
      {#if $gameState?.currentQuestion?.question.answers}
        {#each $gameState.currentQuestion.question.answers as answer, answerKey}
          <button
            class="answer-textarea h-40 w-40 cursor-default text-xl text-white placeholder-gray-200"
            style="background: {colors[answerKey]}">{answer.answer}</button
          >
        {/each}
      {/if}
    </div>
    <div class="mt-4 text-2xl">
      {secondsLeft}
    </div>
  </div>
</div>
