export default function BlurBackground(props) {
  return (
    <div
      style={{
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
        overflow: "hidden",
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 528 560"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <style>
          {`
              @keyframes float {
                0%, 100% { transform: translate(0, 0); }
                50% { transform: translate(50px, 50px); }
              }
              .floating-circle {
                animation: float infinite ease-in-out;
              }
            `}
        </style>
        {[
          {
            cx: 71,
            cy: 61,
            r: 111,
            fill: "rgba(30, 100, 255, 0.5)",
            duration: 3,
          },
          {
            cx: 0,
            cy: 0,
            r: 139,
            fill: "rgba(10, 30, 130, 0.5)",
            duration: 2.25,
          },
          {
            cx: 264,
            cy: 291,
            r: 139,
            fill: "rgba(30, 43, 226, 0.5)",
            duration: 2.7,
          },
          {
            cx: 80.5,
            cy: 189.5,
            r: 101.5,
            fill: "rgba(173, 216, 230, 0.5)",
            duration: 3.3,
          },
          {
            cx: 196.5,
            cy: 317.5,
            r: 101.5,
            fill: "rgba(0, 191, 255, 0.5)",
            duration: 1.95,
          },
          {
            cx: 70.5,
            cy: 458.5,
            r: 101.5,
            fill: "rgba(135, 206, 250, 0.5)",
            duration: 3,
          },
          {
            cx: 426.5,
            cy: -0.5,
            r: 101.5,
            fill: "rgba(65, 105, 225, 0.5)",
            duration: 2.55,
          },
        ].map((circle, index) => (
          <circle
            key={index}
            cx={circle.cx}
            cy={circle.cy}
            r={circle.r}
            fill={circle.fill}
            className="floating-circle"
            style={{
              animationDuration: `${circle.duration}s`,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
