<script lang="ts">
	import type { GameQuestion } from '../../../../../@types/game'
	const colors = ['#feca57', '#ff6b6b', '#48dbfb', '#1dd1a1']

	export let keyActualQuestionEdit: number
	export let gameQuestions: GameQuestion[]
</script>

{#if gameQuestions[keyActualQuestionEdit]}
	<div class="px-10">
		<textarea
			id="question-textarea"
			class="h-20 w-full resize-none border-2 border-dashed text-center"
			placeholder="Pregunta"
			bind:value={gameQuestions[keyActualQuestionEdit].question}
			autocomplete="off"
		/>
		<div class="grid w-full grid-cols-2 gap-4 text-center">
			{#each gameQuestions[keyActualQuestionEdit].answers as answer, answerKey}
				<div class="flex flex-col">
					<textarea
						class="answer-textarea h-20 w-full resize-none text-center text-white placeholder-gray-200"
						style="background: {colors[answerKey]}"
						placeholder="Respuesta {answerKey + 1}"
						bind:value={answer.answer}
						autocomplete="off"
					/>
					<div class="form-control">
						<label class="label cursor-pointer">
							<span class="label-text">¿Respuesta correcta?</span>
							<input
								bind:checked={gameQuestions[keyActualQuestionEdit].answers[answerKey].isCorrect}
								type="checkbox"
								class="checkbox-success checkbox"
							/>
						</label>
					</div>
				</div>
			{/each}
		</div>
		<div class="divider" />

		<div class="grid w-full grid-cols-1">
			<div class="form-control">
				<div class="input-group">
					<button class="btn">Tiempo límite</button>
					<select class="select select-bordered" bind:value={gameQuestions[keyActualQuestionEdit].time}>
						<option value="10">10 segundos</option>
						<option value="20" selected>20 segundos</option>
						<option value="30">30 segundos</option>
						<option value="50">50 segundos</option>
						<option value="60">1 minuto</option>
					</select>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	#question-textarea[placeholder] {
		line-height: 72px;
	}
	.answer-textarea[placeholder] {
		line-height: 80px;
	}
</style>
