import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
  PayloadRequest,
} from 'payload'
import { revalidatePath } from 'next/cache'

/**
 * Busts the statically-prerendered frontend so DB edits go live immediately.
 * Guarded so CLI/seed runs (outside a Next request scope) no-op instead of throwing.
 */
const revalidate = (paths: Parameters<typeof revalidatePath>[], req: PayloadRequest) => {
  if (req?.context?.disableRevalidate) return
  try {
    for (const args of paths) revalidatePath(...args)
    req?.payload?.logger?.info?.(`↻ Revalidated ${paths.map(([p]) => p).join(', ')} after content change`)
  } catch {
    // Not inside a Next.js request scope (e.g. `npm run seed`) — safe to ignore.
  }
}

/** Home + every route sharing the root frontend layout (covers /work + /work/[slug]). */
export const revalidateHomeGlobal: GlobalAfterChangeHook = ({ doc, req }) => {
  revalidate([['/', 'layout']], req)
  return doc
}

export const revalidateTermsGlobal: GlobalAfterChangeHook = ({ doc, req }) => {
  revalidate([['/terms', 'page'], ['/', 'layout']], req)
  return doc
}

export const revalidatePrivacyGlobal: GlobalAfterChangeHook = ({ doc, req }) => {
  revalidate([['/privacy', 'page'], ['/', 'layout']], req)
  return doc
}

export const revalidateHomeAfterChange: CollectionAfterChangeHook = ({ doc, req }) => {
  revalidate([['/', 'layout']], req)
  return doc
}

export const revalidateHomeAfterDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
  revalidate([['/', 'layout']], req)
  return doc
}
