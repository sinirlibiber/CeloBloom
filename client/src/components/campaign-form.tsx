import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertCampaignSchema, InsertCampaign } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sprout } from "lucide-react";

interface CampaignFormProps {
  onSubmit: (data: InsertCampaign) => void;
  defaultNetwork: "mainnet" | "testnet";
  creatorAddress: string;
  isPending?: boolean;
}

export function CampaignForm({ onSubmit, defaultNetwork, creatorAddress, isPending }: CampaignFormProps) {
  const form = useForm<InsertCampaign>({
    resolver: zodResolver(insertCampaignSchema),
    defaultValues: {
      title: "",
      description: "",
      goal: 100,
      beneficiaryAddress: creatorAddress,
      creatorAddress: creatorAddress,
      network: defaultNetwork,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-serif font-semibold mb-2">Create Your Campaign</h2>
          <p className="text-muted-foreground italic">Let your idea take root here, let change bloom here</p>
        </div>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Campaign Title</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Support Education for Underprivileged Children" 
                  {...field} 
                  data-testid="input-campaign-title"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Tell your story and explain how the funds will be used..." 
                  className="min-h-32 resize-none"
                  {...field}
                  data-testid="input-campaign-description"
                />
              </FormControl>
              <FormDescription>
                Share your vision and inspire the community
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="goal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Funding Goal (cUSD)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="1000" 
                    {...field}
                    onChange={e => field.onChange(parseInt(e.target.value))}
                    data-testid="input-campaign-goal"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="network"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Network</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger data-testid="select-campaign-network">
                      <SelectValue placeholder="Select network" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="testnet">Alfajores Testnet</SelectItem>
                    <SelectItem value="mainnet">Celo Mainnet</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Testnet is recommended for testing
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="beneficiaryAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Beneficiary Address</FormLabel>
              <FormControl>
                <Input 
                  placeholder="0x..." 
                  className="font-mono text-sm"
                  {...field}
                  data-testid="input-beneficiary-address"
                />
              </FormControl>
              <FormDescription>
                The wallet address that will receive the donations
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Campaign Image URL (Optional)</FormLabel>
              <FormControl>
                <Input 
                  placeholder="https://example.com/image.jpg" 
                  {...field}
                  data-testid="input-image-url"
                />
              </FormControl>
              <FormDescription>
                Add a compelling image to attract donors
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full" 
          size="lg"
          disabled={isPending}
          data-testid="button-create-campaign"
        >
          <Sprout className="mr-2 h-5 w-5" />
          {isPending ? "Creating..." : "Create Campaign"}
        </Button>
      </form>
    </Form>
  );
}
