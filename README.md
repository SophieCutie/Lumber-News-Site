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

## Official medals and achievements

The Medals page includes all 15 official Lumber News medals, using built-in gold icons.
Edit the `medals` catalog in `data.js` to adjust descriptions. The original seven medals without supplied requirements have clearly marked placeholder criteria.

To award a medal, find a member in `data.js` and change `medals:[]` to, for example:

```js
medals:[
  {id:'excellence',date:'2026-11-17',reason:'Consistently excellent weekly recaps'},
  {id:'knowledge',date:'2026-11-17',reason:'Scored 96% on the Knowledge Check'}
]
```

Available IDs: `honor`, `leadership`, `journalism`, `veterancy`, `veterancy2`, `knowledge`, `perfect`, `excellence`, `innovation`, `service`, `teamwork`, `dedication`, `impact`, `mentorship`, `legacy`.

Medals appear on the team hierarchy and journalist profile cards. Each medal's detail panel lists recipients and optional dates/reasons. Duplicate entries are supported for repeat awards. This is a static site: Discord `/medal award` commands do **not** automatically sync to the website.

Upload all changed files (`index.html`, `data.js`, `style.css`, `medals.js`, `README.md`) to your repository root, preserving the existing `script.js` and `avatar-placeholder.svg`.

## Roster update (November 2026)
The roster now includes Gomi and Fartsona as deputy managers, Penqui as manager, Cookies as trial manager, and 11 journalists across three ranks. Sirfated is marked on hiatus. Department Head remains a placeholder. Only the two deputy managers have a confirmed reporting link to the department head; all other reporting links are intentionally unassigned. Update `reportsTo` in `data.js` when you know each person’s supervisor. All medals remain unawarded. Roblox usernames are assumed from display names except Mario (`Fartius3000`) and fede (`70_99`); verify those usernames for accurate avatars.
