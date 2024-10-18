import { useLocation } from "umi";
import { useState, useEffect } from "react";
import { Spin } from "antd";

const PdfViewer = () => {
  const location = useLocation();
  const { url } = location.state || {};
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const iframe = document.getElementById("pdf-iframe");
    const handleLoad = () => setLoading(false);

    if (iframe) {
      iframe.addEventListener("load", handleLoad);
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener("load", handleLoad);
      }
    };
  }, [url]);

  return (
    <>
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Spin size="large" />
        </div>
      )}
      <iframe
        id="pdf-iframe"
        src={url}
        style={{
          position: "fixed",
          top: 100,
          left: 0,
          width: "100%",
          height: "100%",
          border: "none",
        }}
      />
    </>
  );
};

export default PdfViewer;
