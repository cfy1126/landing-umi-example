import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useLocation } from "umi";
import { Spin } from "antd";
import "./pdf.less";
pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.js`;

export default function PdfViewer() {
  const location = useLocation();
  let { url } = location.state || {};
  const newUrl = new URL(url);
  let filePath = `/api${newUrl.pathname}`;
  if (process.env.NODE_ENV === "production") {
    filePath = url;
  }

  // PDF 页数相关的状态
  const [numPages, setNumPages] = useState(null);
  const [loading, setLoading] = useState(true);

  // 处理 PDF 加载
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setLoading(false);
  }

  return (
    <div className="pdf-viewer-container">
      <Spin spinning={loading}>
        <Document
          file={filePath}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={() => setLoading(false)}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </Document>
      </Spin>
    </div>
  );
}
