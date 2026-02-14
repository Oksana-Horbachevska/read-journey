import Link from "next/link";

const NotFound = () => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for doesn&#39;t exist.</p>
      <Link href="/">Go back home</Link>
    </div>
  );
};

export default NotFound;
