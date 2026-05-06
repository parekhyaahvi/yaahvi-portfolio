# Pre-Deployment Security Checklist
## Yaahvi Riddhish Parekh — Full Stack Developer Portfolio

> Complete every item on this checklist before making the site public.
> Check off each item as ✅ Done | ⚠️ N/A | ❌ Blocked

---

## SECTION A — Source Code & Repository

| # | Check | Status | Notes |
|---|-------|--------|-------|
| A1 | No API keys, tokens, or passwords anywhere in the codebase | ☐ | Search repo for `key`, `token`, `secret`, `password` |
| A2 | `.env` file is in `.gitignore` and not committed | ☐ | Even if currently empty — good practice |
| A3 | `node_modules/` is in `.gitignore` | ☐ | Should never be committed |
| A4 | GitHub repo is set to Private (until ready to go public) | ☐ | Change to public only after this checklist passes |
| A5 | No personal data (home address, phone number) hardcoded in source | ☐ | Only email, GitHub, LinkedIn are acceptable |
| A6 | Email address in `config.js` is one you're comfortable making public | ☐ | Consider using a dedicated contact email, not your primary |
| A7 | All commits reviewed — no accidental secrets in commit history | ☐ | Use `git log` to scan; use BFG Repo Cleaner if needed |

---

## SECTION B — HTTPS & Transport Security

| # | Check | Status | Notes |
|---|-------|--------|-------|
| B1 | Site is served over HTTPS (not HTTP) | ☐ | Vercel/GitHub Pages provide this automatically |
| B2 | HTTP → HTTPS redirect is active (no mixed content) | ☐ | Vercel enforces this by default |
| B3 | All external resources (fonts, icons, CDN) are loaded over HTTPS | ☐ | Check all `<link>` and `<script>` src attributes |
| B4 | No mixed content warnings in browser console | ☐ | Open DevTools → Console → check for mixed content errors |

---

## SECTION C — HTTP Security Headers

Configure these on Vercel via `vercel.json` or Netlify via `_headers` file.

```json
// vercel.json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; script-src 'self'; connect-src 'none'; frame-ancestors 'none';"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains; preload"
        }
      ]
    }
  ]
}
```

| # | Header | Status | Why It Matters |
|---|--------|--------|----------------|
| C1 | `X-Content-Type-Options: nosniff` | ☐ | Prevents MIME-type sniffing attacks |
| C2 | `X-Frame-Options: DENY` | ☐ | Prevents clickjacking via iframes |
| C3 | `X-XSS-Protection: 1; mode=block` | ☐ | Legacy XSS filter for older browsers |
| C4 | `Referrer-Policy: strict-origin-when-cross-origin` | ☐ | Controls what referrer info is sent |
| C5 | `Permissions-Policy` | ☐ | Disables access to camera, mic, geolocation |
| C6 | `Content-Security-Policy (CSP)` | ☐ | Whitelists valid sources of scripts/styles — blocks XSS |
| C7 | `Strict-Transport-Security (HSTS)` | ☐ | Forces HTTPS for 1 year |
| C8 | Verify headers at **securityheaders.com** after deploy | ☐ | Paste your URL and aim for grade A or A+ |

---

## SECTION D — Content Security Policy (CSP) Validation

| # | Check | Status | Notes |
|---|-------|--------|-------|
| D1 | No inline `<script>` tags with executable code (use external `.js` files) | ☐ | Inline scripts break strict CSP |
| D2 | No `eval()`, `new Function()`, or `setTimeout(string)` in JS | ☐ | These are blocked by default in strict CSP |
| D3 | Google Fonts whitelisted in CSP (`fonts.googleapis.com`, `fonts.gstatic.com`) | ☐ | Required if using Google Fonts |
| D4 | CSP tested in **Report-Only mode** first before enforcing | ☐ | Add `Content-Security-Policy-Report-Only` header first |
| D5 | No third-party scripts loaded without explicit CSP allowance | ☐ | Review every `<script src="">` tag |

---

## SECTION E — JavaScript & Client-Side Security

| # | Check | Status | Notes |
|---|-------|--------|-------|
| E1 | No `innerHTML` with dynamic/user-controlled content | ☐ | Use `textContent` instead; `innerHTML` risks XSS |
| E2 | Email address is NOT exposed in plain HTML (to reduce scraping) | ☐ | Consider: render via JS, use `data-` attr, or encode as HTML entities |
| E3 | All external links use `rel="noopener noreferrer"` | ☐ | Prevents tab-napping via `window.opener` exploitation |
| E4 | Clipboard API used with `try/catch` error handling | ☐ | Prevents unhandled promise rejections |
| E5 | No `console.log()` statements left in production code | ☐ | Remove all debug logs before shipping |
| E6 | No sensitive data stored in `localStorage` or `sessionStorage` | ☐ | N/A for this site, but confirm nothing was added |

