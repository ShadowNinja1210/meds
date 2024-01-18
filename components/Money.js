"use client";

import { useEffect, useState } from "react";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({ subsets: ["latin"] });

const Money = ({ data }) => {
  const [amount, setAmount] = useState(0);

  const currentStreak = data.streak;
  let weekStreak = currentStreak / 7;

  const calcAmount = () => {
    let tempAmount = amount;
    if (weekStreak / 4 > 1) {
      weekStreak = weekStreak - 4;
    }
    for (let i = 0; i <= weekStreak; i++) {
      tempAmount += i * 100;
      if (i === 4) break;
    }
    setAmount(tempAmount);
  };

  useEffect(() => {
    calcAmount();
  }, []);

  return (
    <div>
      <div className="text-4xl font-bold flex gap-8 justify-between items-center">
        <picture>
          <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f4b8/512.webp" type="image/webp" />
          <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f4b8/512.gif" alt="💸" width="50" height="50" />
        </picture>
        <p>
          &#8377;
          <span className={`${orbitron.className}`}> {amount}</span>
        </p>
      </div>
    </div>
  );
};

export default Money;
