import * as React from "react";
import { Container } from "@/components/layout/Container";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProjectShowcase } from "@/components/home/FeaturedProjectShowcase";
import { InteractiveTechToolkit } from "@/components/home/InteractiveTechToolkit";
import { SelectedProjectsList } from "@/components/home/SelectedProjectsList";
import { RecentWriting } from "@/components/home/RecentWriting";
import { GitHubTelemetryWidget } from "@/components/home/GitHubTelemetryWidget";

export default function HomePage() {
  return (
    <Container size="wide">
      <HeroSection />
      <FeaturedProjectShowcase />
      <InteractiveTechToolkit />
      <SelectedProjectsList />
      <RecentWriting />
      <GitHubTelemetryWidget />
    </Container>
  );
}
