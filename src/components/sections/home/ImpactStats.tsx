import { useContent } from "../../../lib/ContentContext";
import { Container } from "../../ui/Container";
import { CountUp } from "../../ui/CountUp";
import { Icon } from "../../ui/Icon";
import { Reveal } from "../../ui/Reveal";

export function ImpactStats() {
  const { stats } = useContent();

  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 100}>
              <div className="card-lift text-center p-8 rounded-2xl bg-light border border-gray-100 h-full">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-royal/10 flex items-center justify-center text-royal">
                  <Icon name={stat.icon} size={26} />
                </div>
                <p className="text-3xl md:text-4xl font-heading font-bold text-navy">
                  <CountUp target={stat.value} suffix={stat.suffix ?? "+"} />
                </p>
                <p className="text-sm text-gray-500 mt-2 font-medium">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
