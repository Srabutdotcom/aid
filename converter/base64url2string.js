export function base64url_to_string(base64url) {
   // Remove padding characters.
   base64url = base64url.replace(/=+$/, '');

   // Decode the Base64URL string.
   const decoded_bytes = atob(base64url);

   // Convert the decoded bytes to a string.
   const decoded_string = decoded_bytes.toString('utf-8');

   return decoded_string;
}