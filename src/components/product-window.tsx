export function ProductWindow() {
  return (
    <div className="product-window" aria-label="Churnaut signal dashboard preview">
      <div className="window-top">
        <b>● churnaut</b><div className="window-search">⌕ Search people, companies, pages</div><div className="window-user"><i>SM</i> Sharath ▾</div>
      </div>
      <div className="window-body">
        <aside className="window-side" aria-hidden="true"><span>⌁</span><span>▦</span><span>◌</span><span>⌘</span></aside>
        <div className="window-content">
          <div className="window-content-head"><div><small>THURSDAY, JUNE 18</small><h3>Signals <em>in motion.</em></h3></div><span className="button button-ink">+ Create link</span></div>
          <div className="signal-banner"><div className="signal-spark">✦</div><div><small>JUST NOW · HIGH INTENT</small><strong>Maya from Northstar is back.</strong><p>Pricing page · 4m 12s · Third visit this week</p></div><span className="signal-link">View signal →</span></div>
          <div className="window-grid">
            <div className="window-panel"><div className="panel-title"><div><small>RECENTLY ACTIVE</small><b>People who leaned in</b></div><small>VIEW ALL ↗</small></div>{[["MN","Maya Nguyen","Northstar · Enterprise","Pricing · now"],["JS","James Shaw","Veridian · Mid-market","Case study · 12m"],["AR","Alex Rivera","Folkstone · Enterprise","Integrations · 1h"]].map(([initials,name,company,page])=><div className="visitor-row" key={name}><i>{initials}</i><span><b>{name}</b><small>{company}</small></span><em>{page}</em></div>)}</div>
            <div className="window-panel"><small>SCOUT AI · DEAL HEALTH</small><div className="health-score"><span>82</span></div><div className="health-caption"><b>Northstar is warming up</b>Momentum is building across CRM and website activity.</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
