import { useState } from "react";

const QUESTIONS = [
    {
        id: 1,
        question: "Quelle méthode React permet de mémoriser une valeur calculée ?",
        choices: ["useEffect", "useMemo", "useState", "useRef"],
        answerIndex: 1,
    },
    {
        id: 2,
        question: "Quel hook est utilisé pour gérer l’état local ?",
        choices: ["useReducer", "useLayoutEffect", "useState", "useId"],
        answerIndex: 2,
    },
];

function Button({ children, onClick, className }) {
    return (
        <button className={`btn ${className || ""}`} onClick={onClick}>
            {children}
        </button>
    );
}

export default function Quiz() {
    const [started, setStarted] = useState(false);
    const [index, setIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [finished, setFinished] = useState(false);

    const current = QUESTIONS[index];

    function handleAnswer(choiceIndex) {
        setAnswers({ ...answers, [current.id]: choiceIndex });
        if (index + 1 < QUESTIONS.length) {
            setIndex(index + 1);
        } else {
            setFinished(true);
        }
    }

    function resetQuiz() {
        setStarted(false);
        setIndex(0);
        setAnswers({});
        setFinished(false);
    }

    const score = Object.entries(answers).reduce((acc, [id, ans]) => {
        const q = QUESTIONS.find((q) => q.id === Number(id));
        return acc + (q && q.answerIndex === ans ? 1 : 0);
    }, 0);

    return (
        <div className="quiz-container">
            <h1 className="quiz-title">Quiz React</h1>

            {!started ? (
                <div className="quiz-start">
                    <p className="quiz-intro">Prêt à tester tes connaissances ?</p>
                    <Button className="quiz-start-button" onClick={() => setStarted(true)}>
                        Commencer le quiz
                    </Button>
                </div>
            ) : !finished ? (
                <div className="quiz-question-block">
                    <h2 className="quiz-question">{current.question}</h2>
                    <div className="quiz-choices">
                        {current.choices.map((choice, i) => (
                            <button
                                key={i}
                                className="quiz-choice"
                                onClick={() => handleAnswer(i)}
                            >
                                {choice}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="quiz-results">
                    <h2 className="quiz-results-title">Résultats</h2>
                    <p className="quiz-score">
                        Score : {score} / {QUESTIONS.length}
                    </p>
                    <div className="quiz-results-list">
                        {QUESTIONS.map((q) => {
                            const userChoice = answers[q.id];
                            const correct = userChoice === q.answerIndex;
                            return (
                                <div key={q.id} className={`quiz-result-item ${correct ? "correct" : "wrong"}`}>
                                    <p className="quiz-result-question">{q.question}</p>
                                    <p className="quiz-result-user">Votre réponse : {q.choices[userChoice] ?? "—"}</p>
                                    <p className="quiz-result-correct">Bonne réponse : {q.choices[q.answerIndex]}</p>
                                    <p className="quiz-result-icon">{correct ? "✔️" : "❌"}</p>
                                </div>
                            );
                        })}
                    </div>
                    <Button className="quiz-restart-button" onClick={resetQuiz}>
                        Rejouer
                    </Button>
                </div>
            )}
        </div>
    );
}
