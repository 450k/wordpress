import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { GITHUB_URL } from "@/consts";

export function Footer() {
  const navigation = [
    { name: "TOP", href: "/" },
    { name: "About", href: "/about" },
    { name: "教材一覧", href: "/reflist" },
    { name: "記事一覧", href: "/blog" },

  ];

  const social = [
    { name: "Xwitter", href: "https://x.com/ausrobdev" },
    { name: "LinkedIn", href: "#" },
  ];

  const legal = [{ name: "Privacy Policy", href: "/privacy" }];

  return (
    <footer className="flex flex-col items-center gap-14 pt-28 lg:pt-32">
      <div className="container space-y-3 text-center">
        <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
          Keep your head up!
        </h2>
        <p className="text-muted-foreground mx-auto max-w-xl leading-snug text-balance">
          AIがすべて良しなにやってくれるこの時代<br />
          あららためてJSやTS,Reactを覚える意味は薄れているのかも。<br />
          でも、知っておいたほうが良さそうなのでがんばります。
        </p>
        <div>
          <Button size="lg" className="mt-4" asChild>
            <a href={GITHUB_URL}>ソースコードはこちら</a>
          </Button>
        </div>
      </div>

      <nav className="container flex flex-col items-center gap-4">
        <ul className="flex flex-wrap items-center justify-center gap-6">
          {navigation.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="font-medium transition-opacity hover:opacity-75"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-10 mb-2 w-full md:mt-14 md:mb-4 lg:mt-20 lg:mb-6">
        <p className="text-center text-sm">&copy; 2026 Learning JavaScript, TypeScript and Next.js</p>
      </div>
    </footer>
  );
}
