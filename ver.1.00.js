let expression = ""; // Całe wyrażenie (ciąg działań)

const out = document.querySelector('.kalk-screen p'); // ekran wyników

// Funkcja do resetowania kalkulatora
function clearAll() {
    expression = ""; // Reset wyrażenia
    out.textContent = 0; // Wyświetlanie 0
    out.classList.remove('small'); // Usuwanie klasy 'small' (mniejsza czcionka)
}

// Podpięcie funkcji resetowania do przycisku "AC"
document.querySelector('.btn-ac').onclick = clearAll;

document.querySelector('.buttons').onclick = (event) => {
    // Jeśli kliknięto element bez klasy 'btn', zakończ
    if (!event.target.classList.contains('btn')) return;

    
    
    // Pobranie tekstu klikniętego przycisku
    const key = event.target.textContent;

    // Jeśli kliknięto cyfrę lub kropkę
    if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'].includes(key)) {
        expression += key; // Dodajemy cyfrę lub kropkę do wyrażenia
        out.textContent = expression; // Wyświetlamy całe wyrażenie na ekranie
        
        // Jeśli długość wyrażenia przekroczy 12 znaków, zmniejszamy czcionkę
        if (expression.length > 12) {
            out.classList.add('small'); // Zmniejszamy czcionkę
        } else {
            out.classList.remove('small'); // Przywracamy normalną czcionkę
        }
        return;
    }

    
    // Obsługa operatorów matematycznych
    if (['-', '+', 'X', '/'].includes(key)) {
        expression += ` ${key} `; // Dodajemy operator do wyrażenia
        out.textContent = expression; // Wyświetlamy całe wyrażenie
        return;
    }
    if (key === '+/-') {
        const parts = expression.trim().split(" ");
        const lastPart = parts[parts.length - 1];
    
        if (!isNaN(lastPart)) {
            const zmieniona = (-1 * parseFloat(lastPart)).toString();
            parts[parts.length - 1] = zmieniona;
            expression = parts.join(" ");
            out.textContent = expression;
        }
        return;
    }

    
    
    if (key === '√') {
        // Dzielimy wyrażenie spacją
        const parts = expression.trim().split(" ");
        const lastPart = parts[parts.length - 1];
    
        // Sprawdź, czy to liczba
        if (!isNaN(lastPart)) {
            const wynik = Math.sqrt(parseFloat(lastPart));
            parts[parts.length - 1] = wynik.toString(); // Zamień liczbę na jej pierwiastek
            expression = parts.join(" ");
            out.textContent = expression;
        } else if (expression === "") {
            out.textContent = "0";
        }
        return;
    }
    // Obsługa operacji po naciśnięciu "="
    if (key === '=') {
        try {
            // Zastępujemy 'X' na '*' oraz inne potrzebne zmiany dla eval
            const finalExpression = expression.replace(/X/g, '*').replace(/√/g, 'Math.sqrt');

            // Obliczamy wynik całej formuły
            const result = eval(finalExpression); 
            out.textContent = result; // Pokazuje wynik
            expression = result.toString(); // Przechowujemy wynik jako nowe wyrażenie
            
            // Jeśli długość wyniku przekroczy 12 znaków, zmniejszamy czcionkę
            if (result.toString().length > 12) {
                out.classList.add('small'); // Zmniejszamy czcionkę dla dużych wyników
            } else {
                out.classList.remove('small'); // Przywracamy normalną czcionkę
            }
        } catch (error) {
            out.textContent = 'Błąd'; // Jeśli coś poszło nie tak
            expression = ""; // Resetujemy wyrażenie
        }
    }
}

document.getElementById('plotButton').addEventListener('click', () => {
    const input = document.getElementById('functionInput').value;
    const x = [];
    const y = [];

    for (let i = -10; i <= 10; i += 0.1) {
        x.push(i);
        try {
            const val = eval(input.replace(/x/g, `(${i})`));
            y.push(val);
        } catch (e) {
            alert("Błąd w funkcji. Używaj składni JS: np. x*x, Math.sin(x)");
            return;
        }
    }

    Plotly.newPlot('plot', [{
        x: x,
        y: y,
        type: 'scatter',
        mode: 'lines',
        line: { color: 'plum' }
    }]);
});
