const SHEET_WEBHOOK = import.meta.env.VITE_SHEET_WEBHOOK || '';

export async function notifyBooking(payload) {
  if (!SHEET_WEBHOOK) {
    console.warn('Sheet webhook not configured — booking not sent to sheet');
    return;
  }
  try {
    await fetch(SHEET_WEBHOOK, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    console.error('Notify failed:', e);
  }
}
