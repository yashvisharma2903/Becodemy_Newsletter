'use client';
import { ICONS } from '@/shared/utils/icons';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react'
import Emaileditor from "@/shared/components/editor/email.editor";

const NewEmail = () => {

  const searchParams = useSearchParams();
  const subject: string = searchParams.get("subject")!;
  const subjectTitle = subject.replace(/-/g, " ");

  return (
    <div className="w-full flex bg-[#F7F7F7]">
      <div className="w-full p-5 bg-white rounded-r-xl">
        {/* back arrow */}
        <Link
          href={"/dashboard/write"}
          className="opacity-[.7] w-min flex text-xl items-center"
        >
          <span>{ICONS.backArrow}</span>
          <span>Exit</span>
        </Link>
        {/* email editor */}
        <div className="my-5">
          <Emaileditor subjectTitle={subjectTitle as string} />
        </div>
      </div>
    </div>
  )
}

const Page = () => {
  return (
    <Suspense>
      <NewEmail />
    </Suspense>
  )
}


export default Page
