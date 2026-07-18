export function HeroSignalScene() {
  return (
    <div
      className="hero-signal-scene"
      role="img"
      aria-label="A Churnaut tracked link moving from an outbound message to a personalized Northstar page and a Scout AI sales alert."
    >
      <div className="scene-topline" aria-hidden="true">
        <span>LIVE SIGNAL ROUTE</span>
        <span>MAYA / NORTHSTAR</span>
      </div>

      <div className="scene-route" aria-hidden="true">
        <i className="scene-route-line route-line-one" />
        <i className="scene-route-line route-line-two" />
        <i className="scene-route-line route-line-three" />
        <i className="scene-route-node route-node-one" />
        <i className="scene-route-node route-node-two" />
        <i className="scene-route-node route-node-three" />
        <i className="scene-route-tracer" />
      </div>

      <article className="scene-message" aria-hidden="true">
        <div className="scene-card-meta"><span>OUTBOUND / 09:41</span><b>Sent</b></div>
        <div className="scene-person"><i>SM</i><div><strong>Sharath</strong><small>to Maya at Northstar</small></div></div>
        <p>I pulled together the workflow we discussed. This page has the relevant rollout details for your team.</p>
        <span className="scene-text-link">Open Northstar brief</span>
      </article>

      <article className="scene-browser" aria-hidden="true">
        <div className="scene-browser-bar"><i /><i /><i /><span>northstar.churnaut.link</span></div>
        <div className="scene-browser-body">
          <div className="scene-browser-copy">
            <small>FOR NORTHSTAR</small>
            <h2>A rollout built around your revenue team.</h2>
            <p>Start with HubSpot. Add Scout when the first signals arrive.</p>
            <span>Review the rollout</span>
          </div>
          <div className="scene-browser-art"><i /><i /><i /></div>
        </div>
        <div className="scene-resolved"><i>MN</i><span><small>IDENTITY RESOLVED</small><b>Maya Nguyen · Northstar</b></span></div>
      </article>

      <article className="scene-scout" aria-hidden="true">
        <div className="scene-scout-head"><span>SCOUT / JUST NOW</span><b>High intent</b></div>
        <p><strong>Something changed.</strong> Maya returned to pricing after the case-study email—her third high-intent visit this week.</p>
        <div className="scene-scout-foot"><span>Evidence: 3 signals</span><span>Deal warming</span></div>
      </article>

      <div className="scene-stamp" aria-hidden="true"><span>KNOWN</span><small>NOT GUESSED</small></div>
    </div>
  );
}
