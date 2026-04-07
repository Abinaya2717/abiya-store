import { Link } from "@tanstack/react-router";
import { Category } from "../../backend";
import { CATEGORIES } from "../../lib/queryKeys";

const CATEGORY_ROUTE_MAP: Record<Category, string> = {
  [Category.clothes]: "/products?category=clothes",
  [Category.bags]: "/products?category=bags",
  [Category.watches]: "/products?category=watches",
  [Category.shoes]: "/products?category=shoes",
  [Category.electronics]: "/products?category=electronics",
  [Category.computers]: "/products?category=computers",
};

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer
      className="bg-card border-t border-border mt-auto"
      data-ocid="main-footer"
    >
      <div className="container mx-auto px-4 max-w-7xl py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link
              to="/"
              className="font-display text-2xl font-bold text-foreground hover:text-primary transition-colors"
            >
              Abiya
            </Link>
            <p className="mt-2 text-sm text-muted-foreground max-w-xs leading-relaxed">
              Premium clothes, bags, watches, shoes, electronics & computers.
              Curated for those who appreciate quality.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-display text-sm font-semibold text-foreground uppercase tracking-wider mb-3">
              Shop
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/products"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  All Products
                </Link>
              </li>
              {CATEGORIES.map((cat) => (
                <li key={cat.value}>
                  <a
                    href={CATEGORY_ROUTE_MAP[cat.value]}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {cat.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="font-display text-sm font-semibold text-foreground uppercase tracking-wider mb-3">
              Account
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/profile"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  My Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/orders"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Order History
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            © {year} Abiya. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
