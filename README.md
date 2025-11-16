# 🌱 CeloBloom

**Plant a seed with your donation, bloom a world**

[CeloBloom app click](https://celobloom.replit.app)

CeloBloom is a decentralized donation platform built on the Celo blockchain that combines crowdfunding campaigns with social sharing features. Create campaigns, donate with cUSD, and share your impact with the community.

![CeloBloom](https://img.shields.io/badge/Celo-Network-35D07F?style=for-the-badge&logo=celo&logoColor=white)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

## ✨ Features

### 🌍 Blockchain-Powered Donations
- **Mainnet & Testnet Support**: Seamlessly switch between Celo Mainnet and Alfajores Testnet
- **Real cUSD Transactions**: Direct blockchain transfers using Celo's stable cryptocurrency
- **WalletConnect Integration**: Support for MetaMask, Valora, Coinbase Wallet, and more
- **Transaction Transparency**: All donations are verifiable on Celoscan explorer

### 📊 Campaign Management
- **Create Campaigns**: Set funding goals, add descriptions, and specify beneficiary addresses
- **Track Progress**: Real-time progress bars and donation tracking
- **Donor Recognition**: View complete donor lists with transaction details
- **Dynamic Statistics**: Live platform stats showing total campaigns, donations, and community size

### 💬 Social Features
- **Community Feed**: Facebook-style social feed for sharing updates
- **Photo Sharing**: Add images to posts and campaigns
- **Engagement**: Like and comment on community posts
- **Profile Pages**: Wallet-connected user profiles showing activity and contributions

### 🎨 Beautiful UI
- **Nature-Themed Design**: Bloom and growth aesthetic with Celo's signature green
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **Dark/Light Mode**: Full theme support for user preference
- **Smooth Animations**: Polished interactions and transitions

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript for type-safe development
- **Vite** for lightning-fast builds and HMR
- **Wouter** for lightweight client-side routing
- **TanStack Query** for efficient server state management
- **Shadcn/ui** + **Radix UI** for accessible component primitives
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for smooth animations

### Web3 Integration
- **Wagmi** for Ethereum/Celo blockchain interactions
- **Viem** for low-level Ethereum utilities
- **Web3Modal** for multi-wallet connection UI

### Backend
- **Express.js** with TypeScript for RESTful API
- **In-Memory Storage** (upgradeable to PostgreSQL via Drizzle ORM)
- **Zod** for runtime schema validation

### Smart Contracts
- **ERC20 Transfers**: Direct cUSD token transfers to beneficiaries
- **No Custom Contracts**: Minimal gas costs, maximum transparency

## 📋 Prerequisites

- Node.js 18+ and npm
- A Web3 wallet (MetaMask, Valora, Coinbase Wallet, etc.)
- Some cUSD for testing (get testnet cUSD from [Celo Faucet](https://faucet.celo.org))

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone https://github.com/sinirlibiber/celobloom.git
cd celobloom
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
# Create .env file
echo "SESSION_SECRET=your-secret-here" > .env
```

4. **Start the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to `http://localhost:5000`

## 🎯 Usage

### Creating a Campaign

1. Connect your wallet using the "Connect Wallet" button
2. Select your network (Mainnet or Testnet)
3. Navigate to "Create Campaign"
4. Fill in campaign details:
   - Title
   - Description
   - Funding goal (in cUSD)
   - Beneficiary wallet address
   - Optional image URL
5. Submit and wait for transaction confirmation

### Making a Donation

1. Browse campaigns on the Campaigns page
2. Click "Donate" on your chosen campaign
3. Enter donation amount in cUSD
4. Confirm the transaction in your wallet
5. View your donation in the campaign's donor list

### Sharing on Social Feed

1. Navigate to the Social Feed
2. Click "Create Post"
3. Share your thoughts and optionally add an image
4. Engage with community posts through likes and comments

## 🌐 Network Details

### Celo Mainnet
- **Chain ID**: 42220
- **cUSD Contract**: `0x765DE816845861e75A25fCA122bb6898B8B1282a`
- **Explorer**: https://celoscan.io

### Alfajores Testnet
- **Chain ID**: 44787
- **cUSD Contract**: `0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1`
- **Explorer**: https://alfajores.celoscan.io
- **Faucet**: https://faucet.celo.org

## 📱 Screenshots

![Hero Section](attached_assets/generated_images/Hero_blooming_meadow_background_caf3bdbb.png)
*Beautiful nature-themed hero with live platform statistics*

## 🗺️ Roadmap

- [x] Campaign creation and donation functionality
- [x] Social feed with posts, likes, and comments
- [x] WalletConnect integration
- [x] Real-time statistics dashboard
- [x] Donor list with transaction details
- [ ] Campaign categories and filtering
- [ ] Campaign update feed for creators
- [ ] NFT rewards for milestone donors
- [ ] Analytics dashboard
- [ ] Campaign verification system
- [ ] Wallet notifications
- [ ] Social sharing to Twitter/Farcaster

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Built By

**[@sinirlibiber](https://github.com/sinirlibiber/)**

Connect with me:
- GitHub: [github.com/sinirlibiber](https://github.com/sinirlibiber/)
- Farcaster: [gumusbey](https://farcaster.xyz/gumusbey)

## 🌟 Acknowledgments

- Built with ❤️ on the Celo blockchain
- Inspired by the vision of financial inclusion and regenerative finance
- Special thanks to the Celo community

---

**Seeds on Celo, flowers on the blockchain** 🌸

Every donation helps campaigns bloom and creates positive change in communities worldwide.
