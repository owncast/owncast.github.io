import {
  RadioIcon,
  UsersIcon,
  ServerIcon,
  BuildingIcon,
  Mic,
  Gamepad2,
  Music,
  Disc3,
  Palette,
  Church,
  HeartHandshake,
  Drum,
  Theater,
  Flag,
  Megaphone,
  Trophy,
  Code,
  Terminal,
  Wrench,
  Briefcase,
  GraduationCap,
  Newspaper,
  Tv,
  Landmark,
  type LucideIcon,
} from "lucide-react";

const archetypes: {
  title: string;
  description: string;
  icon: LucideIcon;
  examples: LucideIcon[];
}[] = [
  {
    title: "Independents",
    description:
      "Creators who want full control over their streaming presence.",
    icon: RadioIcon,
    examples: [Mic, Gamepad2, Music, Disc3, Palette],
  },
  {
    title: "Communities",
    description:
      "Groups that want a space they own to connect and broadcast together.",
    icon: UsersIcon,
    examples: [Church, Theater, Megaphone, Trophy],
  },
  {
    title: "Builders",
    description:
      "Developers who want to self-host and customize their streaming.",
    icon: ServerIcon,
    examples: [Code, Terminal, Wrench],
  },
  {
    title: "Organizations",
    description:
      "Businesses powering events, apps, and broadcasts with live video.",
    icon: BuildingIcon,
    examples: [Briefcase, GraduationCap, Landmark, Newspaper, Tv],
  },
];

export function ArchetypesSection() {
  return (
    <section className="w-full py-8 px-6 bg-[#2d3748]/10 dark:bg-[#2d3748]/20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Who is Owncast for?
        </h2>
        <h3 className="text-center text-gray-600 dark:text-gray-400 mb-10 max-w-4xl mx-auto">
          Owncast works for all kinds of streams. Here's some of who's using it.
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {archetypes.map((archetype) => (
            <div
              key={archetype.title}
              className="flex flex-col items-center text-center p-4 rounded-xl bg-white/50 dark:bg-gray-800/50"
            >
              <archetype.icon className="w-10 h-10 mb-3 text-primary-600 dark:text-primary-400" />
              <h3 className="font-semibold mb-1">{archetype.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {archetype.description}
              </p>
              <div className="flex gap-2 mt-auto">
                {archetype.examples.map((ExampleIcon, index) => (
                  <ExampleIcon
                    key={index}
                    className="w-5 h-5 text-gray-400 dark:text-gray-500"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
