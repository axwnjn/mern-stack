import React from "react";
import { Link } from "react-router";
import { PlusIcon } from "lucide-react";

const NavBar = () => {
  return (
    <header className="border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-secondary font-mono tracking-tighter">
            ThinkBoard
          </h1>
          <div className="flex items-center gap-4">
            <Link
              to={"/frontend/src/pages/CreatePage.jsx"}
              className="btn btn-secondary"
            >
              <PlusIcon className="size-5" />
              <span>New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
