export default function SettingsModal({ onClose }) {
  const slippage = 0.5;
  const deadline = 20;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 w-80">
        <h3 className="text-lg font-semibold mb-4">Settings</h3>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">
              Slippage Tolerance (%)
            </label>
            <div className="mt-1 w-full border border-gray-300 rounded-lg p-2 bg-gray-50 text-gray-700">
              {slippage}% (Fixed)
            </div>
          </div>
          
          <div>
            <label className="text-sm text-gray-600">
              Transaction Deadline (mins)
            </label>
            <div className="mt-1 w-full border border-gray-300 rounded-lg p-2 bg-gray-50 text-gray-700">
              {deadline} minutes (Fixed)
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:underline"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
