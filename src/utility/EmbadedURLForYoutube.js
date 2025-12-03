export const convertToEmbedUrl = (url) => {
  try {
    let videoId = "";

    // -------------------- YOUTUBE --------------------
    if (url.includes("youtu.be")) {
      videoId = url.split("youtu.be/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    if (url.includes("watch?v=")) {
      videoId = url.split("watch?v=")[1].split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    if (url.includes("/shorts/")) {
      videoId = url.split("/shorts/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    // -------------------- GOOGLE DRIVE --------------------
    if (url.includes("drive.google.com")) {
      // Match file/d/FILE_ID/
      let match = url.match(/\/d\/([^/]+)/);

      // If fileId is found → convert
      if (match && match[1]) {
        return `https://drive.google.com/file/d/${match[1]}/preview`;
      }

      // Match open?id=FILE_ID
      match = url.match(/open\?id=([^&]+)/);
      if (match && match[1]) {
        return `https://drive.google.com/file/d/${match[1]}/preview`;
      }

      // Match uc?id=FILE_ID
      match = url.match(/uc\?id=([^&]+)/);
      if (match && match[1]) {
        return `https://drive.google.com/file/d/${match[1]}/preview`;
      }

      return null;
    }

    return null;
  } catch {
    return null;
  }
};
