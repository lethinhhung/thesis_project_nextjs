"use client";

import { DocumentCard } from "@/components/document-card";
import DocumentPreview from "@/components/document-preview";
import SearchBarWithTags from "@/components/search-bar-with-tags";
import { useEffect, useState } from "react";
import { Document } from "@/interfaces/document";
import { processResponse } from "@/lib/response-process";
import { DocumentCardSkeleton } from "@/components/skeleton/document-skeleton";
import { Button } from "@/components/ui/button";
import { Loader, RefreshCcw } from "lucide-react";

function Library() {
  const [isLoading, setIsLoading] = useState(true);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );
  const [openDocumentPreview, setOpenDocumentPreview] = useState(false);

  const handleDocumentSelect = (document: Document) => {
    setSelectedDocument(document);

    setOpenDocumentPreview(true);
  };

  const fetchDocuments = async () => {
    setOpenDocumentPreview(false);
    setIsLoading(true);
    setSelectedDocument(null);
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
    } else {
      setDocuments([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDocuments().then(() => setIsLoading(false));
  }, []);

  return (
    <div className="w-full h-[calc(100dvh-92px)] rounded-xl">
      <div className="w-full h-full rounded-xl columns-1 lg:columns-2">
        <div className="h-full w-full col-span-1 rounded-xl flex flex-col">
          <SearchBarWithTags placeholder="Search for documents" />
          <div className="py-2 w-full px-3 flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              {documents.length} document(s) found
            </p>
            <Button
              size={"sm"}
              onClick={() => fetchDocuments()}
              disabled={isLoading}
              variant={"ghost"}
            >
              {isLoading ? <Loader className="animate-spin" /> : <RefreshCcw />}
            </Button>
          </div>

          <div className="py-2 w-full grid grid-cols-1 2xl:grid-cols-2 gap-2 px-3 overflow-y-auto scrollbar">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, index: number) => (
                <DocumentCardSkeleton key={index} className="col-span-1" />
              ))
            ) : documents.length === 0 ? (
              <div className="col-span-full h-100 flex justify-center items-center">
                <small className="text-sm font-medium leading-none">
                  No documents found
                </small>
              </div>
            ) : (
              documents.map((document) => (
                <DocumentCard
                  className="col-span-1"
                  key={document._id}
                  document={document}
                  onClick={() => handleDocumentSelect(document)}
                />
              ))
            )}
          </div>
        </div>

        {!selectedDocument && (
          <div className="col-span-full h-full flex justify-center items-center border rounded-xl border-dashed ">
            <small className="text-sm font-medium leading-none">
              Select a document to view details
            </small>
          </div>
        )}

        <div className="w-full h-full hidden lg:flex col-span-1">
          <DocumentPreview
            open={openDocumentPreview}
            onOpenChange={setOpenDocumentPreview}
            document={selectedDocument}
            fetchDocuments={fetchDocuments}
            responsive={true}
          />
        </div>
      </div>
    </div>
  );
}

export default Library;
