import React, { useState, useEffect, useCallback } from "react";
import styles from "./styles.module.css";

type Props = {
  url: string;
};

const AsyncImage: React.FC<Props> = (props: Props) => {
  /* const [imageData, setImageData] = useState<ImageData | null>(null); */
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const { url } = props;

  const onLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
  }, []);

  const onError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [url]);

  // NOTE: Can alternatively use below routine depending on host cross-origin policy
  /*
	useEffect(() => {
    const fetchImage = async () => {
      if (url) {
        try {
          const response = await fetch(url);
          const data = await response.json();

          setImageData(data);
        } catch (error) {
          console.error("Error fetching image:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    setIsLoading(true);
    fetchImage();
  }, [url]);
	*/

  return (
    <div
      className={`${isLoading ? styles.loading : ""} ${
        hasError ? styles.error : ""
      }`}
    >
      <img onLoad={onLoad} onError={onError} src={url} alt="Fetched Image" />

      {/* overlays */}
      <p className={styles["overlay-loading"]}>Loading...</p>
      <p className={styles["overlay-error"]}>No image available.</p>
    </div>
  );
};

export default AsyncImage;
