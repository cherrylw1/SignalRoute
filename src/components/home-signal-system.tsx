export function SignalMechanism() {
  return (
    <div className="mechanism-board" aria-label="The Churnaut tracked-link workflow">
      <div className="mechanism-topbar">
        <span>KNOWN VISITOR ROUTE</span>
        <span>maya.nguyen / northstar</span>
        <b>Live</b>
      </div>

      <div className="mechanism-lead">
        <div>
          <small>THE MOMENT</small>
          <h3>Maya returned to pricing.</h3>
        </div>
        <p>The link remembers the context. The website responds. Your rep sees the visit while it still matters.</p>
      </div>

      <ol className="mechanism-route">
        <li>
          <span>01</span>
          <small>OUTBOUND</small>
          <strong>Send one tracked link</strong>
          <p>Use it in the email your rep already sends.</p>
        </li>
        <li>
          <span>02</span>
          <small>RESOLVE</small>
          <strong>Recognize the known session</strong>
          <p>Churnaut resolves Maya from the link—not an IP guess.</p>
        </li>
        <li>
          <span>03</span>
          <small>PERSONALIZE</small>
          <strong>Apply approved page swaps</strong>
          <p>Change the message, CTA or calendar for Northstar.</p>
        </li>
        <li>
          <span>04</span>
          <small>ACT</small>
          <strong>Give sales the evidence</strong>
          <p>See the person, page, timing and deal context.</p>
        </li>
      </ol>

      <div className="mechanism-page-swap" aria-hidden="true">
        <div className="swap-label"><span>APPROVED SWAP / PRICING</span><b>Applied</b></div>
        <div className="swap-before"><small>DEFAULT</small><p>Plans for modern revenue teams.</p></div>
        <div className="swap-divider"><i /></div>
        <div className="swap-after"><small>NORTHSTAR</small><p>Start with the HubSpot rollout your team mapped with Sharath.</p></div>
      </div>
    </div>
  );
}

export function ScoutEvidenceScene() {
  return (
    <div className="scout-evidence-scene" aria-label="Scout AI evidence brief for the Northstar deal">
      <div className="scout-console-head">
        <span>SCOUT / NORTHSTAR</span>
        <span>REFRESHED JUST NOW</span>
      </div>

      <div className="scout-console-summary">
        <div className="scout-pressure">
          <small>DEAL PRESSURE</small>
          <strong>82</strong>
          <span>Warming up</span>
        </div>
        <div className="scout-thesis">
          <small>WHAT CHANGED</small>
          <h3>Momentum returned after a quiet week.</h3>
          <p>Maya revisited pricing after the case-study email and a second stakeholder opened the rollout brief.</p>
        </div>
      </div>

      <div className="scout-evidence-list">
        <div><i className="evidence-hot" /><span><small>WEBSITE</small><b>Third high-intent visit in seven days</b></span><em>Strong</em></div>
        <div><i /><span><small>CRM</small><b>Case-study email opened before return</b></span><em>Supporting</em></div>
        <div><i /><span><small>STAKEHOLDERS</small><b>One new contact engaged with the brief</b></span><em>New</em></div>
      </div>

      <div className="scout-next-move">
        <small>NEXT MOVE / GROUNDED IN THE EVIDENCE</small>
        <p>Follow up on the rollout details Maya revisited. Include the new stakeholder and keep the message specific to HubSpot.</p>
      </div>
    </div>
  );
}

export function PrivacyBoundary() {
  return (
    <div className="privacy-boundary" aria-label="Comparison between deterministic Churnaut identity and probabilistic visitor identification">
      <div className="privacy-boundary-head"><span>IDENTITY BOUNDARY</span><span>CHURNAUT ONLY ACTS ON A KNOWN SIGNAL</span></div>
      <div className="privacy-known">
        <div className="privacy-route-mark"><i /><i /><i /></div>
        <small>KNOWN FROM YOUR LINK</small>
        <h3>Maya Nguyen<br />Northstar</h3>
        <ul><li>Prospect chose to click</li><li>Session resolves deterministically</li><li>Approved experience applies</li></ul>
        <strong>PERSON, PAGE AND CONTEXT CONNECTED</strong>
      </div>
      <div className="privacy-unknown">
        <div className="privacy-blur" aria-hidden="true"><i /><i /><i /></div>
        <small>NO KNOWN SIGNAL</small>
        <h3>Anonymous stays anonymous.</h3>
        <p>No IP-to-company guess. No invented identity. No personalization presented as certainty.</p>
        <strong>CHURNAUT DOES NOT GUESS</strong>
      </div>
    </div>
  );
}
