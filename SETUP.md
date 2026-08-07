# Site template — what's here and how to customize it

This is a custom Jekyll theme (no third-party theme dependency — everything
in `_layouts/`, `_includes/`, and `assets/` is hand-written) built for a
researcher's personal site: home/bio, publications, projects, CV, and a blog.
Designed to be relevant to both academic and industry readers.

## Structure

```
_config.yml           Site/author metadata, social links, nav order
_data/
  publications.yml    One entry per paper — drives /publications/ and the
                       "Selected Publications" list on the home page
  projects.yml         One entry per project — drives /projects/ and the
                       "Featured Projects" grid on the home page
  news.yml             Short dated updates shown on the home page
  cv.yml               Education / experience / skills / awards for /cv/

_layouts/              default, home, page, post
_includes/              head, header, footer, publication-item, project-card

assets/css/main.scss   Hand-written CSS. Theming via CSS variables in :root
                       and :root[data-theme="dark"] — no framework/CDN.
assets/js/main.js      Dark-mode toggle (persisted in localStorage, falls
                       back to OS preference), mobile nav, publication
                       type filter on /publications/.

index.markdown, about.markdown, publications.html, projects.html, cv.html,
blog.html, 404.html    The pages themselves (all layout logic lives in
                       _layouts/_includes; these files are mostly front matter).

_posts/                Blog posts (existing Jekyll convention, unchanged).

.github/workflows/pages.yml
                       Deploys via GitHub Actions using this repo's own
                       Gemfile/Jekyll version. Required because GitHub
                       Pages' legacy "Deploy from branch" build ignores
                       your Gemfile and restricts which plugins can run.
```

## To make this yours

1. **GitHub repo settings** → Pages → Source → set to **"GitHub Actions"**
   (not "Deploy from branch") so `.github/workflows/pages.yml` is used.
2. **`_config.yml`** — set `url` (and `baseurl` if the site isn't served
   from the domain root), and replace the placeholder name/tagline/bio/
   social links under `author:` and `social:`.
3. **`_data/publications.yml`, `projects.yml`, `news.yml`, `cv.yml`** —
   replace the placeholder entries with your real content. Each file has
   inline comments explaining the fields (e.g. `featured: true` controls
   what shows on the home page).
4. **Images/files** — add a photo at `assets/images/avatar.jpg` (the home
   page hides it gracefully if missing) and, optionally, a CV PDF at
   `assets/files/cv.pdf` (linked from the "Download PDF" button on `/cv/`).
5. **Preview locally**: `bundle install` then `bundle exec jekyll serve`,
   open `http://localhost:4000`.
   - Note: `Gemfile.lock` was generated against the original `minima`
     theme setup and is now stale (this template dropped `minima` and
     added `jekyll-seo-tag` / `jekyll-sitemap`). The first `bundle install`
     after this change will update the lockfile — that's expected.

## Notes on decisions made

- **PRISM** (the referenced project) is a Next.js/Tailwind/TypeScript
  template, not Jekyll — so rather than porting it directly, this theme
  was built Jekyll-native to match the existing `_config.yml`/Gemfile/
  GitHub Pages setup already in this repo, while covering the same
  feature set (bio+news home, publications from a data file, projects,
  CV).
- Dark mode, nav, and the publications filter are plain CSS/JS with no
  external libraries or fonts — keeps the site fast and dependency-free.
- No local `jekyll serve` test run was done from this session — Ruby
  isn't installed on this machine and a Chocolatey install attempt failed
  without admin rights. All Liquid templates were manually reviewed for
  tag balance and logic instead (see conversation history for specifics:
  a duplicate canonical `<link>` and a `defaults:` ordering bug in
  `_config.yml` were caught this way and fixed).
