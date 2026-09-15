import { useState } from "react";
import { api } from "../lib/api";

type AskAIProps = {
  city?: string;
};

export default function AskAI({ city = "Agra" }: AskAIProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askQuestion = async (text?: string) => {
    const query = (text ?? question).trim();

    if (!query || loading) return;

    setQuestion(query);
    setLoading(true);

    try {
      const result = await api.askAI(query, city);
      setAnswer(result.answer);
    } catch {
      setAnswer(
        "Sorry, I couldn't connect right now. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const quickQuestions = [
    "What should I visit?",
    "Best local food?",
    "Tell me a hidden place",
    "How can I travel around?",
  ];

  return (
    <section className="rounded-3xl border border-white/10 bg-black/20 p-6 shadow-xl backdrop-blur-md">
      <div className="mb-5">
        <p className="mb-1 text-sm font-medium uppercase tracking-[0.2em] text-amber-400">
          Ask SanskritiX
        </p>

        <h2 className="text-2xl font-bold text-white">
          Your cultural travel companion
        </h2>

        <p className="mt-2 text-sm text-white/70">
          Ask anything about {city} — places, food, culture,
          routes and hidden gems.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              askQuestion();
            }
          }}
          placeholder={`Ask about ${city}...`}
          className="min-h-12 flex-1 rounded-2xl border border-white/10 bg-white/10 px-4 text-white outline-none placeholder:text-white/40 focus:border-amber-400"
        />

        <button
          onClick={() => askQuestion()}
          disabled={loading || !question.trim()}
          className="min-h-12 rounded-2xl bg-amber-500 px-6 font-semibold text-black transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Thinking..." : "Ask"}
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {quickQuestions.map((item) => (
          <button
            key={item}
            onClick={() => askQuestion(item)}
            disabled={loading}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white disabled:opacity-50"
          >
            {item}
          </button>
        ))}
      </div>

      {answer && (
        <div className="mt-5 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            SanskritiX
          </p>

          <p className="whitespace-pre-line text-sm leading-7 text-white/90">
            {answer}
          </p>
        </div>
      )}
    </section>
  );
}
