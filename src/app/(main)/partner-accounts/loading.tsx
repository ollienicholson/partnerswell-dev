// app/partner-accounts/loading.tsx

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="loader-container">
        <div className="loader"></div>
      </div>
      <p>Loading partner accounts...</p>
    </div>
  );
}
