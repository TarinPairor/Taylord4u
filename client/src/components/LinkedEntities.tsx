// import React, { useState } from "react";
// import {
//   TextAnalysisClient,
//   AzureKeyCredential,
//   EntityLinkingResult
// } from "@azure/ai-language-text";
// import { Entity } from "../interfaces/Entity";

// const LinkedEntities: React.FC = () => {
//   const [document, setDocument] = useState<string>("");
//   const [entities, setEntities] = useState<Entity[]>([]);

//   const analyzeEntities = async () => {
//     const endpoint = "https://awesomeapp.cognitiveservices.azure.com/";
//     const key = "";

//     const client = new TextAnalysisClient(
//       endpoint,
//       new AzureKeyCredential(key)
//     );
//     const analysisResults = await client.analyze("EntityLinking", [document]);

//     // Check if matches and entities exist in the first result before accessing them
//     const firstResultEntities = analysisResults[0].entities || [];
//     // Update setEntities to handle the correct type
//     setEntities(firstResultEntities);
//   };

//   const getHighlightedText = (text: string) => {
//     let modifiedText = text;

//     entities.forEach((entity: Entity) => {
//       const matches = entity.matches;
//       const { offset, length } = matches[0];
//       const entityUrl = entity.url || "#";
//       const matchedText = text.substring(offset, offset + length);
//       const highlightedText = `<a href="${entityUrl}" target="_blank" rel="noopener noreferrer" style="color: #1a4c84; text-decoration: none; transition: color 0.3s ease-in-out; border-bottom: 1px solid #1a4c84;" onmouseover="this.style.color='#38a169'; this.style.borderBottom='#38a169'" onmouseout="this.style.color='#1a4c84'; this.style.borderBottom='#1a4c84'"><u>${matchedText}</u></a>`;
//       modifiedText = modifiedText.replace(matchedText, highlightedText);
//     });

//     return modifiedText;
//   };

//   return (
//     <div>
//       <h1>Entity Linking</h1>
//       <label>
//         Enter Text:
//         <textarea
//           value={document}
//           onChange={(e) => setDocument(e.target.value)}
//         />
//       </label>
//       <button onClick={analyzeEntities}>Analyze Entities</button>

//       <div>
//         <p>Original Text:</p>
//         <div
//           dangerouslySetInnerHTML={{ __html: getHighlightedText(document) }}
//         />
//       </div>
//     </div>
//   );
// };

// export default LinkedEntities;

function LinkedEntities() {
  return <div>LinkedEntities</div>;
}

export default LinkedEntities;
