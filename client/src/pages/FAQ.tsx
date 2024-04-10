import {
  Accordion,
  AccordionContent,
  AccordionHeading,
  AccordionItem,
} from "@/components/general/Accordion";
import imageFAQ from "/assets/faq-image.png";

const accordionItemList = [
  {
    title: "How can I track my journey?",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat.",
  },
  {
    title: "Can’t I just give my self points without doing the tasks?",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat.",
  },
  {
    title: "How can I track my journey?",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat.",
  },
  {
    title: "How can I track my journey?",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat.",
  },
];

export default function FAQ() {
  return (
    <main className="mt-24 flex flex-col items-center justify-center">
      <img src={imageFAQ} alt="" className="w-[30rem]" />
      <p className="text-light mt-4">FAQ</p>
      <h1 className="text-darkest text-xl">Frequently Asked Questions.</h1>
      <p className="text-lighter max-w-[20rem] leading-6 mt-4 mb-12">
        Stuck or confused? here are a list of the few most asked questions about
        our application!
      </p>
      <Accordion className="divide-y-[1px] divide-lighter mb-12">
        {accordionItemList.map((item, i) => (
          <AccordionItem
            itemKey={`${item.title}${i}`}
            key={`${item.title}${item.content}`}
          >
            <AccordionHeading>
              <div className="flex gap-4">
                <p className="text-lighter">{`${i + 1 < 10 ? "0" : ""}${
                  i + 1
                }`}</p>
                <p>{item.title}</p>
              </div>
            </AccordionHeading>
            <AccordionContent className="text-light leading-[175%]">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  );
}
