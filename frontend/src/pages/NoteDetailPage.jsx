import { ArrowLeftIcon, Trash2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";

const NoteDetailPage = () => {
  const [note, setNote] = useState({ title: "", content: "" });
  const [save, setSave] = useState(false);

  const navigate = useNavigate(); // untuk navigasi antar halaman

  const { id } = useParams();

  useEffect(() => {
    //pake useEffect hook buat ambil id sesuai param dulu.
    const fetchNote = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/notes/${id}`);
        console.log(res.data);

        setNote(res.data);
        // console.log(note);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNote();
  }, [id]); // [id] trigger useEffect tiap id (url param) berubah

  const handleSave = async () => {
    try {
      setSave(true);
      await axios.put(`http://localhost:5001/api/notes/${id}`, note);
      toast.success("saved!");
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setSave(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5001/api/notes/${id}`);
      toast.success("Deleted ");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline"
            >
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered"
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  value={note.content}
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value })
                  }
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-32"
                />
              </div>

              <div className="card-actions justify-end">
                <button
                  onClick={handleSave}
                  disabled={save}
                  className=" btn btn-secondary"
                >
                  {save ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
