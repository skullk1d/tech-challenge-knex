import React, { useState, useEffect } from "react";

type Props = {
  url: string;
};

const AsyncImage: React.FC<Props> = (props: Props) => {
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { url } = props;

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

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : imageData ? (
        <img src={url} alt="Fetched Image" />
      ) : (
        <p>No image available.</p>
      )}
    </div>
  );
};

export default AsyncImage;
