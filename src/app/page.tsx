// Provides a local playground to tweak OG parameters before sharing.
// Shows live preview output plus ready-to-copy endpoint and meta tags.
"use client";
import Image from "next/image";
import { useState, useMemo } from "react";
export default function Home() {
  const [title, setTitle] = useState("OG Image design for app.gib.work.");
  const [tags, setTags] = useState("Design,OG,Gib");
  const [amount, setAmount] = useState("150.00");
  const [token, setToken] = useState("USDC");
  const [type, setType] = useState("Unrugable Bounty");
  const [username, setUsername] = useState("@subly1234");
  const currentOgUrl = useMemo(
    () =>
      `/api/og?${new URLSearchParams({
        title,
        tags,
        amount,
        token,
        type,
        username,
      }).toString()}`,
    [title, tags, amount, token, type, username],
  );
  const [previewUrl, setPreviewUrl] = useState(currentOgUrl);
  return (
    <div className="min-h-screen bg-gray-950 p-8 text-white font-(family-name:--font-geist-sans)">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">
          app.gib.work OG Image Generator
        </h1>
        <p className="text-gray-400 mb-8">
          Generate dynamic Open Graph images for social media previews.
          Customize the parameters below and click generate to preview.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Parameters</h2>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Amount
                </label>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Token
                </label>
                <input
                  type="text"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Bounty Type
              </label>
              <input
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button
              onClick={() => setPreviewUrl(currentOgUrl)}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-colors cursor-pointer"
            >
              Generate Preview
            </button>
            <div className="pt-4">
              <h3 className="text-sm font-semibold text-gray-400 mb-2">
                API Endpoint
              </h3>
              <code className="block bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-sm text-purple-300 break-all">
                {previewUrl}
              </code>
            </div>
            <div className="pt-2">
              <h3 className="text-sm font-semibold text-gray-400 mb-2">
                HTML Meta Tags
              </h3>
              <pre className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-sm text-green-300 overflow-x-auto">
                {`<meta property="og:image" content="https://your-domain.vercel.app${previewUrl}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="600" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://your-domain.vercel.app${previewUrl}" />`}
              </pre>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Preview</h2>
            <div className="border border-gray-700 rounded-lg overflow-hidden">
              <Image
                src={previewUrl}
                alt="OG Image Preview"
                width={1200}
                height={600}
                className="w-full h-auto"
                key={previewUrl}
                unoptimized
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              1200 &times; 600px &bull; PNG
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
