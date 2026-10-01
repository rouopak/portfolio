import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

const AdminAnalytics = () => {
  const [adminKey, setAdminKey] = useState(() => localStorage.getItem("portfolio_admin_key") || "");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputKey, setInputKey] = useState("");
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");

  // Filters & Pagination
  const [countryFilter, setCountryFilter] = useState("");
  const [referrerFilter, setReferrerFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1, limit: 50 });

  const fetchLogs = useCallback(
    async (keyToUse = adminKey, targetPage = page) => {
      if (!keyToUse) return;
      setLoading(true);
      setError("");
      setWarning("");

      try {
        const queryParams = new URLSearchParams({
          page: targetPage.toString(),
          limit: "50",
        });

        if (countryFilter) queryParams.set("country", countryFilter);
        if (referrerFilter) queryParams.set("referrer", referrerFilter);
        if (startDate) queryParams.set("startDate", startDate);
        if (endDate) queryParams.set("endDate", endDate);

        const res = await fetch(`/api/analytics?${queryParams.toString()}`, {
          headers: {
            Authorization: `Bearer ${keyToUse}`,
          },
        });

        if (res.status === 401) {
          setIsAuthenticated(false);
          setError("Unauthorized: Invalid Admin Secret Key.");
          return;
        }

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || "Failed to fetch analytics");
        }

        const data = await res.json();
        setIsAuthenticated(true);
        setLogs(data.logs || []);
        if (data.warning) setWarning(data.warning);
        if (data.pagination) setPagination(data.pagination);
      } catch (err) {
        console.error(err);
        setError(err.message || "An error occurred while loading analytics.");
      } finally {
        setLoading(false);
      }
    },
    [adminKey, page, countryFilter, referrerFilter, startDate, endDate]
  );

  // Auto-authenticate if key exists in storage
  useEffect(() => {
    if (adminKey) {
      fetchLogs(adminKey, 1);
    }
  }, [adminKey]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!inputKey.trim()) return;
    localStorage.setItem("portfolio_admin_key", inputKey.trim());
    setAdminKey(inputKey.trim());
    fetchLogs(inputKey.trim(), 1);
  };

  const handleLogout = () => {
    localStorage.removeItem("portfolio_admin_key");
    setAdminKey("");
    setIsAuthenticated(false);
    setLogs([]);
  };

  const handleApplyFilters = (e) => {
    e.preventDefault();
    setPage(1);
    fetchLogs(adminKey, 1);
  };

  const handleResetFilters = () => {
    setCountryFilter("");
    setReferrerFilter("");
    setStartDate("");
    setEndDate("");
    setPage(1);
  };

  const formatTimestamp = (ts) => {
    if (!ts) return "N/A";
    const date = new Date(ts);
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-10 py-8 font-sans selection:bg-cyan-500 selection:text-black">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-xs uppercase tracking-wider text-blue-50/80 hover:text-white transition-colors"
            >
              ← Back to Portfolio
            </Link>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mt-2 bg-gradient-to-r from-white via-neutral-200 to-cyan-400 bg-clip-text text-transparent">
            Visitor Analytics Dashboard
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Privacy-conscious server-side visit metrics (Protected Site Admin Only)
          </p>
        </div>

        {isAuthenticated && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchLogs(adminKey, page)}
              disabled={loading}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/15 rounded-lg text-sm transition-all"
            >
              {loading ? "Refreshing..." : "↻ Refresh"}
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-950/40 hover:bg-red-900/50 border border-red-500/30 text-red-300 rounded-lg text-sm transition-all"
            >
              Lock & Log Out
            </button>
          </div>
        )}
      </div>

      {/* Geolocation Notice */}
      <div className="my-6 p-4 rounded-xl border border-cyan-500/20 bg-cyan-950/15 text-xs text-cyan-200/90 leading-relaxed">
        <strong>Privacy & Location Note:</strong> Visitor IP addresses and geographical data are derived
        directly from Vercel edge network headers on the server. Geolocation is approximate (typically city or
        regional level) and can be affected by VPNs, proxies, and cellular data carrier gateways. IP and location
        data are sensitive and strictly restricted to the authenticated site administrator.
      </div>

      {warning && (
        <div className="mb-6 p-4 rounded-xl border border-amber-500/30 bg-amber-950/20 text-xs text-amber-300">
          ⚠️ <strong>Notice:</strong> {warning}
        </div>
      )}

      {/* Login Screen if not authenticated */}
      {!isAuthenticated ? (
        <div className="max-w-md mx-auto mt-16 p-8 rounded-2xl bg-neutral-900/70 border border-white/10 backdrop-blur-md">
          <div className="w-12 h-12 mx-auto rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-xl mb-4">
            🔒
          </div>
          <h2 className="text-xl font-bold text-center mb-2">Admin Authentication</h2>
          <p className="text-xs text-neutral-400 text-center mb-6">
            Enter your secret key (`ADMIN_SECRET_KEY`) to access sensitive visitor statistics.
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2">
                Admin Secret Key
              </label>
              <input
                type="password"
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                placeholder="Enter ADMIN_SECRET_KEY..."
                className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                required
              />
            </div>

            {error && <p className="text-xs text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-xl text-sm transition-all"
            >
              {loading ? "Verifying..." : "Unlock Dashboard"}
            </button>
          </form>
        </div>
      ) : (
        <>
          {/* Filter Bar */}
          <form
            onSubmit={handleApplyFilters}
            className="mb-6 p-5 rounded-2xl bg-neutral-900/60 border border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end"
          >
            <div>
              <label className="block text-xs text-neutral-400 mb-1">Country / City</label>
              <input
                type="text"
                value={countryFilter}
                onChange={(e) => setCountryFilter(e.target.value)}
                placeholder="e.g. US, India, London"
                className="w-full px-3 py-2 bg-black/50 border border-white/15 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-400 mb-1">Referrer Search</label>
              <input
                type="text"
                value={referrerFilter}
                onChange={(e) => setReferrerFilter(e.target.value)}
                placeholder="e.g. google, github, t.co"
                className="w-full px-3 py-2 bg-black/50 border border-white/15 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-400 mb-1">From Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 bg-black/50 border border-white/15 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-400 mb-1">To Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 bg-black/50 border border-white/15 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg text-xs transition-colors"
              >
                Apply Filters
              </button>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/15 rounded-lg text-xs transition-colors"
              >
                Clear
              </button>
            </div>
          </form>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-neutral-900/40 border border-white/10">
              <span className="text-xs text-neutral-400">Total Filtered Visits</span>
              <p className="text-2xl font-bold mt-1 text-white">{pagination.total}</p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900/40 border border-white/10">
              <span className="text-xs text-neutral-400">Current Page</span>
              <p className="text-2xl font-bold mt-1 text-white">
                {pagination.page} / {pagination.totalPages || 1}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900/40 border border-white/10">
              <span className="text-xs text-neutral-400">Desktop Visits</span>
              <p className="text-2xl font-bold mt-1 text-cyan-400">
                {logs.filter((l) => l.device === "Desktop").length}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900/40 border border-white/10">
              <span className="text-xs text-neutral-400">Mobile / Tablet Visits</span>
              <p className="text-2xl font-bold mt-1 text-purple-400">
                {logs.filter((l) => l.device === "Mobile" || l.device === "Tablet").length}
              </p>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-neutral-900/40 backdrop-blur-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-neutral-300">
                  <th className="py-3 px-4 font-semibold">Date & Time</th>
                  <th className="py-3 px-4 font-semibold">IP Address</th>
                  <th className="py-3 px-4 font-semibold">Location</th>
                  <th className="py-3 px-4 font-semibold">Device</th>
                  <th className="py-3 px-4 font-semibold">Browser</th>
                  <th className="py-3 px-4 font-semibold">OS</th>
                  <th className="py-3 px-4 font-semibold">Referrer</th>
                  <th className="py-3 px-4 font-semibold">Page</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr>
                    <td colSpan="8" className="py-12 text-center text-neutral-400">
                      Loading visitor logs...
                    </td>
                  </tr>
                ) : logs.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="py-12 text-center text-neutral-400">
                      No visits found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => (
                    <tr key={log.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 whitespace-nowrap text-neutral-300">
                        {formatTimestamp(log.timestamp)}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap font-mono text-cyan-300">
                        {log.ip}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded bg-white/10 text-white font-medium mr-1.5">
                          {log.country || "XX"}
                        </span>
                        <span className="text-neutral-300">
                          {[log.city, log.region].filter(Boolean).join(", ") || "-"}
                        </span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                            log.device === "Mobile"
                              ? "bg-purple-900/40 text-purple-300 border border-purple-500/30"
                              : log.device === "Tablet"
                              ? "bg-amber-900/40 text-amber-300 border border-amber-500/30"
                              : "bg-blue-900/40 text-blue-300 border border-blue-500/30"
                          }`}
                        >
                          {log.device || "Desktop"}
                        </span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-neutral-300">{log.browser}</td>
                      <td className="py-3 px-4 whitespace-nowrap text-neutral-300">{log.os}</td>
                      <td className="py-3 px-4 max-w-xs truncate text-neutral-400" title={log.referrer}>
                        {log.referrer ? (
                          <span className="text-cyan-400/90">{log.referrer}</span>
                        ) : (
                          <span className="text-neutral-500 italic">Direct / None</span>
                        )}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-neutral-300 font-mono">
                        {log.page}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between mt-5 text-xs text-neutral-400">
            <span>
              Showing {logs.length} of {pagination.total} results
            </span>
            <div className="flex gap-2">
              <button
                disabled={page <= 1 || loading}
                onClick={() => {
                  const newPage = page - 1;
                  setPage(newPage);
                  fetchLogs(adminKey, newPage);
                }}
                className="px-3 py-1.5 rounded bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                Previous
              </button>
              <span className="px-3 py-1.5 rounded bg-white/10 text-white font-medium">
                {page} / {pagination.totalPages || 1}
              </span>
              <button
                disabled={page >= pagination.totalPages || loading}
                onClick={() => {
                  const newPage = page + 1;
                  setPage(newPage);
                  fetchLogs(adminKey, newPage);
                }}
                className="px-3 py-1.5 rounded bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminAnalytics;
