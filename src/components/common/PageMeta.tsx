import { Helmet } from "react-helmet-async";
import { useEffect } from "react";

export const PageMeta = ({ title, description }: { title: string; description: string }) => {
  useEffect(() => {
    document.title = title; // 🔥 Coba set title secara manual
  }, [title]);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};