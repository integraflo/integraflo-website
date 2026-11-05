# Security Policy

## Scope

This repository publishes the public IntegraFlo website. Treat all repository content and all content delivered to a browser as public.

## Secrets policy

Never commit or embed:

- API keys or bearer tokens
- passwords or database credentials
- OCI credentials or private keys
- SuiteCRM credentials or access tokens
- Google Workspace credentials
- GitHub personal access tokens
- private SSH/TLS keys
- customer or prospect confidential information
- privileged LLM prompts containing secrets

Public frontend code must never be trusted to protect a secret. Any future API, lead-capture or AI-chat capability must place credentials and privileged logic behind a server-side or edge boundary.

## Current architecture

The production site is intentionally static. It uses a small browser-side JavaScript file to manage visitor analytics choices. The Google Analytics 4 tag is loaded only after a visitor allows analytics. The site has no public contact form, application database, user authentication or site-specific backend API. Keep this architecture simple and introduce additional dynamic features only for a clear business need.

## Future dynamic features

Before enabling public lead capture or an AI assistant, require at minimum:

- server-side/edge API boundary
- rate limiting
- bot/abuse protection
- request and prompt size limits
- global spend/quota ceiling
- secret storage outside the public repository and browser
- input validation and output encoding
- explicit data-retention rules
- separate, least-privilege SuiteCRM integration credentials
- suppression/privacy controls for captured leads
- logging that avoids credentials and unnecessary personal data

## Reporting a vulnerability

Please report suspected security issues privately by email to michael@integraflo.com. Do not include passwords, access tokens, private keys or sensitive client data in the initial report.
