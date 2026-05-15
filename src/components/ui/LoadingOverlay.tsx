"use client";

interface LoadingOverlayProps {
  progress: number; // 0–1
  total: number;
}

export default function LoadingOverlay({ progress, total }: LoadingOverlayProps) {
  const loaded  = Math.floor(progress * total);
  const percent = Math.round(progress * 100);

  return (
    <div
      className="fixed inset-0 z-[9000] flex flex-col items-center justify-center"
      style={{ background: "var(--background)" }}
    >
      {/* Village icon */}
      <div className="mb-8 text-6xl select-none animate-pulse">🌾</div>

      {/* Title */}
      <h1
        className="mb-2 text-2xl md:text-3xl tracking-wide text-center"
        style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          color: "var(--primary)",
        }}
      >
        Entering the Village...
      </h1>

      {/* Subtitle */}
      <p
        className="mb-10 text-sm tracking-widest uppercase"
        style={{ color: "var(--muted)", fontFamily: "var(--font-caveat), cursive" }}
      >
        Welcome to the village
      </p>

      {/* Progress bar */}
      <div
        className="w-72 md:w-96 rounded-full overflow-hidden"
        style={{
          height: "4px",
          background: "rgba(200,168,75,0.15)",
          boxShadow: "0 0 0 1px rgba(200,168,75,0.1)",
        }}
      >
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${percent}%`,
            background: "linear-gradient(90deg, var(--primary), var(--accent))",
            boxShadow: "0 0 12px rgba(200,168,75,0.5)",
          }}
        />
      </div>

      {/* Progress text */}
      <p
        className="mt-4 text-xs tabular-nums"
        style={{ color: "var(--muted)" }}
      >
        Loading frames... {loaded}/{total}
      </p>

      {/* Decorative dots */}
      <div className="absolute bottom-8 flex gap-2">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="inline-block w-1.5 h-1.5 rounded-full animate-bounce"
            style={{
              background: "var(--primary)",
              animationDelay: `${i * 0.2}s`,
              opacity: 0.6,
            }}
          />
        ))}
      </div>
    </div>
  );
}
