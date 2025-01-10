"use client";

import { UploadDropzone } from "@/lib/uploadthing";

import "@uploadthing/react/styles.css";
import { FileIcon, X } from "lucide-react";

import Image from "next/image";
import * as React from "react";

interface FileUploadProps {
  onChange: (file?: { url: string; type: string }) => void;
  value: { url: string; type: string };
  endpoint: "messageFile" | "serverImage";
}

const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  if (value.url && value.type !== "application/pdf") {
    // = png, jpg, gif, ...
    return (
      <div className="relative h-20 w-20">
        <Image fill src={value.url} alt="Upload" className="rounded-full" />
        <button
          onClick={() => onChange({ url: "", type: "" })}
          className="bg-rose-500 text-white p1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  if (value.url && value.type === "application/pdf") {
    return (
      <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
        <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
        <a
          href={value.url}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline truncate w-[20rem] text-ellipsis whitespace-nowrap"
        >
          {value.url}
        </a>
        <button
          onClick={() => onChange({ url: "", type: "" })}
          className="bg-rose-500 text-white p1 rounded-full absolute -top-2 -right-2 shadow-sm "
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange({ url: res?.[0].url, type: res?.[0].type });
      }}
      onUploadError={(error: Error) => {
        console.error(error);
      }}
    />
  );
};

export default FileUpload;
