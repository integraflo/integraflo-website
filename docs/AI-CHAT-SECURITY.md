# AI Chat and Lead Capture Security Architecture

Status: **PLANNED — NOT DEPLOYED**

The public IntegraFlo website is currently static. Do not introduce a public AI chat or lead-capture feature until the controls below are implemented.

## Trust boundary

```text
Browser / public website
        |
        v
Protected edge endpoint
- bot verification
- per-client rate limiting
- request-size limits
- abuse detection
- global AI quota/spend ceiling
        |
        v
Server-side AI orchestration
- secrets in managed secret storage
- approved IntegraFlo public knowledge only
- bounded system instructions
- output controls
        |
        +--> LLM provider
        |
        +--> SuiteCRM lead API (separate least-privilege identity)
```

## Mandatory controls before launch

- [ ] No LLM, CRM or cloud credentials in browser code or this public repository.
- [ ] Chat model is called only after a visitor submits a message; page views must not consume AI inference.
- [ ] Bot protection/challenge is enforced before expensive AI operations.
- [ ] Per-IP/session rate limits are enforced server-side.
- [ ] Per-conversation message limits/cooldowns are enforced.
- [ ] Maximum request/prompt size is enforced before the LLM call.
- [ ] Global daily AI usage ceiling is enforced independently of provider billing.
- [ ] Paid overage is disabled or explicitly bounded during initial launch.
- [ ] Repeated public FAQ responses are cached where appropriate.
- [ ] LLM answers are grounded in an approved public IntegraFlo knowledge base.
- [ ] Unsupported questions fail safely instead of inventing company facts.
- [ ] Prompt-injection attempts cannot expose secrets because secrets are never placed in model-readable public context unless strictly necessary.
- [ ] Public assistant has no infrastructure, OCI, GitHub, email or SuiteCRM administrative capability.
- [ ] Lead creation uses a separate SuiteCRM integration identity with only required permissions.
- [ ] Contact details are collected only after clear visitor intent/notice.
- [ ] Suppression/opt-out state is respected by downstream CRM/outreach workflows.
- [ ] Logs exclude secrets and minimize personal data.
- [ ] Privacy notice is updated before collecting/storing chat or lead information if required.
- [ ] Abuse/availability behavior is defined for quota exhaustion: static FAQ/contact fallback rather than unexpected paid usage.

## Preferred initial implementation

Candidate architecture:

`GitHub Pages -> Cloudflare protected Worker/edge API -> Workers AI or another bounded-cost LLM -> approved public KB`

SuiteCRM integration should be added only after the informational assistant is stable and abuse controls are verified.

## Non-goal

The public website chatbot must never become an unrestricted agent for IntegraFlo infrastructure or internal systems. Internal LLM administration and public visitor AI are separate trust domains.
