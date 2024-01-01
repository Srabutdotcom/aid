export async function fetchStream(url = 'https://picsum.photos/200/300', element, progressElement) {
   const response = await fetch(url);
   if (!response.ok) {
      console.error('Failed to fetch the file');
      return "";
   }

   // Get the Content-Type header from the response headers
   const contentType = response.headers.get('Content-Type')
   // Get the Content-Length header from the response headers
   const contentLength = response.headers.get('Content-Length');

   const reader = response.body.getReader();
   const imageChunks = [];
   let totalBytesReceived = 0;
   let src = ""

   while (true) {
      const { done, value } = await reader.read();

      if (done) {
         // Create a blob from accumulated chunks and set it as the image source
         const blob = new Blob(imageChunks, { type: contentType });
         src = URL.createObjectURL(blob);
         updateElement(src, 1)
         break;
      }

      totalBytesReceived += value.length;
      imageChunks.push(value);

      // Update the image source using a chunked Blob to display progressively
      const blob = new Blob(imageChunks, { type: contentType });
      src = URL.createObjectURL(blob);
      updateElement(src, totalBytesReceived / contentLength)

      console.log(`Received ${totalBytesReceived} bytes`);
   }

   function updateElement(src, progress) {
      if (element) element.src = src;
      if (progressElement) progressElement.value = progress;
   }

   return src
}