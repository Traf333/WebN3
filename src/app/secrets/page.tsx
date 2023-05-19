async function fetchSecret(): Promise<{ secret: string, user: any }> {
  // await new Promise(resolve => setTimeout(resolve, 3000)); // 3 sec
  const res = await fetch('http://localhost:3000/api/v1/secret');

  return await res.json();
}

export default async function SecretPage() {
  const { secret, user } = await fetchSecret();
  return (
    <div>
      Hover to see your secret: {JSON.stringify(user)}
      <span
        className="text-transparent font-black hover:text-slate-800 ml-4 px-4 bg-slate-800 hover:bg-transparent select-none">
        {secret}
      </span>
    </div>
  );
}
