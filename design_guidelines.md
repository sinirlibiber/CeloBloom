# CeloBloom Design Guidelines

## Design Approach
**Reference-Based Hybrid:** Combining GoFundMe's campaign trust patterns + Instagram's social feed aesthetics + Coinbase's blockchain UX clarity. Nature-inspired theme celebrating growth and community.

**Core Principle:** Trustworthy donation platform meets vibrant social community, unified by organic bloom metaphor.

---

## Typography
- **Primary Font:** Inter (Google Fonts) - modern, readable for blockchain data
- **Display Font:** Poppins - friendly headers and slogans
- **Hierarchy:**
  - Hero slogans: Poppins Bold, text-4xl to text-6xl
  - Campaign titles: Poppins SemiBold, text-2xl
  - Body text: Inter Regular, text-base
  - Blockchain data (addresses, amounts): Inter Medium, text-sm, monospace feel

---

## Layout System
**Spacing Units:** Tailwind 4, 6, 8, 12, 16, 20 for consistent rhythm
- Section padding: py-16 md:py-24
- Card spacing: gap-6 md:gap-8
- Component margins: mb-8 to mb-12

**Container Strategy:**
- Max-width: max-w-7xl for campaigns grid
- Social feed: max-w-4xl (narrower, Instagram-like)
- Forms: max-w-2xl

---

## Component Library

### Hero Section
- Full-width with subtle nature-themed gradient background
- Large display slogan: "Plant a seed with your donation, bloom a world"
- Network toggle (Mainnet/Testnet) prominently placed top-right
- CTA button with blurred background: "Start Growing"
- Stats bar below: Total Campaigns | Total Donated | Community Members

### Wallet Connection
- Modal with wallet options grid (MetaMask, Valora, WalletConnect, Celo Wallet)
- Each option: logo + name + "Connect" button
- After connection tooltip: "One tap from your mobile wallet: It's bloom time"
- Connected state: Address badge with profile dropdown

### Campaign Cards
- Grid layout: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Card structure:
  - Campaign image/thumbnail (16:9 ratio)
  - Title + creator badge
  - Description excerpt (3 lines max)
  - Progress bar with visual "blooming" effect
  - Funding: cUSD raised / goal
  - Donate button (primary green)
- Slogan above grid: "Seeds on Celo, flowers on the blockchain"

### Social Feed
- Instagram-style vertical feed, max-w-3xl centered
- Post card:
  - User avatar + name + timestamp
  - Photo (full-width, aspect-video)
  - Caption with hashtags
  - Like/Comment actions
  - Comment thread (expandable)
- Create post button: "Grow with your donation, bloom with your share"
- Upload area with drag-drop or click

### Profile Page
- Header with cover photo area
- Profile info: Avatar, wallet address (truncated), member since
- Slogan: "CeloBloom: Every donation a leaf, every post a petal"
- Tabs: My Campaigns | My Donations | My Posts
- Campaign/donation history with blockchain transaction links

### Campaign Creation Form
- Multi-step or single page with sections
- Header slogan: "Let your idea take root here, let change bloom here"
- Fields: Title, Description (rich text), Goal (cUSD), Beneficiary Address, Cover Image
- Network selector (mainnet/testnet) integrated
- Preview panel showing card appearance

### Footer
- Three columns: About (with slogan "The community's garden, powered by Celo's soil") | Quick Links | Built By
- Built By section: GitHub icon + link to sinirlibiber, Farcaster icon + link to gumusbey
- Social links, documentation

---

## Visual Elements

### Nature/Bloom Theme
- Organic shapes: Rounded corners (rounded-xl for cards, rounded-full for buttons)
- Subtle leaf/petal illustrations as decorative elements (not overwhelming)
- Progress bars with animated gradient "bloom" effect
- Campaign success: Blooming flower icon/animation

### Blockchain Trust Signals
- Transaction hash displays with copy button
- Block explorer links (Celoscan)
- Network indicator badge (always visible when connected)
- Gas fee estimates on donation button hover
- Verified campaign badge (if applicable)

### Iconography
**Use Heroicons via CDN** - consistent, clean, web3-friendly
- Wallet: wallet icon
- Campaigns: gift icon
- Social: photo icon, heart icon
- Profile: user-circle icon
- Network: globe-alt icon

---

## Images

### Hero Background
Large, inspiring nature image (blooming field, seedling growth, green ecosystem) with gradient overlay for text readability. Full-width, min-h-[600px].

### Campaign Cards
Require user-uploaded images (16:9 thumbnails). Placeholder: Abstract nature pattern or Celo-themed graphic.

### Social Posts
User-uploaded photos, support square and landscape orientations, max-height to maintain feed rhythm.

### Profile Covers
Optional cover photos (like Twitter), default to soft gradient if none uploaded.

---

## Slogan Placement Strategy
1. Hero headline (main impact)
2. Above campaign grid (context setter)
3. Social feed CTA button text
4. Donate button hover tooltip
5. Profile page header
6. Footer tagline
7. Campaign form header
8. Post-connection modal message
9. Share prompt for social posts
10. Loading state placeholder text

---

## Accessibility & Interaction
- High contrast for blockchain addresses and amounts
- Focus states with bloom-green outline
- Wallet connection: Large click targets (min 48px)
- Form validation: Inline errors with helpful blockchain-specific guidance
- Transaction loading states: Progress indicator with friendly messaging
- Mobile-first: Campaign cards stack, social feed optimized for thumb zones

---

## Animation Guidelines
**Minimal & Purposeful:**
- Progress bar fill: Smooth transition when updated
- Card hover: Subtle lift (transform translateY(-4px))
- Button states: Quick color transition (150ms)
- Transaction confirmation: Success bloom animation (one-time celebration)
- Page transitions: Fade only, no elaborate effects