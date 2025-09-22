import NavBar from "../components/NavBar";
import NoteCard from "../components/NoteCard";
import RateLimitedUI from "../components/RateLimitedUI";
import { Link } from "react-router";

import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import api from "../../lib/axios";

const HomePage = () => {
  const [isRateLimit, setIsRateLimit] = useState(false);
  const [notes, setNotes] = useState([]); // state untuk nampung hasil fetch dari db
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const result = await api.get("/notes");
        setNotes(result.data);
        setIsRateLimit(false);
        console.log(result.data);
      } catch (error) {
        console.log("error fetching notes");
        console.log(error.response?.status);
        if (error.response?.status === 429) {
          setIsRateLimit(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <NavBar />
      {isRateLimit && <RateLimitedUI />}

      {isLoading && (
        <p className="text-center mt-6 p-4 font-semibold text-lg">
          Loading Notes...
        </p>
      )}
      {notes.length === 0 && !isRateLimit && (
        <div className="text-center ">
          <p className=" mt-6 p-4 font-semibold text-lg">Empty</p>
          <Link to={"/create"}>
            <button className="btn btn-secondary ">create</button>
          </Link>
        </div>
      )}
      <div className="mx-auto max-w-7xl p-4 mt-6">
        {notes.length > 0 && !isRateLimit && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((n) => (
              <NoteCard key={n._id} n={n} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
