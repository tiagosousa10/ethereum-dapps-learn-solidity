// Reusable wallet connection button component
export default function ConnectWalletButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick} // Trigger wallet connection modal
      className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition focus:outline-none"
    >
      Connect Wallet
    </button>
  );
}
