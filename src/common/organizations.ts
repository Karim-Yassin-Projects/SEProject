export const OrganizationTypes = ["School", "Mosque", "Church", "Hospital", "Non-Profit"];
export const Governorates = ["Cairo",
    "Alexandria",
    "Aswan",
    "Assiut",
    "Beheira",
    "Beni Suef",
    "Dakahlia",
    "Damietta",
    "Faiyum",
    "Gharbia",
    "Giza",
    "Ismailia",
    "Kafr El-Sheikh",
    "Luxor",
    "Marsa Matrouh",
    "Minya",
    "Menofia",
    "New Valley",
    "North Sinai",
    "Port Said",
    "Qalyubia",
    "Qena",
    "Red Sea",
    "Sharqia",
    "Sohag",
    "South Sinai",
    "Suez"
];

export const Genders = ["Male", "Female"];


export type Organization = {
    id: number;
    name: string;
    type: typeof OrganizationTypes[number];
    address: string;
    area: string;
    governorate: typeof Governorates[number];
    phone: string;
    longitude: number;
    latitude: number;
};


export const Organizations: Organization[] = [
    {id: 1, area: 'Maadi', 'address': '4 151 Street', governorate: 'Cairo', latitude: 29.9705438, longitude: 31.2880715, name: 'Maadi Kids Hospital', phone: '01000000000', type: 'Hospital'},
    {id: 2, area: 'Maadi', 'address': 'Street 77', governorate: 'Cairo', latitude: 29.9675327, longitude: 31.2551928, name: 'El Rayan Hospital', phone: '01000000000', type: 'Hospital'},
    {id: 3, area: 'Maadi', 'address': 'Street 6', governorate: 'Cairo', latitude: 29.9536605, longitude: 31.2513419, name: 'Maadi Charity Hospital', phone: '01000000000', type: 'Hospital'},
    {id: 4, area: 'Zamalek', 'address': 'Zamalek', governorate: 'Cairo', latitude: 30.0503667, longitude: 31.217524, name: 'Teacher\'s Hospital', phone: '01000000000', type: 'Hospital'},
    {id: 5, area: 'Maadi', 'address': 'Maadi', governorate: 'Cairo', latitude: 29.9700046, longitude: 31.2420107, name: 'Maadi Narmer School', phone: '01000000000', type: 'School'},
    {id: 6, area: 'Nasr City', 'address': 'District 8', governorate: 'Cairo', latitude: 30.0295687, longitude: 31.3261248, name: 'Futures Language Schools', phone: '01000000000', type: 'School'},
    {id: 7, area: 'Dokki', 'address': '8 Hussein Wasef st', governorate: 'Giza', latitude: 30.0402676, longitude: 31.1964376, name: 'Orouba Language School', phone: '01000000000', type: 'School'},
    {id: 8, area: 'Sidi Gaber', 'address': 'Smouha Square', governorate: 'Alexandria', latitude: 31.2083103, longitude: 29.9382582, name: 'Smouha English School', phone: '01000000000', type: 'School'},
    {id: 9, area: 'Maadi', 'address': 'Street 77', governorate: 'Cairo', latitude: 29.9675327, longitude: 31.2551928, name: 'El Rayan Mosque', phone: '01000000000', type: 'Mosque'},
    {id: 10, area: 'Nasr City', 'address': 'District 1', governorate: 'Cairo', latitude: 30.0542884, longitude: 31.3467967, name: 'Al-Rahma Mosque', phone: '01000000000', type: 'Mosque'},
    {id: 11, area: 'Beni Suef', 'address': 'Hatem Rushdy street', governorate: 'Beni Suef', latitude: 29.0660489, longitude: 31.0752222, name: 'Mosque of the Caliphs', phone: '01000000000', type: 'Mosque'},
    {id: 12, area: 'Al Haram', 'address': 'Oula Al Haram, El Omraniya', governorate: 'Giza', latitude: 30.0050371, longitude: 31.1514344, name: 'Al Haram Hospital', phone: '01000000000', type: 'Hospital'},
    {id: 13, area: 'Maadi', 'address': 'Damascus street', governorate: 'Cairo', latitude: 29.9605148, longitude: 31.2682733, name: 'Saint Mark Church', phone: '01000000000', type: 'Church'},
    {id: 14, area: 'Maadi', 'address': 'Street 77', governorate: 'Giza', latitude: 29.9596968, longitude: 31.2574801, name: 'Archangel Michael Church', phone: '01000000000', type: 'Church'},
    {id: 15, area: 'New Cairo 3', 'address': '44 Gamal Abdel-Naser Axis', governorate: 'Cairo', latitude: 29.9598245, longitude: 31.1776552, name: 'Egyptian Food Bank', phone: '01000000000', type: 'Non-Profit'},
    {id: 17, area: 'Heliopolis', 'address': '71 Abu Bakr El-Sedeek, El-Bostan', governorate: 'Cairo', latitude: 29.9600707, longitude: 31.1776552, name: 'Dar Al Orman Association', phone: '01000000000', type: 'Non-Profit'},
    {id: 18, area: 'Maadi', 'address': '8 street 263', governorate: 'Cairo', latitude: 30.0328472, longitude: 31.1760629, name: 'Mersal foundation', phone: '01000000000', type: 'Non-Profit'},
];

export const Hospitals = Organizations.filter(org => org.type === 'Hospital');
