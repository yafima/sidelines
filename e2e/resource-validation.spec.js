import { test, expect } from "@playwright/test";

test("verify resources on page", async ({ page }) => {
  const failedResponse = [];
  page.on("response", (response) => {
    if (/^(script|stylesheet|image)$/.test(response.request().resourceType())) {
      if (response.status() != 200) {
        failedResponse.push(response);
      }
    }
  });

  await page.goto("https://www.cbssports.com/betting");
  console.log(
      JSON.stringify(
          failedResponse.map((item) => [
            item.url(),
            item.status(),
            item.request().resourceType(),
          ])
      )
  );

  expect(failedResponse.length).toBe(0);
});