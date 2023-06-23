import { DefaultRoute } from "../router/routes";
import { Coffee, X } from "react-feather";
import Avatar from "../@core/components/avatar";
// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = (obj) => Object.keys(obj).length === 0;

// ** Returns K format from a number
export const kFormatter = (num) =>
  num > 999 ? `${(num / 1000).toFixed(1)}k` : num;

// ** Converts HTML to string
export const htmlToString = (html) => html.replace(/<\/?[^>]+(>|$)/g, "");

// ** Checks if the passed date is today
const isToday = (date) => {
  const today = new Date();
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  );
};

/**
 ** Format and return date in Humanize format
 ** Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 ** Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
export const formatDate = (
  value,
  formatting = { month: "short", day: "numeric", year: "numeric" }
) => {
  if (!value) return value;
  return new Intl.DateTimeFormat("en-US", formatting).format(new Date(value));
};

// ** Returns short month of passed date
export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
  const date = new Date(value);
  let formatting = { month: "short", day: "numeric" };

  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: "numeric", minute: "numeric" };
  }

  return new Intl.DateTimeFormat("en-US", formatting).format(new Date(value));
};

/**
 ** Return if user is logged in
 ** This is completely up to you and how you want to store the token in your frontend application
 *  ? e.g. If you are using cookies to store the application please update this function
 */
export const isUserLoggedIn = () => localStorage.getItem("userData");
export const getUserData = () => JSON.parse(localStorage.getItem("userData"));

/**
 ** This function is used for demo purpose route navigation
 ** In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 ** Please note role field is just for showing purpose it's not used by anything in frontend
 ** We are checking role just for ease
 * ? NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 * @param {String} userRole Role of user
 */
export const getHomeRouteForLoggedInUser = (userRole) => {
  if (userRole === "admin") return DefaultRoute;
  if (userRole === "client") return "/access-control";
  return "/login";
};

// ** React Select Theme Colors
export const selectThemeColors = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: "#7367f01a", // for option hover bg-color
    primary: "#7367f0", // for selected option bg-color
    neutral10: "#7367f0", // for tags bg-color
    neutral20: "#ededed", // for input border-color
    neutral30: "#ededed", // for input hover border-color
  },
});

export const getBaseURL = () => {
  if (!process.env.REACT_APP_ENV) {
    return process.env.REACT_APP_LOCAL_URL;
  } else if (process.env.REACT_APP_ENV === "staging") {
    return process.env.REACT_APP_STAGING_URL;
  } else if (process.env.REACT_APP_ENV === "production") {
    return process.env.REACT_APP_PRODUCTION_URL;
  } else {
    return "";
  }
};

export const getToken = async () => {
  try {
    const token = await localStorage.getItem("userDetails");
    return token || "";
  } catch (e) {
    return e;
  }
};

// Used for toast message
export const ShowToast = ({ t, name, message, color, toast }) => {
  return (
    <div className="d-flex">
      <div className="me-1">
        <Avatar size="sm" color={color} icon={<Coffee size={12} />} />
      </div>
      <div className="d-flex flex-column">
        <div className="d-flex justify-content-between">
          <h6>{name}</h6>
          <X
            size={12}
            className="cursor-pointer"
            onClick={() => toast.dismiss(t.id)}
          />
        </div>
        <span>{message}</span>
      </div>
    </div>
  );
};

// THis function is used to format dropdown data
export const formatDropdownData = (data, value, label) => {
  let finalData = [];
  data &&
    data.length > 0 &&
    data.forEach((item) => {
      finalData.push({ value: item[value], label: item[label] });
    });
  return finalData;
};

