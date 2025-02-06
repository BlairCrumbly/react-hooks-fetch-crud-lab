import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("Form");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  function handleDeleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, { method: "DELETE" })
      .then(() => {
        setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== id));
      })
      .catch((error) => console.error("Error deleting question:", error));
  }

  function handleAddQuestion(newQuestion) {
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuestion),
    })
      .then((response) => response.json())
      .then((addedQuestion) => {
        setQuestions((prevQuestions) => [...prevQuestions, addedQuestion]); // Update state
      })
      .catch((error) => console.error("Error adding question:", error));
  }

  function handleUpdateQuestion(id, newCorrectIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    })
      .then((response) => response.json())
      .then((updatedQuestion) => {
        setQuestions((prevQuestions) =>
          prevQuestions.map((q) =>
            q.id === id ? { ...q, correctIndex: updatedQuestion.correctIndex } : q
          )
        );
      })
      .catch((error) => console.error("Error updating question:", error));
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateQuestion={handleUpdateQuestion}
        />
      )}
    </main>
  );
}

export default App;