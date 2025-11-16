import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { WagmiProvider } from 'wagmi';
import { celo, celoAlfajores } from 'wagmi/chains';
import { ReactNode } from 'react';

const projectId = 'celoBloom2024';

const metadata = {
  name: 'CeloBloom',
  description: 'Plant a seed with your donation, bloom a world',
  url: typeof window !== 'undefined' ? window.location.origin : 'https://celobloom.com',
  icons: ['https://celobloom.com/favicon.png']
};

const chains = [celo, celoAlfajores] as const;

const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: false,
  enableOnramp: false,
});

export function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      {children}
    </WagmiProvider>
  );
}

export { config };
