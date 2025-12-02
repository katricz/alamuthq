# 🧛 AlamutHQ - VTES Deck Builder & Inventory

**Alamut Headquarters** is a comprehensive web application for Vampire: The Eternal Struggle (VTES) players to build decks, manage card inventory, and search through the complete VTES card database.

🌐 **Live Demo:** [https://alamuthq.netlify.app/](https://alamuthq.netlify.app/)

---

## ✨ Features

- 🃏 **Complete Card Database** - Browse all Crypt and Library cards
- 🔍 **Advanced Search** - Filter cards by name, text, disciplines, and more
- 📚 **Deck Builder** - Create and manage your VTES decks
- 📦 **Inventory Management** - Track your card collection
- 🎨 **Modern UI** - Built with Material-UI for a clean, responsive experience
- ⚡ **Fast Performance** - Static generation with Next.js for optimal speed

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 10.0.0

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

- **Framework:** [Next.js 15](https://nextjs.org/)
- **UI Library:** [Material-UI (MUI) v6](https://mui.com/)
- **Styling:** [Emotion](https://emotion.sh/) + CSS Modules
- **State Management:** MobX (in development)
- **Icons:** Font Awesome + Material Icons
- **Deployment:** Netlify

---

## 📁 Project Structure

```
alamuthq/
├── components/        # Reusable React components
│   ├── Menu.js       # Main navigation menu
│   ├── Sidebar.js    # Navigation sidebar
│   └── disciplines.js # Discipline icons helper
├── pages/            # Next.js pages (routes)
│   ├── api/          # API routes
│   ├── card/         # Individual card pages
│   ├── crypt.js      # Crypt cards listing
│   ├── library.js    # Library cards listing
│   ├── decks.js      # Deck management
│   └── inventory.js  # Inventory management
├── public/           # Static assets
│   └── img/          # Card images and icons
├── styles/           # Global styles
├── utils/            # Utility functions
│   ├── stringHelpers.js  # Text manipulation
│   ├── constants.js      # Shared constants
│   └── cardHelpers.js    # Card-related utilities
└── moch/             # Mock data for development
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

- [KRCG (Kamut Ruling and Card Guide)](https://www.vekn.net/rulebook) for card data API
- [VTES Decks](https://vtesdecks.com/) for inspiration
- [Black Chantry Productions](https://www.blackchantry.com/) for VTES
- All VTES community members

---

## 📧 Contact

**Katricz** - Project Maintainer

Project Link: [https://github.com/katricz/alamuthq](https://github.com/katricz/alamuthq)

---

## 🗺️ Roadmap

- [ ] Complete deck builder functionality
- [ ] Implement full inventory management
- [ ] Add deck statistics and analysis
- [ ] Implement user authentication
- [ ] Add deck sharing features
- [ ] Mobile app version
- [ ] Advanced filtering options
- [ ] Card price integration

---

*Made with 🩸 for the VTES community*

