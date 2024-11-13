import React, { useEffect, useRef, useState } from "react";
import { motion as _ma } from "framer-motion";

function ReChallenge() {
  const [captchaText, setCaptchaText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const canvasRef = useRef(null);
  const motion: any = _ma;

  useEffect(() => {
    function generateCaptcha() {
      const canvas: any = canvasRef.current;
      const ctx: any = canvas?.getContext("2d");

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let captchaText = "";
      for (let i = 0; i < 6; i++) {
        captchaText += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }

      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = "40px 'Courier New', monospace";
      ctx.fillStyle = "black";

      const textWidth = ctx.measureText(captchaText).width;
      const distortionAmount = 12;
      for (let i = 0; i < captchaText.length; i++) {
        const x = 20 + i * (textWidth / captchaText.length);
        const y = 50 + Math.sin(i) * distortionAmount;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.random() * 0.3 - 0.15);
        ctx.fillText(captchaText[i], 0, 0);
        ctx.restore();
      }

      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.strokeStyle = "rgba(0, 0, 0, 0.15)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      setCaptchaText(captchaText);
    }

    generateCaptcha();
  }, []);

  const handleInputChange = (e: any) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = () => {
    if (userInput === captchaText) {
      setIsCaptchaValid(true);
      setShowNextButton(true);
    } else {
      setIsCaptchaValid(false);
    }
  };

  const handleNextPuzzle = () => {
    window.location.reload();
  };

  return (
    <motion.div
      className="flex justify-center items-center h-screen bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}>
      {!isCaptchaValid ? (
        <div className="text-center text-white">
          <motion.h1
            className="mb-4 text-4xl font-extrabold"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 150 }}>
            reCAPTCHA Challenge
          </motion.h1>

          <motion.canvas
            ref={canvasRef}
            width={500}
            height={200}
            style={{
              border: "2px solid black",
              marginBottom: "20px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}></motion.canvas>

          <p className="mt-4 text-lg">
            Type the text you see in the box below:
          </p>
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            className="mt-4 p-2 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            placeholder="Enter the text"
          />
          <div className="mt-4">
            <button
              onClick={handleSubmit}
              className="bg-white text-black p-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-300">
              Submit
            </button>
            {userInput && userInput !== captchaText && (
              <p className="text-red-500 mt-2">Oops! Incorrect, try again.</p>
            )}
          </div>
        </div>
      ) : (
        <motion.div
          className="text-center text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}>
          <h1 className="mb-4 text-4xl font-bold text-green-400">
            🎉 Challenge Completed!
          </h1>
          <p className="mt-4 text-xl">Nice work! You completed the CAPTCHA.</p>
          {showNextButton && (
            <div className="mt-6">
              <button
                onClick={handleNextPuzzle}
                className="bg-gray-700 text-white p-2 rounded-lg font-semibold hover:bg-gray-600 transition-colors duration-300">
                Next Puzzle
              </button>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

export default ReChallenge;
