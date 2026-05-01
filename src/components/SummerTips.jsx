import { Droplets, Shirt, Glasses, Sun, Wind, Moon } from "lucide-react";

const tips = [
  {
    title: "Use SPF",
    desc: "Use SPF before going outside and reapply when needed.",
    icon: Sun,
  },
  {
    title: "Breathable outfits",
    desc: "Choose breathable cotton outfits to stay fresh in summer.",
    icon: Shirt,
  },
  {
    title: "UV protection",
    desc: "Keep sunglasses for UV protection during sunny hours.",
    icon: Glasses,
  },
  {
    title: "Stay hydrated",
    desc: "Drink enough water throughout the day to avoid dehydration.",
    icon: Droplets,
  },
  {
    title: "Light airflow",
    desc: "Stay in airy places and avoid heavy heat for too long.",
    icon: Wind,
  },
  {
    title: "Cool sleep",
    desc: "Sleep in a cool room for better recovery after hot days.",
    icon: Moon,
  },
];

export default function SummerTips() {
  return (
    <section className="mt-45">
      <div className="mx-auto w-11/12 xl:w-11/13">
        <div className="text-center">
          <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl">
            Summer <span className="text-yellow-400">care</span> tips
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base font-medium text-gray-300">
            Simple tips to stay fresh, safe and comfortable during summer.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tips.map((tip, index) => {
            const Icon = tip.icon;

            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl border-3 border-teal-700/30 bg-linear-to-br from-teal-800 to-teal-900 p-6 shadow-[0_8px_25px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1 hover:border-teal-600 hover:shadow-[0_12px_30px_rgba(0,0,0,0.28)]"
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-teal-500/5 blur-3xl transition duration-500 group-hover:bg-teal-500/10" />

                <div className="relative z-10 grid h-12 w-12 place-items-center rounded-2xl bg-yellow-500 text-teal-800 shadow-[0_8px_18px_rgba(234,179,8,0.18)] transition duration-300 group-hover:scale-105">
                  <Icon size={22} strokeWidth={2.5} />
                </div>

                <h3 className="relative z-10 mt-7 text-lg font-black text-white">
                  {tip.title}
                </h3>

                <p className="relative z-10 mt-3 text-sm font-medium leading-7 text-gray-300">
                  {tip.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
