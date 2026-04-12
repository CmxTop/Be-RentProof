type ShellFrameProps = {
  title: string;
  subtitle: string;
  items: string[];
};

export function ShellFrame({ title, subtitle, items }: ShellFrameProps) {
  return (
    <article className="shell-frame">
      <header>
        <p>{subtitle}</p>
        <h3>{title}</h3>
      </header>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

