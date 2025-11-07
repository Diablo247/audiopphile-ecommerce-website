export default function TestEnvPage() {
  return (
    <div>
      <p>Convex URL: {process.env.NEXT_PUBLIC_CONVEX_URL}</p>
    </div>
  );
}
