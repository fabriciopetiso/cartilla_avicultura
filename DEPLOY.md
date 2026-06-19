# Deploy — cartilla_avicultura via GitHub Pages + AlterMundi DNS

Chosen approach: serve from **GitHub Pages** and point an AlterMundi subdomain at
it with auto-provisioned TLS. No AlterMundi infra, no self-hosted runner — the
org only adds one DNS record. Sidesteps the runner-trust problem entirely.

## Current state

- GitHub Pages is **already enabled**: source `main`/root, HTTPS enforced,
  live at https://fabriciopetiso.github.io/cartilla_avicultura/ (`cname: null`).
- It currently serves the **old committed version** (CDN fonts/React, 1 MB
  og-cover). The self-contained + optimized changes are **local only, not pushed**
  (held by request). Pages will serve them once pushed.

## Remaining steps

### In the repo (when greenlit to push)
1. Push the self-contained/optimized commits (vendored React + fonts, optimized
   images) so Pages serves the improved version.
2. Add `CNAME` file at repo root containing `materialavicola.altermundi.net`.
3. Add empty `.nojekyll` at root (skip Jekyll processing; serve files verbatim).
4. Set the custom domain in Pages and let GitHub issue the Let's Encrypt cert:
   `gh api -X PUT repos/fabriciopetiso/cartilla_avicultura/pages \
        -f 'cname=materialavicola.altermundi.net' -F 'https_enforced=true'`
   (then enable "Enforce HTTPS" once the cert shows as issued).

### AlterMundi side (org action)
5. DNS: `CNAME  materialavicola.altermundi.net  →  fabriciopetiso.github.io`
   (subdomain → `<user>.github.io`, NOT to the repo).

All relative asset paths work at both the github.io project URL and the custom
domain root — no `<base>` change needed.

## Two things to settle with the org

- **Convention deviation**: AlterMundi policy is all public services CNAME to
  `altermundi.net` (their nginx-edge → centralized TLS, security headers/CSP,
  access logs). Pointing a subdomain at github.io bypasses that and adds a
  third-party (GitHub) dependency. Needs org sign-off.
- **Durability**: the subdomain would depend on a personal account
  (`fabriciopetiso`). More robust for an org subdomain: fork into the AlterMundi
  org and serve Pages from there (DNS → `altermundi.github.io`), so it survives
  account changes — matches how libreincu lives under the org.

## Verify / rollback

- Verify: `curl -sI https://materialavicola.altermundi.net` → 200; padlock valid;
  page renders (React hydrates the `<x-dc>` content).
- Rollback: remove the custom domain in Pages + delete the DNS record; the
  github.io URL keeps working.
