import { expect, test } from "@playwright/test"

test("test", async ({ page }) => {
	await page.goto("http://localhost:5173")

	await expect(page.getByText("Juego ID")).toHaveText("Juego ID")

	await page.goto("http://localhost:5173/juego")

	await expect(page.getByText("No hay juegos")).toHaveText("No hay juegos")
})
