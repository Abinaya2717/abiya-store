import { useActor } from "@caffeineai/core-infrastructure";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createActor } from "../backend";
import { QUERY_KEYS } from "../lib/queryKeys";
import type { CartSummary } from "../types";

export function useCart() {
  const { actor, isFetching } = useActor(createActor);
  const { identity } = useInternetIdentity();

  return useQuery<CartSummary>({
    queryKey: QUERY_KEYS.cart,
    queryFn: async () => {
      if (!actor)
        return { items: [], itemCount: BigInt(0), subtotal: BigInt(0) };
      return actor.getCart();
    },
    enabled: !!actor && !isFetching && !!identity,
    staleTime: 5_000,
  });
}

export function useAddToCart() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: {
      productId: bigint;
      quantity: bigint;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addToCart(productId, quantity);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(QUERY_KEYS.cart, data);
      toast.success("Added to cart");
    },
    onError: () => {
      toast.error("Failed to add to cart");
    },
  });
}

export function useRemoveFromCart() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.removeFromCart(productId);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(QUERY_KEYS.cart, data);
      toast.success("Removed from cart");
    },
    onError: () => {
      toast.error("Failed to remove item");
    },
  });
}

export function useUpdateCartQuantity() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: {
      productId: bigint;
      quantity: bigint;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateCartItemQuantity(productId, quantity);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(QUERY_KEYS.cart, data);
    },
    onError: () => {
      toast.error("Failed to update quantity");
    },
  });
}

export function useClearCart() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.clearCart();
    },
    onSuccess: () => {
      queryClient.setQueryData(QUERY_KEYS.cart, {
        items: [],
        itemCount: BigInt(0),
        subtotal: BigInt(0),
      });
    },
  });
}

export function formatPrice(priceInCents: bigint): string {
  return `$${(Number(priceInCents) / 100).toFixed(2)}`;
}

export function useCartItemCount(): number {
  const { data: cart } = useCart();
  return Number(cart?.itemCount ?? 0);
}
