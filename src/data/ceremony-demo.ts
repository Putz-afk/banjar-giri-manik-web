import { Ceremony } from "@/types/cms";

export const DEMO_CEREMONIES: Ceremony[] = [
    // --- CARD 1: PIODALAN ---
    {
        id: "uuid-piodalan-1",
        title: "TATA CARA PERSIAPAN PIODALAN",
        schedule: "H-0, JAM 21.00 WITA",
        banten: "Suci, pula gembal/sekar taman, gelar sanga, ancak bingin, prayascita, pengulapan, pengambean.",
        sections: [
            {
                id: "uuid-section-1",
                title: "A. Persiapan Manggala Upacara",
                position: 0,
                items: [
                    { id: "uuid-item-1", position: 0, instruction: "Cuci tangan", mantra: "Om Hrah phat astra ya namah", sub_items: [] },
                    { id: "uuid-item-2", position: 1, instruction: "Berkumur", mantra: "Om Ung phat astra ya namah", sub_items: [] },
                    { id: "uuid-item-3", position: 2, instruction: "Asana (Sikap Bersila)", mantra: "Om prasada sthiti sarira ciwa suci nirmala ya namah", sub_items: [] },
                    {
                        id: "uuid-item-4", position: 3, instruction: "Pranayama",
                        sub_items: [
                            { id: "uuid-sub-1", position: 0, instruction: "Puraka", mantra: "Om Ang namah" },
                            { id: "uuid-sub-2", position: 1, instruction: "Kumbaka", mantra: "Om Ung namah" },
                            { id: "uuid-sub-3", position: 2, instruction: "Recaka", mantra: "Om Mang namah" }
                        ]
                    }
                ]
            }
        ]
    },

    // --- CARD 2: TIRTA WANGSUHPADA (FIXED) ---
    {
        id: "uuid-tirta-wangsuhpada-1",
        title: "TATA CARA MEMOHON TIRTA WANGSUHPADA",
        sections: [
            {
                id: "uuid-section-2",
                title: "H. Pelaksanaan",
                position: 0,
                items: [
                    // Step 1: Standard
                    {
                        id: "uuid-item-5", position: 0, instruction: "Memohon Tirta (Puja Gangga)",
                        mantra: "Om Namaste bagawan gangga, namaste sita lambwapi,\nsalilam wimalam toyam, swambu tirtha bojanam\n\nOm subeksa asta asteya, dosa kilbi sana sane\npawitram semaha tirtha, gangga tirtha maha nadhi"
                        , sub_items: []
                    },
                    // Step 2: Now a PARENT step (Circle 2) containing Children (a, b, c...)
                    {
                        id: "uuid-item-6", position: 1, instruction: "Metirtha & Mabija",
                        sub_items: [
                            { id: "uuid-sub-4", position: 0, instruction: "Matirtha (dipercikan 3x di kepala)", mantra: "Om Budha pawitra ya namah\nOm Dharma maha tirtha ya namah\nOm Sanggya maha toya ya namah" },
                            { id: "uuid-sub-5", position: 1, instruction: "Diminum (3x)", mantra: "Om Brahma pawaka ya namah\nOm Wisnu amertha ya namah\nOm Iswara jnana ya namah" },
                            { id: "uuid-sub-6", position: 2, instruction: "Diraup (3x)", mantra: "Om Sampurna ya namah\nOm Sadhasiwa paripurna ya namah\nOm Paramasiwa sukma ya namah" },
                            { id: "uuid-sub-7", position: 3, instruction: "Memakai kembang di telinga", mantra: "Om Sri asmara ya namah" },
                            { id: "uuid-sub-8", position: 4, instruction: "Mabija", mantra: "Om Wija -wija kara ya namah" },
                        ]
                    }
                ]
            },
            {
                id: "uuid-section-3",
                title: "I. Penutup",
                position: 1,
                items: [
                    // Grouped Penutup into one major step with sub-steps, or keep as list
                    {
                        id: "uuid-item-7", position: 0, instruction: "Rangkaian Penutup",
                        sub_items: [
                            { id: "uuid-sub-9", position: 0, instruction: "Puja Penutup", mantra: "Om Hinaksaram hina padam\nHina mantram tathaiwaca\nHina bhaktim hina wrdhim\nSada ciwa namo stute" },
                            { id: "uuid-sub-10", position: 1, instruction: "Puja Pralina", mantra: "Om A Ta Sa Ba I\nOm Na Ma Si Wa Ya\nOm Ang Ksama sampurna ya namah swaha" }
                        ]
                    }
                ]
            }
        ]
    },
];