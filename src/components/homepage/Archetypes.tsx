import { LandingProductFeaturesGrid } from "@/components/landing/LandingProductFeaturesGrid";
import { LandingProductFeature } from "@/components/landing/LandingProductFeature";
import { RadioIcon, UsersIcon, ServerIcon, BuildingIcon } from "lucide-react";

const archetypes = [
  {
    title: "Independents",
    description:
      "Creators who want full control over their streaming presence without relying on big platforms.",
    icon: RadioIcon,
  },
  {
    title: "Communities",
    description:
      "Groups and networks that want a shared space to connect and broadcast together.",
    icon: UsersIcon,
  },
  {
    title: "Builders",
    description:
      "Developers and tinkerers who want to self-host and customize their streaming infrastructure.",
    icon: ServerIcon,
  },
  {
    title: "Organizations",
    description:
      "Businesses and institutions that need standalone live streaming they can use in existing sites, applications, or events.",
    icon: BuildingIcon,
  },
];

export function ArchetypesSection() {
  return (
    <LandingProductFeaturesGrid
      title="Who is Owncast for?"
      // description="You'll save days of work and the only question you'll have is 'What do I do with all this free time?'"
      numberOfColumns={5}
      containerType="narrow"
      withBackground
      withBackgroundGlow
      backgroundGlowVariant="primary"
      variant="secondary"
    >
      {archetypes.map((archetype) => (
        <LandingProductFeature
          key={archetype.title}
          title={archetype.title}
          description={archetype.description}
          textPosition="center"
          leadingComponent={
            archetype.icon && <archetype.icon className="w-16 h-16 mx-auto" />
          }
        />
      ))}
    </LandingProductFeaturesGrid>
  );
}
