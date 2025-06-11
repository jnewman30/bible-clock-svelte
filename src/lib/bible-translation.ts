
export interface bibleTranslation {
    translation: string;
    books: bibleBook[];
}

export interface bibleBook {
    name: string;
    chapters: bibleChapter[];
}

export interface bibleChapter {
    number: number;
    verses: bibleVerse[];
}

export interface bibleVerse {
    number: number;
    text: string;
}
