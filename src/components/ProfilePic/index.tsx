type ProfilePicProps = {
  image?: string;
  userName: string;
  variant?: "reallyBig" | "small" | "verySmall";
  border?: boolean;
};

const picSizes: Record<Required<ProfilePicProps>["variant"], string> = {
  reallyBig: "w-32 h-32",
  small: "w-10 h-10",
  verySmall: "w-8 h-8",
};
import defaultProfilePic from "../../assets/profile.jpg";
export const ProfilePic = ({
  image,
  userName,
  variant = "small",
  border,
}: ProfilePicProps) => {
  return (
    <img
      alt={`Foto de ${userName}`}
      className={`rounded-full ${picSizes[variant]} ${
        border ? "border-4 border-slate-950" : ""
      } text-center `}
      src={image || defaultProfilePic}
      loading="lazy"
    />
  );
};

export default ProfilePic;
