import Image from "next/image";
import useIsDesktop from "../../../h/useIsDesktop";

export default function HowItWorks() {
  const isDesktop = useIsDesktop();

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "24px 24px",
        alignItems: "center ",
        marginTop: 24,
      }}
    >
      <div style={{ width: 300 }}>
        <div
          style={{
            fontFamily: "Inconsolata",
            fontSize: 24,
          }}
        >
          <div>How it works</div>
        </div>
        <div style={{ marginTop: 12, fontSize: 16 }}>
          <span style={{ fontWeight: "bold" }}>Write </span>
          atomic components to design interactions.
        </div>
        <div style={{ marginTop: 12, fontSize: 16 }}>
          <span style={{ fontWeight: "bold" }}>Arrange </span>
          your components to structure the flow of conversation.
        </div>
        <div style={{ marginTop: 12, fontSize: 16 }}>
          <span style={{ fontWeight: "bold" }}>Connect </span>
          your API to perform actions and inject data.
        </div>
      </div>
      <div style={{ marginTop: 24 }}>
        <Image
          src="/uncany_flow.png"
          width={isDesktop ? 550 : 320}
          height={isDesktop ? 330 : 190}
          alt="diagram showing how uncany works"
        />
      </div>
    </div>
  );
}
