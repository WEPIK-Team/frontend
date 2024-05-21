interface HeadingProps {
  title: string;
  description: string;
}

export const Heading: React.FC<HeadingProps> = ({ title, description }) => {
  return (
    <div className="space-y-1">
      <h2 className="text-wpt-2xl font-semibold text-primary">{title}</h2>
      <p className="text-wpt-base-1 text-wpc-gray">{description}</p>
    </div>
  );
};