```html
<!-- Correct: all external links -->
<a href="https://github.com/..." target="_blank" rel="noopener noreferrer">GitHub</a>
```

```js
// Correct: safe email display
document.getElementById('email-display').textContent = config.email;
// NOT: element.innerHTML = config.email
```

---

## SECTION F — Privacy & Data Handling

| # | Check | Status | Notes |
|---|-------|--------|-------|
| F1 | No user tracking (no Google Analytics, Hotjar, etc.) without disclosure | ☐ | If you add analytics later, add a cookie/privacy notice |
| F2 | No cookies set anywhere on the site | ☐ | Static site should set zero cookies |
| F3 | No contact form — no personal data of visitors is collected or stored | ☐ | v1 uses only icon links — no form submission |
| F4 | Email in `config.js` is intentionally public-facing | ☐ | Confirm with Yaahvi this is the right address |
| F5 | Site does not embed third-party iframes (YouTube, Maps, etc.) | ☐ | Iframes can introduce tracking and security risks |

---

## SECTION G — Dependency Security

| # | Check | Status | Notes |
|---|-------|--------|-------|
| G1 | Project has zero npm dependencies (pure vanilla) | ☐ | No `package.json` = no supply chain risk |
| G2 | If using Vite as dev tool: run `npm audit` before deploy | ☐ | `npm audit --audit-level=high` — fix any high/critical |
| G3 | Dev dependencies are NOT included in production build | ☐ | Vite strips dev deps automatically |
| G4 | All CDN-loaded assets (fonts, icons) are from trusted domains | ☐ | Only `fonts.googleapis.com`, `fonts.gstatic.com` |

---

## SECTION H — Deployment Environment

| # | Check | Status | Notes |
|---|-------|--------|-------|
| H1 | Vercel project settings: only `main` branch auto-deploys | ☐ | Prevent accidental deploy from feature branches |
| H2 | Vercel dashboard: no environment variables containing secrets | ☐ | Should be empty for v1 |
| H3 | GitHub repo: branch protection rule on `main` (require PR review) | ☐ | Optional but good habit |
| H4 | GitHub repo: no GitHub Actions workflows unless intentional | ☐ | Review `.github/workflows/` folder |
| H5 | Deployment preview URL does not expose unfinished work publicly | ☐ | Vercel previews are publicly accessible by default |
| H6 | Custom domain (if used): DNS is fully transferred and HTTPS is active | ☐ | Verify with `curl -I https://yourdomain.com` |

---

## SECTION I — Final QA Before Launch

| # | Check | Status | Notes |
|---|-------|--------|-------|
| I1 | Run **Lighthouse** (Chrome DevTools → Lighthouse): Performance ≥ 90, Accessibility ≥ 90 | ☐ | |
| I2 | Run **securityheaders.com** scan: target A or A+ | ☐ | |
| I3 | Run **SSL Labs** (`ssllabs.com/ssltest`): target A grade | ☐ | |
| I4 | Open browser DevTools → Console: zero errors or warnings | ☐ | |
| I5 | Open browser DevTools → Network: no failed requests (404s) | ☐ | |
| I6 | Test on Chrome, Firefox, Safari, and mobile browser | ☐ | |
| I7 | Test keyboard-only navigation (Tab through all interactive elements) | ☐ | |
| I8 | Test with screen reader (VoiceOver on Mac or NVDA on Windows) | ☐ | |
| I9 | Verify `robots.txt` exists (allow all) or is intentionally absent | ☐ | A static portfolio should be crawlable |
| I10 | Verify `<meta name="description">` and Open Graph tags are set | ☐ | Critical for link previews on LinkedIn, WhatsApp, etc. |

---

## SECTION J — Post-Launch Monitoring

| # | Check | Frequency |
|---|-------|-----------|
| J1 | Manually visit site to confirm it's still up | Monthly |
| J2 | Re-run securityheaders.com after any config change | On change |
| J3 | Check GitHub for any dependency vulnerability alerts | Monthly |
| J4 | Rotate email address or update contact info if it changes | As needed |
| J5 | Re-run Lighthouse audit after any major content update | On change |

---

## QUICK REFERENCE: Copy-Paste `vercel.json`

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
        { "key": "Strict-Transport-Security", "value": "max-age=31536000; includeSubDomains; preload" },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; script-src 'self'; connect-src 'none'; frame-ancestors 'none';"
        }
      ]
    }
  ]
}
```

> **Target before going live:** All A-G items ✅ + All I items ✅ + Security Headers grade A+
