interface CustomCardTypes {
  name: string;
}

export default function CustomCard({ name }: CustomCardTypes) {
  return <div>{name}</div>;
}
