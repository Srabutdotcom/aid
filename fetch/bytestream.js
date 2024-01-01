export async function fetchByteStream(url = 'https://picsum.photos/200/300', element, progressElement) {
   const response = await fetch(url);
   if (!response.ok) {
      console.error('Failed to fetch the file');
      return "";
   }
   // Get the Content-Type header from the response headers
   const contentType = response.headers.get('Content-Type')
   // Get the Content-Length header from the response headers
   const contentLength = response.headers.get('Content-Length');
   const bufferSize = Math.max(Math.round(contentLength / 100), 4096);
   const reader = response.body.getReader({ mode: 'byob' });

   let data = new Uint8Array(bufferSize); 
   let bytesReceived = 0;
   let result = new Uint8Array();
   let src = ""

   while (true) {
      const { value, done } = await reader.read(new Uint8Array(data.buffer, bytesReceived, data.buffer.byteLength - bytesReceived));

      if (done) {
         break;
      }

      // Append the received data chunk to the existing buffer
      result = new Uint8Array([...result, ...value]);
      data = new Uint8Array(result.buffer.byteLength + bufferSize);
      bytesReceived += value.byteLength;

      // Process the accumulated data in chunks or as needed
      console.log(`Received ${bytesReceived} bytes so far`);

      src = URL.createObjectURL(new Blob([result], { type: contentType }));
      updateElement(src, bytesReceived / contentLength)

   }

   function updateElement(src, progress) {
      if (element) element.src = src;
      if (progressElement) progressElement.value = progress;
   }

   console.log('Image fully received and processed!');
   return src;
}