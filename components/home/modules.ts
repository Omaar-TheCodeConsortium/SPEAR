// Every part of SPEAR, as the module explorer shows it. Customer language only.
// uses: three short lines. When a module has a demo, they follow the demo's steps in order.
// links: the modules it works with, and what passes between them.

export type ModuleId =
  | "pms" | "booking" | "channel" | "revenue" | "events"
  | "pos" | "ordering" | "menus" | "kds" | "inventory" | "floor" | "buffet"
  | "checkin" | "messaging" | "profiles" | "locks"
  | "housekeeping" | "staff" | "website";

export type ModuleInfo = {
  id: ModuleId;
  name: string;
  line: string;
  uses: [string, string, string];
  links: [ModuleId, string][];
};

export const MODULE_GROUPS: { name: string; modules: ModuleInfo[] }[] = [
  {
    name: "Hotel",
    modules: [
      {
        id: "pms",
        name: "Hotel PMS",
        line: "Rooms, reservations and folios in one record.",
        uses: ["Bookings from every channel land on one calendar", "Restaurant bills post to the folio as they happen", "Checkout settles up and sends the room to be cleaned"],
        links: [
          ["channel", "OTA bookings queue in order, never double-sold"],
          ["pos", "Restaurant bills post straight to the folio"],
          ["housekeeping", "Checkout sends the cleaning job"],
          ["locks", "Room keys follow the stay dates"],
        ],
      },
      {
        id: "booking",
        name: "Booking engine",
        line: "Commission-free bookings on your own website.",
        uses: ["A booking widget on your own website", "No commission on direct bookings", "Availability locks the moment a guest books"],
        links: [
          ["pms", "Direct bookings land on the room calendar"],
          ["revenue", "Rates update as demand changes"],
          ["website", "Built into your hotel website"],
        ],
      },
      {
        id: "channel",
        name: "Channel manager",
        line: "Booking.com, Expedia and Agoda kept in step.",
        uses: ["Rates and rooms in step on every channel", "Bookings queue in order, so no room is sold twice", "Direct and OTA bookings told apart"],
        links: [
          ["pms", "Every OTA booking lands on the calendar"],
          ["revenue", "New rates reach every channel together"],
          ["booking", "Shares availability with your own site"],
        ],
      },
      {
        id: "revenue",
        name: "Revenue management",
        line: "Rates that follow occupancy and demand.",
        uses: ["Rates rise as occupancy climbs", "New rates reach your site and every channel at once", "Market rates and demand forecasts to guide you"],
        links: [
          ["booking", "Prices on your own website"],
          ["channel", "Prices on Booking.com, Expedia and Agoda"],
          ["pms", "Reads live occupancy"],
        ],
      },
      {
        id: "events",
        name: "Sales and banqueting",
        line: "Event orders that book rooms, spaces and food.",
        uses: ["Every event in one pipeline, enquiry to confirmed", "One event order for layout, AV, menus and billing", "Signing it blocks rooms, holds spaces and orders food"],
        links: [
          ["pms", "Blocks the guest rooms"],
          ["floor", "Holds the dining spaces"],
          ["inventory", "Orders ingredients in bulk"],
          ["buffet", "Plans the buffet by headcount"],
        ],
      },
    ],
  },
  {
    name: "Restaurant",
    modules: [
      {
        id: "pos",
        name: "Offline POS",
        line: "A desktop till that keeps trading offline.",
        uses: ["Keeps trading when the internet drops", "Bills go to a room or any payment method", "Catches up the moment you're back online"],
        links: [
          ["pms", "Charges bills to hotel rooms"],
          ["kds", "Sends orders to the kitchen"],
          ["inventory", "Each sale deducts its ingredients"],
          ["floor", "Seating a party opens their bill"],
        ],
      },
      {
        id: "ordering",
        name: "QR and tablet ordering",
        line: "Guests order at the table, waiters on tablets.",
        uses: ["Guests order and pay from a QR code", "Waiters take orders on tablets", "Each order updates the bill and fires the kitchen"],
        links: [
          ["kds", "Tickets reach the kitchen at once"],
          ["menus", "Sold-out dishes grey out"],
          ["pos", "Orders add to the open bill"],
        ],
      },
      {
        id: "menus",
        name: "Menus and recipes",
        line: "Every dish costed to the gram.",
        uses: ["Every dish has a recipe to the gram", "Food cost and margin for every dish", "Run out of an ingredient and the dish greys out everywhere"],
        links: [
          ["inventory", "Recipes tell stock what each sale uses"],
          ["ordering", "Menus update on every QR code and tablet"],
          ["buffet", "Buffet prep uses the same recipes"],
        ],
      },
      {
        id: "kds",
        name: "Kitchen display",
        line: "Tickets on any TV, coloured by wait time.",
        uses: ["Orders arrive from the till, tablets and QR codes", "Tickets turn amber, then red, as they wait", "Bump a ticket and the waiter is told"],
        links: [
          ["pos", "Orders from the till"],
          ["ordering", "Orders from tables and tablets"],
        ],
      },
      {
        id: "inventory",
        name: "Kitchen inventory",
        line: "Stock deducted with every sale.",
        uses: ["Each sale takes its recipe out of stock", "Run out, and the dish leaves every menu", "Reorder from the supplier in one click"],
        links: [
          ["menus", "Recipes set what each dish uses"],
          ["pos", "Every sale counts"],
          ["events", "Bulk orders for confirmed events"],
        ],
      },
      {
        id: "floor",
        name: "Reservations and floor plan",
        line: "Seating a party opens their bill.",
        uses: ["Your floor plan, drawn in the system", "Guests pick their own table on your website", "Seating a party opens their bill, paying clears the table"],
        links: [
          ["pos", "Opens and closes bills"],
          ["profiles", "Knows returning guests"],
          ["buffet", "Admits buffet parties at the host stand"],
          ["website", "Your website books from the same plan"],
        ],
      },
      {
        id: "buffet",
        name: "Buffet management",
        line: "Prep by headcount, refills by line.",
        uses: ["Prep worked out from the headcount", "Runners log each line, the kitchen is told what to refill", "Plates counted against event contracts"],
        links: [
          ["menus", "Fixed recipes for each service"],
          ["floor", "Parties admitted at the host stand"],
          ["pos", "Billed through the till"],
          ["events", "Headcounts from event orders"],
        ],
      },
    ],
  },
  {
    name: "Guests",
    modules: [
      {
        id: "checkin",
        name: "Desk check-in",
        line: "ID at the desk, stay handed to the phone.",
        uses: ["Check the guest's ID at the desk", "Show a single-use QR code to scan", "Their stay opens on their phone, no app"],
        links: [
          ["pms", "Marks the guest as arrived"],
          ["locks", "Issues the wallet key or a key card"],
          ["profiles", "Updates the guest's record"],
        ],
      },
      {
        id: "messaging",
        name: "Guest messaging",
        line: "WhatsApp, SMS and email in one inbox.",
        uses: ["WhatsApp, SMS and email in one inbox", "Falls back to SMS, then email, if a message fails", "Booking confirmed and room ready sent for you"],
        links: [
          ["pms", "Booking confirmations"],
          ["housekeeping", "Room ready alerts"],
          ["profiles", "Every conversation on the guest's record"],
        ],
      },
      {
        id: "profiles",
        name: "Guest profiles",
        line: "Preferences and spend across stays and meals.",
        uses: ["Preferences, dietary needs and favourite rooms", "Spend across stays and meals in one place", "Private to your property"],
        links: [
          ["pms", "Opens with every booking"],
          ["floor", "Known at the restaurant too"],
          ["messaging", "Every message on record"],
        ],
      },
      {
        id: "locks",
        name: "Smart locks",
        line: "Apple and Google Wallet room keys.",
        uses: ["Room keys in Apple and Google Wallet", "Works with Assa Abloy, Salto and Dormakaba locks", "Extend the stay and the key follows, check out and it stops"],
        links: [
          ["checkin", "Issued at check-in"],
          ["pms", "Follows the stay dates"],
        ],
      },
    ],
  },
  {
    name: "Property and staff",
    modules: [
      {
        id: "housekeeping",
        name: "Housekeeping and supplies",
        line: "Cleaning jobs and amenities, room by room.",
        uses: ["Checkout flags the room for cleaning", "Housekeeping gets the job on their phone", "Marked clean, the room is ready to sell"],
        links: [
          ["pms", "Rooms can't be checked in until cleared"],
          ["staff", "Jobs go to whoever is on shift"],
          ["messaging", "Tells the guest their room is ready"],
        ],
      },
      {
        id: "staff",
        name: "Staff and timeclock",
        line: "Rotas and clock-ins verified on site.",
        uses: ["Shifts planned by role", "Clock in by QR with Face ID or a fingerprint, on site only", "Tasks go to whoever is on shift"],
        links: [
          ["housekeeping", "Cleaning jobs by shift"],
          ["pos", "Who served which table"],
        ],
      },
      {
        id: "website",
        name: "Hotel website",
        line: "Your site, booking rooms and tables from SPEAR.",
        uses: ["Your own website on your own domain, secure by default", "Guests choose their table on the floor plan you drew", "Every booking lands on that plan in SPEAR"],
        links: [
          ["booking", "Rooms booked commission-free"],
          ["floor", "Tables booked straight from your floor plan"],
        ],
      },
    ],
  },
];

export const MODULES: (ModuleInfo & { group: string })[] = MODULE_GROUPS.flatMap((g) => g.modules.map((m) => ({ ...m, group: g.name })));
export const MODULE_INDEX = Object.fromEntries(MODULES.map((m, i) => [m.id, i])) as Record<ModuleId, number>;
