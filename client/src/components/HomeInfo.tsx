function HomeInfo() {
  return (
    <div className="flex flex-col justify-center items-center">
      <p className=" font-mono md:border-black md:border-2 rounded-md p-3 w-[80%]">
        " Discover the power of community with <b>Taylord4u</b>, the forum
        platform tailored just for you. Whether you're here to share knowledge,
        seek advice, or simply engage in meaningful discussions, we've got you
        covered! "
      </p>
      <div className="flex flex-col justify-center items-center">
        <h2 className="font-serif text-2xl font-semibold my-6">Features:</h2>
        <ul className="list-disc list-inside space-y-2 m-auto font-mono">
          <li className="text-lg">
            <strong>🚀 Easy Onboarding:</strong> Quick and secure registration
            process. Your data is protected with hashed passwords.
          </li>
          <li className="text-lg">
            <strong>🔒 User Authentication:</strong> Seamless Login: Access your
            personalized list of posts with ease using your secure credentials.
          </li>
          <li className="text-lg">
            <strong>✍️ Content Interaction:</strong>
          </li>
          <ul className="list-inside ml-6 space-y-2 ">
            <li className="text-lg">
              Create Posts: Share your thoughts and ideas effortlessly.
            </li>
            <li className="text-lg">
              Read & Engage: Explore posts categorized by tags and sorted by
              recent updates.
            </li>
            <li className="text-lg">
              Update & Delete: Full control over your content with easy update
              and delete options.
            </li>
            <li className="text-lg">
              Comment on Posts: Engage with the community by adding and managing
              your comments.
            </li>
          </ul>
          <li className="text-lg">
            <strong>🧠 Sentiment Analysis:</strong> Microsoft Azure Integration:
            Get insights into the positivity of posts with our sentiment
            analysis feature.
          </li>
          <li className="text-lg">
            <strong>👤 Guest User Experience:</strong> Explore as a Guest:
            Browse content even without logging in. Creating posts is restricted
            to maintain platform integrity.
          </li>
          <li className="text-lg">
            <strong>💬 Discourse Exploration:</strong> Clickable Comments: Dive
            into discussions and contribute your thoughts with ease.
          </li>
          <li className="text-lg">
            <strong>🔍 Advanced Search:</strong> Tag-Based Search: Refine your
            focus and discover posts that match your interests.
          </li>
        </ul>
        <div className="flex flex-col justify-center items-center">
          <h2 className="font-serif text-2xl font-semibold my-6">
            Why Taylord4u?
          </h2>
          <ul className="list-disc list-inside space-y-2 font-mono">
            <li className="text-lg">
              User-Friendly Interface: Clean, intuitive design for a seamless
              user experience.
            </li>
            <li className="text-lg">
              Community-Driven: Engage with like-minded individuals and grow
              together.
            </li>
            <li className="text-lg">
              Secure & Reliable: Your data is safe with us.
            </li>
          </ul>
        </div>
        <div className="text-center mt-6">
          <p className="text-lg mb-4">
            Join <strong>Taylord4u</strong> today and be part of a vibrant
            community where your voice matters. Share, learn, and connect like
            never before!
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomeInfo;
