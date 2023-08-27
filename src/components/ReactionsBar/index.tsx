import { Reaction, ReactionProps } from "../Reaction";
import {
  FaRegComment,
  FaHeart,
  FaRetweet,
  FaRegHeart,
  FaComment,
} from "react-icons/fa";

export const reactions = ["comment", "like", "repiu"] as const;

const baseReactions: Record<
  (typeof reactions)[number],
  Pick<ReactionProps, "variant"> & {
    icon: { default: React.ReactNode; active?: React.ReactNode };
  }
> = {
  comment: {
    variant: "primary",
    icon: {
      default: <FaRegComment />,
      active: <FaComment className="fill-primary-100" />,
    },
  },
  repiu: {
    variant: "secondary",
    icon: { default: <FaRetweet /> },
  },
  like: {
    variant: "tertiary",
    icon: {
      default: <FaRegHeart />,
      active: <FaHeart className="fill-quaternary-100" />,
    },
  },
};

export type ReactionsBarProps = {
  type?: "simplified" | "complete";
  reactions: Partial<
    Record<
      keyof typeof baseReactions,
      {
        active?: boolean;
        total?: number;
        onClick?: () => void;
      }
    >
  >;
};

export const ReactionsBar = ({ reactions, type }: ReactionsBarProps) => {
  return (
    <div className="flex gap-16">
      {Object.entries(reactions).map(([key, value]) => (
        <Reaction
          key={key}
          onClick={value.onClick}
          variant={baseReactions[key as keyof typeof baseReactions].variant}
          count={value.total || 0}
          active={value.active}
          type={type}
          icon={
            value.active
              ? baseReactions[key as keyof typeof baseReactions].icon.active ||
                baseReactions[key as keyof typeof baseReactions].icon.default
              : baseReactions[key as keyof typeof baseReactions].icon.default
          }
        />
      ))}
    </div>
  );
};

export default ReactionsBar;
