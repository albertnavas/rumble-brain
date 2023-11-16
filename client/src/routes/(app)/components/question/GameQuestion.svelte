<script lang="ts">
  import { onDestroy } from 'svelte'

  import {
    gamePlayerAnswersState,
    gamePlayerState,
    playerConnectionDataState,
  } from '$lib/store'

  import { sendPlayerAnswer } from '$lib/infrastructure/websockets/player/playerWSActions'

  const colors = ['#feca57', '#ff6b6b', '#48dbfb', '#1dd1a1']

  let dateNow = Date.now()
  setInterval(() => {
    dateNow = Date.now()
  }, 1000)

  $: questionSeconds = $gamePlayerState?.currentQuestion?.question.time
  $: questionStart = new Date($gamePlayerState?.currentQuestion?.questionStart)
  $: secondsLeft =
    questionSeconds - Math.floor((dateNow - questionStart) / 1000)

  let timeout = false
  let unsubscribe = gamePlayerState.subscribe((gamePlayerStateChange) => {
    if (
      questionStart !== gamePlayerStateChange?.currentQuestion?.questionStart
    ) {
      timeout = false
    }
  })

  $: if (secondsLeft <= 0) {
    timeout = true
  }

  onDestroy(() => {
    unsubscribe()
  })
</script>

<svelte:head>
  <title>{$gamePlayerState?.gameId}</title>
</svelte:head>

<div class="mx-auto w-5/6">
  <div class="card-body items-center pl-0 pr-0 text-center">
    {#if !$gamePlayerState?.currentQuestion}
      No questions
    {:else if $gamePlayerAnswersState[$gamePlayerState.currentQuestion.question.questionId]}
      <h1 class="mb-5">Respuesta enviada 🚀</h1>
      <p>Esperando a la siguiente pregunta ...</p>
      <span class="loading loading-ring loading-lg" />
    {:else if timeout}
      <h1 class="mb-5">Tiempo agotado 😔</h1>
      <p>Esperando a la siguiente pregunta ...</p>
      <span class="loading loading-ring loading-lg" />
    {:else}
      {secondsLeft}
      <div class="mx-auto w-[303px]">
        <div class="grid w-full grid-cols-2 gap-4 text-center">
          {#each $gamePlayerState.currentQuestion.question.answers as answer, answerKey}
            <button
              class="answer-textarea h-36 w-36 resize-none text-center text-white placeholder-gray-200"
              style="background: {colors[answerKey]}"
              on:click={() => {
                if (
                  $playerConnectionDataState?.playerConnectionToken &&
                  $gamePlayerState?.gameId &&
                  $gamePlayerState?.currentQuestion?.question.questionId &&
                  answer.answerId
                ) {
                  const playerAnswer = {
                    playerConnectionToken:
                      $playerConnectionDataState?.playerConnectionToken,
                    gameId: $gamePlayerState?.gameId,
                    questionId:
                      $gamePlayerState?.currentQuestion?.question.questionId,
                    answerId: answer.answerId,
                  }

                  sendPlayerAnswer(playerAnswer)
                }
              }}
            />
          {/each}
        </div>
      </div>
    {/if}
  </div>
</div>
