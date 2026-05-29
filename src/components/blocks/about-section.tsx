import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const AboutSection = () => {
  return (
    <section className="container mt-10 flex max-w-5xl flex-col-reverse gap-8 md:mt-14 md:gap-14 lg:mt-20 lg:flex-row lg:items-end">
      {/* Images Left - Text Right */}
      <div className="flex flex-col gap-8 lg:gap-16 xl:gap-20">
        <ImageSection
          images={[
            { src: "/about/1.webp", alt: "Team collaboration" },
          ]}
          className="xl:-translate-x-10"
        />

        <TextSection
          title="Figma Make"
          paragraphs={[
            "Figmaで作成したデザインをプロトタイプにするのもOK",
            "でも、せっかくならFigma Makeでコーディングまでしてしまいましょう。",
            "正しくデータが作れればRWD対応も可能に。",
          ]}
          ctaButton={{
            href: "/careers",
            text: "View open roles",
          }}
        />
      </div>

      {/* Text Left - Images Right */}
      <div className="flex flex-col gap-8 lg:gap-16 xl:gap-20">
        <TextSection
          title="Figma MCP + Claude Code"
          paragraphs={[
            "Claude Codeが使える環境なら、プロトタイプも簡単です。",
            "FimgaのMCPサーバーを立ち上げたら、Devモードに切り替えて、ページのリンクをコピー",
            "あとはプロンプトで指示を出すだけ。事前にcloaude.mdファイルを作って、作業ルールを決めておくと指示に沿ってコーディングを進めてくれますよ。"
          ]}
          ctaButton={{
            href: "/careers",
            text: "View open roles",
          }}
        />
        <ImageSection
          images={[
            { src: "/about/3.webp", alt: "Modern workspace" },
          ]}
          className="hidden lg:flex xl:translate-x-10"
        />
      </div>
    </section>
  );
};

interface ImageSectionProps {
  images: { src: string; alt: string }[];
  className?: string;
}

export function ImageSection({ images, className }: ImageSectionProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {images.map((image, index) => (
        <div
          key={index}
          className="relative aspect-[2/1.5] overflow-hidden rounded-2xl"
        >
          <img
            src={image.src}
            alt={image.alt}
            className="size-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}

interface TextSectionProps {
  title?: string;
  paragraphs: string[];
  ctaButton?: {
    href: string;
    text: string;
  };
}

export function TextSection({
  title,
  paragraphs,
  ctaButton,
}: TextSectionProps) {
  return (
    <div className="flex-1 space-y-4 text-lg font-medium md:space-y-6">
      {title && <h2 className="text-primary text-4xl font-medium">{title}</h2>}
      <div className="text-muted-foreground max-w-xl space-y-6">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      {ctaButton && (
        <div className="mt-8">
          <a href={ctaButton.href}>
            <Button size="lg">{ctaButton.text}</Button>
          </a>
        </div>
      )}
    </div>
  );
}
