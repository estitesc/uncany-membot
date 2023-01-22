import Image from "next/image";

export default function Tagline() {
  return (
    <div
      style={{
        flex: 1,
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        fontFamily: "Inconsolata",
        fontSize: 24,
      }}
    >
      <div
        style={{
          alignItems: "baseline",
          justifyContent: "space-between",
          maxWidth: 300,
          marginTop: "-100px",
        }}
      >
        <div>build bots the way</div>
        <div style={{ marginTop: 8 }}>web devs build apps</div>
      </div>
      <div style={{ marginTop: 24 }}>
        <Image
          src="/short_example_convo.png"
          alt="at HF0"
          width={230}
          height={120}
        />
      </div>
      <button
        onClick={() => {}}
        style={{
          backgroundColor: "#A5277B",
          fontFamily: "Inter",
          fontSize: 14,
          marginTop: 24,
          borderRadius: 4,
          color: "white",
          borderWidth: 0,
          padding: "12px 36px",
          cursor: "pointer",
        }}
      >
        browse demos
      </button>
      <div
        style={{
          border: "solid 1px black",
          height: "15vh",
          position: "absolute",
          bottom: -10,
        }}
      />
    </div>
  );
}
