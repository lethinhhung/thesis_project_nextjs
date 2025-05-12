"use client";

import { useEffect, useRef, useState } from "react";
import { Document as DocumentInterface } from "@/interfaces/document";
// import SortButton from "@/components/sort-button";
import { DocumentCard } from "@/components/document-card";
import { scrollToTabTop } from "@/lib/scrollToTabTop";
import { CreateNewSmall } from "@/components/create-new-small";
import { useParams } from "next/navigation";
import { processResponse } from "@/lib/response-process";
import { DocumentCardSkeleton } from "@/components/skeleton/document-skeleton";
import DocumentPreview from "@/components/document-preview";

function Documents() {
  const [isLoading, setIsLoading] = useState(true);
  const [documents, setDocuments] = useState<DocumentInterface[]>();
  const [selectedDocument, setSelectedDocument] =
    useState<DocumentInterface | null>(null);
  const tabTop = useRef<HTMLDivElement>(null);
  const [openDocumentPreview, setOpenDocumentPreview] = useState(false);
  const params = useParams();
  const courseId = params.courseId as string;

  const handleDocumentSelect = (document: DocumentInterface) => {
    setSelectedDocument(document);
    setOpenDocumentPreview(true);
  };

  const fetchDocuments = async () => {
    const res = await fetch(`/api/course/get-documents/${courseId}`, {
      method: "GET",
    });
    const response = await processResponse(res, {
      success: false,
      error: true,
    });

    if (response.success) {
      setDocuments(response.data);
    }
    console.log("Documents data:", response.data);
  };

  useEffect(() => {
    fetchDocuments()
      .then(() => setIsLoading(false))
      .then(() => scrollToTabTop(tabTop, 116));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full flex p-2 md:p-4 flex-col gap-4" ref={tabTop}>
      <div className="w-full flex justify-between items-center sticky top-16">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Documents ({documents?.length})
        </h4>
        <div className="flex gap-2 items-center">
          {/* <SortButton variant={"secondary"} /> */}

          <CreateNewSmall
            type="document"
            courseId={courseId}
            refetchData={fetchDocuments}
          />
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
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index: number) => (
            <DocumentCardSkeleton key={index} className="col-span-1" />
          ))
        ) : documents?.length == 0 ? (
          <div className="col-span-full min-h-50 flex justify-center items-center flex-col gap-2">
            <small className="text-sm font-medium leading-none">
              No documents found
            </small>
          </div>
        ) : (
          documents?.map((document, index) => (
            <DocumentCard
              className="col-span-1"
              key={index}
              document={document}
              onClick={() => {
                handleDocumentSelect(document);
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Documents;
