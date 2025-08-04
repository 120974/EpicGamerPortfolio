# Windows XP Portfolio

An authentic Windows XP-style portfolio website showcasing creative work in photography, 3D design, and 2D design. Built with React, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Authentic Windows XP Experience**: Complete with start menu, taskbar, draggable windows, and classic XP styling
- **Portfolio Showcase**: 10 original artworks across Photography, 3D Design, and 2D Design categories
- **Interactive Elements**: Clickable desktop icons, draggable windows, functional recycle bin
- **Retro Games**: Solitaire, Minesweeper, and PAC-MAN with authentic XP styling
- **Clippy Assistant**: Optional helper bot with tips and guidance
- **Dark Mode**: Toggle between classic XP and dark themes
- **Responsive Design**: Works on desktop and mobile devices
- **PWA Support**: Installable as a standalone app

## 🚀 Live Demo

Visit the live demo: [https://your-username.github.io/portfolio-xp/](https://your-username.github.io/portfolio-xp/)

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS v4
- **Build Tool**: Vite
- **Deployment**: GitHub Pages
- **PWA**: Web App Manifest

## 📱 Quick Start

### Prerequisites

- Node.js 18+ 
- npm 8+

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/portfolio-xp.git
   cd portfolio-xp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 🚀 Deploy to GitHub Pages

### Automatic Deployment (Recommended)

1. **Fork this repository** to your GitHub account

2. **Update configuration**:
   - Replace `your-username` in `package.json` with your GitHub username
   - Update the repository URL in `package.json`
   - Modify `vite.config.ts` base path if needed

3. **Enable GitHub Pages**:
   - Go to your repository Settings
   - Navigate to Pages section
   - Select "GitHub Actions" as the source

4. **Push changes** to the `main` branch - deployment happens automatically!

### Manual Deployment

```bash
# Install gh-pages if not already installed
npm install -g gh-pages

# Deploy to GitHub Pages
npm run deploy
```

## 🎨 Customization

### Portfolio Content

Edit `/components/constants/artData.ts` to customize:
- Portfolio categories
- Artwork details
- Images and descriptions
- Technical specifications

### Personal Information

Update `/components/AboutApp.tsx` with:
- Your name and contact information
- Bio and experience
- Social media links
- Resume/CV details

### Styling

Modify `/styles/globals.css` for:
- Color schemes
- Typography
- XP-themed components
- Dark mode variants

## 🎮 Features Guide

### Desktop Interaction
- **Double-click** icons to open applications
- **Drag & drop** icons to rearrange or delete them
- **Right-click** for context menus (coming soon)

### Portfolio Navigation
- **Click images** to zoom and explore artwork
- **Use tabs** to switch between different views
- **Read technical details** for each piece

### System Features
- **Start Menu**: Access all applications and settings
- **Taskbar**: Manage open windows and system tray
- **Recycle Bin**: Restore deleted desktop icons
- **Control Panel**: External links and settings

## 📄 Project Structure

```
portfolio-xp/
├── components/           # React components
│   ├── ui/              # Reusable UI components
│   ├── constants/       # Data and configuration
│   ├── types/           # TypeScript definitions
│   └── utils/           # Utility functions
├── styles/              # Global CSS and themes
├── .github/workflows/   # GitHub Actions for deployment
├── public/              # Static assets
└── dist/                # Built files (auto-generated)
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines

1. Follow TypeScript best practices
2. Use Tailwind CSS for styling
3. Maintain Windows XP authenticity
4. Test on multiple browsers
5. Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Windows XP design inspiration from Microsoft
- React and Vite for the development framework
- Tailwind CSS for styling utilities
- Unsplash for placeholder images

## 📞 Contact

**Rishith Chintala**
- Email: rishithchintala@gmail.com
- LinkedIn: [linkedin.com/in/rishith-chintala-012553232](https://www.linkedin.com/in/rishith-chintala-012553232)
- Portfolio: [https://your-username.github.io/portfolio-xp/](https://your-username.github.io/portfolio-xp/)

---

Made with ❤️ and nostalgia for the Windows XP era