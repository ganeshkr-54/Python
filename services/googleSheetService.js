const HEADERS = ['Name', 'Image', 'DOB', 'Profession', 'Description', 'Awards'];

function normalizeSheetResponse(values = []) {
  if (!values.length) return [];

  const [firstRow, ...rows] = values;
  const hasHeader = HEADERS.every((key, index) => (firstRow?.[index] || '').trim().toLowerCase() === key.toLowerCase());
  const sourceRows = hasHeader ? rows : values;

  return sourceRows
    .filter((row) => row && row[0] && row[1])
    .map((row) => ({
      Name: row[0] || '',
      Image: row[1] || '',
      DOB: row[2] || '',
      Profession: row[3] || '',
      Description: row[4] || '',
      Awards: row[5] || ''
    }));
}

function extractSheetId(inputUrl = '') {
  const matched = inputUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
  return matched?.[1] || inputUrl;
}

export async function fetchSheetData(sheetUrlOrId, sheetName = 'Sheet1') {
  const sheetId = extractSheetId(sheetUrlOrId);

  if (!sheetId) {
    throw new Error('Google Sheet ID missing.');
  }

  const endpoint = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(
    sheetName
  )}`;

  const res = await fetch(endpoint, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`Failed to fetch sheet data (${res.status}).`);
  }

  const text = await res.text();
  const jsonPayload = text.match(/google\.visualization\.Query\.setResponse\((.*)\);/s)?.[1];

  if (!jsonPayload) {
    throw new Error('Unable to parse Google Sheet response.');
  }

  const parsed = JSON.parse(jsonPayload);
  const values = (parsed?.table?.rows || []).map((row) =>
    (row?.c || []).map((cell) => (cell?.v ? String(cell.v) : ''))
  );

  return normalizeSheetResponse(values);
}

export function pickRandomPerson(list = []) {
  if (!list.length) return null;
  return list[Math.floor(Math.random() * list.length)];
}
