import { Link } from "react-router-dom";

interface LinkProps {
  url: string;
}

function LinkButton({ url }: LinkProps) {
  return (
    <div>
      <Link to={url} className="text-blue-500 hover:underline">
        See Further
      </Link>
    </div>
  );
}

export default LinkButton;
