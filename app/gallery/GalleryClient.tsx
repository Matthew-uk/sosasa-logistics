"use client";
import GalleryView from "../_components/GalleryView";
import Section from "../_components/Section";
import SubPageHero from "../_components/SubPageHero";
import { IMG } from "../_lib/images";

export default function GalleryClient() {
  return (
    <div style={{ animation: "fadeIn .5s" }}>
      <SubPageHero
        label="Gallery"
        title={<>INSIDE <span className="tg">SOSASA</span></>}
        subtitle="A behind-the-scenes look at the fleet, hubs, and people powering deliveries across Nigeria. Filter by category, click any image to view larger."
        image={IMG.port}
      />

      <Section>
        <GalleryView />
      </Section>
    </div>
  );
}
