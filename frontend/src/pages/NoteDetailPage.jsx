import React from "react";
import { useParams } from "react-router";

const NoteDetailPage = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Notes id: {id}</h1>
    </div>
  );
};

export default NoteDetailPage;
