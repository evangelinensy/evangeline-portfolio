/**
 * Timezone Greeting Component Tests
 *
 * Run with: npx tsx src/components/ui/__tests__/timezone-greeting.test.ts
 *
 * Tests the core logic of the timezone greeting component across:
 * - Time formatting (12-hour format with AM/PM)
 * - City extraction from IANA timezone strings
 * - Edge cases and error handling
 */

// ============ COPIED FUNCTIONS FROM COMPONENT ============
// These are the pure functions we're testing

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
    // Extract city from timezone string (e.g., "America/Los_Angeles" -> "Los Angeles")
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
    },
    toMatch(pattern: RegExp) {
      if (typeof actual !== 'string' || !pattern.test(actual)) {
        throw new Error(`Expected "${actual}" to match ${pattern}`);
      }
    }
  };
}

function createDate(hours: number, minutes: number = 0): Date {
  const date = new Date(2024, 0, 15); // Jan 15, 2024
  date.setHours(hours, minutes, 0, 0);
  return date;
}

// ============ TIME FORMATTING TESTS ============

console.log("\n📍 TIME FORMATTING TESTS\n");

test("formats midnight (00:00) as 12:00 AM", () => {
  expect(formatTime(createDate(0, 0))).toBe("12:00 AM");
});

test("formats 00:30 as 12:30 AM", () => {
  expect(formatTime(createDate(0, 30))).toBe("12:30 AM");
});

test("formats 1:00 AM correctly", () => {
  expect(formatTime(createDate(1, 0))).toBe("1:00 AM");
});

test("formats 6:45 AM correctly", () => {
  expect(formatTime(createDate(6, 45))).toBe("6:45 AM");
});

test("formats 11:59 AM correctly", () => {
  expect(formatTime(createDate(11, 59))).toBe("11:59 AM");
});

test("formats noon (12:00) as 12:00 PM", () => {
  expect(formatTime(createDate(12, 0))).toBe("12:00 PM");
});

test("formats 12:30 PM correctly", () => {
  expect(formatTime(createDate(12, 30))).toBe("12:30 PM");
});

test("formats 1:00 PM correctly", () => {
  expect(formatTime(createDate(13, 0))).toBe("1:00 PM");
});

test("formats 6:30 PM correctly", () => {
  expect(formatTime(createDate(18, 30))).toBe("6:30 PM");
});

test("formats 11:59 PM correctly", () => {
  expect(formatTime(createDate(23, 59))).toBe("11:59 PM");
});

test("pads single-digit minutes with leading zero", () => {
  expect(formatTime(createDate(9, 5))).toBe("9:05 AM");
});

test("formats 3:07 PM correctly (padding test)", () => {
  expect(formatTime(createDate(15, 7))).toBe("3:07 PM");
});

// ============ CITY EXTRACTION TESTS ============

console.log("\n🌍 CITY EXTRACTION TESTS - Major Timezones\n");

// North America
test("extracts 'Los Angeles' from America/Los_Angeles", () => {
  expect(getCityFromTimezone("America/Los_Angeles")).toBe("Los Angeles");
});

test("extracts 'New York' from America/New_York", () => {
  expect(getCityFromTimezone("America/New_York")).toBe("New York");
});

test("extracts 'Chicago' from America/Chicago", () => {
  expect(getCityFromTimezone("America/Chicago")).toBe("Chicago");
});

test("extracts 'Denver' from America/Denver", () => {
  expect(getCityFromTimezone("America/Denver")).toBe("Denver");
});

test("extracts 'Toronto' from America/Toronto", () => {
  expect(getCityFromTimezone("America/Toronto")).toBe("Toronto");
});

test("extracts 'Vancouver' from America/Vancouver", () => {
  expect(getCityFromTimezone("America/Vancouver")).toBe("Vancouver");
});

test("extracts 'Mexico City' from America/Mexico_City", () => {
  expect(getCityFromTimezone("America/Mexico_City")).toBe("Mexico City");
});

// Europe
console.log("\n🇪🇺 European Timezones\n");

test("extracts 'London' from Europe/London", () => {
  expect(getCityFromTimezone("Europe/London")).toBe("London");
});

test("extracts 'Paris' from Europe/Paris", () => {
  expect(getCityFromTimezone("Europe/Paris")).toBe("Paris");
});

test("extracts 'Berlin' from Europe/Berlin", () => {
  expect(getCityFromTimezone("Europe/Berlin")).toBe("Berlin");
});

test("extracts 'Amsterdam' from Europe/Amsterdam", () => {
  expect(getCityFromTimezone("Europe/Amsterdam")).toBe("Amsterdam");
});

test("extracts 'Moscow' from Europe/Moscow", () => {
  expect(getCityFromTimezone("Europe/Moscow")).toBe("Moscow");
});

