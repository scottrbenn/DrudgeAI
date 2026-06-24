// North American thoroughbred track schedule — typical weekly patterns by month.
// days: 0=Sun 1=Mon 2=Tue 3=Wed 4=Thu 5=Fri 6=Sat
// months: 1=Jan … 12=Dec
// postTime: first post in ET for display (PT tracks shown as ET equivalent)
// These are typical patterns; always subject to late changes and weather cancellations.

export interface TrackSchedule {
  name: string
  postTime: string   // displayed as-is in the ticker
  months: number[]
  days: number[]
}

export const TRACKS: TrackSchedule[] = [
  // ── New York (NYRA) ──────────────────────────────────────────────────────
  { name: 'Aqueduct',        postTime: '1:20pm ET',  months: [1,2,3,4,11,12],        days: [0,3,4,5,6] },
  { name: 'Belmont Park',    postTime: '1:20pm ET',  months: [5,6,7,9,10],           days: [0,3,4,5,6] },
  { name: 'Saratoga',        postTime: '1:05pm ET',  months: [7,8,9],                days: [0,3,4,5,6] },

  // ── Mid-Atlantic ──────────────────────────────────────────────────────────
  { name: 'Parx Racing',     postTime: '12:25pm ET', months: [1,2,3,4,5,6,7,8,9,10,11,12], days: [0,3,4,5,6] },
  { name: 'Pimlico',         postTime: '1pm ET',     months: [4,5,6],                days: [0,5,6] },
  { name: 'Monmouth Park',   postTime: '12:50pm ET', months: [5,6,7,8,9],            days: [0,5,6] },
  { name: 'Laurel Park',     postTime: '1:10pm ET',  months: [1,2,3,4,10,11,12],     days: [0,3,4,5,6] },

  // ── Kentucky / Midwest ───────────────────────────────────────────────────
  { name: 'Churchill Downs', postTime: '12:45pm ET', months: [4,5,6,7,10,11],        days: [0,2,3,4,5,6] },
  { name: 'Keeneland',       postTime: '1:05pm ET',  months: [4,10],                 days: [0,3,4,5,6] },
  { name: 'Turfway Park',    postTime: '6:30pm ET',  months: [1,2,3,12],             days: [0,4,5,6] },

  // ── South ─────────────────────────────────────────────────────────────────
  { name: 'Gulfstream Park', postTime: '12:35pm ET', months: [1,2,3,4,10,11,12],     days: [0,3,4,5,6] },
  { name: 'Fair Grounds',    postTime: '1:30pm ET',  months: [1,2,3,11,12],          days: [0,3,4,5,6] },
  { name: 'Oaklawn Park',    postTime: '1:30pm ET',  months: [1,2,3,4,5],            days: [0,5,6] },

  // ── Southwest ─────────────────────────────────────────────────────────────
  { name: 'Lone Star Park',  postTime: '3pm ET',     months: [5,6,7],                days: [0,4,5,6] },
  { name: 'Sam Houston',     postTime: '7pm ET',     months: [1,2,3,10,11,12],       days: [0,4,5,6] },

  // ── California ────────────────────────────────────────────────────────────
  { name: 'Santa Anita',     postTime: '4pm ET',     months: [1,2,3,4,5,6,10,11,12], days: [0,4,5,6] },
  { name: 'Del Mar',         postTime: '5pm ET',     months: [7,8,9],                days: [0,3,4,5,6] },
  { name: 'Golden Gate',     postTime: '3:30pm ET',  months: [1,2,3,4,10,11,12],     days: [0,4,5,6] },

  // ── Canada ────────────────────────────────────────────────────────────────
  { name: 'Woodbine',        postTime: '1pm ET',     months: [5,6,7,8,9,10,11],      days: [0,3,4,5,6] },
]

function etMonth(date: Date): number {
  return parseInt(
    new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', month: 'numeric' }).format(date)
  )
}

function etDayOfWeek(date: Date): number {
  const name = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    weekday: 'long',
  }).format(date)
  return ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'].indexOf(name)
}

export function tracksForDate(date: Date): TrackSchedule[] {
  const month = etMonth(date)
  const dow   = etDayOfWeek(date)
  return TRACKS.filter((t) => t.months.includes(month) && t.days.includes(dow))
}
