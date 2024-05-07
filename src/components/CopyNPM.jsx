import React, { useState } from "react";

function CopyNPM() {
  const [showCopied, setShowCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("npm i usedeckofcards");
      setShowCopied(true);
      setTimeout(() => {
        setShowCopied(false);
      }, 800);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="join">
      <div>
        <div className="pointer-events-none">
          <input
            className="input input-sm join-item input-ghost"
            placeholder="npm i usedeckofcards"
          />
        </div>
      </div>
      <div className="indicator">
        <button
          className="btn join-item btn-sm border-none bg-opacity-15 hover:bg-opacity-5"
          onClick={handleCopy}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-copy"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#ffffff"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" />
            <path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" />
          </svg>
        </button>
        {showCopied && (
          <p className="btn btn-ghost btn-sm pointer-events-none text-warning">
            Copied!
          </p>
        )}
      </div>
    </div>
  );
}

export default CopyNPM;