export const countryList = [
  "+91 India",
  "+93 Afghanistan",
  "+355 Albania",
  "+213 Algeria",
  "+376 Andorra",
  "+244 Angola",
  "+1264 Anguilla",
  "+1268 Antigua And Barbuda",
  "+54 Argentina",
  "+297 Aruba",
  "+61 Australia",
  "+43 Austria",
  "+973 Bahrain",
  "+880 Bangladesh",
  "+1246 Barbados",
  "+375 Belarus",
  "+32 Belgium",
  "+501 Belize",
  "+229 Benin",
  "+1441 Bermuda",
  "+975 Bhutan",
  "+591 Bolivia",
  "+267 Botswana",
  "+55 Brazil",
  "+246 British India Ocean Territory",
  "+673 Brunei",
  "+359 Bulgaria",
  "+226 Burkina Faso",
  "+257 Burundi",
  "+855 Cambodia",
  "+237 Cameroon",
  "+1 Canada",
  "+1345 Cayman Island",
  "+236 Central African Republic",
  "+235 Chad",
  "+56 Chile",
  "+86 China",
  "+57 Colombia",
  "+269 Comoros",
  "+682 Cook Island",
  "+506 Costa Rica",
  "+53 Cuba",
  "+357 Cyprus",
  "+420 Czech Republic",
  "+45 Denmark",
  "+253 Djibouti",
  "+1767 Dominica",
  "+1809 Dominican Republic",
  "+670 East Timor",
  "+593 Ecuador",
  "+20 Egypt",
  "+503 EI Salvador",
  "+240 Equatorial Guinea",
  "+291 Eritrea",
  "+372 Estonia",
  "+251 Ethiopia",
  "+500 Falkland Island",
  "+298 Faroe Island",
  "+358 Finland",
  "+33 France",
  "+689 French Polynesia",
  "+241 Gabon",
  "+995 Georgia",
  "+49 Germany",
  "+233 Ghana",
  "+350 Gibraltar",
  "+30 Greece",
  "+1473 Grenada",
  "+502 Guatemala",
  "+224 Guinea",
  "+245 Guinea-Bissau",
  "+592 Guyana",
  "+509 Haiti",
  "+504 Honduras",
  "+852 Hong Kong",
  "+36 Hungary",
  "+354 Iceland",
  "+62 Indonesia",
  "+98 Iran",
  "+964 Iraq",
  "+353 Ireland",
  "+44 Isle of Man",
  "+972 Israel",
  "+39 Italy",
  "+1876 Jamaica",
  "+81 Japan",
  "+44 Jersey",
  "+962 Jordan",
  "+254 Kenya",
  "+686 Kiribati",
  "+965 Kuwait",
  "+996 Kyrgyzstan",
  "+856 Laos",
  "+371 Latvia",
  "+961 Lebanon",
  "+266 Lesotho",
  "+231 Liberia",
  "+218 Libya",
  "+423 Liechtenstein",
  "+370 Lithuania",
  "+352 Luxembourg",
  "+261 Medagascar",
  "+265 Malavi",
  "+60 Malaysia",
  "+960 Maldives",
  "+223 Mali",
  "+356 Malta",
  "+692 Marshall Island",
  "+222 Mauritania",
  "+230 Mauritius",
  "+52 Mexico",
  "+691 Micronesia",
  "+373 Moldova",
  "+377 Monaco",
  "+976 Mongolia",
  "+1664 Montserrat",
  "+212 Morocco",
  "+258 Mozambique",
  "+95 Myanmar",
  "+264 Namibia",
  "+674 Nauru",
  "+977 Nepal",
  "+31 Netherland",
  "+687 New Caledonia",
  "+64 New Zealand",
  "+505 Nicaragua",
  "+227 Niger",
  "+234 Nigeria",
  "+683 Niua",
  "+47 Norway",
  "+968 Oman",
  "+92 Pakistan",
  "+680 Palau",
  "+970 Palestine",
  "+507 Panama",
  "+675 Papua new Guinea",
  "+595 Paraguay",
  "+51 Peru",
  "+63 Philippines",
  "+48 Poland",
  "+351 Portugal",
  "+1 Puerto Rico",
  "+974 Qatar",
  "+82 Republic of Korea (South Korea)",
  "+40 Romania",
  "+7 Russia",
  "+250 Rwanda",
  "+290 Saint Helena",
  "+1869 Saint Kitts And Nevis",
  "+1758 Saint Lucia",
  "+1784 Saint Vincent And Grenadines",
  "+684 Samoa",
  "+378 San Marino",
  "+239 Sao Tome And Principe",
  "+966 Saudi Arabia",
  "+221 Senegal",
  "+381 Serbia",
  "+232 Sierra Leone",
  "+65 Singapore",
  "+421 Slovakia",
  "+386 Slovenia",
  "+677 Solomon Islands",
  "+252 Somalia",
  "+27 South Africa",
  "+211 South Sudan",
  "+34 Spain",
  "+94 Sri Lanka",
  "+249 Sudan",
  "+597 Suriname",
  "+268 Swaziland",
  "+46 Sweden",
  "+41 Switzerland",
  "+886 Taiwan",
  "+992 Tajikistan",
  "+255 Tanzania",
  "+66 Thailand",
  "+228 Togo",
  "+676 Tongo",
  "+1868 Trinidad And Tobago",
  "+216 Tunisia",
  "+90 Turkey",
  "+7370 Turkmenistan",
  "+1649 Turks And Caicos Islands",
  "+688 Tuvalu",
  "+256 Uganda",
  "+380 Ukraine",
  "+971 United Arab Emirates",
  "+44 United Kingdom",
  "+1 Unites States",
  "+598 Uruguay",
  "+998 Uzbekistan",
  "+678 Vanuatu",
  "+58 Venezuela",
  "+84 Vietnam",
  "+967 Yemen",
  "+260 Zambia",
  "+263 Zimbabwe",
];

