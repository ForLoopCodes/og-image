# og-image

OG image generator for `app.gib.work`.

## Demo screenshot

Replace this image with your local UI screenshot.

![Demo screenshot placeholder](./docs/demo-screenshot.png)

## OG image example

Replace this image with a generated OG output.

![OG image placeholder](./docs/og-image-example.png)

## Run locally

1. Install dependencies.
2. Start the dev server.
3. Open the app in your browser.

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## API route

Use `GET /api/og` with query params:

- `title`
- `tags`
- `amount`
- `token`
- `type`
- `username`

Example:

`/api/og?title=Build+the+feature&tags=Design,OG&amount=150&token=USDC&type=Unrugable+Bounty&username=@subly1234`