test("extracts 'Istanbul' from Europe/Istanbul", () => {
  expect(getCityFromTimezone("Europe/Istanbul")).toBe("Istanbul");
});

// Asia Pacific
console.log("\n🌏 Asia Pacific Timezones\n");

test("extracts 'Tokyo' from Asia/Tokyo", () => {
  expect(getCityFromTimezone("Asia/Tokyo")).toBe("Tokyo");
});

test("extracts 'Shanghai' from Asia/Shanghai", () => {
  expect(getCityFromTimezone("Asia/Shanghai")).toBe("Shanghai");
});

test("extracts 'Singapore' from Asia/Singapore", () => {
  expect(getCityFromTimezone("Asia/Singapore")).toBe("Singapore");
});

test("extracts 'Hong Kong' from Asia/Hong_Kong", () => {
  expect(getCityFromTimezone("Asia/Hong_Kong")).toBe("Hong Kong");
});

test("extracts 'Seoul' from Asia/Seoul", () => {
  expect(getCityFromTimezone("Asia/Seoul")).toBe("Seoul");
});

test("extracts 'Kolkata' from Asia/Kolkata", () => {
  expect(getCityFromTimezone("Asia/Kolkata")).toBe("Kolkata");
});

test("extracts 'Dubai' from Asia/Dubai", () => {
  expect(getCityFromTimezone("Asia/Dubai")).toBe("Dubai");
});

test("extracts 'Bangkok' from Asia/Bangkok", () => {
  expect(getCityFromTimezone("Asia/Bangkok")).toBe("Bangkok");
});

test("extracts 'Kuala Lumpur' from Asia/Kuala_Lumpur", () => {
  expect(getCityFromTimezone("Asia/Kuala_Lumpur")).toBe("Kuala Lumpur");
});

test("extracts 'Ho Chi Minh' from Asia/Ho_Chi_Minh", () => {
  expect(getCityFromTimezone("Asia/Ho_Chi_Minh")).toBe("Ho Chi Minh");
});

// Australia & Pacific
console.log("\n🇦🇺 Australia & Pacific Timezones\n");

test("extracts 'Sydney' from Australia/Sydney", () => {
  expect(getCityFromTimezone("Australia/Sydney")).toBe("Sydney");
});

test("extracts 'Melbourne' from Australia/Melbourne", () => {
  expect(getCityFromTimezone("Australia/Melbourne")).toBe("Melbourne");
});

test("extracts 'Auckland' from Pacific/Auckland", () => {
  expect(getCityFromTimezone("Pacific/Auckland")).toBe("Auckland");
});

test("extracts 'Honolulu' from Pacific/Honolulu", () => {
  expect(getCityFromTimezone("Pacific/Honolulu")).toBe("Honolulu");
});

// South America
console.log("\n🌎 South America Timezones\n");

test("extracts 'Sao Paulo' from America/Sao_Paulo", () => {
  expect(getCityFromTimezone("America/Sao_Paulo")).toBe("Sao Paulo");
});

test("extracts 'Buenos Aires' from America/Argentina/Buenos_Aires", () => {
  expect(getCityFromTimezone("America/Argentina/Buenos_Aires")).toBe("Buenos Aires");
});

test("extracts 'Lima' from America/Lima", () => {
  expect(getCityFromTimezone("America/Lima")).toBe("Lima");
});

// Africa & Middle East
console.log("\n🌍 Africa & Middle East Timezones\n");

test("extracts 'Cairo' from Africa/Cairo", () => {
  expect(getCityFromTimezone("Africa/Cairo")).toBe("Cairo");
});

test("extracts 'Lagos' from Africa/Lagos", () => {
  expect(getCityFromTimezone("Africa/Lagos")).toBe("Lagos");
});

test("extracts 'Johannesburg' from Africa/Johannesburg", () => {
  expect(getCityFromTimezone("Africa/Johannesburg")).toBe("Johannesburg");
});

test("extracts 'Jerusalem' from Asia/Jerusalem", () => {
  expect(getCityFromTimezone("Asia/Jerusalem")).toBe("Jerusalem");
});

// ============ EDGE CASES ============

console.log("\n⚠️ EDGE CASES\n");

test("handles simple timezone (no slashes) - UTC", () => {
  // UTC has no city part, should return "UTC"
  expect(getCityFromTimezone("UTC")).toBe("UTC");
});

test("handles three-part timezone - Argentina/Buenos_Aires", () => {
  expect(getCityFromTimezone("America/Argentina/Buenos_Aires")).toBe("Buenos Aires");
});

test("handles three-part timezone - Indiana/Indianapolis", () => {
  expect(getCityFromTimezone("America/Indiana/Indianapolis")).toBe("Indianapolis");
});

