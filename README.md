# Lumber News website

A free, static, black-and-gold newsroom website designed for GitHub Pages.

## Preview

Open `index.html` in a browser. The site requires an internet connection to load live Roblox avatars.

## Edit your website

Open `data.js` in a text editor. This is the only file you normally need to change.

### Members

Each member has:
- `id`: unique identifier, e.g. `journalist-alex`
- `name`: display name
- `username`: exact Roblox username for avatar lookup (leave empty to show the placeholder)
- `rank`: visible title (you can use any rank name)
- `tier`: `head`, `deputy`, `manager`, or `journalist`
- `reportsTo`: the `id` of the person they report to, or `null` for the department head
- `bio`: a short message written by the member
- `joined`: optional join date
- `featured`: set to `true` to include a leadership member in the welcome cards

Add or remove member objects in the `members` array, keeping commas between objects. The leadership tree builds itself from `reportsTo`.

### Articles

Edit the `articles` array. Set `url` to the publicly shareable article link (for example, a Google Doc link). Blank URLs display “Coming soon.” The archive automatically sorts by date and supports searching and category filtering.

### Social media

Edit the `social` array with verified LT2 Fan Group URLs. Blank URLs display “Link coming soon.”

## Publish on GitHub Pages

1. Create a new public GitHub repository, for example `lumber-news`.
2. Upload all files **inside** this folder to the repository root (`index.html`, `style.css`, `script.js`, `data.js`, `avatar-placeholder.svg`).
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, then `main` and `/(root)`, and save.
5. GitHub will provide your published URL, usually `https://YOUR-USERNAME.github.io/lumber-news/`.
6. To update the roster or articles later, edit `data.js` in GitHub and commit the change. The website will update after deployment.

## Roblox avatars

The browser uses Roblox-compatible community proxy endpoints (`users.roproxy.com` and `thumbnails.roproxy.com`) to look up Roblox usernames and headshot thumbnails. This is a third-party service, not an official Roblox service. It may be unavailable or rate-limited; in that case, the built-in placeholder image remains visible. Avoid entering private information in `data.js` because GitHub Pages websites are public.

## Notes

- The sample roster, dates, article titles, descriptions and links are placeholders, not verified department records.
- Only publish members' introductions and profiles with their permission.
- This site is not yet deployed. Publishing requires access to your GitHub account.
- The site is a community project, not affiliated with Roblox Corporation.
