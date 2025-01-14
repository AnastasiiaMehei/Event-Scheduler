import { Link } from "react-router-dom";

import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div className={css.div}>
      <p className={css.paragraph}>
        Welcome to the Event Scheduler! <br /> Manage your event easily.
      </p>
      <Link to="/events">
        <button>   Start

        </button>
      </Link>
    </div>
  );
}
