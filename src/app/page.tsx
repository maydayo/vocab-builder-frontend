import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="artboard">Hello</div>
      <div className="artboard phone-1">
        {" "}
        <div className="chat chat-start">
          <div className="chat-bubble">
            It's over Anakin, <br />I have the high ground.
          </div>
        </div>
        <div className="chat chat-end">
          <div className="chat-bubble">You underestimate my power!</div>
        </div>
      </div>
    </main>
  );
}
