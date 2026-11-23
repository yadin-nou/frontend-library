import { useState } from "react";
import Button from "react-bootstrap/Button";
import { Clipboard, Check2 } from "react-bootstrap-icons";
import { FaRegCopy } from "react-icons/fa";
const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <Button
      variant={copied ? "success" : ""}
      size="sm"
      onClick={handleCopy}
      aria-label={copied ? "Copied" : "Copy to clipboard"}
    >
      {copied ? (
        <Check2 size={16} />
      ) : (
        <FaRegCopy size={16} style={{ color: "blue" }} />
      )}
    </Button>
  );
};

export default CopyButton;
