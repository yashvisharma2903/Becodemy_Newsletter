'use client'
import { GetEmailDetails } from "@/actions/get.email-details";
import { saveEmail } from "@/actions/save.email";
import sendEmailToSubscribers from "@/actions/send.mail";
import { DefaultJsonData } from "@/assets/fonts/mails/default";
import { useUser } from "@auth0/nextjs-auth0/client"
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import EmailEditor , { EditorRef, EmailEditorProps} from "react-email-editor";
import toast from "react-hot-toast";



const Emaileditor = ({ subjectTitle }: { subjectTitle: string }) => {

    const [loading, setLoading] = useState(true);
    const [jsonData, setJsonData] = useState<any | null>(DefaultJsonData);
    const {user} = useUser();
    const history = useRouter();
    const emailEditorRef = useRef<EditorRef>(null);
     
    const exportHtml = () => {
      const unlayer = emailEditorRef.current?.editor;
  
      unlayer?.exportHtml(async (data) => {
        const { design, html } = data;
        setJsonData(design);
        await sendEmailToSubscribers(subjectTitle, html).then((res) => {
          toast.success("Email sent successfully!");
          history.push("/dashboard/write");
        }).catch((error) => {
          toast.error("Error sending email.");
          console.error("Error:", error);
        });
      });
    };
      useEffect(() => {
        getEmailDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [user]);

      const onReady: EmailEditorProps["onReady"] = () => {
        const unlayer: any = emailEditorRef.current?.editor;
        unlayer.loadDesign(jsonData);
      };

      const saveDraft = async () => {
        const unlayer = emailEditorRef.current?.editor;
    
        unlayer?.exportHtml(async (data) => {
          const { design } = data;
          await saveEmail({
            title: subjectTitle,
            content: JSON.stringify(design),
            newsLetterOwnerId: user?.sid as string,
          }).then((res: any) => {
            toast.success(res.message);
            history.push("/dashboard/write");
          });
        });
      };

      const getEmailDetails = async () => {
        await GetEmailDetails({
          title: subjectTitle,
          newsLetterOwnerId : user?.sid as string,
        }).then((res: any) => {
          if (res) {
            setJsonData(JSON.parse(res?.content));
          }
          setLoading(false);
        });
      };

  return (
    <>
      {!loading && (
        <div className="w-full h-[90vh] relative">
          <EmailEditor
            minHeight={"80vh"}
            ref={emailEditorRef}
            onReady={onReady}
          />
          <div className="absolute bottom-0 flex items-center justify-end gap-4 right-0 w-full border-t p-3">
            <Button
              className="bg-transparent cursor-pointer flex items-center gap-1 text-black border border-[#00000048] text-lg rounded-lg"
              onClick={saveDraft}
            >
              <span className="opacity-[.7]">Save Draft</span>
            </Button>
            <Button
              className="bg-[#000] text-white cursor-pointer flex items-center gap-1 border text-lg rounded-lg"
              onClick={exportHtml}
            >
              <span>Send</span>
            </Button>
          </div>
        </div>
      )}
    </>
    
  )
}

export default Emaileditor