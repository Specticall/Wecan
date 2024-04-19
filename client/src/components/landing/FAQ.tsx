import {
  Accordion,
  AccordionContent,
  AccordionHeading,
  AccordionItem,
} from "../general/Accordion";
import Button from "../general/Button";

const questions = [
  {
    question: "Do I need to pay for a subscription?",
    answer:
      "Currently, we have no plans of monetizing our application in a way that locks users out of certain features because we believe that mental health is something that should be accessible to anyone",
    icon: <i className="bx bxs-credit-card"></i>,
  },
  {
    question: "How can I access support resources?",
    answer:
      "We provide various support resources including online forums, FAQs, and direct support channels such as email or chat. You can access these resources through our website or within our application.",
    icon: <i className="bx bx-support"></i>,
  },
  {
    question: "Is my data secure?",
    answer:
      "Protecting your data is our top priority. We use industry-standard encryption protocols and follow best practices to ensure the security of your personal information.",
    icon: <i className="bx bx-lock"></i>,
  },
  {
    question: "What platforms are supported?",
    answer:
      "Our application is compatible with a wide range of platforms including iOS, Android, and web browsers. You can access our services from virtually any device with internet connectivity.",
    icon: <i className="bx bx-devices"></i>,
  },
  {
    question: "Can I use the application offline?",
    answer:
      "While some features may require an internet connection, many of our core functionalities can be accessed offline for your convenience. However, certain features may require periodic syncing with our servers.",
    icon: <i className="bx bx-wifi"></i>,
  },
  {
    question: "Do you offer discounts for students or non-profits?",
    answer:
      "Yes, we offer discounts for students and non-profit organizations as part of our commitment to making mental health resources accessible to everyone. Please contact our support team for more information on eligibility and pricing.",
    icon: <i className="bx bx-purchase-tag"></i>,
  },
];

export default function FAQ() {
  return (
    <div className="bg-white py-32">
      <section className="section grid grid-cols-2 gap-24">
        <Accordion className="gap-4">
          {questions.map((question) => (
            <AccordionItem
              key={question.question}
              itemKey={question.question}
              className="rounded-lg overflow-hidden border-[1px] border-white-soft px-8 hover:bg-white-soft transition-all duration-200"
            >
              <AccordionHeading>
                <div className="[&>i]:text-md text-light mr-4">
                  {question.icon}
                </div>
                <p className="flex-1">{question.question}</p>
              </AccordionHeading>
              <AccordionContent className="pr-16 text-light leading-md">
                {question.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <article className="flex flex-col items-start">
          <div className="px-8 py-2 bg-white-soft rounded-full text-dark">
            FAQ
          </div>
          <h2 className="mt-8 text-xl font-semibold max-w-[20rem]">
            Frequently Asked Questions.
          </h2>
          <p className="text-light mt-8 ">
            The mosk asked questions about our application summarized in short
            points.
          </p>

          <div className="bg-white-soft px-8 py-8 rounded-xl w-full mt-8">
            <h3 className="text-lg text-dark">Still Have Questions?</h3>
            <p className="text-light mt-4 mb-6 max-w-[20rem] leading-md">
              Can’t find answers to your question? Feel free to contact us
              through chat.
            </p>
            <Button className="w-full flex items-center justify-center gap-2">
              <i className="bx bxl-whatsapp text-lg"></i>
              Contact Us
            </Button>
          </div>
        </article>
      </section>
    </div>
  );
}
