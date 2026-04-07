import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CheckCircle2,
  Loader2,
  Package,
  Settings,
  ShoppingBag,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { createActor } from "../backend";
import { OrdersTable } from "../components/admin/OrdersTable";
import { ProductsTable } from "../components/admin/ProductsTable";
import { QUERY_KEYS } from "../lib/queryKeys";

function SettingsTab() {
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();

  const [publishableKey, setPublishableKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [countries, setCountries] = useState("US, CA, GB, AU, DE, FR");

  const { data: isConfigured, isLoading: configLoading } = useQuery<boolean>({
    queryKey: QUERY_KEYS.stripeConfigured,
    queryFn: async () => {
      if (!actor) return false;
      return actor.isStripeConfigured();
    },
    enabled: !!actor && !isFetching,
  });

  const { mutate: saveConfig, isPending: isSaving } = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const allowedCountries = countries
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean);
      await actor.setStripeConfiguration({
        secretKey,
        allowedCountries,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.stripeConfigured,
      });
      toast.success("Stripe configuration saved");
      setSecretKey("");
    },
    onError: () => toast.error("Failed to save Stripe configuration"),
  });

  return (
    <div className="max-w-xl space-y-6">
      {/* Config status */}
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-center gap-3">
          {configLoading ? (
            <Skeleton className="h-8 w-48" />
          ) : isConfigured ? (
            <>
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground">
                  Stripe is configured
                </p>
                <p className="text-xs text-muted-foreground">
                  Payment processing is active for your store.
                </p>
              </div>
              <Badge
                variant="outline"
                className="ml-auto text-primary border-primary/30 bg-primary/10"
              >
                Active
              </Badge>
            </>
          ) : (
            <>
              <XCircle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground">
                  Stripe not configured
                </p>
                <p className="text-xs text-muted-foreground">
                  Add your keys below to enable checkout.
                </p>
              </div>
              <Badge variant="secondary" className="ml-auto">
                Inactive
              </Badge>
            </>
          )}
        </div>
      </div>

      <Separator />

      {/* Config form */}
      <div className="space-y-4">
        <h3 className="font-display font-semibold text-foreground">
          Stripe Keys
        </h3>
        <p className="text-sm text-muted-foreground">
          Enter your Stripe Secret Key to enable payments. You can find these in
          your{" "}
          <a
            href="https://dashboard.stripe.com/apikeys"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-2"
          >
            Stripe Dashboard
          </a>
          .
        </p>

        <div>
          <Label htmlFor="publishable-key">
            Publishable Key{" "}
            <span className="text-muted-foreground font-normal">
              (for display reference)
            </span>
          </Label>
          <Input
            id="publishable-key"
            value={publishableKey}
            onChange={(e) => setPublishableKey(e.target.value)}
            placeholder="pk_live_…"
            className="mt-1 font-mono text-sm"
            data-ocid="admin-stripe-publishable-key"
          />
        </div>

        <div>
          <Label htmlFor="secret-key">Secret Key *</Label>
          <Input
            id="secret-key"
            type="password"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            placeholder="sk_live_…"
            className="mt-1 font-mono text-sm"
            data-ocid="admin-stripe-secret-key"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Keep this key secure. Never share it publicly.
          </p>
        </div>

        <div>
          <Label htmlFor="allowed-countries">Allowed Countries</Label>
          <Input
            id="allowed-countries"
            value={countries}
            onChange={(e) => setCountries(e.target.value)}
            placeholder="US, CA, GB, AU"
            className="mt-1"
            data-ocid="admin-stripe-countries"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Comma-separated ISO country codes.
          </p>
        </div>

        <Button
          onClick={() => saveConfig()}
          disabled={isSaving || !secretKey.trim()}
          data-ocid="admin-stripe-save"
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving…
            </>
          ) : (
            "Save Configuration"
          )}
        </Button>
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 max-w-6xl py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">
          Admin Panel
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your store's products, orders, and settings.
        </p>
      </div>

      <Tabs defaultValue="products">
        <TabsList
          className="mb-6 bg-muted/50 p-1 h-auto gap-1"
          data-ocid="admin-tabs"
        >
          <TabsTrigger
            value="products"
            className="flex items-center gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm px-4 py-2"
            data-ocid="admin-tab-products"
          >
            <Package className="h-4 w-4" />
            Products
          </TabsTrigger>
          <TabsTrigger
            value="orders"
            className="flex items-center gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm px-4 py-2"
            data-ocid="admin-tab-orders"
          >
            <ShoppingBag className="h-4 w-4" />
            Orders
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="flex items-center gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm px-4 py-2"
            data-ocid="admin-tab-settings"
          >
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <ProductsTable />
        </TabsContent>

        <TabsContent value="orders">
          <OrdersTable />
        </TabsContent>

        <TabsContent value="settings">
          <SettingsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
