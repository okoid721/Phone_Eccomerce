interface HaedingProps {
  title: string;
  center?: boolean;
}

const Haeding: React.FC<HaedingProps> = ({ title, center }) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <h1 className=" font-bold text-2xl">{title}</h1>
    </div>
  );
};

export default Haeding;
