
import type { FC } from "react";

export const Footer: FC<FooterProps> = (props: FooterProps) => {
  const {} = props;
  return (
    <div>
      <h2>This is the footer</h2>
    </div>
  );
};

interface FooterProps {}
