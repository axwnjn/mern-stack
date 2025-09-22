import React, { useState } from "react";
import { Link } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const CreatePage = () => {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title && !content) {
      toast.error("perlu diisi!");
      return;
    }

    try {
      await axios.post("http://localhost:5001/api/notes", {
        title: title,
        content: content,
      });
      toast.success("Note created successfully!");
      setTitle("");
      setContent("");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered"
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered h-32"
                  />
                </div>

                <div className="card-actions justify-end">
                  <button type="submit" className="btn btn-secondary">
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
