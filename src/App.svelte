<script lang="ts">
    import { onDestroy } from 'svelte';
    import {translations} from './lib/translations';
    import type {bibleTranslation} from "./lib/bible-translation";
    import {loadTranslation} from "./lib/load-translation";

    let selectedTranslation = $state('');
    let currentTranslation = $state({} as bibleTranslation);
    let randomBook = $state('');
    let randomVerse = $state('');

    let intervalId: ReturnType<typeof setInterval> | null = null;

    $effect(() => {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
        if (selectedTranslation == '') {
            return;
        }
        const updateRandomVerse = () => {
            loadTranslation(selectedTranslation)
                .then((t) => {
                    currentTranslation = t as unknown as bibleTranslation;
                    if (!t) {
                        console.error('Translation not found:', selectedTranslation);
                        return;
                    }
                    const bookIndex = Math.floor(Math.random() * currentTranslation.books.length);
                    const book = currentTranslation.books[bookIndex];
                    const chapterIndex = Math.floor(Math.random() * book.chapters.length);
                    const chapter = book.chapters[chapterIndex];
                    const verseIndex = Math.floor(Math.random() * chapter.verses.length);
                    const verse = chapter.verses[verseIndex];

                    randomBook = book.name;
                    randomVerse = `${verseIndex + 1}: ${verse.text}`;
                })
                .catch((error) => {
                    console.error('Error loading translation:', error);
                });
        };
        updateRandomVerse();
        intervalId = setInterval(updateRandomVerse, 30000); // update every 30 seconds
    });

    onDestroy(() => {
        if (intervalId) {
            clearInterval(intervalId);
        }
    });
</script>

<main>
    <select bind:value={selectedTranslation}>
        <option value="" disabled selected>Select a translation</option>
        {#each translations as translation}
            <option value={translation[0]}>{translation[1]}</option>
        {/each}
    </select>

    {#if currentTranslation && randomBook && randomVerse}
        <h2>{currentTranslation.translation}</h2>
        <h3>{randomBook}</h3>
        <p>{randomVerse}</p>
    {:else}
        <p>Please select a translation.</p>
    {/if}
</main>