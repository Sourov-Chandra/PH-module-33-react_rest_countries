
# 🌍 Country Explorer
 
A beautiful travel tracker app built with **React** that lets you browse all countries in the world, mark them as visited, collect their flags, and track your global travel progress.
 
---
 
## 🔗 Live Demo
 
👉 **[https://enjoy-exploring-country.vercel.app](https://enjoy-exploring-country.vercel.app)**
 
---
 
## 📸 Preview
 
> Browse 195+ countries, mark them as visited, filter by region, search by name or capital, and watch your progress bar grow!
 
---
 
## 🚀 Features
 
- 🔍 **Search** countries by name or capital city
- 🌐 **Filter** by region (Africa, Asia, Europe, etc.)
- ✅ **Mark as Visited** — toggle any country as visited
- 🏳️ **Collect Flags** — add country flags to your personal collection
- 📊 **Progress Tracker** — see how many countries you've visited out of 195
- 💾 **Persistent Storage** — visited countries and flags are saved in `localStorage` (no login needed)
- 🎨 **Glassmorphism UI** — dark gradient background with glowing blobs and glass cards
 
---
 
## 🛠️ Tech Stack
 
| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Tailwind CSS | Styling & responsive layout |
| React `use()` Hook | Async data fetching with Suspense |
| localStorage | Client-side persistence |
| REST Countries API | Country data source |
 
---
 
## 📦 Installation
 
```bash
# 1. Clone the repository
git clone https://github.com/your-username/country-explorer.git
 
# 2. Navigate into the project
cd country-explorer
 
# 3. Install dependencies
npm install
 
# 4. Start the development server
npm run dev
```
 
Then open [http://localhost:5173](http://localhost:5173) in your browser.
 
---
 
## 🗂️ Project Structure
 
```
src/
├── components/
│   ├── Countries.jsx        # Main container — search, filter, state management
│   ├── Country.jsx          # Individual country card
│   └── VisitedCountryShow.jsx  # Card shown in the Visited tab
├── App.jsx                  # Root component with Suspense + data fetch
├── App.css
└── main.jsx
```
 
---
 
## 🔌 API
 
This project uses the free **Programming Hero Countries API**:
 
```
GET https://openapi.programming-hero.com/api/all
```
 
Each country object contains: name, capital, region, population, area, flag, currencies, languages, and ISO codes.
 
---
 
## 🧠 How It Works
 
1. **App.jsx** fetches all countries once outside the component (avoiding re-fetches on re-render) and passes the Promise to `Countries` via props.
2. **Countries.jsx** uses React 18's `use()` hook inside a `<Suspense>` boundary to unwrap the Promise.
3. Visited countries and collected flags are stored in **localStorage** so your data survives page refreshes.
4. **Search and region filter** work together in real time to narrow down the country grid.
 
---
 
## 💡 Future Improvements
 
- [ ] 🗺️ Interactive world map highlighting visited countries (`react-simple-maps`)
- [ ] 🔐 User authentication (Firebase / Supabase) for cloud-saved data
- [ ] 📄 Country detail page with neighbours, timezone, calling code
- [ ] 🏆 Achievement badges ("Visited all of Asia!", "5 countries!")
- [ ] 📤 Share your visited countries list with a link
- [ ] 🌙 Light / dark mode toggle
 
---
 
## 🙌 Acknowledgements
 
- [Programming Hero](https://programming-hero.com/) for the Countries API
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [React](https://react.dev/) for the component model
 
---
 
## 📄 License
 
This project is open source and available under the [MIT License](LICENSE).
 
---
 
> Made with ❤️ — Happy Travelling! 🧳
 
