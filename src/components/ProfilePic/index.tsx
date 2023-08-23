type ProfilePicProps = {
  image?: string;
  userName: string;
  variant?: "reallyBig" | "small";
  border?: boolean;
};

const defaultProfilePic =
  "https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg";
export const ProfilePic = ({
  image,
  userName,
  variant = "small",
  border,
}: ProfilePicProps) => {
  return (
    <img
      alt={`Foto de ${userName}`}
      className={`rounded-full ${
        variant === "small" ? "w-10 h-10" : "w-32 h-32"
      } ${border ? "border-4 border-slate-950" : ""}`}
      src={image || defaultProfilePic}
    />
  );
};

export default ProfilePic;
