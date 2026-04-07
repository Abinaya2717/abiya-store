import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Copy, Save, ShieldCheck, User } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { createActor } from "../backend";
import { useUserProfile } from "../hooks/useAuth";
import { QUERY_KEYS } from "../lib/queryKeys";
import type { UserProfile } from "../types";

export default function ProfilePage() {
  const { actor } = useActor(createActor);
  const { identity } = useInternetIdentity();
  const { data: profile, isLoading } = useUserProfile();
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Initialize form when profile loads
  useEffect(() => {
    if (profile) {
      setName(profile.name ?? "");
      setEmail(profile.email ?? "");
    }
  }, [profile]);

  const principal = identity?.getPrincipal().toString() ?? null;

  const { mutate: saveProfile, isPending } = useMutation({
    mutationFn: async (data: UserProfile) => {
      if (!actor) throw new Error("Not connected");
      await actor.saveCallerUserProfile(data);
    },
    onSuccess: (_, data) => {
      queryClient.setQueryData(QUERY_KEYS.userProfile, data);
      toast.success("Profile saved successfully");
    },
    onError: () => {
      toast.error("Failed to save profile. Please try again.");
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    saveProfile({ name: name.trim(), email: email.trim() });
  }

  function copyPrincipal() {
    if (!principal) return;
    navigator.clipboard.writeText(principal).then(() => {
      toast.success("Principal ID copied to clipboard");
    });
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 max-w-lg py-10">
        <div className="flex items-center gap-3 mb-8">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <Skeleton className="h-8 w-32" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-20 w-full rounded-xl" />
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-36 rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 max-w-lg py-10">
        {/* Page header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              My Profile
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage your account details
            </p>
          </div>
        </div>

        {/* Internet Identity card */}
        {principal && (
          <div className="bg-card border border-border rounded-2xl p-5 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-foreground font-display uppercase tracking-wider">
                Internet Identity
              </span>
              <Badge
                variant="outline"
                className="text-xs ml-auto border-primary/30 text-primary"
              >
                Verified
              </Badge>
            </div>
            <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2.5">
              <p
                className="text-xs font-mono text-muted-foreground flex-1 truncate min-w-0"
                data-ocid="profile-principal"
              >
                {principal}
              </p>
              <button
                type="button"
                onClick={copyPrincipal}
                className="flex-shrink-0 p-1 rounded hover:bg-border transition-colors"
                aria-label="Copy principal ID"
                data-ocid="copy-principal-btn"
              >
                <Copy className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
              </button>
            </div>
          </div>
        )}

        {/* Profile form */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="font-display font-semibold text-foreground mb-5 text-sm uppercase tracking-wider">
            Personal Information
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="profile-name">Full Name</Label>
              <Input
                id="profile-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                autoComplete="name"
                data-ocid="profile-name-input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="profile-email">Email Address</Label>
              <Input
                id="profile-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
                autoComplete="email"
                data-ocid="profile-email-input"
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              {!name.trim() && (
                <p className="text-xs text-muted-foreground">
                  Name is required to save
                </p>
              )}
              <div className="ml-auto">
                <Button
                  type="submit"
                  disabled={isPending || !name.trim()}
                  className="font-semibold min-w-[130px]"
                  data-ocid="profile-save-btn"
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isPending ? "Saving…" : "Save Profile"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
