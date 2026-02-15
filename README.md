# Christopher Tineo's Blog

A personal blog and professional portfolio built with [Hugo](https://gohugo.io/) and the [PaperMod](https://github.com/adityatelange/hugo-PaperMod) theme.

## 🚀 Technologies

- **Framework:** Hugo (Static Site Generator)
- **Theme:** PaperMod
- **CMS:** [Decap CMS](https://www.decapcms.org/) (formerly Netlify CMS)
- **Deployment:** [Cloudflare Pages](https://pages.cloudflare.com/)
- **Auth Gateway:** Custom Cloudflare Worker for GitHub OAuth

## 🛠️ Local Development

To run the site locally for development:

1. **Clone the repository:**
   ```bash
   git clone --recursive https://github.com/TineoC/blog.git
   cd blog
   ```

2. **Run the Hugo server:**
   ```bash
   hugo server -D
   ```
   The site will be available at `http://localhost:1313`.

## ✍️ Content Management

### Via Admin Portal
Access the CMS at `https://blog.tineochristopher.com/admin/`. This portal allows you to write, save drafts, and publish posts using a user-friendly interface.

### Via CLI
To create a new post using Hugo's archetypes:
```bash
hugo new posts/my-new-post.md
```

## 📂 Project Structure

- `content/`: Markdown files for posts and pages.
- `static/admin/`: Configuration and entry point for Decap CMS.
- `themes/PaperMod/`: The site's visual theme (added as a git submodule).
- `layouts/`: Custom overrides for theme templates.
- `archetypes/`: Templates for new content.

## 🚢 Deployment

The site is automatically deployed to Cloudflare Pages whenever changes are pushed to the `main` branch. The build process is managed via GitHub Actions defined in `.github/workflows/deploy.yml`.
