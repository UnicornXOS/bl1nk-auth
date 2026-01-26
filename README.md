# 🔐 bl1nk Auth

<div align="center">

![bl1nk Auth Banner](https://via.placeholder.com/1200x300/0A0A0A/00D9FF?text=bl1nk+Auth+-+Modern+OAuth+Platform)

**Modern OAuth 2.0 Authentication Platform with Cyberpunk Aesthetics**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/UnicornXOS/bl1nk-auth)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15.5-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

[Features](#-features) • [Quick Start](#-quick-start) • [Demo](#-demo) • [Documentation](#-documentation)

</div>

---

## ✨ Features

- 🎨 **Cyberpunk UI** - Stunning Neon design system with glassmorphism effects
- 🔒 **OAuth 2.0** - GitHub & Google Workspace authentication
- ⚡ **Next.js 15** - Latest React Server Components & App Router
- 🎯 **TypeScript** - Full type safety across the stack
- 🌐 **Multi-tenant** - Support for multiple clients and return URLs
- 📱 **Responsive** - Beautiful on all devices
- 🚀 **Vercel Ready** - One-click deployment

## 🎬 Demo

![Dashboard Preview](https://via.placeholder.com/800x450/0A0A0A/00D9FF?text=Dashboard+Preview)

_Modern dashboard with real-time widgets and glassmorphism design_

## 🚀 Quick Start

### One-Click Deploy

Deploy to Vercel in seconds:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/UnicornXOS/bl1nk-auth)

### Local Development

```bash
# Clone the repository
git clone https://github.com/UnicornXOS/bl1nk-auth.git
cd bl1nk-auth

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## 🔧 Configuration

### Environment Variables

Create a `.env` file with:

```env
# OAuth Providers
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# JWT Secret
JWT_SECRET=your_super_secret_key_min_32_chars
```

### Client Configuration

Edit `config/clients.json` to add your allowed clients:

```json
[
  {
    "client": "your-app",
    "aud": "https://your-app.com",
    "returns": ["https://your-app.com/auth/callback"]
  }
]
```

## 🎨 Design System

bl1nk Auth features a custom **Neon Design System** with:

- 🌈 Vibrant color palette (Cyan, Purple, Amber)
- 💎 Glassmorphism effects
- ✨ Smooth animations & transitions
- 🎯 iOS 26-inspired components
- 🌙 Dark mode optimized

## 📚 Tech Stack

- **Framework:** Next.js 15.5
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3.4
- **Auth:** Custom OAuth 2.0 implementation
- **Deployment:** Vercel
- **Analytics:** Vercel Analytics

## 🏗️ Project Structure

```
bl1nk-auth/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (marketing)/       # Public pages
│   └── dashboard/         # Protected dashboard
├── components/            # React components
│   ├── layout/           # Layout components
│   └── ui/               # UI components
├── lib/                  # Utilities & integrations
├── config/               # Configuration files
└── public/               # Static assets
```

## 🔐 Security

- ✅ OAuth 2.0 compliant
- ✅ JWT token-based sessions
- ✅ CSRF protection
- ✅ Secure headers (CSP, X-Frame-Options)
- ✅ Client whitelist validation

For security issues, please see [SECURITY.md](./SECURITY.md)

## 📖 Documentation

- [OAuth Setup Guide](docs/setup/oauth.md)
- [Deployment Guide](docs/deployment/vercel.md)
- [API Reference](docs/api/README.md)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🌟 Acknowledgments

- Design inspired by Cyberpunk aesthetics
- Built with ❤️ using Next.js and TypeScript
- Powered by Vercel

---

<div align="center">

**[⬆ back to top](#-bl1nk-auth)**

Made with 💜 by [UnicornXOS](https://github.com/UnicornXOS)

</div>
