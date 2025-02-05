export default function Header() {
  return (
    <>
      <header className="header">
        <div className="container">
          <span className="header__title">Memory Game{" "}</span>
          <span className="header__info">
            Made by{" "}
            <a href="https://github.com/robh-01" target="_blank">
              Roshan Bhusal
            </a>{" "}
            for{" "}
            <a href="https://www.theodinproject.com/" target="_blank">
              The Odin Project.
            </a>
          </span>
        </div>
      </header>
    </>
  );
}
