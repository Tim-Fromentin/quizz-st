import { useState } from "react";
import '../styles/global.css'

const QUESTIONS = [
    {
        id: 1,
        question: "Que signifie l'acronyme PWA ?",
        choices: ["Progressive Web Application", "Public Web App", "Private Web API", "Professional Web Application"],
        answerIndex: 0,
    },
    {
        id: 2,
        question: "Quel fichier est indispensable pour definir une PWA ?",
        choices: ["robots.txt", "manifest.txt", "manifest.json", "package.json"],
        answerIndex: 2,
    },
    {
        id: 3,
        question: "Quel élément permet d'installer une PWA sur l'écran d'accueil ?",
        choices: ["manifest.json", "service-worker.js", "index.html", "favicon.ico"],
        answerIndex: 0,
    },
    {
        id: 4,
        question: "Quelle API est principalement utilisé pour gérer le cache hors ligne ?",
        choices: ["Cache API", "WebSocket API", "Geolocation API", "IndexedDB API"],
        answerIndex: 0,
    },
    {
        id: 5,
        question: "Quel est le rôle principale d'un service worker ?",
        choices: ["Améliorer le SEO", "Intercepter les requêtes réseau et gerer le cache", "Optimiser le CSS", "Compliler le JavaScript"],
        answerIndex: 1,
    },
    {
        id: 6,
        question: "Quelle APU est souvant utilisée pour stocker de grandes quantités de données dans une PWA ?",
        choices: ["LocalStorage", "SessionStorage", "IndexedDB", "Cookies"],
        answerIndex: 2,
    },
    {
        id: 7,
        question: "Quel événement est déclenché quand un service worker est mis à jour et prêt à remplacer l’ancien ?",
        choices: ["install", "activate", "fetch", "updatefound"],
        answerIndex: 1,
    },
    {
        id: 8,
        question: "Quelle méthode du Cache API permet de répondre avec une ressource stockée localement ?",
        choices: ["cache.match()", "cache.put()", "cache.add()", "cache.delete()"],
        answerIndex: 0,
    },
    {
        id: 9,
        question: "Dans un manifeste de PWA, quelle propriété définit la couleur de la barre de navigation sur mobile ?",
        choices: ["background_color", "theme_color", "display", "orientation"],
        answerIndex: 1,
    },
    {
        id: 10,
        question: "Une PWA peut-elle accéder directement au système de fichiers natif (hors File System Access API expérimentale) ?",
        choices: ["Oui", "Non", "Seulement sur Android", "Seulement en HTTPS"],
        answerIndex: 1,
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
    const [locked, setLocked] = useState(false);

    const current = QUESTIONS[index];

    function handleAnswer(choiceIndex) {
        if (locked) return;
        setLocked(true);
        setAnswers(prev => ({ ...prev, [current.id]: choiceIndex }));
        if (index + 1 < QUESTIONS.length) {
            setTimeout(() => {
                setIndex(i => i + 1);
                setLocked(false);
            }, 0);
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

    const score = QUESTIONS.reduce((acc, q) => {
        return acc + (answers[q.id] === q.answerIndex ? 1 : 0);
    }, 0);

    return (
        <section className="quiz-container">
            {/*<h1 className="quiz-title">Quiz React</h1>*/}

            {!started ? (
                <div className="quiz-start">
                    <p className="quiz-intro">Prêt à tester tes connaissances ?</p>
                    <Button className="quiz-start-button" onClick={() => setStarted(true)}>
                        Commencer le quiz
                    </Button>
                </div>
            ) : !finished ? (
                <div className="quiz-question-block">
                    <div className="question_header">
                        <h3>Étapes {index + 1}/{QUESTIONS.length}</h3>
                        <h2 className="quiz-question">{current.question}</h2>
                        <h4>Sélectionnez une réponse</h4>
                    </div>
                    <div className="quiz-choices">
                        <img src="./assets/imgs/header.png" alt=""/>
                        {current.choices.map((choice, i) => (
                            <button
                                key={i}
                                className="quiz-choice"
                                onClick={() => handleAnswer(i)}
                                disabled={locked}
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
        </section>
    );
}
