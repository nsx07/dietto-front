export default function WaveDots() {
  return (
    <>
      <style jsx>{`
        div#wave {
          position: relative;
          text-align: center;
        }
        div#wave .dot {
          display: inline-block;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          margin-right: 3px;
          background: #333;
          animation: wave 1.3s linear infinite;
        }
        div#wave .dot:nth-child(2) {
          animation-delay: -1.1s;
        }
        div#wave .dot:nth-child(3) {
          animation-delay: -0.9s;
        }

        @keyframes wave {
          0%,
          60%,
          100% {
            transform: initial;
          }
          30% {
            transform: translateY(-8px);
          }
        }
      `}</style>

      <div id="wave">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </>
  );
}
