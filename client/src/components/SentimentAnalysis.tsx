// SentimentAnalysisComponent.tsx

import React, { useState, useEffect } from "react";
import { AzureKeyCredential } from "@azure/ai-text-analytics";
import {
  TextAnalysisClient,
  SentimentAnalysisResult,
  SentenceSentiment,
} from "@azure/ai-language-text";

interface SentimentAnalysisProps {
  text: string;
  showResults: boolean;
}

const SentimentAnalysisComponent: React.FC<SentimentAnalysisProps> = ({
  text,
  showResults,
}) => {
  const [results, setResults] = useState<SentimentAnalysisResult[] | null>([]);
  const [showSentences, setShowSentences] = useState(false);

  useEffect(() => {
    const analyzeSentiment = async () => {
      const endpoint = "https://awesomeapp.cognitiveservices.azure.com/";
      const key = "";

      const client = new TextAnalysisClient(
        endpoint,
        new AzureKeyCredential(key)
      );

      const documents = [
        {
          text,
          id: "0",
          language: "en",
        },
      ];

      try {
        const analysisResults = await client.analyze(
          "SentimentAnalysis",
          documents,
          {
            includeOpinionMining: false,
          }
        );
        setResults(analysisResults);
      } catch (error) {
        console.error("Error analyzing sentiment:", error);
      }
    };

    if (showResults) {
      analyzeSentiment();
    }
  }, [text, showResults]);

  console.log(results);

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-md shadow-md my-8">
      {results?.map((result: SentimentAnalysisResult, index: number) => (
        <div key={index} className="my-4 p-4 border border-gray-300 rounded">
          {!result.error && (
            <>
              <h4 className="font-semibold text-blue-600">
                Post sentiment scores:
              </h4>
              <p className="text-sm">
                <br />
                <span className="text-green-500">Positive:</span>{" "}
                {result.confidenceScores.positive} <br />
                <span className="text-gray-500">Neutral:</span>{" "}
                {result.confidenceScores.neutral} <br />
                <span className="text-red-500">Negative:</span>{" "}
                {result.confidenceScores.negative} <br />
              </p>

              <button
                onClick={() => setShowSentences(!showSentences)}
                className="text-sm px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mt-2"
              >
                Display Details
              </button>

              {showSentences &&
                result.sentences.map(
                  (sentence: SentenceSentiment, sentenceIndex: number) => (
                    <div key={sentenceIndex} className="mt-4">
                      <p className="text-sm font-semibold text-blue-500">
                        Sentence {sentenceIndex + 1} - Sentiment is{" "}
                        {sentence.sentiment.toLocaleUpperCase()}
                      </p>
                      <p className="text-sm mb-2 text-gray-700">
                        Sentence text: {sentence.text}
                      </p>
                      <p className="text-sm">
                        Confidence scores: <br />
                        <span className="text-green-500">Positive:</span>{" "}
                        {sentence.confidenceScores.positive} <br />
                        <span className="text-gray-500">Neutral:</span>{" "}
                        {sentence.confidenceScores.neutral} <br />
                        <span className="text-red-500">Negative:</span>{" "}
                        {sentence.confidenceScores.negative} <br />
                      </p>
                    </div>
                  )
                )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default SentimentAnalysisComponent;
