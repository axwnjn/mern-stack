import React from "react";
import { Link } from "react-router";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { formatDate } from "../../lib/utils";
import axios from "axios";
import toast from "react-hot-toast";

const NoteCard = ({ n, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();

    if (!window.confirm("are you sure?")) return;

    try {
      await axios.delete(`http://localhost:5001/api/notes/${id}`);
      toast.success("Success deleting note");
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete");
    }
  };
  return (
    <Link
      to={`/note/${n._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 
      border-t-4 border-solid border-secondary"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{n.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{n.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(n.createdAt))}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button
              onClick={(e) => handleDelete(e, n._id)}
              className="btn btn-secondary btn-xs text-error"
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
