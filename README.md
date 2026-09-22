# SkyLap Laptop Service Centre — website

Static site. No build step, no dependencies, no server code. Vercel serves these files directly.

## What is here

- Plain HTML, one file per page, plus `assets/` for CSS, JavaScript, fonts and images.
- `vercel.json` holds clean URLs, the redirects from the previous site's addresses, and security headers.
- `sitemap.xml` and `robots.txt` are generated with the pages and are already current.

## Deploying

Pushing to the default branch deploys. Vercel needs no framework preset and no build command:

| Setting | Value |
| --- | --- |
| Framework preset | Other |
| Build command | *(leave empty)* |
| Output directory | `.` |
| Install command | *(leave empty)* |

## Editing

These files are generated from a separate authoring project, so edits made directly here are
overwritten by the next publish. Content changes should be made at the source.
