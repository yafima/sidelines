const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');

test('Verify the posts title body and userid', async () => {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    const response = await page.request.get('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();

    posts.forEach(post => {
        expect(post.title.length).toBeGreaterThan(0);
        expect(post.body.length).toBeGreaterThan(0);
        expect(typeof post.userId).toBe('number');
    });

    await browser.close();
});
