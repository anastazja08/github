// Zmienne do przechowywania liczb i operacji
let x = ""; // pierwsza liczba
let y = ""; // druga liczba
let znak = ""; // operator matematyczny
let finish = false; // czy operacja zakończona

// Listy z możliwymi wartościami
const liczby = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', 'X', '/'];

// Wyświetlacz kalkulatora
const out = document.querySelector('.kalk-screen p'); // ekran wyników

// Funkcja do resetowania kalkulatora
function clearAll() {
    x = ""; // reset pierwszej liczby
    y = ""; // reset drugiej liczby
    znak = ""; // reset operatora
    finish = false; // reset zakończenia
    out.textContent = 0; // wyświetla 0
}

// Podpięcie funkcji resetowania do przycisku "AC"
document.querySelector('.ac').onclick = clearAll;

// Obsługa kliknięć przycisków
document.querySelector('.buttons').onclick = (event) => {
    // Jeśli kliknięto element bez klasy 'btn', zakończ
    if (!event.target.classList.contains('btn')) return;

    // Pobranie tekstu klikniętego przycisku
    const key = event.target.textContent;

    // Jeśli kliknięto cyfrę lub kropkę
    if (liczby.includes(key)) {
        if (!znak && !finish) {
            // Dodaj cyfrę do pierwszej liczby
            x += key;
            out.textContent = x; // Aktualizuj ekran
        } else if (znak && !finish) {
            // Dodaj cyfrę do drugiej liczby
            y += key;
            out.textContent = y; // Aktualizuj ekran
        }
        console.log(x, y, znak); // Wyświetla aktualny stan w konsoli
    }
};





