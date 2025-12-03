# 🧛 AlamutHQ - VTES Card Database & Search

**Alamut Headquarters** is a modern web application for Vampire: The Eternal Struggle (VTES) players to browse, search, and explore the complete VTES card database with advanced filtering capabilities.

🌐 **Live Demo:** [https://alamuthq.netlify.app/](https://alamuthq.netlify.app/)

---

## ✨ Features

### 🔍 Advanced Search & Filtering
- **Comprehensive Filters** - VDB-style advanced filtering system
- **Discipline Filter** - Click-to-cycle icons (none → inferior → superior)
- **Multiple Filter Types**:
  - Text search (name/card text with regex support)
  - Disciplines (with OR/AND logic)
  - Capacity/Cost ranges
  - Clan/Path multi-select
  - Sect selection
  - Title filtering (crypt only)
  - Group selection (crypt only)
  - Library types and traits
- **Always-Visible Sidebar** - Filters accessible at all times

### 📊 View Modes
- **List View** - Detailed card information with stats
- **Grid View** - Visual card gallery
- **Table View** - Sortable columns with avatars

### 🎨 UI/UX Features
- **Discipline Icons** - Custom "Ankha VTES" font integration from KRCG
- **Clan Icons** - "VTES Clans" font support
- **Image Carousel** - Browse all card versions and sets
- **Compact Mode** - Toggle for denser information display
- **Responsive Design** - Mobile-friendly layout
- **Real-time Filtering** - Instant results as you filter

### 🃏 Card Database
- **Complete VTES Database** - All Crypt and Library cards
- **Multiple Set Support** - View cards from different editions
- **Card Details** - Full card text, stats, and metadata
- **KRCG Integration** - Data from static.krcg.org API

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 25.2.1
- npm >= 11.6.2

### Installation

1. Clone the repository:
```bash
git clone https://github.com/katricz/alamuthq.git
cd alamuthq
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file (if needed):
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15.1.0](https://nextjs.org/) with React 18.3.1
- **UI Library:** [Material-UI (MUI) v6.3.1](https://mui.com/)
- **Styling:** CSS Modules + Bootstrap 5.3.3
- **Custom Fonts:** Ankha VTES (disciplines) + VTES Clans (clans) from KRCG
- **Data Source:** [KRCG Static API](https://static.krcg.org/data/vtes.json)
- **Image CDN:** KRCG static server with Next.js Image optimization
- **Deployment:** Netlify (ready for deployment)

---

## 📁 Project Structure

```
alamuthq/
├── components/           # Reusable React components
│   ├── AdvancedFilters.js # VDB-style filter sidebar
│   ├── ImageCarousel.js   # Card image carousel
│   ├── Menu.js           # Main navigation menu
│   ├── Sidebar.js        # Navigation sidebar
│   └── disciplines.js    # Discipline icons component
├── pages/               # Next.js pages (routes)
│   ├── api/
│   │   └── getCards.js  # Card data fetching
│   ├── card/
│   │   └── [card].js    # Dynamic card detail pages
│   ├── crypt.js         # Crypt cards browser
│   ├── library.js       # Library cards browser
│   ├── decks.js         # Deck management (in development)
│   ├── inventory.js     # Inventory (in development)
│   ├── _app.js          # App wrapper
│   └── _document.js     # HTML document
├── public/              # Static assets
│   └── img/             # KRCG card images and icons
├── styles/              # Styling
│   ├── globals.css      # Global styles + font definitions
│   ├── ankha2.otf       # Ankha VTES discipline font
│   ├── vtes-clans.otf   # VTES Clans font
│   ├── CardList.module.css        # Card display styles
│   └── AdvancedFilters.module.css # Filter sidebar styles
├── utils/               # Utility functions
│   ├── constants.js     # Discipline/clan mappings
│   ├── cardHelpers.js   # Card data utilities
│   ├── imageHelpers.js  # Image URL generation
│   └── stringHelpers.js # Text manipulation
└── moch/                # Mock/cached KRCG data
    ├── krcgCrypt.json
    └── krcgCryptFull.json
```

---

## 📜 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

---

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory (see `.env.example` for reference).

### Next.js Config

Modify `next.config.js` to customize:
- Image optimization
- Build settings
- ESLint rules

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **[KRCG](https://static.krcg.org/)** - Card data API, fonts (Ankha VTES, VTES Clans), and images
- **[VDB](https://vdb.im)** by smeea - UI/UX inspiration and feature reference
- **[Black Chantry Productions](https://www.blackchantry.com/)** - VTES card game
- **[VEKN](https://www.vekn.net/)** - Official tournament organizer
- All VTES community members and contributors

---

## 📧 Contact

**Katricz** - Project Maintainer

Project Link: [https://github.com/katricz/alamuthq](https://github.com/katricz/alamuthq)

---

## 🗺️ Roadmap

### ✅ Completed
- [x] Advanced filtering system (VDB-style)
- [x] Discipline icon integration (Ankha VTES font)
- [x] Multiple view modes (List/Grid/Table)
- [x] Image carousel with set variants
- [x] Sorting functionality
- [x] Compact mode toggle
- [x] Real-time filter results
- [x] Clan icon support (VTES Clans font)

### 🚧 In Progress
- [ ] Complete deck builder functionality
- [ ] Implement full inventory management

### 📋 Planned Features
- [ ] Dark theme implementation
- [ ] User authentication
- [ ] Deck statistics and analysis
- [ ] TWD/TDA/PDA archives integration
- [ ] Deck sharing features
- [ ] Advanced deck building tools
- [ ] Card price integration
- [ ] Performance optimization (pagination, virtual scrolling)
- [ ] Mobile app version
- [ ] Export/import deck lists

---

*Made with 🩸 for the VTES community*

