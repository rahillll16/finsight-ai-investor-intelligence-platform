function ConfirmationModal({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel
}) {

    if (!isOpen) return null;

    return (

        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

            <div className="bg-slate-900 border border-orange-500/30 rounded-2xl p-6 w-full max-w-md shadow-2xl">

                <h2 className="text-2xl font-bold text-white">
                    {title}
                </h2>

                <p className="mt-4 text-gray-400">
                    {message}
                </p>

                <div className="mt-8 flex justify-end gap-3">

                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>

    );
}

export default ConfirmationModal;