import { DashedLine } from "@/components/dashed-line";

const stats = [
  {
    label: "提案件数",
    value: "25% UP",
  },
  {
    label: "作業時間",
    value: "50%削減",
  },
  {
    label: "受注率",
    value: "30% UP",
  },
  {
    label: "クライアント満足度",
    value: "120%",
  },
];

export function AboutHero() {
  return (
    <section className="">
      <div className="container flex max-w-6xl flex-col justify-between gap-8 md:gap-20 lg:flex-row lg:items-center lg:gap-24 xl:gap-24">
        <div className="flex-[2.5]">
          <h1 className="text-3xl tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            AIの活用で提案内容をより魅力的に
          </h1>

          <p className="text-muted-foreground mt-5 text-2xl md:text-3xl lg:text-4xl">
            パワポだけでは伝わらない<br />AI活用でプロトタイプ提案
          </p>

          <p className="text-muted-foreground mt-8 hidden space-y-6 text-lg md:block lg:mt-12">
            スライドに画面デザインを載せただけでは、デザイナーの伝えたいことはほとんど伝わりません。
            FigmaやAIの進化で、モックやプロトタイプの制作時間は大幅に短縮されています。
            <br />
            <br />
            爆速でデモを作成し、受注率アップにつなげましょう。
          </p>
        </div>

        <div
          className={`relative flex flex-1 flex-col justify-center gap-3 pt-10 lg:pt-0 lg:pl-10`}
        >
          <DashedLine
            orientation="vertical"
            className="absolute top-0 left-0 max-lg:hidden"
          />
          <DashedLine
            orientation="horizontal"
            className="absolute top-0 lg:hidden"
          />
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <div className="text-muted-foreground">{stat.label}</div>
              <div className="font-display text-4xl tracking-wide md:text-5xl">
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
