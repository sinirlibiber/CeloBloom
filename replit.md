# CeloBloom

## Overview

CeloBloom is a decentralized donation platform built on the Celo blockchain that combines crowdfunding campaigns with social sharing features. The platform enables users to create and support donation campaigns using cUSD (Celo's stable cryptocurrency) while fostering community engagement through a social feed where users can share updates, like posts, and comment on content. The application emphasizes a nature-inspired "bloom and growth" theme, positioning donations as seeds that help causes flourish.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- React Query (TanStack Query) for server state management and data fetching

**UI Component System**
- Shadcn/ui components built on Radix UI primitives for accessible, composable UI elements
- Tailwind CSS for utility-first styling with custom design tokens
- Custom theming system supporting light/dark modes via ThemeProvider context
- Design approach combines GoFundMe's trust patterns, Instagram's social aesthetics, and Coinbase's blockchain UX clarity

**Web3 Integration**
- Wagmi for Ethereum/Celo blockchain interactions
- Web3Modal for wallet connection UI supporting multiple wallet providers (MetaMask, Valora, WalletConnect, Celo Wallet)
- Support for both Celo Mainnet and Alfajores Testnet
- Client-side network switching with persistent localStorage preferences

**Key Design Decisions**
- Chose React Query over Redux to avoid complex state management boilerplate while maintaining robust caching and refetching capabilities
- Selected Wouter over React Router for smaller bundle size and simpler API
- Implemented shadcn/ui pattern (copy-paste components) rather than traditional component library to maintain full control over component code and styling

### Backend Architecture

**Server Framework**
- Express.js with TypeScript for RESTful API endpoints
- HTTP server serving both API routes and static frontend assets
- Custom middleware for request logging and JSON parsing with raw body preservation

**Data Layer**
- In-memory storage implementation (MemStorage) as default data persistence
- Drizzle ORM configured for PostgreSQL (via Neon serverless driver) with schema definitions
- Schema validation using Zod for type-safe request/response handling
- Database migrations managed through Drizzle Kit

**API Design**
- RESTful endpoints organized by resource type (campaigns, donations, social posts, comments, likes)
- Validation middleware using Zod schemas to ensure data integrity before database operations
- Error handling with appropriate HTTP status codes and descriptive error messages

**Key Architectural Choices**
- Implemented MemStorage pattern to allow easy swapping between in-memory and database persistence without changing business logic
- Used Zod for both runtime validation and TypeScript type inference, maintaining single source of truth for data shapes
- Separated schema definitions in shared directory to enable type sharing between frontend and backend

### Application State Management

**Client-Side State**
- React Query manages server state with infinite stale time to prevent unnecessary refetches
- React Context for theme preferences and Web3 provider state
- localStorage for persisting network selection and theme choices
- Component-level useState for UI-specific state (modals, forms)

**Server-Side State**
- Stateless HTTP handlers with all persistence delegated to storage layer
- Session management prepared via connect-pg-simple (for future authentication)

### Routing & Navigation

**Frontend Routes**
- `/` - Home page with hero section and platform introduction
- `/campaigns` - Browse all donation campaigns with search/filter
- `/create-campaign` - Form to create new campaigns (requires wallet connection)
- `/social` - Social feed with posts, likes, and comments
- `/profile` - User profile showing created campaigns, donations, and posts
- 404 fallback for unmatched routes

**API Routes**
- `GET/POST /api/campaigns` - Campaign CRUD operations
- `GET/POST /api/donations` - Donation recording and retrieval
- `GET/POST /api/social/posts` - Social post management
- `GET/POST /api/social/comments` - Comment operations
- `GET/POST/DELETE /api/social/likes` - Like interactions

### Smart Contract Interaction

**Transaction Flow**
- Direct ERC20 token transfers using wagmi's `useWriteContract` hook
- cUSD token contracts: Testnet (0x874069...) and Mainnet (0x765DE8...)
- Transaction confirmation tracking via `useWaitForTransactionReceipt`
- Post-transaction database recording to link on-chain activity with off-chain campaign data

**Design Rationale**
- Chose direct token transfers over custom smart contracts to minimize gas costs and complexity
- Platform acts as coordination layer rather than custody layer—funds go directly to beneficiaries
- Transaction hashes stored in database for transparency and verification

## External Dependencies

### Blockchain & Web3
- **Celo Network**: Primary blockchain (Mainnet and Alfajores Testnet)
- **cUSD Token**: ERC20 stablecoin used for all donations
- **Wagmi**: React hooks for Ethereum interactions
- **Viem**: Low-level Ethereum utilities (used by Wagmi)
- **Web3Modal**: Wallet connection interface

### Database & ORM
- **PostgreSQL**: Relational database (via Neon serverless)
- **Drizzle ORM**: Type-safe database toolkit
- **@neondatabase/serverless**: Serverless Postgres client

### UI & Styling
- **Radix UI**: Headless component primitives (@radix-ui/react-*)
- **Tailwind CSS**: Utility-first CSS framework
- **class-variance-authority**: CSS variant management
- **Lucide React**: Icon library
- **react-icons**: Additional icon sets (for social platform icons)

### Forms & Validation
- **React Hook Form**: Form state management
- **Zod**: Schema validation and TypeScript type inference
- **@hookform/resolvers**: Zod integration for React Hook Form

### Development Tools
- **TypeScript**: Static type checking
- **ESBuild**: Backend bundling for production
- **Vite**: Frontend build tool and dev server
- **TSX**: TypeScript execution for development server

### Third-Party Services
- **Google Fonts**: Inter (body text) and Poppins (headings) typography
- **Replit Plugins**: Development tooling (cartographer, dev banner, error overlay)

### Design Philosophy
The application prioritizes simplicity and user trust by leveraging battle-tested libraries rather than custom implementations. The blockchain integration is intentionally minimal—using standard ERC20 transfers rather than complex smart contracts—to reduce attack surface and gas costs while maintaining transparency through transaction hash recording.