export const stateList = [
  "",
  "01-JAMMUANDKASHMIR",
  "02-HIMACHALPRADESH",
  "03-PANJAB",
  "04-CHANDIGARDH",
  "05-UTTARAKHAND",
  "06-HARYANA",
  "07-DELHI",
  "08-RAJASTHAN",
  "09-UTTARPRADESH",
  "10-BIHAR",
  "11-SIKKIM",
  "12-ARUNACHALPRADESH",
  "13-NAGALAND",
  "14-MANIPUR",
  "15-MIZORAM",
  "16-TRIPURA",
  "17-MEGHALAYA",
  "18-ASSAM",
  "19-WESTBENGA",
  "20-JHARKHAND",
  "21-ODISHA",
  "22-CHATTISGARH",
  "23-MADHYAPRADSH",
  "24-GUJARAT",
  "26-DADARAANDNAGARHAVELIANDDAMANANDDIU-NEWMERGEDUT",
  "27-MAHARASHTRA",
  "28-ANDHRAPRADESH(BEFOREADDED)",
  "29-KARNATAKA",
  "30-GOA",
  "31-LAKSHWADEEP",
  "32-KERALA",
  "33-TAMILNADU",
  "34-PUDUCHERRY",
  "35-ANDAMANANDNICOBARISLANDS",
  "36-TELANGANA",
  "37-ANDHRAPRADESH",
  "38-LADAKH(NEWLYADDED)",
  "97-OTHERTERRYTORY",
];

