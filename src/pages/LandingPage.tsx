import background from "../png/background.png";

interface LandingPageProps {
  onEnter: () => void;
}

function LandingPage({ onEnter }: LandingPageProps) {
  return (
    <div className="atelier-page">
      <div className="atelier-frame">
        <div
          className="atelier-background"
          style={{ backgroundImage: `url(${background})` }}
          aria-hidden="true"
        />

        <header className="atelier-nav">
          <a className="atelier-logo" href="#hjem">
            <span className="atelier-star">✳</span>
            taskflow.
          </a>

          <nav className="atelier-links" aria-label="Hovedmeny">
            <a href="#hjem" className="active">
              Hjem
            </a>

            <button type="button" onClick={onEnter}>
              Arbeidsrom
            </button>

            <a href="#om">Om</a>

            <a href="mailto:hei@taskflow.no">
              Kontakt
            </a>
          </nav>

          <button
            className="atelier-nav-button"
            type="button"
            onClick={onEnter}
          >
            Åpne arbeidsrommet <span>↗</span>
          </button>
        </header>

        <main className="atelier-content" id="hjem">
          <div className="atelier-copy">
            <p className="atelier-eyebrow atelier-fade">
              ET ROM FOR IDEER, OPPGAVER OG FREMDRIFT
            </p>

            <h1>
              <span className="atelier-heading-line atelier-fade delay-1">
                Mindre støy.
              </span>

              <span className="atelier-heading-line atelier-fade delay-2">
                <em>Mer rom.</em>
              </span>
            </h1>

            <p className="atelier-description atelier-fade delay-3">
              Samle tankene, organiser arbeidet
              <br />
              og gjør plass til det som betyr noe.
            </p>

            <button
              className="atelier-cta atelier-fade delay-4"
              type="button"
              onClick={onEnter}
            >
              <span className="atelier-cta-circle">↗</span>
              <span className="atelier-cta-label">
                Åpne arbeidsrommet
              </span>
            </button>
          </div>
        </main>

        <footer className="atelier-footer">
          <span>TASKFLOW © 2026</span>
          <span>DITT DIGITALE ATELIER</span>
        </footer>
      </div>

      <section className="atelier-about" id="om">
        <span>01 / OM TASKFLOW</span>

        <p>
          Et digitalt pusterom for store og små planer.
          Mindre distraksjon, mer fremdrift.
        </p>

        <button type="button" onClick={onEnter}>
          Begynn her ↗
        </button>
      </section>
    </div>
  );
}

export default LandingPage;