import { Link } from "react-router-dom";
import { Header } from "../Header";
import notFound from "../../assets/404.jpg";

export const NotFound = () => {
  return (
    <>
      <Header with_h1={false} />
      <main className="txt-c">
        <h1 className="not-found danger">404 Not found</h1>
        <div>
          <img src={notFound} alt="I don't know emodji" />
          <br />
          <br />
        </div>
        <button className="router-link">
          <Link to="/">Bring me home</Link>
        </button>
        <h2>
          <br /> Sorry, the page you are looking for does not exist :(
        </h2>
      </main>
    </>
  );
};
