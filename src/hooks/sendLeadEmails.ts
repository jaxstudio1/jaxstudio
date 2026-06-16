import type { CollectionAfterChangeHook } from 'payload'

const ACCENT = '#ff5722'
const BG = '#0a0a0a'
const PANEL = '#141414'

const esc = (s: unknown): string =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br/>')

const ownerHtml = (name: string, email: string, projectType: string, message: string) => `
<!doctype html><html><body style="margin:0;padding:0;background:${BG};font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#eaeaea;">
  <div style="max-width:560px;margin:0 auto;padding:32px 28px;">
    <div style="font-size:11px;letter-spacing:0.4em;text-transform:uppercase;color:#888;margin-bottom:24px;">JAX STUDIO · NEW INQUIRY</div>
    <h1 style="font-size:22px;font-weight:700;margin:0 0 18px;color:#fff;">${esc(name)} just reached out</h1>
    <table style="border-collapse:collapse;font-size:14px;line-height:1.55;color:#cfcfcf;width:100%;">
      <tr><td style="padding:6px 0;width:110px;color:#888;">From</td><td style="padding:6px 0;color:#fff;">${esc(name)} &lt;${esc(email)}&gt;</td></tr>
      ${projectType ? `<tr><td style="padding:6px 0;color:#888;">Project type</td><td style="padding:6px 0;color:#fff;">${esc(projectType)}</td></tr>` : ''}
    </table>
    <div style="margin-top:22px;padding:18px 20px;border-left:3px solid ${ACCENT};background:${PANEL};border-radius:4px;color:#eaeaea;font-size:14px;line-height:1.6;">${esc(message)}</div>
    <p style="margin-top:28px;font-size:12px;color:#666;">Reply directly to this email — the visitor's address is set as Reply-To.</p>
  </div>
</body></html>`

const autoReplyHtml = (firstName: string, message: string) => `
<!doctype html><html><body style="margin:0;padding:0;background:${BG};font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#eaeaea;">
  <div style="max-width:560px;margin:0 auto;padding:32px 28px;">
    <div style="font-size:11px;letter-spacing:0.4em;text-transform:uppercase;color:#888;margin-bottom:24px;">JAX STUDIO</div>
    <h1 style="font-size:24px;font-weight:700;margin:0 0 14px;color:#fff;">Thanks, ${esc(firstName)} <span style="color:${ACCENT};">!</span></h1>
    <p style="font-size:15px;line-height:1.6;color:#cfcfcf;margin:0 0 14px;">I&rsquo;ve received your message and will get back to you within <strong style="color:#fff;">24 hours</strong>.</p>
    <p style="font-size:13px;line-height:1.6;color:#888;margin:0 0 22px;">A copy of what you sent is below for your records.</p>
    <div style="padding:18px 20px;border-left:3px solid ${ACCENT};background:${PANEL};border-radius:4px;color:#eaeaea;font-size:14px;line-height:1.6;">${esc(message)}</div>
    <p style="margin-top:30px;font-size:12px;color:#666;">— Wade "Jax" Jackson · Jax Studio · hello@jaxstudio.ink</p>
  </div>
</body></html>`

/**
 * Sends an owner notification + a customer auto-reply via SendGrid when a new
 * Lead is created. Fail-soft: any error is logged but never thrown, so the
 * visitor's contact submission always succeeds. No-ops when SENDGRID_API_KEY is
 * unset (local dev / seed), so it's safe outside a request scope.
 */
export const sendLeadEmails: CollectionAfterChangeHook = async ({ doc, operation, req }) => {
  if (operation !== 'create') return doc
  const apiKey = process.env.SENDGRID_API_KEY
  if (!apiKey) return doc

  const senderEmail = process.env.SENDER_EMAIL || 'hello@jaxstudio.ink'
  const senderName = process.env.SENDER_NAME || 'Jax Studio'
  const ownerEmail = process.env.OWNER_EMAIL || 'jaxstudio.ink@gmail.com'

  const firstName = String(doc.firstName ?? '').trim()
  const lastName = String(doc.lastName ?? '').trim()
  const fullName = [firstName, lastName].filter(Boolean).join(' ') || 'Someone'
  const email = String(doc.email ?? '').trim()
  const projectType = String(doc.projectType ?? '').trim()
  const message = String(doc.message ?? '')

  try {
    const sgMod = await import('@sendgrid/mail')
    const sg = sgMod.default
    sg.setApiKey(apiKey)

    await sg.send({
      to: ownerEmail,
      from: { email: senderEmail, name: senderName },
      replyTo: { email, name: fullName },
      subject: `New inquiry from ${fullName} — Jax Studio`,
      html: ownerHtml(fullName, email, projectType, message),
    })

    if (email) {
      await sg.send({
        to: email,
        from: { email: senderEmail, name: senderName },
        replyTo: { email: ownerEmail, name: senderName },
        subject: `Thanks ${firstName || 'there'} — I'll be in touch shortly`,
        html: autoReplyHtml(firstName || 'there', message),
      })
    }
    req?.payload?.logger?.info?.(`✉ Lead emails sent for ${email}`)
  } catch (err) {
    req?.payload?.logger?.error?.(`Lead email send failed: ${(err as Error)?.message ?? err}`)
  }
  return doc
}
