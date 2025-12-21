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
    ceremony_sub_items: CeremonySubItem[];
}

export interface CeremonySection {
    id: string;
    title?: string;
    position: number;
    ceremony_items: CeremonyItem[];
}

export interface Ceremony {
    id: string;
    title: string;
    slug: string;
    schedule?: string;
    banten?: string;
    is_published?: boolean;
    ceremony_sections: CeremonySection[];
}
