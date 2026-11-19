# Lumber News website

A free, static, black-and-gold newsroom website designed for GitHub Pages.

## Preview

Open `index.html` in a browser. The site requires an internet connection to load live Roblox avatars.

## Edit your website

Open `data.js` to edit members, medals, and social links. The publication archive is in `publications.js`.

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

The `publications.js` file contains 268 verified publication posts from the Lumber News HQ channel: 184 articles and 84 interviews. Each entry contains its category, issue number and title when stated, journalist when credited, Discord post date, HQ message link, and a Google Docs link if one was present. Add future publications to the `window.LUMBER_NEWS_PUBLICATIONS` array using the same fields. The archive sorts by date, supports search and category filtering, and shows 24 results at a time.

The HQ channel is a mirror. Original main-server message links were unavailable, so the website opens the HQ post. Dates are UTC Discord post dates. Some early editions did not state a number or title; those fields remain blank. The source CSV and JSON are separate from this website package for review and future updates.

### Social media

Edit the `social` array with verified LT2 Fan Group URLs. Blank URLs display “Link coming soon.”

## Publish on GitHub Pages

1. Create a new public GitHub repository, for example `lumber-news`.
2. Upload all files **inside** this folder to the repository root (`index.html`, `style.css`, `script.js`, `data.js`, `publications.js`, `medals.js`, `avatar-placeholder.svg`).
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, then `main` and `/(root)`, and save.
5. GitHub will provide your published URL, usually `https://YOUR-USERNAME.github.io/lumber-news/`.
6. To update the roster or articles later, edit `data.js` in GitHub and commit the change. The website will update after deployment.

## Roblox avatars

The browser uses Roblox-compatible community proxy endpoints (`users.roproxy.com` and `thumbnails.roproxy.com`) to look up Roblox usernames and headshot thumbnails. This is a third-party service, not an official Roblox service. It may be unavailable or rate-limited; in that case, the built-in placeholder image remains visible. Avoid entering private information in `data.js` because GitHub Pages websites are public.

## Notes

- Publication entries come from accessible HQ messages. Team roster and social placeholders should be reviewed separately.
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


## Rank-based hierarchy update
The organization chart now connects Department Head → both Deputy Managers → Manager → Trial Manager → Journalist rank → Junior Journalist rank → Trainee Journalist rank. Both deputies jointly supervise Penqui. This is a rank-based display rather than the old single-supervisor `reportsTo` tree. To change members, edit `data.js`; the chart updates by `rank`. On narrow screens, scroll the chart sideways.

## In-page archive text

All 268 catalog entries include their exported Lumber News HQ message text. The archive cards use an expandable in-page reader and search includes publication text. The HQ source URL remains in the local catalog metadata for provenance but is not linked on the page. The export contains message text; external documents and attachments were not fetched.
