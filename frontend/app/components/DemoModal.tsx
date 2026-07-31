"use client";

type DemoModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function DemoModal({
  isOpen,
  onClose,
}: DemoModalProps) {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

      <div className="w-[90%] max-w-2xl rounded-3xl bg-[#111111] border border-green-500/20 p-8">

        <h2 className="text-3xl font-bold text-green-400 mb-4">
          👋 Welcome to Crici AI
        </h2>

        <p className="text-gray-300 text-lg mb-8">
          This quick guide will show you how to use Crici AI in under a minute.
        </p>

        <div className="flex justify-between">

          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl border border-gray-700 hover:border-gray-500"
          >
            Close
          </button>

          <button
            className="px-6 py-3 rounded-xl bg-green-500 hover:bg-green-600 font-semibold"
          >
            Next →
          </button>

        </div>

      </div>

    </div>
  );
}