import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Home, Search } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="container mx-auto px-4 max-w-lg py-24 text-center">
      <p className="font-display text-8xl font-bold text-primary/20 mb-4">
        404
      </p>
      <h1 className="font-display text-3xl font-bold text-foreground mb-3">
        Page not found
      </h1>
      <p className="text-muted-foreground mb-8">
        Sorry, we couldn't find what you were looking for.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/">
          <Button className="font-semibold" data-ocid="notfound-home">
            <Home className="mr-2 h-4 w-4" />
            Go Home
          </Button>
        </Link>
        <Link to="/products">
          <Button variant="outline" data-ocid="notfound-shop">
            <Search className="mr-2 h-4 w-4" />
            Browse Products
          </Button>
        </Link>
      </div>
    </div>
  );
}
