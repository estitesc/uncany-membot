export default function Examples() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "24px 24px 72px",
        alignItems: "center ",
      }}
    >
      <div style={{ maxWidth: 300 }}>
        <div
          style={{
            fontFamily: "Inconsolata",
            fontSize: 24,
          }}
        >
          <div>Examples</div>
        </div>
        <div style={{ marginTop: 12, fontSize: 14, fontWeight: "bold" }}>
          AccountabiliBot
        </div>
        <div style={{ marginTop: 6, fontSize: 14 }}>
          An morning bot that checks in with you to see if you actually woke up
          when you said you would.
        </div>
        <div style={{ marginTop: 12, fontSize: 14, fontWeight: "bold" }}>
          Support Bot
        </div>
        <div style={{ marginTop: 6, fontSize: 14 }}>
          A simple customer service bot oriented around answering questions from
          a FAQ.
        </div>
        <div style={{ marginTop: 12, fontSize: 14, fontWeight: "bold" }}>
          PMBot
        </div>
        <div style={{ marginTop: 6, fontSize: 14 }}>
          A project management bot that coordinates inputs from various
          contributors on a team while holding a model of the project.
        </div>
        <div style={{ marginTop: 12, fontSize: 14, fontWeight: "bold" }}>
          Calendar Bot
        </div>
        <div style={{ marginTop: 6, fontSize: 14 }}>
          A bot that serves the traditional role of an EA, helping surface and
          schedule events from a calendar API.
        </div>
        <div style={{ marginTop: 12, fontSize: 14, fontWeight: "bold" }}>
          CoordiBot
        </div>
        <div style={{ marginTop: 6, fontSize: 14 }}>
          A bot that chats with everyone in a company / program to coordinate
          when they need to be where.
        </div>
      </div>
    </div>
  );
}
