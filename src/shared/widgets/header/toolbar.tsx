"use client"

import { useUser } from "@auth0/nextjs-auth0/client";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

import React from "react";
import { BiUserCircle } from "react-icons/bi";

const Toolbar = () => {
  const { user } = useUser();
  return (
    <>
      <Button color="primary" className="text-lg">
        Start Trial
      </Button>
      {user ? (
        <Link href={"/dashboard"}>
          {user.picture && (
            <Image
              src={user?.picture}
              alt=""
              width={40}
              height={40}
              className="rounded-full"
            />
          )}
        </Link>
      ) : (
        <Button color="success" className="bg-white text-lg">
          <a href="/api/auth/login">Login</a>
        </Button>
      )}
    </>
  );
};

export default Toolbar;
