export type MedicalSupplies = {
    id: number;
    type: string;
    use: string;
    image: string;
    quantity: number;
}

export const allMedicalSupplies: MedicalSupplies[] = [

    {id:1, type: "Surgical Masks", use: "Protection against COVID-19", image: "/images/mask.svg", quantity: 17},
    {id:2, type: "Gloves", use: "Protection against COVID-19", image: "/images/gloves.svg", quantity: 22},
    {id:3, type: "Bandages", use: "Protection and covering of wounds",image: "/images/bandage.svg", quantity: 35},
    {id:4, type: "Antiseptic", use: "Protection against COVID-19", image: "/images/antiseptic.svg", quantity: 10},

]