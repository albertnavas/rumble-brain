<script lang="ts">
  import { gameState } from '$lib/store'
</script>

<div class="mx-auto md:w-4/6">
  {#if $gameState?.results}
    <table class="mx-auto mt-2 table">
      <thead>
        <tr>
          <th style="text-align: center;">Ranking</th>
          <th>Nombre</th>
          <th style="text-align: center;">Aciertos</th>
          <th style="text-align: center;">Score</th>
          <th style="text-align: center;">Tiempo</th>
        </tr>
      </thead>
      <tbody>
        {#if $gameState?.results}
          {#each $gameState.results as player, index}
            <tr>
              <td style="text-align: center;">{index + 1}</td>
              <td>{player.name}</td>
              <td style="text-align: center;">{player.correctAnswers}</td>
              <td style="text-align: center;"
                >{!player.score ? '-' : player.score.toFixed(2)}</td
              >
              <td style="text-align: center;"
                >{!player.totalAnswersTime
                  ? '-'
                  : player.totalAnswersTime.toFixed(2) + 's'}</td
              >
            </tr>
          {/each}
        {/if}
      </tbody>
    </table>
  {/if}
</div>

<style>
  .table {
    border-collapse: collapse;
    width: 100%;
  }

  .table td,
  .table th {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  .table th {
    background-color: #f2f2f2;
    color: #333;
    font-weight: bold;
  }

  .table tr:nth-child(even) {
    background-color: #f2f2f2;
  }
</style>
