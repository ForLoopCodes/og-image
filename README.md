# Dynamic OG Image Generator for app.gib.work

A high-performance dynamic Open Graph (OG) image generator built with Next.js and `@vercel/og` (Satori). Designed specifically for social media previews for `app.gib.work`.

## Previews

### Demo Interface
> Interactive UI for real-time parameter testing and URL generation.
<img width="1867" height="962" alt="image" src="https://github.com/user-attachments/assets/a9d43c38-94e7-4d11-8a90-387728d4160b" />


### Generated OG Image
> dynamic social card with custom text truncation and asset integration.
<img width="1920" height="1080" alt="og" src="https://github.com/user-attachments/assets/df3cb807-62c2-443d-b55a-e1f4b1e904ff" />


## Features

- **Dynamic Parameters**: Customize title, tags, amount, token type, and username via URL search params.
- **Smart Truncation**: Custom server-side logic to wrap text into 2 lines with ellipses (...) since Satori lacks native `line-clamp` support.
- **Asset Integration**: High-quality background image (PNG) and token icons (WebP/PNG).
- **Premium Typography**: Uses Geist Sans (Bold, Semi-Bold, Extra-Bold) via CDN.
- **Real-time Preview**: A dedicated playground at the root route (`/`) to test parameters.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Image Engine**: [@vercel/og](https://vercel.com/docs/functions/og-image-generation)
- **Styling**: Tailwind CSS
- **Typography**: Geist Sans

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm / npm / bun

### Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd og-image
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run the development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to access the generator UI.

## API Usage

The image generation endpoint is available at `/api/og`. 

### Query Parameters

| Parameter | Default | Description |
| :--- | :--- | :--- |
| `title` | "OG Image design..." | The main heading of the card (Max 2 lines) |
| `tags` | "Design,OG,Gib" | Comma-separated list of tags |
| `amount` | "150.00" | The bounty/reward amount |
| `token` | "USDC" | The currency token (displays USDC icon if matched) |
| `type` | "Unrugable Bounty" | The badge label below the amount |
| `username` | "@subly1234" | The creator handle |

**Example URL:**
`/api/og?title=Build+a+decentralized+image+host&tags=Solana,Dev&amount=500&token=USDC`

## Project Structure

- `src/app/api/og/route.tsx`: Core engine and layout logic.
- `src/app/page.tsx`: Interactive preview playground.
- `public/assets/og-image/`: Static background and icon assets.

