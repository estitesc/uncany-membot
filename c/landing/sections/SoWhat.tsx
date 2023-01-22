export default function SoWhat() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "24px 24px",
        alignItems: "center ",
        // marginTop: 24,
      }}
    >
      <div style={{ width: 300 }}>
        <div
          style={{
            fontFamily: "Inconsolata",
            fontSize: 24,
          }}
        >
          <div>Why use uncany.ai?</div>
        </div>
        <div style={{ marginTop: 12, fontSize: 14 }}>
          GPT and other LLM API&apos;s provide powerful access to generalized
          linguistic intelligence, but won&apos;t by default conform to a
          developer&apos;s intended use case.
        </div>
        <div style={{ marginTop: 12, fontSize: 14 }}>
          LLM&apos;s are great at creativity and fuzzy logic, but they fall over
          when faced with heuristic challenges that traditional programming
          languages eat as a snack before breakfast.
        </div>
        <div style={{ marginTop: 12, fontSize: 14 }}>
          With uncany.ai, merge the best of the heuristic and neural worlds to
          create bots with genuine utility.
        </div>
      </div>
    </div>
  );
}
