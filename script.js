async function buscar() {
    const codigo = document.getElementById('codigo').value.trim();
    const resultado = document.getElementById('resultado');

    if (codigo.length !== 4) {
        resultado.textContent = 'Por faadaedavor, ingresa un código de 4 dígitos.';
        return;
    }

    try {
        const response = await fetch('DATOS.csv');
        if (!response.ok) {
            throw new Error(`Error al cargar el CSV: ${response.statusText}`);
        }
        const data = await response.text();
        const rows = data.split('\n').slice(1); // Saltar la cabecera

        let encontrado = false;

        // Depuración: Verificar qué se está leyendo del CSV
        console.log('Contenido del CSV:', rows);

        for (const row of rows) {
            const columns = row.split(',');
            if (columns.length >= 3) {  // Asegurarse de que hay suficientes columnas
                const [llave, notaFinal, promedio] = columns.map(col => col.trim()); // Eliminar espacios en blanco

                // Depuración: Mostrar cada valor de llave comparado
                console.log(`Comparando: "${llave}" con "${codigo}"`);

                if (llave === codigo) {
                    resultado.textContent = `NOTA FINAL: ${notaFinal}, PROMEDIO: ${promedio}`;
                    encontrado = true;
                    break;
                }
            }
        }

        if (!encontrado) {
            resultado.textContent = 'Código no encontrado.';
        }
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        resultado.textContent = 'Hubo un error al procesar la solicitud.';
    }
}
