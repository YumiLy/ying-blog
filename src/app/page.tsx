import Link from "next/link";
import StoryCircles from "@/components/StoryCircles";
import MapSection from "@/components/MapSection";

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl p-6 space-y-12">
      {/* Hero */}
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">Ying’s Remote Life</h1>
        <p className="text-gray-300">
          I live in Paris and share stories of remote work and travels across Europe and beyond.
          <br />
          <em>Nomadic notes by Ying, across desks.</em>
        </p>
        <div className="flex gap-4">
          <Link href="#hobbies" className="text-blue-400 hover:underline">Explore hobbies ↓</Link>
          <Link href="#map" className="text-blue-400 hover:underline">Open the map →</Link>
        </div>
      </section>

      {/* IG-Story 风格圆圈 */}
      <section id="hobbies" className="space-y-6">
        <h2 className="text-2xl font-semibold text-center">Things I love</h2>
        <StoryCircles />
      </section>

      {/* 你的各段落（reading/coffee/...） */}
      <section id="reading" className="prose prose-invert prose-zinc">
        <h3>Reading</h3>
        <p>I keep notes from books that travel well with remote life—essays, design, and AI non-fiction.</p>
      </section>
      <section id="coffee" className="prose prose-invert prose-zinc">
        <h3>Coffee</h3>
        <p>Independent cafés with good light and quiet corners are my happy places.</p>
      </section>
      <section id="beer" className="prose prose-invert prose-zinc">
        <h3>Beer</h3>
        <p>Local pubs, seasonal taps, and small stories from bartenders.</p>
      </section>
      <section id="photo" className="prose prose-invert prose-zinc">
        <h3>Photography</h3>
        <p>A growing collection of city frames. Scroll down to the map to explore.</p>
      </section>
      <section id="ai" className="prose prose-invert prose-zinc">
        <h3>AI & Science</h3>
        <p>I work in AI and care about human-centric, privacy-friendly systems.</p>
      </section>

      {/* Map & Lightbox */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Map · Photos & Places</h2>
        <MapSection />
      </div>
    </main>
  );
}
