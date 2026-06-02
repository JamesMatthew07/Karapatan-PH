import { Link } from "@/src/components/ui/Link";

export default function NotFound() {
  return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-gray-600 mb-6">Hindi nahanap ang pahinang ito. / Page not found.</p>
      <Link
        href="/fil"
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        ← Bumalik sa home
      </Link>
    </div>
  );
}
