import React, { useState } from "react";
import styles from "./Quiz.module.css"; 

interface Question {
  question: string;
  answers: string[];
  correct: number;
}

const questions: Question[] = [
  {
    question: "Столиця України?",
    answers: ["Львів", "Одеса", "Київ", "Чернігів"],
    correct: 3,
  },
  {
    question: "Столиця США?",
    answers: ["Вашингтон", "Чикаго", "Нью-Йорк", "Майамі"],
    correct: 1,
  },
  {
    question: "Столиця Іспанії?",
    answers: ["Валенсія", "Гранада", "Барселона", "Мадрид"],
    correct: 4,
  },
  {
    question: "Столиця Італії?",
    answers: ["Рим", "Венеція", "Неаполь", "Турин"],
    correct: 1,
  },
];

const Quiz: React.FC = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(Number(event.target.value));
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    if (selectedAnswer === questions[questionIndex].correct) {
      setScore(score + 1);
    }

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setSelectedAnswer(null);
    } else {
      setFinished(true);
    }
  };

  const restartQuiz = () => {
    setQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setFinished(false);
  };

  return (
    <div className={styles.test}>
      {finished ? (
        <>
          <h2 className={styles.header}>
            Це було останнє питання! Ви набрали {score} балів.
          </h2>
          <button className={styles.submit} onClick={restartQuiz}>
            Почати знову
          </button>
        </>
      ) : (
        <>
          <div className={styles.header}>
            <h2 className={styles.title}>{questions[questionIndex].question}</h2>
          </div>
          <ul className={styles.list}>
            {questions[questionIndex].answers.map((answer, index) => (
              <li key={index}>
                <label>
                  <input
                    type="radio"
                    name="answer"
                    value={index + 1}
                    checked={selectedAnswer === index + 1}
                    onChange={handleAnswerChange}
                    className={styles.answer}
                  />
                  {answer}
                </label>
              </li>
            ))}
          </ul>
          <button className={styles.submit} onClick={handleNextQuestion}>
            Далі
          </button>
        </>
      )}
    </div>
  );
};

export default Quiz;
