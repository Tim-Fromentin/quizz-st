import '../styles/global.css'

function Quizz() {
    const questions = [
        {
            "questionTitle": "What is your question?",
            "question": "What is your question?",
            "options": ['yes', 'no'],
            "answer": 'yes',
        },
        {
            "questionTitle": "Calcul",
            "question": "2 + 1",
            "options": ['1', '3'],
            "answer": '3',
        }
    ];
    let count = 0;
    return (
        <>
            <section id='s_quizz'>
                <p><span>1</span>/10</p>
                <h1>{questions[count].questionTitle}</h1>
                <p className="text_question">
                    {questions[count].question}                </p>

                <div className="box_answer">
                    <button className="btn_answer" key={'1'}>
                        Réponse 1
                    </button>
                </div>
            </section>
        </>
    );
}

export default Quizz;
