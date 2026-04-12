type TimelineStepProps = {
  index: number;
  text: string;
};

export function TimelineStep({ index, text }: TimelineStepProps) {
  return (
    <li className="timeline-step">
      <div className="timeline-index">0{index + 1}</div>
      <p>{text}</p>
    </li>
  );
}

