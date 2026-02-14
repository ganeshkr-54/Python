export default function PersonInfoCard({ person }) {
  if (!person) return null;

  return (
    <article className="rounded-xl border border-white/15 bg-slate-900/80 p-4 shadow-lg">
      <h3 className="text-xl font-semibold text-saffron">{person.Name}</h3>
      <dl className="mt-3 space-y-2 text-sm text-white/90">
        <div>
          <dt className="font-semibold text-white">DOB</dt>
          <dd>{person.DOB || 'N/A'}</dd>
        </div>
        <div>
          <dt className="font-semibold text-white">Profession</dt>
          <dd>{person.Profession || 'N/A'}</dd>
        </div>
        <div>
          <dt className="font-semibold text-white">Description</dt>
          <dd>{person.Description || 'N/A'}</dd>
        </div>
        <div>
          <dt className="font-semibold text-white">Awards</dt>
          <dd>{person.Awards || 'N/A'}</dd>
        </div>
      </dl>
    </article>
  );
}
