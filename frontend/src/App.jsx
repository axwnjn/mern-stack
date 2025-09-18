import React from "react";
import HomePage from "../pages/HomePage.jsx";
import CreatePage from "../pages/CreatePage.jsx";
import NoteDetailPage from "../pages/NoteDetailPage.jsx";
import { Routes, Route } from "react-router";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </>
  );
};

export default App;
