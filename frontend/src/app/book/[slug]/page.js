import BookingClient from "./BookingClient";

export default async function Page({ params }) {
  const resolvedParams = await params; // ✅ Next.js fix

  return <BookingClient slug={resolvedParams.slug} />;
}