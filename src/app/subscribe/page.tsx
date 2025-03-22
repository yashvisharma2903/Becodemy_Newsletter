"use client";
import { subscribe } from "@/actions/add.subscribe";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import toast from "react-hot-toast";

const Subscribe = () => {
  const [value, setValue] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const username: string = searchParams.get("username")!;
  console.log(username);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await subscribe({ email: value, username, user_id: user?.sid as string })
      .then((res) => {
        setLoading(false);
        if (res.error) {
          toast.error(res.error);
        } else {
          toast.success("You are successfully subscribed!");
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    setValue("");
  };

  return (
    <div className="w-full flex flex-col items-center justify-center h-screen">
      <div>
        <h1 className="text-7xl pb-8 capitalize">{username} Newsletter</h1>
      </div>
      <form
        className="flex w-full max-w-md border rounded overflow-hidden"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          type="email"
          name="email"
          required
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter your email"
          className="px-4 py-4 w-full text-gray-700 leading-tight focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-8 bg-blue-500 text-white font-bold py-4 rounded-r hover:bg-blue-600 focus:outline-none"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense>
      <Subscribe />
    </Suspense>
  );
};

export default Page;
