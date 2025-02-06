import React, { useEffect, useState } from "react";

function QuestionList({ questions, onDeleteQuestion }) {
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            {question.prompt}
            <button onClick={() => onDeleteQuestion(question.id)}>Delete Question</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;


