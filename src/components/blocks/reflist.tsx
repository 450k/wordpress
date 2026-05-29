import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const categories = [
  {
    title: "Udemy",
    lists: [
      {
        listTitle: "React - The Complete Guide 2025 (incl. Next.js, Redux) - Maximilian Schwarzmüller",
        detail:
          "React - The Complete Guide 2025 (incl. Next.js, Redux) - Maximilian Schwarzmüller",
      },
      {
        listTitle: "Complete React, Next.js & TypeScript Projects Course 2025 - Jānis Smilga",
        detail:
          "Complete React, Next.js & TypeScript Projects Course 2025 - Jānis Smilga",
      },
      {
        listTitle: "Type Script : Understanding TypeScript - Maximilian Schwarzmüller",
        detail:
          "Type Script : Understanding TypeScript - Maximilian Schwarzmüller",
      },
      {
        listTitle: "The Modern JavaScript Bootcamp - Andrew Mead",
        detail:
          "The Modern JavaScript Bootcamp - Andrew Mead",
      },
    ],
  },
  {
    title: "書籍",
    lists: [
      {
        listTitle: "プロを目指す人のためのTypeScript入門 - 鈴木 僚太[著]",
        detail:
          "プロを目指す人のためのTypeScript入門 - 鈴木 僚太[著]",
      },
      {
        listTitle: "SQL ゼロからはじめるデータベース操作 - ミック[著]",
        detail:
          "SQL ゼロからはじめるデータベース操作 - ミック[著]",
      },
      {
        listTitle: "Webを支える技術 - 山本陽平[著]",
        detail:
          "Webを支える技術 - 山本陽平[著]",
      },
      {
        listTitle: "リーダブルコード - Dustin Boswell, Trevor Foucher　[著]",
        detail:
          "リーダブルコード - Dustin Boswell, Trevor Foucher　[著]",
      },
    ],
  },
  {
    title: "参考サイト・参考動画",
    lists: [
      {
        listTitle: "参考サイト",
        detail:
          "随時追加します",
      },
      {
        listTitle: "参考動画",
        detail:
          "随時追加します",
      },
    ],
  },
];

export const RefList = ({
  headerTag = "h2",
  className,
  className2,
}: {
  headerTag?: "h1" | "h2";
  className?: string;
  className2?: string;
}) => {
  return (
    <section className={cn("py-28 lg:py-32", className)}>
      <div className="container max-w-5xl">
        <div className={cn("mx-auto grid gap-16 lg:grid-cols-2", className2)}>
          <div className="space-y-4">
            {headerTag === "h1" ? (
              <h1 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
                学習教材一覧
              </h1>
            ) : (
              <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
                学習に使用する教材を紹介します。
              </h2>
            )}
            <p className="text-muted-foreground max-w-md leading-snug lg:mx-auto">
              Udemyの講座をメインにし、足りない部分を書籍やサイト、動画などで補います。
            </p>
          </div>

          <div className="grid gap-6 text-start">
            {categories.map((category, categoryIndex) => (
              <div key={category.title} className="">
                <h3 className="text-muted-foreground border-b py-4">
                  {category.title}
                </h3>
                <Accordion type="single" collapsible className="w-full">
                  {category.lists.map((item, i) => (
                    <AccordionItem key={i} value={`${categoryIndex}-${i}`}>
                      <AccordionTrigger>{item.listTitle}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.detail}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
