import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { Web3Provider } from "@/lib/web3";
import { Header } from "@/components/header";
import Home from "@/pages/home";
import Campaigns from "@/pages/campaigns";
import CreateCampaign from "@/pages/create-campaign";
import Social from "@/pages/social";
import Profile from "@/pages/profile";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/campaigns" component={Campaigns} />
      <Route path="/create-campaign" component={CreateCampaign} />
      <Route path="/social" component={Social} />
      <Route path="/profile" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Web3Provider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                <Router />
              </main>
            </div>
            <Toaster />
          </TooltipProvider>
        </QueryClientProvider>
      </Web3Provider>
    </ThemeProvider>
  );
}

export default App;
