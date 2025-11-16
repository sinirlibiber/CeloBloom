import { HeroSection } from "@/components/hero-section";
import { Footer } from "@/components/footer";
import { Sprout, Users, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <HeroSection />
        
        <section className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-4">
              Seeds on Celo, flowers on the blockchain
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              CeloBloom combines the power of blockchain technology with the spirit of giving. 
              Create campaigns, donate with cUSD, and share your impact with the community.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="p-6">
                <Sprout className="h-12 w-12 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Plant Seeds</h3>
                <p className="text-sm text-muted-foreground">
                  Create donation campaigns and share your vision for positive change
                </p>
              </div>
              
              <div className="p-6">
                <Users className="h-12 w-12 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Grow Together</h3>
                <p className="text-sm text-muted-foreground">
                  Support causes with cUSD and watch communities flourish
                </p>
              </div>
              
              <div className="p-6">
                <TrendingUp className="h-12 w-12 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Bloom Impact</h3>
                <p className="text-sm text-muted-foreground">
                  Share your story and inspire others through social content
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
}
