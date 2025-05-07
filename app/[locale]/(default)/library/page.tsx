"use client";

import { DocumentCard } from "@/components/document-card";
import DocumentPreview from "@/components/document-preview";
import DocumentPreviewMobile from "@/components/document-preview-mobile";
import SearchBarWithTags from "@/components/search-bar-with-tags";
import { useEffect, useState } from "react";
import { Document } from "@/interfaces/document";
import { useIsTablet } from "@/hooks/use-tablet";
import { processResponse } from "@/lib/response-process";

function Library() {
  const [isLoading, setIsLoading] = useState(true);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );
  const [openDocumentPreview, setOpenDocumentPreview] = useState(false);
  const isTablet = useIsTablet();

  const handleDocumentSelect = (document: Document) => {
    setSelectedDocument(document);
    if (isTablet) {
      setOpenDocumentPreview(true);
      return;
    }
  };

  const fetchDocuments = async () => {
    setIsLoading(true);
    const res = await fetch(`/api/document/get-all`, {
      method: "GET",
    });
    const response = await processResponse(res, {
      success: false,
      error: false,
    });
    console.log("Documents data:", response);

    if (response.success) {
      setDocuments(response.data);
    }
  };

  useEffect(() => {
    fetchDocuments().then(() => setIsLoading(false));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-[calc(100dvh-92px)] rounded-xl">
      <div className="w-full h-full rounded-xl columns-1 lg:columns-2">
        <div className="h-full w-full col-span-1 rounded-xl flex flex-col">
          <SearchBarWithTags placeholder="Search for documents" />

          <div className="py-2 w-full grid grid-cols-1 2xl:grid-cols-2 gap-2 px-3 overflow-y-auto scrollbar">
            {documents.map((document) => (
              <DocumentCard
                className="col-span-1"
                key={document._id}
                document={document}
                onClick={() => handleDocumentSelect(document)}
              />
            ))}
          </div>
        </div>

        {isTablet && (
          <DocumentPreviewMobile
            open={openDocumentPreview}
            onOpenChange={setOpenDocumentPreview}
            document={selectedDocument}
            header={false}
          />
        )}

        <div className="w-full h-full hidden lg:flex col-span-1">
          <DocumentPreview document={selectedDocument} header={true} />
        </div>
      </div>
    </div>
  );
}

export default Library;
