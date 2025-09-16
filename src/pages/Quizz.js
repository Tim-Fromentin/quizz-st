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
    let score = 3;
    return (
        <>
            <section id='s_quizz'>
                <p className={'step'}><span>1</span>/10</p>
                <h5 id={'score'} data-score={score}>Score : <span>{score}</span></h5>
                <h1>{questions[count].questionTitle}</h1>
                <p className="text_question">
                    {questions[count].question}                </p>



                <div className="box_answer">
                    {questions[count].options.map((option, index) => (
                        <button className="btn_answer" key={index}>
                            {option}
                        </button>
                    ))

                    }

                </div>

                <button disabled={'true'}>Passez à la question suivante</button>
            </section>
        </>
    );
}

export default Quizz;
