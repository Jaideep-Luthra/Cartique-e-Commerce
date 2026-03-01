import React, { useEffect, useRef, useState } from "react";
import ApiServices from "../layout/ApiServices";

const SpeechSearch = () => {
  const [productData, setproductData] = useState([])

  const [transcript, setTranscript] = useState("");
  const [results, setResults] = useState([]);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Web Speech API is not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript;
      setTranscript(speechText);
      fetchResults(speechText);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, []);

  const startListening = () => {
    const recognition = recognitionRef.current;
    if (recognition && !listening) {
      try {
        recognition.start();
      } catch (err) {
        console.error("Failed to start recognition:", err);
      }
    }
  };

  const stopListening = () => {
    const recognition = recognitionRef.current;
    if (recognition && listening) {
      recognition.stop();
    }
  };

  const fetchResults = async (query) => {
    try {
      // const res = await fetch(
      //   `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
      // );

      // const data = await res.json();
      // setResults(data.docs.slice(0, 10));
      // console.log(query)
      let data = {
        name: query,
        status: true
      }
      ApiServices.customerViewAllProduct(data)
        .then((res) => {
          if (res.data.success) {
            setproductData(res.data.data)
          } else {
          }
        })
        .catch((err) => {
          // toast.error("Something Went Wrong")
          console.log(err)
        })
    } catch (err) {
      console.error("API fetch error:", err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🎤 Speech Search</h2>
      <button onClick={startListening} disabled={listening}>
        {listening ? "Listening..." : "Start Speaking"}
      </button>
      <button onClick={stopListening} disabled={!listening}>
        Stop
      </button>

      <p><strong>Recognized:</strong> {transcript}</p>

      {/* <h3>📚 Results:</h3> */}
      <ul>
        {results.map((book, idx) => (
          <li key={idx}>
            {book.title} {book.author_name ? `by ${book.author_name[0]}` : ""}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpeechSearch;
