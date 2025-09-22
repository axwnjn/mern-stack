import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import NoteCard from "../components/NoteCard";
import RateLimitedUI from "../components/RateLimitedUI";
import axios from "axios";
import { TableRowsSplit } from "lucide-react";
import toast from "react-hot-toast";

const HomePage = () => {
  const [isRateLimit, setIsRateLimit] = useState(false);
  const [notes, setNotes] = useState([]); // state untuk nampung hasil fetch dari db
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const result = await axios.get("http://localhost:5001/api/notes");
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
      {notes.length === 0 && !isRateLimit && <div>kosong</div>}

      {isLoading && (
        <p className="text-center mt-6 p-4 font-semibold text-lg">
          Loading Notes...
        </p>
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
