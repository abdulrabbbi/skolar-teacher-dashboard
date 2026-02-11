import logoSrc from "../../../assets/image (28) 1.svg";

type Props = {
  size?: number;
  className?: string;
};

export function SkolarMark({ size = 44, className }: Props) {
  return (
    <img
      src={logoSrc}
      alt="SKOLAR"
      width={size}
      height={size}
      className={className}
      draggable={false}
    />
  );
}
