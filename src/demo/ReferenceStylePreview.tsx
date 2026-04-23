import * as React from "react";

export function ReferenceStylePreview() {
  return (
    <section className="reference-theme">
      <div className="reference-theme__topbar">
        <div>
          <strong>Reference Style Example</strong>
          <span style={{ marginLeft: 8, color: "#9ca3af", fontSize: 12 }}>opt-in preview only</span>
        </div>
        <span style={{ color: "#10b981", fontSize: 12, fontWeight: 600 }}>Using reference palette</span>
      </div>

      <div className="reference-theme__layout">
        <aside className="reference-theme__sidebar">
          <p className="reference-theme__sidehead">Operations</p>
          <a className="reference-theme__link is-active">Telemetry Jobs</a>
          <a className="reference-theme__link">Vehicles</a>
          <a className="reference-theme__link">Alerts</a>
          <p className="reference-theme__sidehead">Administration</p>
          <a className="reference-theme__link">Rules</a>
          <a className="reference-theme__link">Integrations</a>
        </aside>

        <main className="reference-theme__content">
          <div className="reference-theme__toolbar">
            <button className="reference-theme__btn">Filter</button>
            <button className="reference-theme__btn">Columns</button>
            <button className="reference-theme__btn reference-theme__btn--primary">Create Job</button>
          </div>

          <table>
            <thead>
              <tr>
                <th>Job</th>
                <th>Status</th>
                <th>Owner</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>VIN anomaly scan</td>
                <td>Running</td>
                <td>Maya</td>
                <td>2 min ago</td>
              </tr>
              <tr>
                <td>Route variance model</td>
                <td>Pending</td>
                <td>Brian</td>
                <td>10 min ago</td>
              </tr>
              <tr>
                <td>Battery health rollup</td>
                <td>Blocked</td>
                <td>Ops Bot</td>
                <td>35 min ago</td>
              </tr>
            </tbody>
          </table>

          <div className="reference-theme__callouts">
            <div className="reference-theme__callout reference-theme__callout--info">Info: 3 jobs are currently active.</div>
            <div className="reference-theme__callout reference-theme__callout--tip">Tip: Use compact density for larger result sets.</div>
            <div className="reference-theme__callout reference-theme__callout--warn">Warning: One source feed is delayed.</div>
            <div className="reference-theme__callout reference-theme__callout--danger">Error: Last nightly run failed validation.</div>
          </div>
        </main>
      </div>
    </section>
  );
}
