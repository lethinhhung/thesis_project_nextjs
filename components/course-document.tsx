"use client";

import { useState } from "react";
import DocumentPreview from "./document-preview";
import SortButton from "./sort-button";
import { Button } from "./ui/button";
import { DocumentCard } from "./document-card";
import { Document } from "@/interfaces/document";

function CourseDocument({ documents }: { documents: Document[] }) {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );
  const [openDocumentPreview, setOpenDocumentPreview] = useState(false);
  const handleDocumentSelect = (document: Document) => {
    setSelectedDocument(document);
    setOpenDocumentPreview(true);
  };

  const fetchDocuments = () => {};
  return (
    <div className="w-full flex p-2 md:p-4 flex-col gap-4">
      <div className="w-full flex justify-between items-center sticky top-16">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Documents ({documents.length})
        </h4>
        <div className="flex gap-2 items-center">
          <SortButton variant={"secondary"} />

          <Button>new</Button>
        </div>
      </div>

      <DocumentPreview
        open={openDocumentPreview}
        onOpenChange={setOpenDocumentPreview}
        document={selectedDocument}
        fetchDocuments={fetchDocuments}
        responsive={false}
      />

      <div className="w-full flex grid grid-cols-1 sm:px-2 md:grid-cols-2 2xl:grid-cols-3 gap-4">
        {documents.map((document, index) => (
          <DocumentCard
            className="col-span-1"
            key={index}
            document={document}
            onClick={() => {
              handleDocumentSelect(document);
            }}
          />
        ))}
      </div>
    </div>
  );
}
export default CourseDocument;
