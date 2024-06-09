import { expect, test } from "@playwright/test"

test("test", async ({ page }) => {
  await page.goto("http://localhost:5173")

  await expect(page.getByText("Juego ID")).toHaveText("Juego ID")

  await page.goto("http://localhost:5173/juego")

  // PROVISIONAL DELETE GAME
  await page.getByRole('link', { name: 'Mis Juegos' }).click();
  await page.getByRole('button', { name: 'Eliminar' }).click();
  await page.getByRole('button', { name: 'Confirmar eliminar' }).click();

  await expect(page.getByText("No hay juegos")).toHaveText("No hay juegos")

  // CREATE GAME to DELETE
  await page.getByRole('link', { name: 'Crear juego' }).click();
  await page.getByPlaceholder('Nombre').click();
  await page.getByPlaceholder('Nombre').fill('Test Game To Delete');
  await page.getByRole('button', { name: 'Crear' }).click();

  // CHECK GAME CREATED
  await page.getByRole('link', { name: 'Mis Juegos' }).click();
  await expect(page.getByRole('cell', { name: 'Test Game To Delete' })).toHaveText("Test Game To Delete")
  await expect(page.getByRole('cell', { name: 'CREATED' })).toHaveText("CREATED")

  // DELETE GAME
  await page.getByRole('button', { name: 'Eliminar' }).click();
  await page.getByRole('button', { name: 'Confirmar eliminar' }).click();
  await expect(page.getByText("No hay juegos")).toHaveText("No hay juegos")

  // CREATE GAME to EDIT
  await page.getByRole('link', { name: 'Crear juego' }).click();
  await page.getByPlaceholder('Nombre').click();
  await page.getByPlaceholder('Nombre').fill('Test Game');
  await page.getByRole('button', { name: 'Crear' }).click();

  // CHECK GAME CREATED
  await page.getByRole('link', { name: 'Mis Juegos' }).click();
  await expect(page.getByRole('cell', { name: 'Test Game' })).toHaveText("Test Game")
  await expect(page.getByRole('cell', { name: 'CREATED' })).toHaveText("CREATED")

  // EDIT GAME
  await page.getByRole('link', { name: 'EDITAR' }).click();

  await expect(page.getByText('Juego', { exact: true })).toHaveText("Juego")
  await expect(page.getByText('Test Game')).toHaveText("Test Game")

  // await page.getByText('R6PF9', { exact: true }).click();
  await page.getByRole('button', { name: 'Añadir Pregunta' }).click();

  await page.getByPlaceholder('Pregunta').click();
  await page.getByPlaceholder('Pregunta').fill('Test Question 1');
  await page.getByPlaceholder('Respuesta 1').click();
  await page.getByPlaceholder('Respuesta 1').fill('Option 1');
  await page.getByPlaceholder('Respuesta 2').click();
  await page.getByPlaceholder('Respuesta 2').fill('Option 2');
  await page.getByPlaceholder('Respuesta 3').click();
  await page.getByPlaceholder('Respuesta 3').fill('Option 3');
  await page.getByPlaceholder('Respuesta 4').click();
  await page.getByPlaceholder('Respuesta 4').fill('Option 4');
  await page.getByLabel('¿Respuesta correcta?').nth(2).check();
  await page.getByRole('combobox').selectOption('10');
  await page.getByRole('button', { name: 'Guardar' }).click();

  // Expect to have the question
  //page.reload();
  //await expect(page.getByPlaceholder('Pregunta')).toHaveText('Test Question 1');

  await page.getByRole('button', { name: 'Añadir Pregunta' }).click();

  // Expect to have 2 questions

  await page.getByPlaceholder('Pregunta').click();
  await page.getByPlaceholder('Pregunta').fill('Question 2');
  await page.getByRole('button', { name: 'Eliminar' }).first().click();

  // Expect to have 1 question

  await page.getByRole('button', { name: 'Guardar' }).click();

  await page.getByRole('link', { name: 'Mis Juegos' }).click();

  await page.getByRole('link', { name: 'COMENZAR' }).click();

  await expect(page.getByText('Test Game')).toHaveText("Test Game")
})
