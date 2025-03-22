"use client";

import { getSubscribers } from "@/actions/get.subscribers";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";

const useSubscribersData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useUser();

  useEffect(() => {
    GetSubscribers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const GetSubscribers = async () => {
    await getSubscribers({ newsLetterOwnerId: user?.sid as string })
      .then((res: any) => {
        setData(res);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  return { data, loading };
};

export default useSubscribersData;