export const tdsPercentageList = [
  "",
  "10% 193 Interest of securitites",
  "10% 194 Dividends",
  "10% 194A Interest (Banks)",
  "10% 194A Senior Citizens",
  "1% 194C Single contractor payment (Individual & HUF)",
  "1% 194C Aggregate contractor payment (Individual & HUF)",
  "5% 194D Insurance commission",
  "5% 194DA Insurance commission on Life Insurance policies",
  "10% 194EE NSS",
  "20% 194F Repurchase Units by MF's",
  "5% 194G Commission - Lottery",
  "5% 194H Commission/Brokerage",
  "2% 194I(a) Plant/Equipment/Machinery Rent",
  "10% 194I(b) Land Building and furniture rent",
  "1% 194IA Transfer of certain immovable property other than agricultural land",
  "5% 194IB Rent by Individual / HUF",
  "10% 194IC Payment under specified agreement applicable for F.Y.2017-18 onwards",
  "2% 194J(a) Fees-tech services, call center, royality for sale etc.",
  "10% 194J(b) Fee for professional service or royality etc.",
  "10% 194K Payment of dividends by mutual funds",
  "10% 194LA Compensation on the transfer of certain immovable property other than agriculture land",
  "5% 194LB Income on infrastructure debt fund(non-resident)",
  "10% 194LBA Income from a business trust (applicable from 01.10.2014)",
  "5% 194LBA Income from a business trust to non-resident (applicable from 01.10.2014)",
  "5% 194LD Interest on certain bonds and Govt. securities (from 01.10.2013)",
  "5% 194M Payment to commission or brokerage by individual & HUF",
  "2% 194N Cash withdrawal exceeding 1 crore during the previous year from 1 or more accounts with a bank or co",
  "1% 194O TDS on e-commerce participents",
  "0.1% 194Q Purchase of Goods",
  "2% 194C Single contractor payment (Others)",
  "2% 194C Aggregate contractor",
  "10% 194R Perquisite or benefit to a business or profession",
  "1% 194S TDS on the transfer of virtual digital assets",
];
export const primaryUnitList = [
  "",
  "OTH OTHERS",
  "PCS PIECES",
  "NOS NUMBERS",
  "KGS KILOGRAMS",
  "UNT UNITS",
  "BOX BOX",
  "LTR LITRE",
  "PAC PACKS",
  "EACH EACH",
  "MTR METERS",
  "SET SETS",
  "SQF SQUARE FEET",
  "POCH POUCH",
  "BTL BOTTLES",
  "BAG BAGS",
  "CASE CASE",
  "LAD LADI",
  "JAR JARS",
  "PET PETI",
  "FT FEET",
  "GMS GRAMS",
  "TBS TABLETS",
  "STRP STRIPS",
  "ROL ROLLS",
  "COIL COIL",
  "DOZ DOZEN",
  "QTL QUINTAL",
  "PRS PAIRS",
  "NONE NONE",
  "BOR BORA",
  "PAIR PAIR",
  "DAY DAYS",
  "MTS METRIC TON",
  "SQM SQUARE METERS",
  "CTN CARTONS",
  "LOT LOT",
  "PLT PLATES",
  "TON TONNES",
  "PERSON PERSONS",
  "MTH MONTH",
  "SHEETS SHEETS",
  "CAN CANS",
  "BDL BUNDLES",
  "COPY COPY",
  "MLT MILLILITRE",
  "IN INCHES",
  "TIN TIN",
  "KIT KIT",
  "PAD PAD",
  "CPS CAPSULES",
  "HRS HOURS",
  "KME KILOMETRE",
  "MLG MILLIGRAM",
  "TUB TUBES",
  "BARREL BARREL",
  "RFT RUNNING FOOT",
  "CBM CUBIC METER",
  "HEGAR HANGER",
  "DRM DRUM",
  "GLS GLASSES",
  "PRT PORTION",
  "RMT RUNNING METER",
  "VIAL VIALS",
  "BCK BUCKETS",
  "YRS YEARS",
  "CFT CUBIC FOOT",
  "MAN_DAY MAN-DAYS",
  "REEL REEL",
  "BUN BUNCHES",
  "PATTA PATTA",
  "AMP AMPOULE",
  "TKT TICKET",
  "CTS CARATS",
  "BLISTER BLISTER",
  "CCM CUBIC CENTIMETER",
  "HOLES HOLES",
  "REAM REAM",
  "BRASS BRASS",
  "PADS PADS",
  "RIM RIM",
  "KW KILOWATT",
  "W WATT",
  "NIGHT NIGHTS",
  "LINES LINES",
  "LGTH LENGTH",
  "TRIP TRIP",
  "LPSM LUMPSUM",
  "WDTH WIDTH",
  "MINS MINUTES",
  "BAL BALE",
  "GRS GROSS",
  "THD THOUSANDS",
  "SAC SACHET",
  "MM MILLIMETER",
  "KLR KILOLITER",
  "CUFT CUBIC FEET",
  "SEC SECONDS",
  "CMS CENTIMETER",
  "YDS YARDS",
  "SQIN SQUARE INCHES",
  "UGS US GALLONS",
  "BOU BILLIONS OF UNITS",
  "WEEK WEEKS",
  "ANA AANA",
  "TGM TEN GROSS",
  "GGR GREAT GROSS",
  "CHUDI CHUDI",
  "SQY SQUARE YARDS",
  "BKL BUCKLES",
  "CNT CENTS",
  "CFM CUBIC FEET PER MINUTE",
  "GYD GROSS YARDS",
];
