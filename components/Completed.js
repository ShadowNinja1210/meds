import { Dancing_Script } from "next/font/google";

const dancingScript = Dancing_Script({ subsets: ["latin"] });

const Completed = () => {
  return (
    <div className="flex justify-center gap-4 items-end p-2">
      {/* Mirrored Emoji */}

      <picture>
        <source
          style={{ transform: "scaleX(-1)" }}
          srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f389/512.webp"
          type="image/webp"
        />
        <img
          style={{ transform: "scaleX(-1)" }}
          src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f389/512.gif"
          alt="🎉"
          width="60"
          height="60"
        />
      </picture>

      {/* Text */}
      <h1 className={`font-bold text-4xl ${dancingScript.className}`}>Congratulations</h1>

      {/* Normal Emoji */}

      <picture>
        <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f389/512.webp" type="image/webp" />
        <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f389/512.gif" alt="🎉" width="60" height="60" />
      </picture>
    </div>
  );
};

export default Completed;
