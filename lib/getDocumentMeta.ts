export const getDocumentMeta = (fileName: string | null) => {
  if (!fileName) return { type: null, color: "gray" };

  const extension = fileName.split(".").pop()?.toLowerCase();

  const typeMap: Record<string, { type: string; color: string }> = {
    pdf: { type: "PDF", color: "red" },
    doc: { type: "Word", color: "blue" },
    docx: { type: "Word", color: "blue" },
    xls: { type: "Excel", color: "green" },
    xlsx: { type: "Excel", color: "green" },
    ppt: { type: "PowerPoint", color: "orange" },
    pptx: { type: "PowerPoint", color: "orange" },
    txt: { type: "Text", color: "gray" },
    md: { type: "Markdown", color: "gray" },
    rtf: { type: "Rich Text", color: "purple" },
  };

  return extension && typeMap[extension]
    ? typeMap[extension]
    : { type: "Unknown", color: "gray" };
};
