export async function importJs(url = 'https://raw.githubusercontent.com/Srabutdotcom/aids/master/whatis/whatis.js') {
   const response = await fetch(url);
   if (!response.ok) {
      console.error('Failed to fetch the file');
      return;
   }

   const blob = await response.blob();
   return await import(URL.createObjectURL(new Blob([blob], { type: 'text/javascript' })))
}