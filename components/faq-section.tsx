"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

const faqs = [
  {
    question: "I already use Git. Why would I need YoYo?",
    answer: (
      <>
        Git is great for commits.
        <br />
        <br />
        YoYo is for everything before that — messy AI edits, experiments, prompts gone wrong.
        <br />
        <br />
        It gives you a safety net without bloating your commit history.
      </>
    ),
  },
  {
    question: "Is it free?",
    answer: (
      <>
        Yes — there's a generous free tier.
        <br />
        <br />
        Pro and Team plans coming soon.
      </>
    ),
  },
  {
    question: "Will this mess up my Git repo?",
    answer: (
      <>
        Nope.
        <br />
        <br />
        YoYo keeps everything separate from your Git repo.
        <br />
        <br />
        No staged files. No surprise commits. Your .git/ stays clean and untouched.
      </>
    ),
  },
  {
    question: "Where is my version history stored?",
    answer: (
      <>
        Your full version history lives <strong>on your machine</strong> — not in the cloud.
      </>
    ),
  },
  {
    question: "How does YoYo secure AI usage?",
    answer: (
      <>
        YoYo uses fast, secure LLM providers like <strong>Groq</strong>, with <strong>zero data retention</strong>.
        <br />
        <br />
        Your code is <strong>encrypted in transit using TLS 1.2+</strong> and never stored or used for training.
        <br />
        <br />
        We don't keep logs. We don't keep copies.
      </>
    ),
  },
  {
    question: "Does it work with branches?",
    answer: (
      <>
        Yes — beautifully.
        <br />
        <br />
        Each Git branch has its own version timeline in YoYo. Snapshots stay scoped to your work.
      </>
    ),
  },
]

interface FAQSectionProps {
  onOpenInstall?: () => void
}

export default function FAQSection({ onOpenInstall }: FAQSectionProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2
          className="text-center mb-12 md:mb-16 font-semibold"
          style={{
            backgroundImage: "linear-gradient(rgb(245, 245, 245), rgb(245, 245, 245) 29%, rgb(153, 153, 153))",
            color: "transparent",
            fontFamily: "GeistSans, sans-serif",
            fontSize: "clamp(32px, 6vw, 52px)",
            fontWeight: 600,
            letterSpacing: "clamp(-1.5px, -0.04em, -2.08px)",
            lineHeight: "1.15",
            textAlign: "center",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          Frequently Asked (and Silently Wondered) Questions
        </h2>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-white/10 rounded-lg bg-white/5 overflow-hidden"
            >
              <AccordionTrigger className="px-5 py-4 hover:no-underline">
                <span
                  className="text-left font-medium text-white"
                  style={{
                    fontFamily: 'var(--font-geist-sans), "GeistSans", sans-serif',
                    fontSize: "18px",
                  }}
                >
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4 pt-0">
                <p
                  className="text-white/80"
                  style={{
                    fontFamily:
                      'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
                    fontSize: "15px",
                    lineHeight: "1.5",
                  }}
                >
                  {faq.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Call to action */}
        <div className="mt-12 md:mt-16 text-center">
          <p
            className="text-white/80 mb-6"
            style={{
              fontFamily:
                'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
              fontSize: "16px",
              lineHeight: "1.5",
            }}
          >
            Still unsure? Try it for 60 seconds — you'll never code AI-assisted without it again.
          </p>

          {onOpenInstall && (
            <Button
              onClick={onOpenInstall}
              className="bg-white hover:bg-gray-100 text-black font-mono text-sm font-semibold tracking-wider py-3 px-6 rounded-lg"
              style={{
                fontFamily:
                  'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
                letterSpacing: "0.56px",
                height: "48px",
              }}
            >
              <Download className="mr-2 h-4 w-4 stroke-[2.5px]" />
              INSTALL NOW
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
