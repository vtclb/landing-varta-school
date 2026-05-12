type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

function logEvent(name: string, payload: AnalyticsPayload = {}) {
  if (import.meta.env.DEV) {
    console.log(`[analytics:${name}]`, payload);
  }
}

export function trackLeadSubmit(payload: AnalyticsPayload = {}) {
  logEvent("lead_submit", payload);
}

export function trackCTAClick(payload: AnalyticsPayload = {}) {
  logEvent("cta_click", payload);
}

export function trackVideoOpen(payload: AnalyticsPayload = {}) {
  logEvent("video_open", payload);
}

export function trackScrollDepth(payload: AnalyticsPayload = {}) {
  logEvent("scroll_depth", payload);
}
