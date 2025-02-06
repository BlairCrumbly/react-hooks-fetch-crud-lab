import React, { useEffect, useState } from "react";

function QuestionList({ questions, onDeleteQuestion, onUpdateQuestion }) {
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <p>{question.prompt}</p>
            <label>
              Correct Answer:
              <select
                value={question.correctIndex}
                onChange={(e) => onUpdateQuestion(question.id, parseInt(e.target.value))}
              >
                {question.answers.map((answer, index) => (
                  <option key={index} value={index}>
                    {answer}
                  </option>
                ))}
              </select>
            </label>
            <button onClick={() => onDeleteQuestion(question.id)}>Delete Question</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
