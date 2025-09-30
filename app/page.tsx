import Card from ../components/Card;

const listings = [
  { id: 1, title: Listing One, subtitle: Navy themed, desc: Example card. },
  { id: 2, title: Listing Two, subtitle: Navy themed, desc: Example card. },
  { id: 3, title: Listing Three, subtitle: Navy themed, desc: Example card. },
];

export default function Home() {
  return (
    <main>
      <header className=mb-8>
        <h1 className=text-4xl font-extrabold tracking-tight>ImaraLink</h1>
        <p className=mt-2 text-slate-300>
          Tailwind is <span className=px-2 py-0.5 rounded bg-emerald-600>working</span>.
        </p>
      </header>

      <section className=grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6>
        {listings.map(item => (
          <Card key={item.id} title={item.title} subtitle={item.subtitle}>
            {item.desc}
          </Card>
        ))}
      </section>
    </main>
  );
}
