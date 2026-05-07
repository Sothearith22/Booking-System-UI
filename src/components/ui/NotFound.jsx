import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.4em] text-cyan-300">
          Error 404
        </p>
        <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
          Page not found
        </h1>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
          >
            Go to home
          </Link>
          <Link
            to="/login"
            className="rounded-full border border-slate-700 px-6 py-3 text-sm font-bold text-white transition hover:border-slate-500 hover:bg-slate-900"
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
