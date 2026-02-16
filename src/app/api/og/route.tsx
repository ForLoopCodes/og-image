// Builds dynamic OG images for app.gib.work shares with branded layout.
// Loads fonts and assets, truncates titles, then renders bounty metadata.
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import fs from "fs/promises";
import path from "path";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const estimateTextWidth = (text: string, fontSize: number) => {
  let units = 0;
  for (const ch of text) {
    if (ch === " ") {
      units += 0.35;
      continue;
    }
    if (/[.,:;!|]/.test(ch)) {
      units += 0.28;
      continue;
    }
    if (/[ilIjtfr]/.test(ch)) {
      units += 0.33;
      continue;
    }
    if (/[mwMW@#%&QGO]/.test(ch)) {
      units += 0.85;
      continue;
    }
    if (/[A-Z]/.test(ch)) {
      units += 0.75;
      continue;
    }
    if (/[0-9]/.test(ch)) {
      units += 0.62;
      continue;
    }
    units += 0.65;
  }
  return units * fontSize * 1.1;
};
const truncateTitleToTwoLines = (
  rawTitle: string,
  fontSize: number,
  maxWidthPx: number,
) => {
  const title = rawTitle.replace(/\s+/g, " ").trim();
  if (!title) return ["", ""];
  const lines: string[] = [];
  let remaining = title;
  for (let lineIndex = 0; lineIndex < 2; lineIndex += 1) {
    if (!remaining) break;
    const isLastLine = lineIndex === 1;
    if (estimateTextWidth(remaining, fontSize) <= maxWidthPx) {
      lines.push(remaining);
      remaining = "";
      break;
    }
    let end = remaining.length;
    while (
      end > 0 &&
      estimateTextWidth(remaining.slice(0, end), fontSize) > maxWidthPx
    ) {
      end -= 1;
    }
    if (end <= 0) {
      lines.push(isLastLine ? "..." : "");
      remaining = "";
      break;
    }
    if (!isLastLine) {
      const slice = remaining.slice(0, end);
      const lastSpace = slice.lastIndexOf(" ");
      const cutAt = lastSpace > 0 ? lastSpace : end;
      lines.push(remaining.slice(0, cutAt).trimEnd());
      remaining = remaining.slice(cutAt).trimStart();
    } else {
      let lastLine = remaining.slice(0, end).trimEnd();
      const ellipsis = "...";
      while (
        lastLine.length > 0 &&
        estimateTextWidth(`${lastLine}${ellipsis}`, fontSize) > maxWidthPx
      ) {
        lastLine = lastLine.slice(0, -1).trimEnd();
      }
      lines.push(`${lastLine}${ellipsis}`);
      remaining = "";
    }
  }
  while (lines.length < 2) lines.push("");
  return lines;
};
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title =
    searchParams.get("title") ?? "OG Image design for app.gib.work.";
  const tagsParam = searchParams.get("tags") ?? "Design,OG,Gib";
  const amount = searchParams.get("amount") ?? "150.00";
  const token = searchParams.get("token") ?? "USDC";
  const type = searchParams.get("type") ?? "Unrugable Bounty";
  const username = searchParams.get("username") ?? "@subly1234";
  const tags = tagsParam
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const titleLines = truncateTitleToTwoLines(title, 62, 960);
  const bgPath = path.join(
    process.cwd(),
    "public",
    "assets",
    "og-image",
    "background.png",
  );
  const [geistBold, geistSemiBold, geistExtraBold, bgData] = await Promise.all([
    fetch(
      new URL(
        "https://cdn.jsdelivr.net/fontsource/fonts/geist-sans@latest/latin-700-normal.woff",
      ),
    ).then((res) => res.arrayBuffer()),
    fetch(
      new URL(
        "https://cdn.jsdelivr.net/fontsource/fonts/geist-sans@latest/latin-600-normal.woff",
      ),
    ).then((res) => res.arrayBuffer()),
    fetch(
      new URL(
        "https://cdn.jsdelivr.net/fontsource/fonts/geist-sans@latest/latin-800-normal.woff",
      ),
    ).then((res) => res.arrayBuffer()),
    fs.readFile(bgPath),
  ]);
  const bgBase64 = `data:image/png;base64,${bgData.toString("base64")}`;
  const normalizedToken = token.trim().toUpperCase();
  const usdcIconUrl =
    "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/usdc.png";
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <img
        src={bgBase64}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        alt=""
      />
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "46px 56px",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <div
            style={{
              fontSize: 62,
              fontFamily: "Geist ExtraBold",
              fontWeight: 800,
              color: "#FFFFFF",
              letterSpacing: "-0.05em",
              lineHeight: 1.1,
              maxWidth: 1400,
              display: "flex",
              flexDirection: "column",
              maxHeight: 62 * 1.1 * 2,
              overflow: "hidden",
            }}
          >
            <span style={{ display: "flex" }}>{titleLines[0]}</span>
            <span style={{ display: "flex" }}>{titleLines[1]}</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 18,
            }}
          >
            {tags.map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "4px 18px",
                  border: "2px solid #FFFFFF",
                  borderRadius: 9908,
                  fontSize: 28,
                  fontFamily: "Geist SemiBold",
                  fontWeight: 600,
                  color: "#FFFFFF",
                  letterSpacing: "-0.02em",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {normalizedToken === "USDC" && (
              <img
                src={usdcIconUrl}
                width="90"
                height="90"
                style={{
                  width: 52,
                  height: 52,
                  marginRight: 10,
                }}
                alt=""
              />
            )}
            <div
              style={{
                fontSize: 44,
                color: "#FFFFFF",
                letterSpacing: "-0.02em",
                display: "flex",
                alignItems: "baseline",
              }}
            >
              <span
                style={{
                  fontFamily: "Geist ExtraBold",
                  fontWeight: 800,
                }}
              >
                {amount}
              </span>
              <span
                style={{
                  marginLeft: 10,
                  fontFamily: "Geist SemiBold",
                  fontWeight: 600,
                  opacity: 0.9,
                }}
              >
                {token}
              </span>
            </div>
          </div>
          <div
            style={{
              fontSize: 28,
              fontFamily: "Geist SemiBold",
              fontWeight: 600,
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
              display: "flex",
            }}
          >
            {type}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: 44,
              fontFamily: "Geist SemiBold",
              fontWeight: 600,
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
              display: "flex",
              marginBottom: 14,
            }}
          >
            {username}
          </div>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 600,
      fonts: [
        {
          name: "Geist Bold",
          data: geistBold,
          weight: 700,
          style: "normal",
        },
        {
          name: "Geist SemiBold",
          data: geistSemiBold,
          weight: 600,
          style: "normal",
        },
        {
          name: "Geist ExtraBold",
          data: geistExtraBold,
          weight: 800,
          style: "normal",
        },
      ],
    },
  );
}
