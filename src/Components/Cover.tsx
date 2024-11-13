import { motion as _m } from "motion/react";

function MainCover() {
  const motion: any = _m;
  return (
    <motion.div
      className={
        "flex items-center justify-center h-full justify-self-center text-black w-[12.5%]"
      }
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        delay: 0.9,
        ease: "easeInOut",
        duration: 1.5,
      }}>
      <div className={"flex flex-col"}>
        <motion.h1
          className={" text-7xl text-black"}
          initial={{
            scale: 1,
          }}
          animate={{
            scale: 1.1,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}>
          reCaptcha Challenges
        </motion.h1>

        <p className={"text-center text-3xl"}>Captchas to solve for fun</p>
        <motion.a
          className="text-3xl font-bold hover:text-4xl wiggle"
          href="/rechallenge"
          whileHover={{
            scale: 1.1,
            x: -5,
          }}>
          PLAY
          {" >>>"}
        </motion.a>
      </div>
    </motion.div>
  );
}

export default MainCover;
