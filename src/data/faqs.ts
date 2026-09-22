export interface Faq {
  question: string;
  answer: string;
}

export const FAQS: Faq[] = [
  {
    question: "Is BioCraft free to use?",
    answer: "Yes. You can fill in your details, switch templates and download your biodata without paying or creating an account.",
  },
  {
    question: "Do I need to sign up or log in?",
    answer: "No. There are no accounts. Open the editor, fill in your details and download. Nothing is asked of you beyond the biodata itself.",
  },
  {
    question: "Where is my information stored?",
    answer:
      "Your draft is saved in your own browser (local storage) so you can come back to it on the same device. It is not uploaded to a server. If you clear your browser data, or use a private window, the draft is removed. Photo cropping and file creation also happen on your device.",
  },
  {
    question: "Which file formats can I download?",
    answer:
      "PDF (A4, best for printing and sharing), PNG (sharp image) and JPEG (smaller image). Images are created at roughly 300 dpi. If a download fails on your browser, the Print or save as PDF option uses your browser's own print dialog instead.",
  },
  {
    question: "Does it work on my phone?",
    answer:
      "Yes. On a phone the editor has two tabs, Edit and Preview, so you can type on one and see the A4 result on the other. Downloads work on modern Android and iPhone browsers.",
  },
  {
    question: "Can I change the template after I fill in my details?",
    answer: "Yes, at any time. Your details stay exactly as they are when you switch. You can also pick a different colour for most templates.",
  },
  {
    question: "Can I hide sections or add my own fields?",
    answer:
      "Yes. Every section except personal details can be switched off, and empty fields never appear in the final biodata. Use Additional information to add your own label and value pairs, such as a marriage plan or family background.",
  },
  {
    question: "What if my biodata is longer than one page?",
    answer:
      "The preview shows where each page starts. The PDF is split into A4 pages, cutting between rows and paragraphs rather than through them. PNG and JPEG exports of a long biodata come out as one tall image.",
  },
  {
    question: "Can I select and copy text from the PDF?",
    answer:
      "The Download PDF button creates a high resolution page image inside the PDF, so text is not selectable. If you need selectable text, choose Print or save as PDF and pick Save as PDF in your browser's print dialog.",
  },
  {
    question: "Can I type in Hindi or another language?",
    answer:
      "You can type in any language your keyboard supports. The text is drawn using a font available on your device, so the look of non-English text depends on your device's fonts. Preview before you download.",
  },
  {
    question: "What personal details should I share on a biodata?",
    answer:
      "Share what a family needs to start a conversation: name, age, education, work, family background and a contact number. Avoid ID numbers, bank details and a full street address. Our guide on sharing a biodata safely explains why.",
  },
];
