import { Eye, Target } from "lucide-react";
import { useContent } from "../../../lib/ContentContext";
import { Container } from "../../ui/Container";
import { Reveal } from "../../ui/Reveal";

export function VisionMission() {
  const { visionMission } = useContent();

  return (
    <section className="py-24 bg-navy relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(200,160,70,0.4), transparent 40%), radial-gradient(circle at 80% 80%, rgba(11,60,145,0.6), transparent 40%)",
        }}
      />
      <Container>
        <div className="grid md:grid-cols-2 gap-8 relative">
          <Reveal>
            <div className="p-10 rounded-3xl bg-white/5 backdrop-blur border border-white/10 h-full">
              <div className="w-14 h-14 mb-6 rounded-2xl bg-gold/20 text-gold flex items-center justify-center">
                <Eye size={26} />
              </div>
              <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-2">
                Our Vision
              </p>
              <h3 className="font-heading text-2xl md:text-3xl text-white font-bold mb-4">
                {visionMission.vision.title}
              </h3>
              <p className="text-blue-100 leading-relaxed">
                {visionMission.vision.body}
              </p>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="p-10 rounded-3xl bg-white/5 backdrop-blur border border-white/10 h-full">
              <div className="w-14 h-14 mb-6 rounded-2xl bg-gold/20 text-gold flex items-center justify-center">
                <Target size={26} />
              </div>
              <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-2">
                Our Mission
              </p>
              <h3 className="font-heading text-2xl md:text-3xl text-white font-bold mb-4">
                {visionMission.mission.title}
              </h3>
              <p className="text-blue-100 leading-relaxed">
                {visionMission.mission.body}
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
