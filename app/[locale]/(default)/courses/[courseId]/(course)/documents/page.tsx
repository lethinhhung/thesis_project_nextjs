"use client";

import { useRef, useState } from "react";

import { Document } from "@/interfaces/document";
import SortButton from "@/components/sort-button";
import { Button } from "@/components/ui/button";
import DocumentPreviewMobile from "@/components/document-preview-mobile";
import { DocumentCard } from "@/components/document-card";
import { scrollToTabTop } from "@/lib/scrollToTabTop";

const documents: Document[] = [];

function Documents() {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );
  const tabTop = useRef<HTMLDivElement>(null);
  const [openDocumentPreview, setOpenDocumentPreview] = useState(false);
  const handleDocumentSelect = (document: Document) => {
    setSelectedDocument(document);
    setOpenDocumentPreview(true);
  };

  const fetchDocuments = () => {};

  scrollToTabTop(tabTop, 116);
  return (
    <div className="w-full flex p-2 md:p-4 flex-col gap-4" ref={tabTop}>
      <div className="w-full flex justify-between items-center sticky top-16">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Documents ({documents.length})
        </h4>
        <div className="flex gap-2 items-center">
          <SortButton variant={"secondary"} />

          <Button>new</Button>
        </div>
      </div>

      <DocumentPreviewMobile
        open={openDocumentPreview}
        onOpenChange={setOpenDocumentPreview}
        document={selectedDocument}
        fetchDocuments={fetchDocuments}
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

export default Documents;
