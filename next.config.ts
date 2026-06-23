import path from "path";

import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
  /**
   * @payloadcms/storage-vercel-blob registers a client component
   * (VercelBlobClientUploadHandler) whose import chain reaches Payload
   * internals → undici → node:async_hooks / node:buffer / node:console.
   * Webpack can't bundle node: protocol imports for the browser, so we strip
   * the prefix and provide empty fallbacks for those Node built-ins.
   */
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        // undici: Node.js-only HTTP client. @vercel/blob's client upload
        //   handler does `import { fetch } from "undici"`, and undici drags in
        //   `node:*` builtins webpack can't bundle for the browser. Point it at
        //   a shim that maps the names it needs onto the native browser globals
        //   (a `false` stub here left fetch undefined → client uploads threw
        //   "(0, S.fetch) is not a function").
        undici: path.resolve("src/lib/undici-browser-shim.js"),
        // payload/internal: server-only barrel that exports everything
        //   (uploads, DB ops, etc.). It's transitively imported by
        //   resolveSignedURLKey (a server-side handler) which the
        //   VercelBlobClientUploadHandler accidentally drags in via the
        //   plugin-cloud-storage utilities barrel. Only getFileKey
        //   (payload/shared-safe) is ever executed in the browser.
        "payload/internal": false,
      };
    }
    return config;
  },
};

export default withPayload(nextConfig);
