# og-image

OG image generator for `app.gib.work`.

## Demo screenshot

<img width="1867" height="962" alt="image" src="https://github.com/user-attachments/assets/a199b69f-4e3e-4baf-8a09-39a65a2e17b7" />

## OG image example

<img width="1920" height="1080" alt="og" src="https://github.com/user-attachments/assets/dd0125ec-b558-457d-840f-e57409071a41" />

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
