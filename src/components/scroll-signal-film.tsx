export function ScrollSignalFilm() {
  return (
    <section className="signal-film" aria-labelledby="signal-film-title">
      <div className="signal-film-sticky">
        <div className="film-topline">
          <span>THE KNOWN-VISITOR JOURNEY</span>
          <span className="film-counter">01 / 04</span>
        </div>

        <div className="film-copy">
          <p className="film-kicker">SCROLL TO FOLLOW THE SIGNAL</p>
          <div className="film-copy-stage film-copy-one">
            <small>01 / OUTBOUND</small>
            <h2 id="signal-film-title">The message earns the click.</h2>
            <p>Sharath sends Maya one tracked link with the Northstar context already attached.</p>
          </div>
          <div className="film-copy-stage film-copy-two">
            <small>02 / PERSONALIZE</small>
            <h2>The website remembers the conversation.</h2>
            <p>The default page becomes a rollout built around Northstar’s revenue team.</p>
          </div>
          <div className="film-copy-stage film-copy-three">
            <small>03 / RESOLVE</small>
            <h2>The visit becomes a known moment.</h2>
            <p>Maya is resolved from her link—deterministically, without an IP-based guess.</p>
          </div>
          <div className="film-copy-stage film-copy-four">
            <small>04 / ACT</small>
            <h2>Scout turns the return into a next move.</h2>
            <p>Sales sees the person, the page, the timing and the evidence while intent is fresh.</p>
          </div>
        </div>

        <div className="film-canvas" aria-hidden="true">
          <div className="film-grid" />
          <div className="film-route"><i /><b /></div>

          <article className="film-message-card">
            <div><span>OUTBOUND / 09:41</span><b>SENT</b></div>
            <strong>Sharath → Maya at Northstar</strong>
            <p>I pulled together the rollout workflow we discussed.</p>
            <em>Open Northstar brief</em>
          </article>

          <article className="film-page-card">
            <div className="film-browser-bar"><i /><i /><i /><span>northstar.churnaut.link</span></div>
            <div className="film-page-copy">
              <small>FOR NORTHSTAR</small>
              <strong>A rollout built around your revenue team.</strong>
              <p>Start with HubSpot. Add Scout when the first signals arrive.</p>
              <span>Review the rollout</span>
            </div>
            <div className="film-page-art"><i /><i /><i /></div>
          </article>

          <div className="film-identity-card">
            <i>MN</i>
            <span><small>IDENTITY RESOLVED</small><b>Maya Nguyen</b><em>Northstar · Enterprise</em></span>
            <strong>KNOWN</strong>
          </div>

          <article className="film-alert-card">
            <div><span>SCOUT / JUST NOW</span><b>HIGH INTENT</b></div>
            <h3>Maya from Northstar is back.</h3>
            <p>Third high-intent visit this week after the case-study email.</p>
            <footer><span>3 supporting signals</span><strong>Follow up on rollout details</strong></footer>
          </article>
        </div>

        <div className="film-progress" aria-hidden="true"><i /></div>
        <p className="film-instruction">SCROLL <span>TO MOVE THE SIGNAL</span></p>
      </div>
    </section>
  );
}
