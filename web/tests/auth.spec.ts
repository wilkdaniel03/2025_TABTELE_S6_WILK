import { test, expect } from 'playwright/test';

const URL = "http://localhost:8080";

test("Check links validity", async ({ page }) => {

	await Promise.all([
		await page.waitForTimeout(5000),
		await page.goto(URL,{ waitUntil: "networkidle" }).then(() => {
			expect(page.url() === `${URL}/auth/login`).toBeTruthy();
		}),
		await page.locator("button",{ hasText: "Create new account"}).click().then(() => {
			expect(page.url() === `${URL}/auth/register`).toBeTruthy();
		}),
		await page.locator("a",{ hasText: "Already have an account" }).click().then(() => {
			expect(page.url() === `${URL}/auth/login`).toBeTruthy();
		}),
		await page.locator("a",{ hasText: "Reset password" }).click().then(() => {
			expect(page.url() === `${URL}/auth/forgot`).toBeTruthy();
		}),
		await page.locator("button",{ hasText: "Create new account" }).click().then(() => {
			expect(page.url() === `${URL}/auth/registerr`).toBeTruthy();
		}),
		await page.waitForTimeout(1000)
	]);
});
