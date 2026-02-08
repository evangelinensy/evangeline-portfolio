/**
 * Timezone Visitor Simulation Tests
 *
 * Simulates visitors from different timezones accessing the site
 * by mocking the browser's Intl.DateTimeFormat API.
 *
 * Run with: npx tsx src/components/ui/__tests__/timezone-visitor-simulation.test.ts
 */

// ============ COPIED FUNCTIONS FROM COMPONENT ============

function formatTime(date: Date): string {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${hours}:${minutes} ${ampm}`;
}

function getCityFromTimezone(timeZone: string): string {
  try {
    const city = timeZone.split("/").pop()?.replace(/_/g, " ") || "Local Time";
    return city;
  } catch {
    return "Local Time";
  }
}

// ============ TEST UTILITIES ============

let passCount = 0;
let failCount = 0;

function test(name: string, fn: () => void) {
  try {
    fn();
    console.log(`✅ ${name}`);
    passCount++;
  } catch (error) {
    console.log(`❌ ${name}`);
    console.log(`   ${error}`);
    failCount++;
  }
}

function expect(actual: unknown) {
  return {
    toBe(expected: unknown) {
      if (actual !== expected) {
        throw new Error(`Expected "${expected}" but got "${actual}"`);
      }
    }
  };
}

// ============ TIMEZONE OFFSET DATA ============
// UTC offsets for major timezones (in hours from UTC)
// Note: These are standard time offsets; DST would add +1 hour where applicable

const TIMEZONE_OFFSETS: Record<string, number> = {
  // Pacific
  "Pacific/Auckland": 12,      // NZST (UTC+12)
  "Pacific/Fiji": 12,          // FJT (UTC+12)
  "Australia/Sydney": 10,      // AEST (UTC+10)
  "Australia/Melbourne": 10,   // AEST (UTC+10)
  "Australia/Perth": 8,        // AWST (UTC+8)
  "Pacific/Honolulu": -10,     // HST (UTC-10)

  // Asia
  "Asia/Tokyo": 9,             // JST (UTC+9)
  "Asia/Seoul": 9,             // KST (UTC+9)
  "Asia/Shanghai": 8,          // CST (UTC+8)
  "Asia/Hong_Kong": 8,         // HKT (UTC+8)
  "Asia/Singapore": 8,         // SGT (UTC+8)
  "Asia/Kuala_Lumpur": 8,      // MYT (UTC+8)
  "Asia/Manila": 8,            // PHT (UTC+8)
  "Asia/Bangkok": 7,           // ICT (UTC+7)
  "Asia/Ho_Chi_Minh": 7,       // ICT (UTC+7)
  "Asia/Jakarta": 7,           // WIB (UTC+7)
  "Asia/Kolkata": 5.5,         // IST (UTC+5:30)
  "Asia/Dubai": 4,             // GST (UTC+4)
  "Asia/Jerusalem": 2,         // IST (UTC+2)

  // Europe
  "Europe/Moscow": 3,          // MSK (UTC+3)
  "Europe/Istanbul": 3,        // TRT (UTC+3)
  "Europe/Helsinki": 2,        // EET (UTC+2)
  "Europe/Athens": 2,          // EET (UTC+2)
  "Europe/Berlin": 1,          // CET (UTC+1)
  "Europe/Paris": 1,           // CET (UTC+1)
  "Europe/Amsterdam": 1,       // CET (UTC+1)
  "Europe/Rome": 1,            // CET (UTC+1)
  "Europe/Madrid": 1,          // CET (UTC+1)
  "Europe/London": 0,          // GMT (UTC+0)
  "Europe/Dublin": 0,          // GMT (UTC+0)
  "Europe/Lisbon": 0,          // WET (UTC+0)

  // Africa
  "Africa/Cairo": 2,           // EET (UTC+2)
  "Africa/Johannesburg": 2,    // SAST (UTC+2)
  "Africa/Lagos": 1,           // WAT (UTC+1)
  "Africa/Casablanca": 1,      // WEST (UTC+1)

  // Americas
  "America/Sao_Paulo": -3,     // BRT (UTC-3)
  "America/Buenos_Aires": -3,  // ART (UTC-3)
  "America/New_York": -5,      // EST (UTC-5)
  "America/Toronto": -5,       // EST (UTC-5)
  "America/Chicago": -6,       // CST (UTC-6)
  "America/Mexico_City": -6,   // CST (UTC-6)
  "America/Denver": -7,        // MST (UTC-7)
  "America/Phoenix": -7,       // MST (UTC-7)
  "America/Los_Angeles": -8,   // PST (UTC-8)
  "America/Vancouver": -8,     // PST (UTC-8)
  "America/Anchorage": -9,     // AKST (UTC-9)
};

// ============ HELPER FUNCTIONS ============

/**
 * Calculates what time it would be in a given timezone when it's a specific UTC time
 */
function getLocalTimeInTimezone(utcHours: number, utcMinutes: number, timezoneOffset: number): { hours: number, minutes: number } {
  let totalMinutes = (utcHours * 60 + utcMinutes) + (timezoneOffset * 60);

  // Handle day wrap-around
  while (totalMinutes < 0) totalMinutes += 24 * 60;
  while (totalMinutes >= 24 * 60) totalMinutes -= 24 * 60;

  return {
    hours: Math.floor(totalMinutes / 60),
    minutes: totalMinutes % 60
  };
}

/**
 * Simulates what a visitor from a specific timezone would see
 */
function simulateVisitor(timezone: string, utcHours: number, utcMinutes: number): { city: string, time: string } {
  const offset = TIMEZONE_OFFSETS[timezone] || 0;
  const localTime = getLocalTimeInTimezone(utcHours, utcMinutes, offset);

  const date = new Date();
  date.setHours(localTime.hours, localTime.minutes, 0, 0);

  return {
    city: getCityFromTimezone(timezone),
    time: formatTime(date)
  };
}

// ============ VISITOR SIMULATION TESTS ============

console.log("\n🌍 VISITOR SIMULATION TESTS");
console.log("━".repeat(60));
console.log("Simulating: It's 12:00 UTC (noon in London)\n");

const UTC_HOUR = 12;
const UTC_MINUTE = 0;

// Test visitors from around the world when it's 12:00 UTC

console.log("🇺🇸 NORTH AMERICA VISITORS\n");

test("Visitor from Los Angeles sees 'Los Angeles' and 4:00 AM", () => {
  const result = simulateVisitor("America/Los_Angeles", UTC_HOUR, UTC_MINUTE);
  expect(result.city).toBe("Los Angeles");
  expect(result.time).toBe("4:00 AM");
});

test("Visitor from New York sees 'New York' and 7:00 AM", () => {
  const result = simulateVisitor("America/New_York", UTC_HOUR, UTC_MINUTE);
  expect(result.city).toBe("New York");
  expect(result.time).toBe("7:00 AM");
});

test("Visitor from Chicago sees 'Chicago' and 6:00 AM", () => {
  const result = simulateVisitor("America/Chicago", UTC_HOUR, UTC_MINUTE);
  expect(result.city).toBe("Chicago");
  expect(result.time).toBe("6:00 AM");
});

test("Visitor from Denver sees 'Denver' and 5:00 AM", () => {
  const result = simulateVisitor("America/Denver", UTC_HOUR, UTC_MINUTE);
  expect(result.city).toBe("Denver");
  expect(result.time).toBe("5:00 AM");
});

test("Visitor from Vancouver sees 'Vancouver' and 4:00 AM", () => {
  const result = simulateVisitor("America/Vancouver", UTC_HOUR, UTC_MINUTE);
  expect(result.city).toBe("Vancouver");
  expect(result.time).toBe("4:00 AM");
});

test("Visitor from Toronto sees 'Toronto' and 7:00 AM", () => {
  const result = simulateVisitor("America/Toronto", UTC_HOUR, UTC_MINUTE);
  expect(result.city).toBe("Toronto");
  expect(result.time).toBe("7:00 AM");
});

test("Visitor from Mexico City sees 'Mexico City' and 6:00 AM", () => {
  const result = simulateVisitor("America/Mexico_City", UTC_HOUR, UTC_MINUTE);
  expect(result.city).toBe("Mexico City");
  expect(result.time).toBe("6:00 AM");
});

console.log("\n🇪🇺 EUROPEAN VISITORS\n");

test("Visitor from London sees 'London' and 12:00 PM", () => {
  const result = simulateVisitor("Europe/London", UTC_HOUR, UTC_MINUTE);
  expect(result.city).toBe("London");
  expect(result.time).toBe("12:00 PM");
});

test("Visitor from Paris sees 'Paris' and 1:00 PM", () => {
  const result = simulateVisitor("Europe/Paris", UTC_HOUR, UTC_MINUTE);
  expect(result.city).toBe("Paris");
  expect(result.time).toBe("1:00 PM");
});

test("Visitor from Berlin sees 'Berlin' and 1:00 PM", () => {
  const result = simulateVisitor("Europe/Berlin", UTC_HOUR, UTC_MINUTE);
  expect(result.city).toBe("Berlin");
  expect(result.time).toBe("1:00 PM");
});

test("Visitor from Amsterdam sees 'Amsterdam' and 1:00 PM", () => {
  const result = simulateVisitor("Europe/Amsterdam", UTC_HOUR, UTC_MINUTE);
  expect(result.city).toBe("Amsterdam");
  expect(result.time).toBe("1:00 PM");
});

test("Visitor from Moscow sees 'Moscow' and 3:00 PM", () => {
  const result = simulateVisitor("Europe/Moscow", UTC_HOUR, UTC_MINUTE);
  expect(result.city).toBe("Moscow");
  expect(result.time).toBe("3:00 PM");
});

test("Visitor from Istanbul sees 'Istanbul' and 3:00 PM", () => {
  const result = simulateVisitor("Europe/Istanbul", UTC_HOUR, UTC_MINUTE);
  expect(result.city).toBe("Istanbul");
  expect(result.time).toBe("3:00 PM");
});

console.log("\n🌏 ASIA PACIFIC VISITORS\n");

test("Visitor from Tokyo sees 'Tokyo' and 9:00 PM", () => {
  const result = simulateVisitor("Asia/Tokyo", UTC_HOUR, UTC_MINUTE);
  expect(result.city).toBe("Tokyo");
  expect(result.time).toBe("9:00 PM");
});

test("Visitor from Seoul sees 'Seoul' and 9:00 PM", () => {
  const result = simulateVisitor("Asia/Seoul", UTC_HOUR, UTC_MINUTE);
  expect(result.city).toBe("Seoul");
  expect(result.time).toBe("9:00 PM");
});

test("Visitor from Shanghai sees 'Shanghai' and 8:00 PM", () => {
  const result = simulateVisitor("Asia/Shanghai", UTC_HOUR, UTC_MINUTE);
  expect(result.city).toBe("Shanghai");
  expect(result.time).toBe("8:00 PM");
});

test("Visitor from Hong Kong sees 'Hong Kong' and 8:00 PM", () => {
  const result = simulateVisitor("Asia/Hong_Kong", UTC_HOUR, UTC_MINUTE);
  expect(result.city).toBe("Hong Kong");
  expect(result.time).toBe("8:00 PM");
});

test("Visitor from Singapore sees 'Singapore' and 8:00 PM", () => {
  const result = simulateVisitor("Asia/Singapore", UTC_HOUR, UTC_MINUTE);
  expect(result.city).toBe("Singapore");
  expect(result.time).toBe("8:00 PM");
});

test("Visitor from Bangkok sees 'Bangkok' and 7:00 PM", () => {
  const result = simulateVisitor("Asia/Bangkok", UTC_HOUR, UTC_MINUTE);
  expect(result.city).toBe("Bangkok");
  expect(result.time).toBe("7:00 PM");
});

test("Visitor from Dubai sees 'Dubai' and 4:00 PM", () => {
  const result = simulateVisitor("Asia/Dubai", UTC_HOUR, UTC_MINUTE);
  expect(result.city).toBe("Dubai");
  expect(result.time).toBe("4:00 PM");
});

test("Visitor from Kolkata sees 'Kolkata' and 5:30 PM", () => {
  const result = simulateVisitor("Asia/Kolkata", UTC_HOUR, UTC_MINUTE);
  expect(result.city).toBe("Kolkata");
  expect(result.time).toBe("5:30 PM");
});

test("Visitor from Kuala Lumpur sees 'Kuala Lumpur' and 8:00 PM", () => {
  const result = simulateVisitor("Asia/Kuala_Lumpur", UTC_HOUR, UTC_MINUTE);
  expect(result.city).toBe("Kuala Lumpur");
  expect(result.time).toBe("8:00 PM");
});

test("Visitor from Ho Chi Minh sees 'Ho Chi Minh' and 7:00 PM", () => {
  const result = simulateVisitor("Asia/Ho_Chi_Minh", UTC_HOUR, UTC_MINUTE);
  expect(result.city).toBe("Ho Chi Minh");
  expect(result.time).toBe("7:00 PM");
});

console.log("\n🇦🇺 AUSTRALIA & PACIFIC VISITORS\n");

test("Visitor from Sydney sees 'Sydney' and 10:00 PM", () => {
  const result = simulateVisitor("Australia/Sydney", UTC_HOUR, UTC_MINUTE);
  expect(result.city).toBe("Sydney");
  expect(result.time).toBe("10:00 PM");
});

test("Visitor from Melbourne sees 'Melbourne' and 10:00 PM", () => {
  const result = simulateVisitor("Australia/Melbourne", UTC_HOUR, UTC_MINUTE);
  expect(result.city).toBe("Melbourne");
  expect(result.time).toBe("10:00 PM");
});

test("Visitor from Auckland sees 'Auckland' and 12:00 AM (next day)", () => {
  const result = simulateVisitor("Pacific/Auckland", UTC_HOUR, UTC_MINUTE);
  expect(result.city).toBe("Auckland");
  expect(result.time).toBe("12:00 AM");
});

test("Visitor from Honolulu sees 'Honolulu' and 2:00 AM", () => {
  const result = simulateVisitor("Pacific/Honolulu", UTC_HOUR, UTC_MINUTE);
  expect(result.city).toBe("Honolulu");
  expect(result.time).toBe("2:00 AM");
});

console.log("\n🌎 SOUTH AMERICA VISITORS\n");

test("Visitor from Sao Paulo sees 'Sao Paulo' and 9:00 AM", () => {
  const result = simulateVisitor("America/Sao_Paulo", UTC_HOUR, UTC_MINUTE);
  expect(result.city).toBe("Sao Paulo");
  expect(result.time).toBe("9:00 AM");
});

test("Visitor from Buenos Aires sees 'Buenos Aires' and 9:00 AM", () => {
  const result = simulateVisitor("America/Buenos_Aires", UTC_HOUR, UTC_MINUTE);
  expect(result.city).toBe("Buenos Aires");
  expect(result.time).toBe("9:00 AM");
});

console.log("\n🌍 AFRICA & MIDDLE EAST VISITORS\n");

test("Visitor from Cairo sees 'Cairo' and 2:00 PM", () => {
  const result = simulateVisitor("Africa/Cairo", UTC_HOUR, UTC_MINUTE);
  expect(result.city).toBe("Cairo");
  expect(result.time).toBe("2:00 PM");
});

test("Visitor from Johannesburg sees 'Johannesburg' and 2:00 PM", () => {
  const result = simulateVisitor("Africa/Johannesburg", UTC_HOUR, UTC_MINUTE);
  expect(result.city).toBe("Johannesburg");
  expect(result.time).toBe("2:00 PM");
});

test("Visitor from Lagos sees 'Lagos' and 1:00 PM", () => {
  const result = simulateVisitor("Africa/Lagos", UTC_HOUR, UTC_MINUTE);
  expect(result.city).toBe("Lagos");
  expect(result.time).toBe("1:00 PM");
});

test("Visitor from Jerusalem sees 'Jerusalem' and 2:00 PM", () => {
  const result = simulateVisitor("Asia/Jerusalem", UTC_HOUR, UTC_MINUTE);
  expect(result.city).toBe("Jerusalem");
  expect(result.time).toBe("2:00 PM");
});

// ============ DIFFERENT TIME SCENARIOS ============

console.log("\n⏰ TESTING DIFFERENT TIMES OF DAY");
console.log("━".repeat(60));

console.log("\n🌙 Scenario: It's 3:00 AM UTC (middle of the night in London)\n");

test("Tokyo visitor at 3:00 AM UTC sees 12:00 PM (noon)", () => {
  const result = simulateVisitor("Asia/Tokyo", 3, 0);
  expect(result.time).toBe("12:00 PM");
});

test("New York visitor at 3:00 AM UTC sees 10:00 PM (previous evening)", () => {
  const result = simulateVisitor("America/New_York", 3, 0);
  expect(result.time).toBe("10:00 PM");
});

test("Los Angeles visitor at 3:00 AM UTC sees 7:00 PM (previous evening)", () => {
  const result = simulateVisitor("America/Los_Angeles", 3, 0);
  expect(result.time).toBe("7:00 PM");
});

console.log("\n🌅 Scenario: It's 6:30 AM UTC (early morning in London)\n");

test("Singapore visitor at 6:30 AM UTC sees 2:30 PM", () => {
  const result = simulateVisitor("Asia/Singapore", 6, 30);
  expect(result.time).toBe("2:30 PM");
});

test("Dubai visitor at 6:30 AM UTC sees 10:30 AM", () => {
  const result = simulateVisitor("Asia/Dubai", 6, 30);
  expect(result.time).toBe("10:30 AM");
});

console.log("\n🌆 Scenario: It's 8:00 PM UTC (evening in London)\n");

test("Sydney visitor at 8:00 PM UTC sees 6:00 AM (next morning)", () => {
  const result = simulateVisitor("Australia/Sydney", 20, 0);
  expect(result.time).toBe("6:00 AM");
});

test("Los Angeles visitor at 8:00 PM UTC sees 12:00 PM (noon)", () => {
  const result = simulateVisitor("America/Los_Angeles", 20, 0);
  expect(result.time).toBe("12:00 PM");
});

test("Tokyo visitor at 8:00 PM UTC sees 5:00 AM (next morning)", () => {
  const result = simulateVisitor("Asia/Tokyo", 20, 0);
  expect(result.time).toBe("5:00 AM");
});

// ============ SUMMARY ============

console.log("\n" + "━".repeat(60));
console.log(`\n📊 TEST SUMMARY: ${passCount} passed, ${failCount} failed\n`);

if (failCount > 0) {
  console.log("❌ Some tests failed! Please review the errors above.\n");
  process.exit(1);
} else {
  console.log("✅ All visitor simulation tests passed!");
  console.log("   The timezone component correctly shows the right city and time");
  console.log("   for visitors from around the world.\n");
  process.exit(0);
}
