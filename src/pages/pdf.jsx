import { useLocation } from "umi";
import { useState, useEffect } from "react";
import { Spin } from "antd";

const PdfViewer = () => {
  const location = useLocation();
  const { url } = location.state || {};
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const objectElement = document.querySelector('object');
    if (objectElement) {
      objectElement.addEventListener('load', () => setLoading(false));
    }
  }, [url]);

  return (
    <div
      style={{
        border: "1px solid rgba(0, 0, 0, 0.3)",
        height: "750px",
        position: "relative",
      }}
    >
      {loading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Spin />
        </div>
      )}
      <object
        data={url}
        type="application/pdf"
        width="100%"
        height="100%"
        onLoad={() => setLoading(false)}
      ></object>
    </div>
  );
};

export default PdfViewer;
