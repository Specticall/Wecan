import { TMood } from "@/context/MoodContext";
import { wait } from "@/lib/utils";

export const taskData = {
  Ecstatic: [
    {
      id: "ecstatic-task-1",
      title: "Take a stroll outside your house",
      points: 2500,
      description:
        "Going for a leisurely walk is a great way to ease your mind of any stress accumulated from work or tasks.",
    },
    {
      id: "ecstatic-task-2",
      title: "Try a new recipe",
      points: 3000,
      description:
        "Cooking a new dish can be a fun and rewarding experience, especially when you're feeling ecstatic.",
    },
    {
      id: "ecstatic-task-3",
      title: "Have a dance party",
      points: 2000,
      description:
        "Put on your favorite music and dance like nobody's watching to celebrate your ecstatic mood.",
    },
  ],
  Happy: [
    {
      id: "happy-task-1",
      title: "Try a new hobby",
      points: 2000,
      description:
        "Doing something you love or trying out a new hobby can boost your mood and make you feel happier.",
    },
    {
      id: "happy-task-2",
      title: "Write a gratitude journal",
      points: 1500,
      description:
        "Take a moment to reflect on the things you're grateful for and write them down to enhance your happiness.",
    },
    {
      id: "happy-task-3",
      title: "Spend time with loved ones",
      points: 2500,
      description:
        "Being around people you care about can bring joy and happiness to your day.",
    },
  ],
  Neutral: [
    {
      id: "neutral-task-1",
      title: "Read a book",
      points: 1500,
      description:
        "Reading a book can be a good way to relax and unwind, especially if you're feeling neutral or indifferent.",
    },
    {
      id: "neutral-task-2",
      title: "Take a nature walk",
      points: 2000,
      description:
        "Immerse yourself in nature and enjoy the calming effects of a peaceful walk.",
    },
    {
      id: "neutral-task-3",
      title: "Try meditation",
      points: 1000,
      description:
        "Practice mindfulness and meditation to find inner peace and balance.",
    },
  ],
  Sad: [
    {
      id: "sad-task-1",
      title: "Listen to your favorite music",
      points: 1000,
      description:
        "Listening to music, especially your favorite songs, can help lift your mood when you're feeling sad.",
    },
    {
      id: "sad-task-2",
      title: "Write in a journal",
      points: 1500,
      description:
        "Express your emotions and thoughts by writing them down in a journal.",
    },
    {
      id: "sad-task-3",
      title: "Watch a heartwarming video",
      points: 1200,
      description:
        "Find a touching video or movie scene that can bring tears of joy to your eyes.",
    },
  ],
  Depressed: [
    {
      id: "depressed-task-1",
      title: "Watch a movie",
      points: 500,
      description:
        "Watching a movie, especially a comedy or a feel-good film, can help distract you from negative thoughts and improve your mood.",
    },
    {
      id: "depressed-task-2",
      title: "Practice self-care",
      points: 1000,
      description:
        "Take care of yourself by engaging in activities that promote relaxation and well-being.",
    },
    {
      id: "depressed-task-3",
      title: "Reach out to a friend",
      points: 800,
      description:
        "Share your feelings with a trusted friend and seek support during difficult times.",
    },
  ],
} as const;

export async function generateTask(
  mood?: TMood,
  currentDisplayedTask?: string
) {
  const taskPool = mood ? taskData[mood] : Object.values(taskData).flat();

  const filteredTaskPool = currentDisplayedTask
    ? taskPool.filter((task) => task.id !== currentDisplayedTask)
    : taskPool;

  await wait(2000);

  return filteredTaskPool[Math.floor(Math.random() * filteredTaskPool.length)];
}