test("handles three-part timezone - Kentucky/Louisville", () => {
  expect(getCityFromTimezone("America/Kentucky/Louisville")).toBe("Louisville");
});

test("handles empty string gracefully", () => {
  expect(getCityFromTimezone("")).toBe("Local Time");
});

test("handles timezone with multiple underscores - Dar_es_Salaam", () => {
  expect(getCityFromTimezone("Africa/Dar_es_Salaam")).toBe("Dar es Salaam");
});

test("handles timezone with multiple underscores - Port_of_Spain", () => {
  expect(getCityFromTimezone("America/Port_of_Spain")).toBe("Port of Spain");
});

test("handles timezone - Rankin_Inlet", () => {
  expect(getCityFromTimezone("America/Rankin_Inlet")).toBe("Rankin Inlet");
});

// ============ REAL-WORLD TIMEZONE SIMULATION ============

console.log("\n🔄 REAL-WORLD TIMEZONE SIMULATION\n");

// Simulate what a user would see at specific times in different timezones
// by creating dates and verifying the output format

test("simulates user visiting at 9:30 AM their time", () => {
  const result = formatTime(createDate(9, 30));
  expect(result).toBe("9:30 AM");
});

test("simulates user visiting at 2:15 PM their time", () => {
  const result = formatTime(createDate(14, 15));
  expect(result).toBe("2:15 PM");
});

test("simulates late night visit at 11:45 PM", () => {
  const result = formatTime(createDate(23, 45));
  expect(result).toBe("11:45 PM");
});

test("simulates early morning visit at 5:00 AM", () => {
  const result = formatTime(createDate(5, 0));
  expect(result).toBe("5:00 AM");
});

// ============ ADDITIONAL EDGE CASES FOR RARE TIMEZONES ============

console.log("\n🌐 RARE & UNUSUAL TIMEZONES\n");

// Some lesser-known but valid IANA timezones
test("handles Pacific/Port_Moresby (Papua New Guinea)", () => {
  expect(getCityFromTimezone("Pacific/Port_Moresby")).toBe("Port Moresby");
});

test("handles Indian/Maldives", () => {
  expect(getCityFromTimezone("Indian/Maldives")).toBe("Maldives");
});

test("handles Atlantic/Reykjavik (Iceland)", () => {
  expect(getCityFromTimezone("Atlantic/Reykjavik")).toBe("Reykjavik");
});

test("handles America/St_Johns (Newfoundland)", () => {
  expect(getCityFromTimezone("America/St_Johns")).toBe("St Johns");
});

test("handles Asia/Kathmandu (Nepal)", () => {
  expect(getCityFromTimezone("Asia/Kathmandu")).toBe("Kathmandu");
});

test("handles Europe/Kyiv (Ukraine)", () => {
  expect(getCityFromTimezone("Europe/Kyiv")).toBe("Kyiv");
});

test("handles Antarctica/McMurdo", () => {
  expect(getCityFromTimezone("Antarctica/McMurdo")).toBe("McMurdo");
});

test("handles Etc/GMT timezones", () => {
  expect(getCityFromTimezone("Etc/GMT")).toBe("GMT");
});

test("handles Etc/GMT+5 timezone", () => {
  expect(getCityFromTimezone("Etc/GMT+5")).toBe("GMT+5");
});

test("handles Etc/UTC timezone", () => {
  expect(getCityFromTimezone("Etc/UTC")).toBe("UTC");
});

// ============ TIME BOUNDARY TESTS ============

console.log("\n⏰ TIME BOUNDARY TESTS\n");

test("handles exactly 12:00 noon", () => {
  expect(formatTime(createDate(12, 0))).toBe("12:00 PM");
});

test("handles 12:01 PM (just after noon)", () => {
  expect(formatTime(createDate(12, 1))).toBe("12:01 PM");
});

test("handles 11:59 AM (just before noon)", () => {
  expect(formatTime(createDate(11, 59))).toBe("11:59 AM");
});

test("handles exactly midnight 00:00", () => {
  expect(formatTime(createDate(0, 0))).toBe("12:00 AM");
});

test("handles 00:01 (just after midnight)", () => {
  expect(formatTime(createDate(0, 1))).toBe("12:01 AM");
});

test("handles 23:59 (just before midnight)", () => {
  expect(formatTime(createDate(23, 59))).toBe("11:59 PM");
});

// ============ SUMMARY ============

console.log("\n" + "=".repeat(50));
console.log(`\n📊 TEST SUMMARY: ${passCount} passed, ${failCount} failed\n`);

if (failCount > 0) {
  console.log("❌ Some tests failed! Please review the errors above.\n");
  process.exit(1);
} else {
  console.log("✅ All tests passed! The timezone component logic is working correctly.\n");
  process.exit(0);
}
