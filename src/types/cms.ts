export interface CeremonySubItem {
    id: string;
    instruction: string;
    mantra?: string;
    position: number;
}

export interface CeremonyItem {
    id: string;
    instruction: string;
    mantra?: string;
    position: number;
    sub_items: CeremonySubItem[];
}

export interface CeremonySection {
    id: string;
    title?: string;
    position: number;
    items: CeremonyItem[];
}

export interface Ceremony {
    id: string;
    title: string;
    schedule?: string;
    banten?: string;
    sections: CeremonySection[];
}
