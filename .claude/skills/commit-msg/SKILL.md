---
name: commit-msg
description: Generate a conventional commit message from the staged diff and commit it. Use when the user says "write a commit message", "generate a commit", "commit my changes", or runs /commit-msg.
---

# commit-msg

Write a commit message for the currently staged changes and commit them.

## Workflow

1. Run `git diff --staged --stat`. If nothing is staged, **stop** and tell the user to stage their changes first (e.g. `git add <files>`). Do not stage anything yourself.
2. Read the staged diff with `git diff --staged`.
3. Generate a commit message in this format:

   ```
   type(scope): short subject

   - bullet of what changed
   - bullet of why
   ```

4. Run `git commit` with that message (pass it via a heredoc so newlines are kept), then show the resulting `git log --oneline -1`.

## Rules

- **type** is one of: `feat`, `fix`, `refactor`, `chore`, `docs`, `style`, `test`.
- **scope** is the area touched (e.g. `cart`, `menu`, `api`, `header`, `step-1`). Omit the parentheses only if no single scope fits.
- **Subject:** imperative mood, lowercase, no trailing period, **under 60 characters** (count the whole first line).
- **Body bullets** are optional but encouraged: cover what changed and why. Keep each bullet to one line.
- **Never** add a `Co-Authored-By` trailer or any other attribution line.
- Do not push, amend, or use `--no-verify` unless the user asks.
