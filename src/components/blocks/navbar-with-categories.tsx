import { useState, useEffect } from "react";

import { ChevronRight } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
}

interface Props {
  categories: Category[];
}

export const NavbarWithCategories = ({ categories }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  const categoryItems = categories.map((cat) => ({
    title: cat.name,
    href: `/category/${decodeURIComponent(cat.slug)}`,
    description: `${cat.count}件の記事`,
  }));

  const ITEMS = [
    { label: "TOP", href: "/" },
    { label: "About", href: "/about" },
    { label: "教材一覧", href: "/reflist" },
    { label: "記事一覧", href: "/blog" },
    ...(categoryItems.length > 0
      ? [{ label: "カテゴリ", href: "#", dropdownItems: categoryItems }]
      : []),
  ];

  return (
    <section
      className={cn(
        "bg-background/70 absolute left-1/2 z-50 w-[min(90%,700px)] -translate-x-1/2 rounded-4xl border backdrop-blur-md transition-all duration-300",
        "top-5 lg:top-12",
      )}
    >
      <div className="flex items-center justify-between px-6 py-3">
        {/* ロゴ */}
        <a href="/" className="flex shrink-0 items-center gap-2">
          <img
            src="/logo.svg"
            alt="logo"
            width={94}
            height={18}
            className="dark:invert"
          />
        </a>

        {/* Desktop Navigation */}
        <NavigationMenu className="max-lg:hidden">
          <NavigationMenuList>
            {ITEMS.map((link) =>
              link.dropdownItems ? (
                <NavigationMenuItem key={link.label}>
                  <NavigationMenuTrigger className="data-[state=open]:bg-accent/50 bg-transparent! px-1.5">
                    {link.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="w-[320px] space-y-2 p-4">
                      {link.dropdownItems.map((item) => (
                        <li key={item.title}>
                          <a
                            href={item.href}
                            className="group hover:bg-accent hover:text-accent-foreground flex items-center gap-4 rounded-md p-3 leading-none no-underline outline-hidden transition-colors select-none"
                          >
                            <div className="space-y-1 transition-transform duration-300 group-hover:translate-x-1">
                              <div className="text-sm leading-none font-medium">
                                {item.title}
                              </div>
                              <p className="text-muted-foreground text-xs leading-snug">
                                {item.description}
                              </p>
                            </div>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={link.label}>
                  <a
                    href={link.href}
                    className={cn(
                      "relative bg-transparent px-1.5 text-sm font-medium transition-opacity hover:opacity-75",
                      pathname === link.href && "text-muted-foreground",
                    )}
                  >
                    {link.label}
                  </a>
                </NavigationMenuItem>
              ),
            )}
          </NavigationMenuList>
        </NavigationMenu>

        {/* 右側 */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle />

          {/* ハンバーガー（モバイル） */}
          <button
            className="text-muted-foreground relative flex size-8 lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <div className="absolute top-1/2 left-1/2 block w-[18px] -translate-x-1/2 -translate-y-1/2">
              <span aria-hidden="true" className={`absolute block h-0.5 w-full rounded-full bg-current transition duration-500 ease-in-out ${isMenuOpen ? "rotate-45" : "-translate-y-1.5"}`} />
              <span aria-hidden="true" className={`absolute block h-0.5 w-full rounded-full bg-current transition duration-500 ease-in-out ${isMenuOpen ? "opacity-0" : ""}`} />
              <span aria-hidden="true" className={`absolute block h-0.5 w-full rounded-full bg-current transition duration-500 ease-in-out ${isMenuOpen ? "-rotate-45" : "translate-y-1.5"}`} />
            </div>
          </button>
        </div>
      </div>

      {/* モバイルメニュー */}
      <div
        className={cn(
          "bg-background fixed inset-x-0 top-[calc(100%+1rem)] flex flex-col rounded-2xl border p-6 transition-all duration-300 ease-in-out lg:hidden",
          isMenuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-4 opacity-0",
        )}
      >
        <nav className="divide-border flex flex-1 flex-col divide-y">
          {ITEMS.map((link) =>
            link.dropdownItems ? (
              <div key={link.label} className="py-4 first:pt-0 last:pb-0">
                <button
                  onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                  className="text-foreground flex w-full items-center justify-between text-base font-medium"
                >
                  {link.label}
                  <ChevronRight className={cn("size-4 transition-transform duration-200", openDropdown === link.label ? "rotate-90" : "")} />
                </button>
                <div className={cn("overflow-hidden transition-all duration-300", openDropdown === link.label ? "mt-4 max-h-[1000px] opacity-100" : "max-h-0 opacity-0")}>
                  <div className="bg-muted/50 space-y-3 rounded-lg p-4">
                    {link.dropdownItems.map((item) => (
                      <a
                        key={item.title}
                        href={item.href}
                        className="hover:bg-accent group block rounded-md p-2 transition-colors"
                        onClick={() => { setIsMenuOpen(false); setOpenDropdown(null); }}
                      >
                        <div className="transition-transform duration-200 group-hover:translate-x-1">
                          <div className="text-primary font-medium">{item.title}</div>
                          <p className="text-muted-foreground mt-1 text-xs">{item.description}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className={cn(
                  "text-foreground hover:text-foreground/80 py-4 text-base font-medium transition-colors first:pt-0 last:pb-0",
                  pathname === link.href && "text-muted-foreground",
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ),
          )}
        </nav>
      </div>
    </section>
  );
};