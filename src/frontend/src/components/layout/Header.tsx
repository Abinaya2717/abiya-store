import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import {
  LogOut,
  Menu,
  Package,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { Category } from "../../backend";
import { useAuth } from "../../hooks/useAuth";
import { useCartItemCount } from "../../hooks/useCart";
import { CATEGORIES } from "../../lib/queryKeys";

const CATEGORY_ROUTE_MAP: Record<Category, string> = {
  [Category.clothes]: "/products?category=clothes",
  [Category.bags]: "/products?category=bags",
  [Category.watches]: "/products?category=watches",
  [Category.shoes]: "/products?category=shoes",
  [Category.electronics]: "/products?category=electronics",
  [Category.computers]: "/products?category=computers",
};

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthenticated, login, logout, isInitializing } = useAuth();
  const cartCount = useCartItemCount();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  }

  return (
    <header
      className="sticky top-0 z-50 bg-card border-b border-border shadow-sm"
      data-ocid="main-header"
    >
      {/* Top bar */}
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center h-16 gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex-shrink-0 font-display text-2xl font-bold text-foreground tracking-tight hover:text-primary transition-colors duration-200"
            data-ocid="header-logo"
          >
            Abiya
          </Link>

          {/* Search bar */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md mx-4"
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-muted/50 border-input"
                data-ocid="header-search"
              />
            </div>
          </form>

          {/* Right actions */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Cart */}
            <Link to="/cart" data-ocid="header-cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-primary text-primary-foreground border-0"
                    data-ocid="cart-badge"
                  >
                    {cartCount > 99 ? "99+" : cartCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Auth */}
            {isInitializing ? (
              <div className="h-9 w-9 rounded-md bg-muted animate-pulse" />
            ) : isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    data-ocid="header-user-menu"
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      My Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/orders" className="cursor-pointer">
                      <Package className="mr-2 h-4 w-4" />
                      My Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/admin" className="cursor-pointer">
                      Admin Panel
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    className="text-destructive cursor-pointer"
                    data-ocid="logout-btn"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                size="sm"
                onClick={login}
                data-ocid="login-btn"
                className="font-medium"
              >
                Sign In
              </Button>
            )}

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              data-ocid="mobile-menu-toggle"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Category nav */}
        <nav
          className="hidden md:flex items-center gap-1 pb-2"
          data-ocid="category-nav"
        >
          <Link
            to="/products"
            className="px-3 py-1.5 text-sm font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
            activeProps={{ className: "text-primary bg-primary/10" }}
          >
            All Products
          </Link>
          {CATEGORIES.map((cat) => (
            <a
              key={cat.value}
              href={CATEGORY_ROUTE_MAP[cat.value]}
              className="px-3 py-1.5 text-sm font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
            >
              {cat.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div
          className="md:hidden border-t border-border bg-card px-4 py-3 space-y-2"
          data-ocid="mobile-nav"
        >
          <form onSubmit={handleSearch} className="mb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </form>
          <Link
            to="/products"
            className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            All Products
          </Link>
          {CATEGORIES.map((cat) => (
            <a
              key={cat.value}
              href={CATEGORY_ROUTE_MAP[cat.value]}
              className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {cat.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
