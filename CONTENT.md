# Editing your site's content (no coding required)

Everything you'll ever want to change day-to-day — your bio, publications,
projects, research, teaching, CV, news — lives in plain text files in the
`_data/` folder and `_config.yml`. You never need to touch the `.html` files
in `_layouts/` or `_includes/` — those just control how things *look*, and
already exist.

## The easiest way to edit: directly on GitHub, in your browser

You don't need to install anything or use git/terminal commands.

1. Go to your repo on github.com (`ian-geyan/ian-geyan.github.io`).
2. Click into the file you want to change (see the table below).
3. Click the **pencil icon** (top right of the file view) to edit.
4. Make your change.
5. Scroll down, add a short message describing the change, and click
   **"Commit changes..."** → **"Commit directly to the main branch."**
6. Wait 1-2 minutes. GitHub Actions automatically rebuilds and republishes
   the site — check the **Actions** tab if you want to watch it happen.
   Your change will then be live at your site's URL.

That's the whole workflow. No local setup needed.

## If you edited files locally instead (e.g. in VS Code / Claude Code)

Editing a file on your own machine doesn't change the live site by itself —
GitHub only rebuilds and republishes when it receives a **push** to the
`main` branch. To get a local edit live:

1. Save the file.
2. Commit and push it to GitHub. If you're working with Claude Code, just
   ask — e.g. "commit and push my changes" — and it will stage, commit, and
   push for you (it'll show you what's changing first). Otherwise, from a
   terminal in the project folder:
   ```
   git add -A
   git commit -m "describe what changed"
   git push
   ```
3. Same as above: GitHub Actions rebuilds automatically, live in 1-2
   minutes. Check the **Actions** tab on GitHub to watch progress.

Nothing is live until it's pushed — you can edit and save locally as many
times as you want without anything changing on the public site.

## Which file do I edit?

| To change...                                | Edit this file            |
|-----------------------------------------------|----------------------------|
| Your name, tagline, bio, location, photo, social links (email/GitHub/LinkedIn/Scholar/ORCID/Twitter), research-interest keyword tags | `_config.yml` (top section, under `author:` and `social:`) — for github/linkedin/scholar/twitter you can paste either a bare username/ID or the full profile URL, both work |
| Email address(es) shown under your avatar on the home page | `_config.yml`, `social.email:` — it's a list, so add more `- your@email.com` lines to show several, each on its own line |
| A news update on the home page                | `_data/news.yml` |
| A publication (paper, preprint, talk)          | `_data/publications.yml` |
| A research project/direction                   | `_data/research.yml` |
| A software/side project                        | `_data/projects.yml` |
| A course you taught/TA'd                       | `_data/teaching.yml` |
| Your education, work experience, skills, awards | `_data/cv.yml` |
| Your photo                                      | replace `assets/images/avatar.jpg` (upload a file of the same name) |
| Your CV as a downloadable PDF                   | replace `assets/files/cv.pdf` |
| The order of tabs in the top nav                | `_config.yml`, the `nav:` list |
| A thumbnail image on a publication/research/project entry | that entry's `image:` field — path to an image file, e.g. `/assets/images/research/my-project.png`. Clicking the thumbnail on the live site opens the original image full-size; leave `image: ""` for no thumbnail |
| Which papers show under a research/project entry's expandable "Related publications" list | 1) give the paper a short `label:` (e.g. `"ma-slow-design"`) in `_data/publications.yml`; 2) add that same label to the research/project entry's `papers:` list in `_data/research.yml`/`_data/projects.yml`. A label can be reused in as many entries as you like |
| The citation text shown for a paper in a "Related publications" list | that paper's `cite:` field in `_data/publications.yml` — free text, e.g. `**G. Yan**, et al., "Title," Venue, 2026.`. A `[view]` link is added automatically in front of it, pointing at that paper's `links.pdf` |
| Whether publication thumbnails show at all       | `_config.yml`, `publications_show_images: true`/`false` — set to `false` to hide the image column on every publication and go back to the plain text-only list |

## How the data files work (YAML basics)

Each `_data/*.yml` file is a list of entries. Every entry starts with a
`-` and has the same fields. To add a new one, **copy an existing entry,
paste it above or below, and change the text.** For example, in
`_data/publications.yml`:

```yaml
- title: "My New Paper Title"
  authors: "**Jane Researcher**, Some Collaborator"
  venue: "Conference on Interesting Systems (CIS)"
  year: 2026
  month: 6                   # 1-12, or "" if unknown — used to order papers within the same year
  type: conference          # journal | magazine | conference | preprint
  label: "my-paper"          # short unique id — reference it from a research/project entry's `papers:` list
  cite: >-
    **Jane Researcher** and Some Collaborator, "My New Paper Title,"
    Conference on Interesting Systems (CIS), 2026.
  featured: true             # true = also shows in "Selected Publications" on the home page
  image: "/assets/images/publications/my-paper.png"   # thumbnail shown on the left; "" for none
  links:
    pdf: "https://example.com/paper.pdf"   # leave "" to hide the link
    doi: ""
    code: "https://github.com/you/repo"
    slides: ""
    video: ""
```

A few rules that matter:
- **Indentation matters.** Keep the same number of spaces as the lines
  around it (don't use tabs).
- Wrap text with quotes if it contains a colon (`:`) or starts with a
  special character; plain text usually doesn't need quotes.
- `**bold text**` works inside `title`/`authors`/etc. — it's Markdown.
- `featured: true` / `featured: false` controls what also appears on the
  home page (only used by `research.yml` and `publications.yml`).
- Leave a link as `""` (empty quotes) to hide that specific link/button —
  don't delete the line.
- To remove an entry entirely, delete its `-` line and every indented line
  under it.

## Preview before publishing (optional)

If you want to see a change before it goes live, you can ask Claude Code to
build a quick static preview, or edit on a separate git branch and open a
GitHub Pull Request instead of committing directly to `main` — GitHub can
show you a diff before you merge it live.
